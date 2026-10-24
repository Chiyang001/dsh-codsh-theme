// Verify duplicate bundle rows against the Loader shipped by Desktop.
import {mkdtemp, writeFile, rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
import assert from 'node:assert/strict';

const runtime=join(process.env.LOCALAPPDATA,'Programs/DeepSeek Harness/resources/app.asar/dsh/node_modules');
const load=name=>import(pathToFileURL(join(runtime,name,'lib/index.js')).href);
const {Context}=await load('@deepseek-ai/cordis');
const {default:Loader}=await load('@deepseek-ai/cordis-plugin-loader');
const {default:Include}=await load('@deepseek-ai/cordis-plugin-include');
const root=await mkdtemp(join(tmpdir(),'codsh-loader-bundle-'));
try {
  await writeFile(join(root,'cordis.yml'),'[]\n');
  await writeFile(join(root,'wallpaper-fixture.mjs'), `export function apply(ctx, config) {
    ctx.effect(() => {globalThis.__codshBundleProbe.add(config.source); return () => globalThis.__codshBundleProbe.delete(config.source);});
  }\n`);
  for(const standalone of [false,true]) {
    globalThis.__codshBundleProbe=new Set();
    const ctx=new Context();
    await ctx.plugin(Loader);
    ctx.loader.builtins.include=Include;
    const row=source=>({id:'wallpaper-engine',name:pathToFileURL(join(root,'wallpaper-fixture.mjs')).href,config:{source}});
    try {
      await ctx.loader.create({name:'cordis:include',config:{path:pathToFileURL(join(root,'cordis.yml')).href,
        patches:[{insert:[row('bundled')]},...(standalone?[{insert:[row('standalone')]}]:[])],
      }});
      await ctx.loader.await();
      const entries=[...ctx.loader.entries()].filter(entry=>entry.options.id==='wallpaper-engine');
      assert.equal(entries.length,1,'a standalone installation must not start another host instance');
      assert.equal(globalThis.__codshBundleProbe.size,1);
      assert.ok(globalThis.__codshBundleProbe.has(standalone?'standalone':'bundled'));
    } finally {await ctx.fiber.dispose();}
  }
  console.log('PASS: Desktop Loader activates the bundled wallpaper row and keeps one instance when a standalone row is also installed');
} finally {
  delete globalThis.__codshBundleProbe;
  await rm(root,{recursive:true,force:true});
}
