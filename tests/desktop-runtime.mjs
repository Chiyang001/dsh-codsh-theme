// Run with Desktop's Electron in Node mode, so its ASAR-contained Cordis is
// used. This exercises the installed framework instead of mocking ctx.effect.
import {readFile,mkdtemp,mkdir,writeFile,access,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
import assert from 'node:assert/strict';
import {JSDOM} from 'jsdom';
const runtime=join(process.env.LOCALAPPDATA,'Programs','DeepSeek Harness','resources','app.asar','dsh','node_modules','@deepseek-ai','cordis','lib','index.js');
const cordis=await import(pathToFileURL(runtime).href);const {Context}=cordis;
const dom=new JSDOM('<!doctype html><html><head></head><body></body></html>',{runScripts:'outside-only'});
let plugin;
dom.window.__ModuleLoader__={load(entry){plugin=entry.factory(()=>{});}};
dom.window.eval(await readFile(new URL('../dist/client.js',import.meta.url),'utf8'));
const ctx=new Context();let mounted=0,released=0,subscribed=0;
const fiber=ctx.plugin(plugin);
assert.equal(dom.window.document.querySelector('[data-codsh-style]'),null);
const source=(snapshot)=>({getSnapshot:()=>snapshot,subscribe(){subscribed++;return()=>subscribed--;}});
const provider=ctx.plugin({apply(child){
  child.provide('theme',{overrideTokens(_source,tokens){
    for(const modes of Object.values(tokens)){assert.equal(typeof modes.dark,'string');assert.equal(typeof modes.light,'string');}
    mounted++;return()=>released++;
  }});
  child.provide('sessions',{list:source({phase:'ready',ids:[],byId:{}})});
  child.provide('workspaces',{list:source({phase:'ready',items:[],archivedSessionIds:[]})});
  child.provide('uiWorkspace',{openSession(){}});
  child.provide('remote',{$mount:async()=>()=>{},codshActions:{}});
  child.provide('remote.session',{});
  child.provide('remote.codshActions',{});
}});
await provider.await();
await Promise.race([fiber.await(),new Promise((_,reject)=>setTimeout(()=>reject(Error('Theme activation timed out')),5000))]);
assert.equal(mounted,1);assert.equal(subscribed,2);
assert.ok(dom.window.document.querySelector('[data-codsh-theme]'));
await fiber.dispose();
assert.equal(released,1);assert.equal(subscribed,0);
assert.equal(dom.window.document.querySelector('[data-codsh-style]'),null);
assert.equal(dom.window.document.querySelector('[data-codsh-theme]'),null);
await provider.dispose();dom.window.close();
const {TypertRegistry}=await import(pathToFileURL(join(process.env.LOCALAPPDATA,'Programs','DeepSeek Harness','resources','app.asar','dsh','node_modules','@deepseek-ai','dsh-typert-registry','lib','index.js')).href);
const host=new Context();
const fixtureRoot=await mkdtemp(join(tmpdir(),'codsh-runtime-'));
const fixtureDir=join(fixtureRoot,'fixture-session');await mkdir(fixtureDir);await writeFile(join(fixtureDir,'session.jsonl'),'fixture');
let live=false;const lifecycle=[];
class FixtureAgents extends cordis.Service {
  constructor(child){super(child,'agents');}
  async create(){return this.resume();}
  async resume(){assert.ok(this.ctx);live=true;return{agent:{id:'fixture-session'},dispose:async()=>{lifecycle.push('disposed');live=false;}};}
}
const hostProvider=host.plugin({apply(child){new TypertRegistry(child);new FixtureAgents(child);child.provide('sessions',{get(){return live?{}:undefined;}});child.provide('sessionPersistence',{config:{root:fixtureRoot},locate:()=>({kind:'jsonl',path:join(fixtureDir,'session.jsonl')}),stat:async()=>({header:{id:'fixture-session'}}),list:async()=>[],open:async()=>{assert.equal(live,false);return{close:async()=>{}};}});child.provide('workspaceRegistry',{archivedSessionIds:[],archiveSession:async()=>{lifecycle.push('stopped');},unarchiveSession:async()=>{}});}});
await hostProvider.await();
const hostPlugin=await import('../index.js');const hostFiber=host.plugin(hostPlugin);await hostFiber.await();
assert.equal(host.typert.local.get('codshActions/deleteSession').service,'codshActions');
const hostGateway=await import(pathToFileURL(join(process.env.LOCALAPPDATA,'Programs','DeepSeek Harness','resources','app.asar','dsh','node_modules','@deepseek-ai','dsh-api-gateway','lib','index.js')).href);
const hostGatewayFiber=host.plugin({inject:['typert'],apply(child){new hostGateway.TypertGatewayService(child,hostGateway.TypertGatewayService.Config({}));}});await hostGatewayFiber.await();
assert.equal(host.typertGateway.claimsEndpoint('codshActions/deleteSession'),true);
await host.agents.resume({sessionId:'fixture-session'});
const forced=await host.typertGateway.invoke({namespace:'codshActions',method:'deleteSession',args:{request:{sessionId:'fixture-session',confirm:true}}});
assert.equal(forced.deleted,true);assert.deepEqual(lifecycle,['stopped','disposed']);await assert.rejects(access(fixtureDir));
// fixtureRoot is the exact directory created by mkdtemp above.
await rm(fixtureRoot,{recursive:true,force:true});
await hostGatewayFiber.dispose();await hostFiber.dispose();assert.equal(host.typert.local.get('codshActions/deleteSession'),undefined);await hostProvider.dispose();
let gateway;
const gatewaySource=await readFile(join(process.env.LOCALAPPDATA,'Programs','DeepSeek Harness','resources','app.asar','dsh','node_modules','@deepseek-ai','dsh-api-gateway','lib','client.js'),'utf8');
new Function('window',gatewaySource)({__ModuleLoader__:{load(entry){gateway=entry.factory(name=>{if(name==='@deepseek-ai/cordis')return cordis;throw Error(`Unexpected dependency: ${name}`);});}}});
const {contribution}=await import('../remote-contract.js');
const rpcContext=new Context();let wire;
const rpcProvider=rpcContext.plugin({apply(child){new TypertRegistry(child);child.provide('connection',{
  rpc:{call:async(path,endpoint,payload)=>{wire={path,endpoint,payload};return{ok:true,value:{deleted:true,sessionId:payload.args.request.sessionId}};},open:async function*(){}},
  registerGenerationSource:()=>()=>{},start:()=>({stop(){}}),
});}});await rpcProvider.await();
const rpcFiber=rpcContext.plugin(gateway);await rpcFiber.await();
const rpcMount=await rpcContext.remote.$mount(contribution);
const result=await rpcContext.remote.codshActions.deleteSession({sessionId:'fixture-session',confirm:true});
assert.equal(result.ok,true);assert.equal(wire.endpoint,'codshActions/deleteSession');assert.equal(wire.payload.args.request.confirm,true);
await rpcMount();await rpcFiber.dispose();await rpcProvider.dispose();
console.log('PASS: installed Desktop Cordis parks missing dependencies, activates the theme and restores it on dispose');
