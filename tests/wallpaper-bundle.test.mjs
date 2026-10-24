import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile, writeFile, mkdir, mkdtemp, copyFile, rm} from 'node:fs/promises';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {pathToFileURL} from 'node:url';
import {wallpaperDirectory, ensureWallpaperCompatibility} from '../compat/wallpaper-install.js';
import {compatibilityMarker, systemFontsMarker, hostLifecycleMarker} from '../scripts/wallpaper-engine-compat.mjs';

const upstreamPath=join(wallpaperDirectory(),'lib/client.js');
let original;
try {original=await readFile(upstreamPath+'.codsh-original','utf8');}
catch {original=await readFile(upstreamPath,'utf8');}
const fontsPath=join(wallpaperDirectory(),'lib/routes/system-fonts.js');
let originalFonts;
try {originalFonts=await readFile(fontsPath+'.codsh-original','utf8');}
catch {originalFonts=await readFile(fontsPath,'utf8');}
const originalHost='export function apply(ctx) { return () => {}; }\nexport default {apply};\n';
const tick=()=>new Promise(resolve=>setTimeout(resolve,0));

async function writeEngine(directory, version='1.3.3') {
  await mkdir(join(directory,'lib/routes'),{recursive:true});
  await writeFile(join(directory,'package.json'),JSON.stringify({name:'dsh-plugin-wallpaper-engine',version,type:'module',exports:{'.':'./lib/index.js','./package.json':'./package.json'}}));
  await writeFile(join(directory,'lib/client.js'),original);
  await writeFile(join(directory,'lib/routes/system-fonts.js'),originalFonts);
  await writeFile(join(directory,'lib/index.js'),originalHost);
}

async function writeCodsh(packageRoot) {
  for(const file of ['compat/wallpaper-install.js','compat/wallpaper-host.js','compat/wallpaper-engine.js','scripts/wallpaper-engine-compat.mjs']) {
    const target=join(packageRoot,file);
    await mkdir(join(target,'..'),{recursive:true});
    await copyFile(new URL('../'+file,import.meta.url),target);
  }
  await writeFile(join(packageRoot,'package.json'),JSON.stringify({name:'dsh-codsh-theme',type:'module'}));
}

test('Codsh declares the pinned wallpaper dependency and its host activation row',async()=>{
  const manifest=JSON.parse(await readFile(new URL('../package.json',import.meta.url)));
  const patch=await readFile(new URL('../cordis.patch.yml',import.meta.url),'utf8');
  assert.equal(manifest.dependencies['dsh-plugin-wallpaper-engine'],'1.3.3');
  assert.equal(manifest.exports['./wallpaper-compat'],'./compat/wallpaper-host.js');
  assert.match(patch,/- id: wallpaper-engine\s+name: dsh-plugin-wallpaper-engine/);
  assert.match(patch,/- id: codsh-wallpaper-compat\s+name: dsh-codsh-theme\/wallpaper-compat/);
  assert.ok(!manifest.scripts.postinstall,'pnpm does not need to approve an install script');
});

test('a relocated package patches its bundled dependency, refreshes an existing copy and stops watching on dispose',async()=>{
  const root=await mkdtemp(join(tmpdir(),'codsh-bundle-test-'));
  const packageRoot=join(root,'node_modules/dsh-codsh-theme');
  const bundled=join(packageRoot,'node_modules/dsh-plugin-wallpaper-engine');
  const standalone=join(root,'standalone/node_modules/dsh-plugin-wallpaper-engine');
  try {
    await writeCodsh(packageRoot);
    await writeEngine(bundled);
    await writeEngine(standalone);
    const plugin=await import(pathToFileURL(join(packageRoot,'compat/wallpaper-host.js')).href);
    const listeners=new Set(),disposers=[],rebuilt=[],errors=[];
    let active;
    const ctx={
      effect(fn){disposers.push(fn());},
      logger:{error(...args){errors.push(args);}},
      clientModules:{clientPath:()=>active,onGraphChanged(fn){listeners.add(fn);return()=>listeners.delete(fn);},rebuilt(id){rebuilt.push(id);}},
    };
    await plugin.apply(ctx);
    assert.ok((await readFile(join(bundled,'lib/client.js'),'utf8')).includes(compatibilityMarker));
    assert.equal(await readFile(join(bundled,'lib/client.js.codsh-original'),'utf8'),original);
    assert.ok((await readFile(join(bundled,'lib/routes/system-fonts.js'),'utf8')).includes(systemFontsMarker));
    assert.ok((await readFile(join(bundled,'lib/index.js'),'utf8')).includes(hostLifecycleMarker));
    active=join(standalone,'lib/client.js');
    for(const listener of listeners)listener();
    for(let i=0;i<8&&!rebuilt.length;i++)await new Promise(resolve=>setTimeout(resolve,20));
    assert.ok((await readFile(active,'utf8')).includes(compatibilityMarker));
    assert.ok((await readFile(join(standalone,'lib/routes/system-fonts.js'),'utf8')).includes(systemFontsMarker));
    assert.deepEqual(rebuilt,['dsh-plugin-wallpaper-engine']);
    assert.deepEqual(errors,[]);
    const before=await readFile(active,'utf8');
    for(const listener of listeners)listener();
    await tick();await tick();
    assert.equal(await readFile(active,'utf8'),before,'repeated graph events do not stack the patch');
    for(const dispose of disposers)dispose();
    assert.equal(listeners.size,0);
  } finally {
    // root is the exact directory returned by mkdtemp for this test.
    await rm(root,{recursive:true,force:true});
  }
});

