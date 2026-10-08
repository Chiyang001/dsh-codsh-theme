const requestCodec={mode:'strict',typeSymbol:'CodshDeleteSessionRequest',create:()=>({parse(value){
  if(!value||typeof value!=='object'||Array.isArray(value)||typeof value.sessionId!=='string'||!value.sessionId.trim()||value.confirm!==true||Object.keys(value).some(key=>!['sessionId','confirm'].includes(key)))throw Error('永久删除请求必须包含 sessionId 和 confirm: true');
  return {sessionId:value.sessionId,confirm:true};
}})};
const resultCodec={mode:'strict',typeSymbol:'CodshDeleteSessionResult',create:()=>({parse(value){
  if(!value||value.deleted!==true||typeof value.sessionId!=='string'||!value.sessionId)throw Error('删除接口返回了无效结果');
  return {deleted:true,sessionId:value.sessionId};
}})};
export const contribution={package:'dsh-codsh-theme',descriptors:[{
  id:'dsh-codsh-theme#deleteSession',service:'codshActions',namespace:'codshActions',method:'deleteSession',
  invocation:{kind:'direct'},parameters:[{name:'request',wire:'request',source:'json',codec:requestCodec}],result:resultCodec,
},{
  id:'dsh-codsh-theme#deleteProject',service:'codshActions',namespace:'codshActions',method:'deleteProject',invocation:{kind:'direct'},
  parameters:[{name:'request',wire:'request',source:'json',codec:{mode:'strict',typeSymbol:'CodshDeleteProjectRequest',create:()=>({parse(value){
    if(!value||typeof value.workspaceId!=='string'||!value.workspaceId.trim()||value.confirm!==true||Object.keys(value).some(key=>!['workspaceId','confirm'].includes(key)))throw Error('需要 workspaceId 和 confirm: true');return {workspaceId:value.workspaceId,confirm:true};
  }})}}],result:{mode:'strict',typeSymbol:'CodshDeleteProjectResult',create:()=>({parse(value){if(!value||value.deleted!==true||typeof value.workspaceId!=='string')throw Error('项目删除结果无效');return {deleted:true,workspaceId:value.workspaceId};}})},
}]};
