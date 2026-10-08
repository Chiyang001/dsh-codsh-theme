import {realpath,lstat,rename,rm} from 'node:fs/promises';
import {dirname,resolve,relative,basename,isAbsolute} from 'node:path';
import {randomUUID} from 'node:crypto';
import {contribution} from './remote-contract.js';
export const inject=['typert','sessions','agents','sessionPersistence','workspaceRegistry'];
function encodedId(id){
  if(id==='.')return '~002E';if(id==='..')return '~002E~002E';
  return Array.from(id).map(ch=>/^[A-Za-z0-9._-]$/.test(ch)?ch:Array.from({length:ch.length},(_,i)=>'~'+ch.charCodeAt(i).toString(16).toUpperCase().padStart(4,'0')).join('')).join('');
}
export function apply(ctx){
  const deleting=new Set();
  const handles=new Map();
  ctx.effect(()=>()=>handles.clear());
  for(const method of ['create','resume']){
    const original=ctx.agents[method];
    const wrapped=async function(...args){const handle=await original.apply(this,args);if(handle?.agent?.id)handles.set(handle.agent.id,handle);return handle;};
    ctx.agents[method]=wrapped;
    ctx.effect(()=>()=>{if(ctx.agents[method]===wrapped)ctx.agents[method]=original;});
  }
  const service={async deleteSession(request){
    const id=request?.sessionId;
    if(typeof id!=='string'||!id||request?.confirm!==true)throw Error('需要明确确认永久删除会话');
    if(deleting.has(id))throw Error('此会话正在删除');
    deleting.add(id);let archived=false;
    try{
      const persistence=ctx.sessionPersistence;
      if(typeof persistence.locate!=='function'||typeof persistence.config?.root!=='string')throw Error('永久删除只支持本机 JSONL 会话存储');
      const stored=await persistence.stat(id);if(!stored)throw Error('会话不存在');
      if((await persistence.list()).some(row=>row.header.parentId===id))throw Error('此会话仍有子会话，请先删除子会话');
      const location=persistence.locate(stored.header);
      if(location?.kind!=='jsonl')throw Error('不支持此会话存储格式');
      const root=await realpath(resolve(persistence.config.root));
      const target=dirname(location.path),actual=await realpath(target),offset=relative(root,actual);
      if(!offset||offset.startsWith('..')||isAbsolute(offset)||actual!==resolve(target)||basename(actual)!==encodedId(id))throw Error('会话存储路径校验失败');
      if((await lstat(target)).isSymbolicLink())throw Error('拒绝删除链接目录');
      const wasArchived=ctx.workspaceRegistry.archivedSessionIds.includes(id);
      await ctx.workspaceRegistry.archiveSession(id,{stopActivity:true});archived=!wasArchived;
      // Archive admission cancels turns/jobs/schedules; the exact owner handle
      // drains pending writes and releases the live session's storage lease.
      await ctx.parallel('workspace/session-stop',{sessionId:id});
      const handleOwner=handles.get(id);
      if(handleOwner){await handleOwner.dispose();handles.delete(id);}
      if(ctx.sessions.get(id))throw Error('无法释放此会话的运行时占用，请重启 Harness 后重试');
      const handle=await persistence.open(id,'write');await handle.close();
      if(ctx.sessions.get(id))throw Error('会话已被打开，删除已取消');
      const tomb=resolve(dirname(actual),`.codsh-delete-${randomUUID()}`);
      const tombOffset=relative(root,tomb);if(!tombOffset||tombOffset.startsWith('..')||isAbsolute(tombOffset))throw Error('删除路径校验失败');
      await rename(actual,tomb);
      await rm(tomb,{recursive:true,force:false});
      await ctx.workspaceRegistry.unarchiveSession(id);
      ctx.emit('api-session/removed',id);
      return {deleted:true,sessionId:id};
    }catch(error){if(archived)await ctx.workspaceRegistry.unarchiveSession(id).catch(()=>{});throw error;}
    finally{deleting.delete(id);}
  }};
  service.deleteProject=async request=>{
    if(typeof request?.workspaceId!=='string'||!request.workspaceId||request.confirm!==true)throw Error('需要明确确认永久删除项目及全部会话');
    const project=ctx.workspaceRegistry.get(request.workspaceId);if(!project)throw Error('项目不存在');
    const rows=await ctx.sessionPersistence.list(),ids=new Set(project.sessionIds);
    for(const row of rows)if(row.header.cwd&&resolve(row.header.cwd)===resolve(project.path))ids.add(row.header.id);
    let expanded=true;while(expanded){expanded=false;for(const row of rows)if(ids.has(row.header.parentId)&&!ids.has(row.header.id)){ids.add(row.header.id);expanded=true;}}
    const ordered=[],pending=new Set(ids);
    while(pending.size){const leaves=[...pending].filter(id=>!rows.some(row=>row.header.parentId===id&&pending.has(row.header.id)));if(!leaves.length)throw Error('会话关系异常，无法删除项目');for(const id of leaves){ordered.push(id);pending.delete(id);}}
    let count=0;
    try{for(const id of ordered)if(await ctx.sessionPersistence.stat(id)){await service.deleteSession({sessionId:id,confirm:true});count++;}
      await ctx.workspaceRegistry.delete(request.workspaceId);
    }catch(error){throw Error(`已永久删除 ${count} 个会话，项目删除未完成：${error.message}。可重试删除剩余会话。`);}
    return {deleted:true,workspaceId:request.workspaceId};
  };
  service.typertRemote=Object.freeze({service,serviceKey:'codshActions',namespace:'codshActions'});
  ctx.provide('codshActions',service);
  ctx.typert.register({package:contribution.package,face:'host',schemas:[],model:{services:[],events:[],objects:[]},invocations:contribution.descriptors});
}