test('concurrent compatibility setup from old and new module generations patches each file once',async()=>{
  const root=await mkdtemp(join(tmpdir(),'codsh-concurrent-patch-'));
  try {
    const first=join(root,'first'),second=join(root,'second'),engine=join(root,'engine');
    await writeCodsh(first);await writeCodsh(second);await writeEngine(engine);
    const [a,b]=await Promise.all([import(pathToFileURL(join(first,'compat/wallpaper-install.js'))),import(pathToFileURL(join(second,'compat/wallpaper-install.js')))]);
    const results=await Promise.all(Array.from({length:8},(_,index)=>(index%2?a:b).ensureWallpaperCompatibility(engine)));
    assert.equal(results.filter(result=>result.changed).length,1,'all generations share the same physical-directory queue');
    assert.equal(await readFile(join(engine,'lib/client.js.codsh-original'),'utf8'),original);
    assert.equal(await readFile(join(engine,'lib/routes/system-fonts.js.codsh-original'),'utf8'),originalFonts);
    assert.equal(await readFile(join(engine,'lib/index.js.codsh-original'),'utf8'),originalHost);
    assert.ok((await readFile(join(engine,'lib/client.js'),'utf8')).includes(compatibilityMarker));
  } finally {await rm(root,{recursive:true,force:true});}
});

test('stopping compatibility during startup owns cleanup immediately and can be enabled again',async()=>{
  const root=await mkdtemp(join(tmpdir(),'codsh-compat-stop-'));
  try {
    const packageRoot=join(root,'node_modules/dsh-codsh-theme'),engine=join(packageRoot,'node_modules/dsh-plugin-wallpaper-engine');
    await writeCodsh(packageRoot);await writeEngine(engine);
    const plugin=await import(pathToFileURL(join(packageRoot,'compat/wallpaper-host.js')));
    const listeners=new Set(),disposers=[],rebuilt=[],errors=[];
    const ctx={effect(fn){disposers.push(fn());},logger:{error(...args){errors.push(args);}},clientModules:{
      clientPath:()=>join(engine,'lib/client.js'),onGraphChanged(fn){listeners.add(fn);return()=>listeners.delete(fn);},rebuilt(id){rebuilt.push(id);}
    }};
    const startup=plugin.apply(ctx);
    assert.equal(disposers.length,1,'cleanup is registered before the first asynchronous operation');
    await Promise.resolve();
    for(const listener of listeners){listener();listener();}
    await Promise.all([startup,disposers[0]()]);
    assert.equal(listeners.size,0);assert.deepEqual(rebuilt,[],'a stopped activation cannot publish a late rebuild');
    await plugin.apply(ctx);assert.equal(listeners.size,1);assert.deepEqual(rebuilt,['dsh-plugin-wallpaper-engine']);
    await disposers[1]();assert.equal(listeners.size,0);assert.deepEqual(errors,[]);
  } finally {await rm(root,{recursive:true,force:true});}
});

test('automatic setup rejects an incompatible engine before creating a backup or changing its client',async()=>{
  const root=await mkdtemp(join(tmpdir(),'codsh-version-test-'));
  try {
    await writeEngine(root,'9.0.0');
    await assert.rejects(ensureWallpaperCompatibility(root),/仅支持/);
    assert.equal(await readFile(join(root,'lib/client.js'),'utf8'),original);
  } finally {await rm(root,{recursive:true,force:true});}
});
