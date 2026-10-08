import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,writeFile,access,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {apply} from '../index.js';
import {contribution} from '../remote-contract.js';
test('project deletion requires confirmation and deletes descendants before parents, then removes the project',async()=>{
  let service;const order=[];
  const rows=[{header:{id:'parent',cwd:'C:/project'}},{header:{id:'child',parentId:'parent',cwd:'C:/other'}},{header:{id:'archived',cwd:'C:/project'}},{header:{id:'other',cwd:'C:/else'}}];
  const ctx={effect(fn){fn();},agents:{create:async()=>{},resume:async()=>{}},provide(key,value){service=value;},typert:{register(){}},sessionPersistence:{list:async()=>rows,stat:async()=>({})},workspaceRegistry:{get:()=>({path:'C:/project',sessionIds:['parent']}),delete:async id=>order.push(id)}};
  apply(ctx);service.deleteSession=async({sessionId})=>{order.push(sessionId);};
  await assert.rejects(service.deleteProject({workspaceId:'project'}),/确认/);assert.deepEqual(order,[]);
  await service.deleteProject({workspaceId:'project',confirm:true});
  assert.ok(order.indexOf('child')<order.indexOf('parent'));assert.ok(order.includes('archived'));assert.ok(!order.includes('other'));assert.equal(order.at(-1),'project');
});
test('delete RPC uses strict codecs and rejects invalid confirmation and malformed results',()=>{
  const descriptor=contribution.descriptors[0];assert.equal(descriptor.parameters[0].codec.mode,'strict');assert.equal(descriptor.result.mode,'strict');
  const request=descriptor.parameters[0].codec.create(),result=descriptor.result.create();
  assert.deepEqual(request.parse({sessionId:'s',confirm:true}),{sessionId:'s',confirm:true});
  for(const value of [null,{}, {sessionId:'s',confirm:false},{sessionId:'',confirm:true},{sessionId:'s',confirm:true,path:'C:\\'}])assert.throws(()=>request.parse(value));
  assert.deepEqual(result.parse({sessionId:'s',deleted:true}),{sessionId:'s',deleted:true});assert.throws(()=>result.parse({deleted:false}));
});
test('forced deletion stops and disposes a live session before deleting, preserving project files',async()=>{
  const root=await mkdtemp(join(tmpdir(),'codsh-host-test-'));const dir=join(root,'project','session-1');await mkdir(dir,{recursive:true});await writeFile(join(dir,'session.jsonl'),'test');
  const projectFile=join(root,'project','keep.txt');await writeFile(projectFile,'keep');
  let service,live=false,location=join(dir,'session.jsonl'),descriptor,archived=[],removed;const order=[];
  const owner={agent:{id:'session-1'},dispose:async()=>{order.push('dispose');live=false;}};
  const ctx={effect(fn){fn();},parallel:async()=>{order.push('stop');},agents:{create:async()=>owner,resume:async()=>owner},provide(key,value){service=value;},typert:{register(value){descriptor=value;}},sessions:{get:()=>live?{}:undefined},
    sessionPersistence:{config:{root},locate:()=>({kind:'jsonl',path:location}),stat:async()=>({header:{id:'session-1'}}),list:async()=>[],open:async()=>{assert.equal(live,false);order.push('lease');return{close:async()=>{}};}},
    workspaceRegistry:{get archivedSessionIds(){return archived;},archiveSession:async id=>{archived.push(id);},unarchiveSession:async id=>{archived=archived.filter(value=>value!==id);}},emit(event,id){removed=[event,id];}};
  apply(ctx);assert.equal(descriptor.invocations[0].service,'codshActions');
  try{
    await assert.rejects(service.deleteSession({sessionId:'session-1'}),/确认/);
    location=join(root,'project','keep.txt');await assert.rejects(service.deleteSession({sessionId:'session-1',confirm:true}),/路径/);location=join(dir,'session.jsonl');
    await ctx.agents.resume({sessionId:'session-1'});live=true;
    const result=await service.deleteSession({sessionId:'session-1',confirm:true});assert.equal(result.deleted,true);
    assert.deepEqual(order,['stop','dispose','lease']);
    await assert.rejects(access(dir));await access(projectFile);assert.deepEqual(removed,['api-session/removed','session-1']);assert.deepEqual(archived,[]);
  }finally{await rm(root,{recursive:true,force:true});}
});
