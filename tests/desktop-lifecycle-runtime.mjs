// Run with scripts/verify-desktop.ps1 to use Desktop's actual Cordis and gateway.
import assert from 'node:assert/strict';
import {readFile,mkdtemp,rm} from 'node:fs/promises';
import {join,dirname} from 'node:path';
import {tmpdir} from 'node:os';
import {pathToFileURL} from 'node:url';
import {JSDOM} from 'jsdom';
import {wallpaperDirectory} from '../compat/wallpaper-install.js';
import {patchWallpaperHost} from '../scripts/wallpaper-engine-compat.mjs';

const runtime=join(process.env.LOCALAPPDATA,'Programs/DeepSeek Harness/resources/app.asar/dsh/node_modules/@deepseek-ai');
const cordis=await import(pathToFileURL(join(runtime,'cordis/lib/index.js')));
const {Context,Service}=cordis;
async function browserSource(name){
  const manifest=JSON.parse(await readFile(join(runtime,name,'package.json'),'utf8'));
  const entry=manifest.exports['./client'];
  return readFile(join(runtime,name,typeof entry==='string'?entry:entry.browser||entry.default),'utf8');
}
const fixture=await mkdtemp(join(tmpdir(),'codsh-desktop-lifecycle-'));
const previousDataDir=process.env.DSH_WE_DATA_DIR;process.env.DSH_WE_DATA_DIR=fixture;
try{
const hostPath=join(wallpaperDirectory(),'lib/index.js'),hostUrl=pathToFileURL(hostPath).href;
let originalHost;
try{originalHost=await readFile(hostPath+'.codsh-original','utf8');}catch{originalHost=await readFile(hostPath,'utf8');}
const patched=patchWallpaperHost(originalHost);
assert.equal(patchWallpaperHost(patched),patched);
assert.throws(()=>patchWallpaperHost('export const apply=()=>{};'),/不匹配/);
const hostSource=patched.replace(/from '(\.\/[^']+)'/g,(_match,path)=>'from '+JSON.stringify(pathToFileURL(join(dirname(hostPath),path)).href))
  .replaceAll('import.meta.url',JSON.stringify(hostUrl));
const fixedHost=await import('data:text/javascript;base64,'+Buffer.from(hostSource).toString('base64'));
const cachedHost=await import(hostUrl);
await import('../compat/wallpaper-host.js');
assert.equal(cachedHost.apply.prototype,undefined,'an already-cached upstream apply uses the same cleanup protocol');
  for(const plugin of [fixedHost,cachedHost]){
    const ctx=new Context(),routes=new Map();
    class WebServer extends Service{
      constructor(ctx){super(ctx,'webServer');}
      register(route){
        const key=route.kind+':'+route.path;
        assert.equal(routes.has(key),false,'duplicate route '+key);
        routes.set(key,route);
        // Deliberately no ctx.effect: the actual engine must own its cleanup.
        return()=>{if(routes.get(key)===route)routes.delete(key);};
      }
    }
    new WebServer(ctx);
    try{
      for(let i=0;i<3;i++){
        const fiber=ctx.plugin(plugin);await fiber.await();assert.ok(routes.size>30);
        await fiber.dispose();assert.equal(routes.size,0,'disabling releases every route before the next activation');
      }
    }finally{await ctx.fiber.dispose();}
  }
  console.log('PASS: real Wallpaper Engine releases all routes across three enable/disable cycles, including cached host code');

  const dom=new JSDOM('<!doctype html><html><head></head><body><div class="sidebar_root"><div class="sidebar_logoRow"></div><button class="sidebar_newSession">new</button><div class="workspace_listArea"></div></div><div data-shortcut-modal="settings"><div class="theme_cubeRow"></div></div></body></html>',{runScripts:'outside-only',url:'http://localhost'});
  let client;
  dom.window.__ModuleLoader__={load(entry){client=entry.factory(()=>{});}};
  dom.window.localStorage.setItem('codsh.typography',JSON.stringify({font:'KaiTi',light:'',dark:''}));
  dom.window.eval(await readFile(new URL('../dist/client.js',import.meta.url),'utf8'));
  const ctx=new Context();let subscriptions=0,layers=0;
  const source=()=>({getSnapshot:()=>({items:[],ids:[],byId:{}}),subscribe(){subscriptions++;return()=>subscriptions--;}});
  ctx.provide('theme',{overrideTokens(){layers++;return()=>layers--;}});
  ctx.provide('sessions',{list:source()});ctx.provide('workspaces',{list:source()});ctx.provide('uiWorkspace',{});ctx.provide('remote.session',{});
  const {TypertRegistry}=await import(pathToFileURL(join(runtime,'dsh-typert-registry/lib/index.js')));
  new TypertRegistry(ctx);
  ctx.provide('connection',{interactions:'none',rpc:{open:async function*(){}},registerGenerationSource:()=>()=>{},generation:{getSnapshot:()=>undefined},start:()=>({stop(){}})});
  let gateway;
  new Function('window',await browserSource('dsh-api-gateway'))({__ModuleLoader__:{load(entry){gateway=entry.factory(name=>{assert.equal(name,'@deepseek-ai/cordis');return cordis;});}}});
  const gatewayFiber=ctx.plugin(gateway);await gatewayFiber.await();
  try{
    for(let i=0;i<3;i++){
      const fiber=ctx.plugin(client);await fiber.await();
      assert.equal(dom.window.document.querySelectorAll('[data-codsh-style]').length,1);assert.equal(layers,1);assert.equal(subscriptions,2);
      assert.equal(dom.window.document.querySelectorAll('.codsh-typography').length,1);
      await fiber.dispose();assert.equal(dom.window.document.querySelector('[data-codsh-style]'),null);
      assert.equal(dom.window.document.documentElement.hasAttribute('data-codsh-theme'),false);assert.equal(layers,0);assert.equal(subscriptions,0);
    }
    for(let i=0;i<3;i++){const fiber=ctx.plugin(client);await Promise.resolve();await fiber.dispose();}
    const final=ctx.plugin(client);await final.await();assert.equal(layers,1);assert.equal(subscriptions,2);await final.dispose();
    console.log('PASS: Codsh UI, typography, tokens and real Remote mounts recover after repeated and interrupted activations');
  }finally{await ctx.fiber.dispose();dom.window.close();}
}finally{
  if(previousDataDir===undefined)delete process.env.DSH_WE_DATA_DIR;else process.env.DSH_WE_DATA_DIR=previousDataDir;
  // Exact temporary fixture path created by mkdtemp above.
  await rm(fixture,{recursive:true,force:true});
}
