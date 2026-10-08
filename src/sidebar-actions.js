// Host mutations use public RPC/services; project pins are appearance preferences.
function createSidebarActions(ctx,mark,onChange,deleteSession,deleteProject) {
  const buttons=new Map();let menu,dialog;
  let projectPins=[];
  try{projectPins=JSON.parse(localStorage.getItem('codsh.project-pins')||'[]').filter(id=>typeof id==='string');}catch{}
  const icon=name=>{
    const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('aria-hidden','true');
    const path=document.createElementNS(svg.namespaceURI,'path');path.setAttribute('d',({pin:'m15 3 6 6-4 1-3 5-5-5 5-3z M9 15l-6 6',rename:'m4 16 12-12 4 4L8 20H4z M13 7l4 4',folder:'M3 6h6l2 2h10v12H3z',delete:'M4 7h16 M9 7V4h6v3 M6 7l1 14h10l1-14 M10 11v6 M14 11v6'})[name]);
    if(name==='archive')path.setAttribute('d','M3 4h18v4H3z M5 8v12h14V8 M9 12h6');
    path.setAttribute('fill','none');path.setAttribute('stroke','currentColor');path.setAttribute('stroke-width','1.5');path.setAttribute('stroke-linecap','round');path.setAttribute('stroke-linejoin','round');svg.append(path);return svg;
  };
  async function togglePin(row){
    const workspace=row.dataset.rowKey?.startsWith('workspace:');const id=workspace?row.dataset.rowKey.slice(10):row.dataset.sessionId||row.dataset.rowKey?.slice(8);
    const pinned=workspace?projectPins.includes(id):(ctx.workspaces.list.getSnapshot().pinnedSessionIds||[]).includes(id);
    if(workspace){const next=projectPins.filter(key=>key!==id);if(!pinned)next.unshift(id);localStorage.setItem('codsh.project-pins',JSON.stringify(next));projectPins=next;}
    else await (pinned?ctx.workspaces.unpinSession(id):ctx.workspaces.pinSession(id));
    onChange();
  }
  const closeMenu=()=>{menu?.remove();menu=undefined;};
  const outside=event=>{if(menu&&!menu.contains(event.target))closeMenu();};
  const keyboard=event=>{if(event.key==='Escape'){closeMenu();dialog?.remove();dialog=undefined;}};
  document.addEventListener('pointerdown',outside);document.addEventListener('keydown',keyboard);
  const checked=async result=>{const value=await result;if(value?.ok===false)throw Error(value.error?.message||'操作失败');return value;};
  function form(title,value,description,submit,confirmLabel='保存') {
    dialog?.remove();dialog=document.createElement('div');dialog.className='codsh-action-mask';
    const card=document.createElement('form');card.className='codsh-action-dialog';card.setAttribute('role','dialog');card.setAttribute('aria-modal','true');card.setAttribute('aria-label',title);
    const heading=document.createElement('h2');heading.textContent=title;
    const detail=document.createElement('p');detail.textContent=description;
    const input=document.createElement('input');input.value=value||'';input.setAttribute('aria-label','名称');input.required=true;
    const error=document.createElement('p');error.className='codsh-action-error';error.setAttribute('role','alert');
    const footer=document.createElement('div');const cancel=document.createElement('button');cancel.type='button';cancel.textContent='取消';
    const save=document.createElement('button');save.type='submit';save.textContent=confirmLabel;
    const owner=dialog;cancel.onclick=()=>{owner.remove();if(dialog===owner)dialog=undefined;};
    footer.append(cancel,save);card.append(heading,detail);if(value!==null)card.append(input);card.append(error,footer);owner.append(card);document.body.append(owner);
    if(value===null)save.focus();else{input.focus();input.select();}
    card.addEventListener('submit',async event=>{
      event.preventDefault();const name=input.value.trim();if(value!==null&&!name){error.textContent='名称不能为空';return;}
      save.disabled=true;cancel.disabled=true;
      try{await submit(name);owner.remove();if(dialog===owner)dialog=undefined;onChange();}
      catch(reason){error.textContent=reason.message||String(reason);save.disabled=false;cancel.disabled=false;}
    });
  }
  function open(row,event) {
    event?.preventDefault();event?.stopPropagation();closeMenu();
    const workspace=row.dataset.rowKey?.startsWith('workspace:');
    const id=workspace?row.dataset.rowKey.slice(10):row.dataset.sessionId||row.dataset.rowKey?.slice(8);
    if(!id)return;
    const snapshot=ctx.workspaces.list.getSnapshot();
    const project=(snapshot.items||[]).find(item=>item.workspaceId===id);
    const session=ctx.sessions.list.getSnapshot().byId[id];
    if(workspace&&!project||!workspace&&!session)return;
    const title=workspace?project.title:session.title||session.displayTitle||'未命名会话';
    const pinned=workspace?projectPins.includes(id):(snapshot.pinnedSessionIds||[]).includes(id);
    menu=document.createElement('div');menu.className='codsh-actions-menu';menu.setAttribute('role','menu');
    const actions=[
      ['重命名',()=>form(workspace?'重命名项目':'重命名会话',title,'',name=>workspace?ctx.workspaces.rename(id,name):checked(ctx.remote.session.rename({sessionId:id,title:name})))],
      [pinned?'取消置顶':'置顶',()=>togglePin(row)],
    ];
    if(workspace){
      actions.push(['永久删除项目',()=>form('永久删除项目及全部会话',null,`确定永久删除项目“${title}”及其全部会话（包括归档和子会话）？此操作无法恢复，正在执行的任务会停止。项目文件夹和代码文件会保留。`,async()=>{await deleteProject(id);projectPins=projectPins.filter(key=>key!==id);localStorage.setItem('codsh.project-pins',JSON.stringify(projectPins));},'停止并永久删除')]);
      actions.push(['在资源管理器中打开',()=>project.path?checked(ctx.remote.session.openWorkspacePath({path:project.path})):Promise.reject(Error('此项目没有文件夹路径'))]);
    }else{
      const archived=(snapshot.archivedSessionIds||[]).includes(id);
      actions.push([archived?'取消归档':'归档会话',()=>archived?ctx.uiWorkspace.unarchiveSession(id):ctx.uiWorkspace.archiveSession(id,{stopActivity:true})]);
      actions.push(['永久删除会话',()=>form('永久删除会话',null,`永久删除“${title}”的会话记录，无法恢复。正在执行的任务会停止，不会删除项目文件。`,()=>deleteSession(id),'停止并永久删除')]);
    }
    for(const [label,action] of actions){const button=document.createElement('button');button.type='button';button.setAttribute('role','menuitem');button.append(icon(label.includes('置顶')?'pin':label==='重命名'?'rename':label.includes('归档')?'archive':label.includes('资源管理器')?'folder':'delete'),document.createTextNode(label));
      button.onclick=async()=>{closeMenu();try{await action();}catch(reason){form('操作失败',null,reason.message||String(reason),async()=>{},'关闭');}};menu.append(button);}
    const rect=row.getBoundingClientRect();menu.style.left=`${Math.max(8,Math.min(event?.clientX||rect.right,window.innerWidth-240))}px`;menu.style.top=`${Math.max(8,Math.min(event?.clientY||rect.bottom,window.innerHeight-actions.length*36-16))}px`;
    document.body.append(menu);menu.firstElementChild.focus();
  }
  const context=event=>{const row=event.target.closest?.('.codsh-session,[data-row-key^="session:"],[data-row-key^="workspace:"]');if(row?.closest('[data-codsh-sidebar]')&&!row.closest('.codsh-sidebar-exit'))open(row,event);};
  document.addEventListener('contextmenu',context,true);
  function refresh() {
    for(const [row,controls] of buttons)if(!row.isConnected){controls.button.remove();controls.pin.remove();buttons.delete(row);}
    document.querySelectorAll('[data-codsh-sidebar] [data-row-key^="workspace:"],[data-codsh-sidebar] [data-row-key^="session:"],[data-codsh-sidebar] .codsh-session').forEach(row=>{
      if(row.closest('.codsh-sidebar-exit')||row.dataset.rowKey==='workspace:')return;
      mark(row,'data-codsh-actions');
      row.querySelectorAll('button').forEach(native=>{
        if(native.className.startsWith('codsh-'))return;
        if(native.getAttribute('aria-haspopup')==='menu'||/^(工作区|会话).*的操作$|^(Workspace|Session) actions for /.test(native.getAttribute('aria-label')||''))mark(native,'data-codsh-native-more');
        if(row.dataset.rowKey?.startsWith('session:')&&/^(取消)?(置顶|归档)(会话|对话)?$|^(Unpin|Pin|Unarchive|Archive)( session)?$/i.test(native.getAttribute('aria-label')||''))mark(native,'data-codsh-native-more');
      });
      if(!buttons.has(row)){
        const button=document.createElement('button');button.type='button';button.className='codsh-row-menu';button.textContent='⋯';button.setAttribute('aria-label','更多操作');button.setAttribute('aria-haspopup','menu');
        button.addEventListener('click',event=>open(row,event));button.addEventListener('pointerdown',event=>event.stopPropagation());
        const pin=document.createElement('button');pin.type='button';pin.className='codsh-row-pin';pin.append(icon('pin'));
        pin.addEventListener('pointerdown',event=>event.stopPropagation());
        pin.addEventListener('click',async event=>{event.preventDefault();event.stopPropagation();pin.disabled=true;try{await togglePin(row);}catch(reason){form('操作失败',null,reason.message||String(reason),async()=>{},'关闭');}finally{pin.disabled=false;}});
        const parent=row.classList.contains('codsh-session')?row.parentElement:row;parent.append(pin,button);buttons.set(row,{button,pin});
      }
      const pinned=row.dataset.rowKey?.startsWith('workspace:')?projectPins.includes(row.dataset.rowKey.slice(10)):(ctx.workspaces.list.getSnapshot().pinnedSessionIds||[]).includes(row.dataset.sessionId||row.dataset.rowKey?.slice(8));
      const pin=buttons.get(row).pin;pin.setAttribute('aria-label',pinned?'取消置顶':'置顶');pin.setAttribute('aria-pressed',String(pinned));pin.title=pinned?'取消置顶':'置顶';
      if(row.dataset.rowKey?.startsWith('workspace:')){
        const pinned=projectPins.includes(row.dataset.rowKey.slice(10));mark(row,'data-codsh-project-pinned',String(pinned));
        const group=row.closest(local('groupSection'));if(group)mark(group,'data-codsh-project-pinned',String(pinned));
      }
    });
  }
  return {refresh,dispose(){closeMenu();dialog?.remove();for(const controls of buttons.values()){controls.button.remove();controls.pin.remove();}buttons.clear();document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',keyboard);document.removeEventListener('contextmenu',context,true);}};
}
