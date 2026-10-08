function createProjectSearch(ctx) {
  const buttons=new Map();let mask,input,list,owner,active=0,results=[];
  const close=()=>{mask?.remove();mask=undefined;owner?.focus();};
  const choose=async row=>{
    try{if(row.kind==='project')await ctx.uiWorkspace.openWorkspace(row.id);else ctx.uiWorkspace.openSession(row.id);close();}
    catch(error){list.textContent=error.message||'无法打开';}
  };
  const highlight=()=>{Array.from(list?.querySelectorAll('button')||[]).forEach((button,index)=>button.classList.toggle('codsh-search-selected',index===active));list?.querySelector('.codsh-search-selected')?.scrollIntoView?.({block:'nearest'});};
  const render=()=>{
    if(!mask)return;
    const projects=ctx.workspaces.list.getSnapshot(),sessions=ctx.sessions.list.getSnapshot();
    const query=input.value.trim().toLocaleLowerCase(),archived=new Set(projects.archivedSessionIds||[]);
    results=[...(projects.items||[]).map(project=>({kind:'project',id:project.workspaceId,title:project.title,detail:'项目'})),
      ...(sessions.ids||[]).map(id=>sessions.byId[id]).filter(row=>row&&!row.blank&&!row.parentId&&row.origin!=='subagent'&&!archived.has(row.id)).sort((a,b)=>b.updatedAt-a.updatedAt).map(row=>({kind:'session',id:row.id,title:row.title||row.displayTitle||'未命名会话',detail:(projects.items||[]).find(project=>project.sessionIds?.includes(row.id))?.title||'会话'}))
    ].filter(row=>row.title.toLocaleLowerCase().includes(query));
    active=0;list.replaceChildren();
    for(const row of results){const button=document.createElement('button');button.type='button';const title=document.createElement('span');title.textContent=row.title;const detail=document.createElement('small');detail.textContent=row.detail;button.append(title,detail);button.onclick=()=>choose(row);list.append(button);}
    if(!results.length){const empty=document.createElement('p');empty.textContent=query?'没有匹配的项目或会话':'暂无项目或会话';list.append(empty);}
    highlight();
  };
  const show=button=>{
    close();owner=button;mask=document.createElement('div');mask.className='codsh-search-mask';
    const card=document.createElement('section');card.className='codsh-search-card';card.setAttribute('role','dialog');card.setAttribute('aria-modal','true');card.setAttribute('aria-label','搜索项目或会话');
    input=document.createElement('input');input.type='search';input.placeholder='搜索项目或会话';input.setAttribute('aria-label','搜索项目或会话');
    list=document.createElement('div');list.className='codsh-search-results';card.append(input,list);mask.append(card);document.body.append(mask);
    input.oninput=render;mask.onmousedown=event=>{if(event.target===mask)close();};
    card.onkeydown=event=>{
      if(event.key==='Escape'){event.preventDefault();event.stopPropagation();close();}
      else if(event.key==='ArrowDown'||event.key==='ArrowUp'){event.preventDefault();active=results.length?(active+(event.key==='ArrowDown'?1:-1)+results.length)%results.length:0;highlight();}
      else if(event.key==='Enter'&&event.target===input&&results[active]){event.preventDefault();choose(results[active]);}
      else if(event.key==='Tab'){const controls=[input,...list.querySelectorAll('button')];const index=controls.indexOf(document.activeElement);if(event.shiftKey&&index===0){event.preventDefault();controls.at(-1).focus();}else if(!event.shiftKey&&index===controls.length-1){event.preventDefault();input.focus();}}
    };render();input.focus();
  };
  return {attach(row){let button=buttons.get(row);if(!button){button=document.createElement('button');button.type='button';button.className='codsh-search-button';button.title='搜索项目或会话';button.setAttribute('aria-label','搜索项目或会话');button.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg>';button.onclick=()=>show(button);buttons.set(row,button);}if(button.parentElement!==row)row.append(button);},refresh(){for(const [row,button] of buttons)if(!row.isConnected){button.remove();buttons.delete(row);}render();},dispose(){close();for(const button of buttons.values())button.remove();buttons.clear();}};
}
