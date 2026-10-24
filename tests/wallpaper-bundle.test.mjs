import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile, writeFile, mkdir, mkdtemp, copyFile, rm} from 'node:fs/promises';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {pathToFileURL} from 'node:url';
import {wallpaperDirectory, ensureWallpaperCompatibility} from '../compat/wallpaper-install.js';
import {compatibilityMarker} from '../scripts/wallpaper-engine-compat.mjs';

const upstreamPath=join(wallpaperDirectory(),'lib/client.js');
let original;
try {original=await readFile(upstreamPath+'.codsh-original','utf8');}
catch {original=await readFile(upstreamPath,'utf8');}
const tick=()=>new Promise(resolve=>setTimeout(resolve,0));

async function writeEngine(directory, version='1.3.3') {
  await mkdir(join(directory,'lib'),{recursive:true});
  await writeFile(join(directory,'package.json'),JSON.stringify({name:'dsh-plugin-wallpaper-engine',version,exports:{'./package.json':'./package.json'}}));
  await writeFile(join(directory,'lib/client.js'),original);
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
    for(const file of ['compat/wallpaper-install.js','compat/wallpaper-host.js','compat/wallpaper-engine.js','scripts/wallpaper-engine-compat.mjs']) {
      const target=join(packageRoot,file);
      await mkdir(join(target,'..'),{recursive:true});
      await copyFile(new URL('../'+file,import.meta.url),target);
    }
    await writeFile(join(packageRoot,'package.json'),JSON.stringify({name:'dsh-codsh-theme',type:'module'}));
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
    active=join(standalone,'lib/client.js');
    for(const listener of listeners)listener();
    for(let i=0;i<8&&!rebuilt.length;i++)await new Promise(resolve=>setTimeout(resolve,20));
    assert.ok((await readFile(active,'utf8')).includes(compatibilityMarker));
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

test('automatic setup rejects an incompatible engine before creating a backup or changing its client',async()=>{
  const root=await mkdtemp(join(tmpdir(),'codsh-version-test-'));
  try {
    await writeEngine(root,'9.0.0');
    await assert.rejects(ensureWallpaperCompatibility(root),/仅支持/);
    assert.equal(await readFile(join(root,'lib/client.js'),'utf8'),original);
  } finally {await rm(root,{recursive:true,force:true});}
});
