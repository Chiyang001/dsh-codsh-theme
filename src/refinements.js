// Add presentation controls while delegating every data mutation to Harness.
function createRefinements(mark) {
  const effortLabel = label => ({off:'关闭',low:'低',high:'高',max:'最高'}[String(label).toLowerCase()] || label);
  const modelViews = new Map();
  const effortViews = new Map();
  const settingsViews = new Map();
  const conversationTabs = new Map();
  const layoutExits=new Set();
  let resizeTimer;
  function alignConversationTabs(){
    document.querySelectorAll('[data-conversation-tabs]').forEach(tabs=>{
      const root=tabs.closest(local('root'))||tabs.parentElement;
      const title=root?.querySelector(local('crumb'))||root?.querySelector(local('crumbCurrent'))||root?.querySelector(local('crumbs'))||root?.querySelector(local('titleRow'));
      if(!title)return;
      const titleRect=title.getBoundingClientRect(),tabRect=tabs.getBoundingClientRect();
      if(!titleRect.width||!tabRect.width)return;
      const titleStyle=getComputedStyle(title);
      const textLeft=titleRect.left+(parseFloat(titleStyle.paddingLeft)||0)+(parseFloat(titleStyle.borderLeftWidth)||0);
      const delta=textLeft-tabRect.left;if(Math.abs(delta)<.5)return;
      const style=document.createElement('div').style;style.cssText=tabs.getAttribute('style')||'';
      style.setProperty('margin-left',((parseFloat(getComputedStyle(tabs).marginLeft)||0)+delta)+'px','important');
      mark(tabs,'style',style.cssText);
    });
  }
  const resizing=()=>{
    document.querySelectorAll(local('frame')).forEach(frame=>mark(frame,'data-codsh-resizing'));
    alignConversationTabs();
    clearTimeout(resizeTimer);
    resizeTimer=setTimeout(()=>document.querySelectorAll('[data-codsh-resizing]').forEach(frame=>frame.removeAttribute('data-codsh-resizing')),180);
  };
  const sidebarToggle=event=>{
    const toggle=event.target.closest?.(local('toggle'));
    const frame=toggle?.closest(local('frame'));
    if(frame?.hasAttribute('data-codsh-sidebar-overlay'))return;
    const sidebar=frame?.querySelector('[data-codsh-sidebar]');
    if(!sidebar||frame.hasAttribute('data-sidebar-collapsed')||window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)return;
    for(const entry of layoutExits){entry.animation?.cancel();entry.node.remove();}layoutExits.clear();
    const rect=sidebar.getBoundingClientRect();if(!rect.width||!rect.height)return;
    // React removes the expanded contents immediately. Keep a noninteractive
    // visual snapshot until the narrowing grid has finished clipping them.
    const node=document.createElement('div');node.className='codsh-sidebar-exit';node.inert=true;node.setAttribute('aria-hidden','true');
    Object.assign(node.style,{left:`${rect.left}px`,top:`${rect.top}px`,width:`${rect.width}px`,height:`${rect.height}px`});
    const copy=sidebar.cloneNode(true);copy.style.height='100%';copy.style.minWidth=`${rect.width}px`;
    // Fixed controls acquire the snapshot's paint containment as their new
    // containing block. Do not clone the titlebar toggle or stationary rail.
    copy.querySelectorAll(`${local('toggle')},.codsh-rail-tools,${local('panelList')},${local('footArea')}`).forEach(control=>control.remove());
    copy.querySelectorAll('[id]').forEach(element=>element.removeAttribute('id'));copy.removeAttribute('id');
    node.append(copy);document.body.append(node);
    const entry={node};layoutExits.add(entry);
    if(node.animate){
      entry.animation=node.animate([{clipPath:'inset(0 0 0 52px)',opacity:1},{clipPath:'inset(0 calc(100% - 52px) 0 52px)',opacity:0}],{duration:240,easing:'cubic-bezier(.22,1,.36,1)'});
      entry.animation.onfinish=()=>{node.remove();layoutExits.delete(entry);};
    }else{node.remove();layoutExits.delete(entry);}
  };
  window.addEventListener('resize',resizing);
  document.addEventListener('click',sidebarToggle,true);
  const closeEffort = (view,closeNative=true) => {
    view.open=false;view.closed=true;view.pending=false;view.commitIndex=undefined;
    view.control?.panel.remove();view.control=undefined;
    if(view.menu?.isConnected)view.menu.removeAttribute('data-codsh-effort-bridge');
    view.menu=undefined;
    view.button.setAttribute('aria-expanded','false');
    if(closeNative&&view.trigger?.isConnected&&view.trigger.getAttribute('aria-expanded')==='true')view.trigger.click();
  };
  const outside = event => {
    for(const view of modelViews.values())if(view.open&&!view.button.contains(event.target)&&!view.control?.panel.contains(event.target))closeEffort(view);
  };
  const escape = event => {if(event.key==='Escape')for(const view of modelViews.values())if(view.open){closeEffort(view);view.button.focus();}};
  document.addEventListener('pointerdown',outside);
  document.addEventListener('keydown',escape);
  const text = (node,value) => { if (node.textContent !== value) node.textContent = value; };
  const chevron = () => {
    const icon = document.createElementNS('http://www.w3.org/2000/svg','svg');
    icon.setAttribute('viewBox','0 0 16 16'); icon.setAttribute('aria-hidden','true');
    const path = document.createElementNS(icon.namespaceURI,'path');
    path.setAttribute('d','m6 4 4 4-4 4'); path.setAttribute('fill','none');
    path.setAttribute('stroke','currentColor'); path.setAttribute('stroke-width','1.5');
    icon.append(path); return icon;
  };
  function refresh() {
    document.querySelectorAll(local('tabs')).forEach(tabs=>{
      const labels=Array.from(tabs.querySelectorAll('button')).map(button=>button.textContent.trim());
      if(labels.some(label=>/^(对话|Chat|Conversation)$/i.test(label))&&labels.some(label=>/^(轨迹|Trajectory)$/i.test(label)))mark(tabs,'data-conversation-tabs');
    });
    for(const [tabs,state] of conversationTabs)if(!tabs.isConnected){state.animation?.cancel();conversationTabs.delete(tabs);}
    alignConversationTabs();
    document.querySelectorAll('[data-conversation-tabs]').forEach(tabs=>{
      const buttons=Array.from(tabs.querySelectorAll(':scope>button'));
      const index=buttons.findIndex(button=>button.getAttribute('aria-selected')==='true');
      const previous=conversationTabs.get(tabs);
      if(previous?.index===index)return;
      previous?.animation?.cancel();
      const state={index};conversationTabs.set(tabs,state);
      const area=tabs.closest(local('root'))?.querySelector(local('viewArea'));
      if(previous&&index>=0&&area?.animate&&!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches){
        state.animation=area.animate([{opacity:.6,transform:`translateX(${index>previous.index?6:-6}px)`},{opacity:1,transform:'translateX(0)'}],{duration:220,easing:'cubic-bezier(.22,1,.36,1)'});
      }
    });
    // Do not retain React nodes from closed menus or previous sessions.
    for (const [trigger,view] of modelViews) if (!trigger.isConnected) { closeEffort(view);view.button.remove(); modelViews.delete(trigger); }
    for (const [menu] of effortViews) if (!menu.isConnected) effortViews.delete(menu);
    for (const [panel,view] of settingsViews) if (!panel.isConnected) {view.search.remove();view.back.remove();settingsViews.delete(panel);}
    document.querySelectorAll('[data-shortcut-modal="settings"]').forEach(panel=>{
      const nav=panel.querySelector(local('nav'));if(!nav)return;
      let view=settingsViews.get(panel);
      if(!view) {
        const search=document.createElement('input');search.type='search';search.className='codsh-settings-search';
        search.placeholder='搜索';search.setAttribute('aria-label','搜索设置导航和当前页面');
        const back=document.createElement('button');back.type='button';back.className='codsh-settings-back';back.textContent='‹ 返回聊天';
        back.addEventListener('click',()=>panel.querySelector(local('close'))?.click());
        const title=nav.querySelector(local('navTitle'));title?.after(search);nav.append(back);
        view={search,back};settingsViews.set(panel,view);
        search.addEventListener('input',refresh);
      }
      if(view.search.parentElement!==nav)nav.querySelector(local('navTitle'))?.after(view.search);
      if(view.back.parentElement!==nav)nav.append(view.back);
      const query=view.search.value.trim().toLocaleLowerCase();
      panel.querySelectorAll(`${local('navCell')},[data-slot="settings.general.item"]`).forEach(row=>{
        if(query&&!row.textContent.toLocaleLowerCase().includes(query))mark(row,'data-codsh-settings-filtered');
        else row.removeAttribute('data-codsh-settings-filtered');
      });
    });
    document.querySelectorAll('[data-codsh-model-trigger]').forEach(trigger => {
      const effort = trigger.querySelector(local('triggerEffort'));
      let view = modelViews.get(trigger);
      if (!effort) { if (view) { view.button.remove();modelViews.delete(trigger); } return; }
      if (!view) {
        const button = document.createElement('button'); button.type = 'button';
        button.className = 'codsh-reasoning-trigger'; button.setAttribute('aria-haspopup','menu');
        const caption = document.createElement('span');button.append(caption,chevron());
        view = {button,caption,trigger,pending:false,open:false};
        button.addEventListener('click',() => {
          if(view.open){closeEffort(view);return;}
          view.open=true;view.closed=false;
          view.pending = true;
          if (trigger.getAttribute('aria-expanded') !== 'true') trigger.click();
          refresh();
        });
        trigger.parentElement.append(button); modelViews.set(trigger,view);
      }
      mark(trigger,'data-codsh-split-model');
      const targetOption=view.control?.targetIndex!==undefined?view.options?.[view.control.targetIndex]:null;
      const targetLabel=targetOption?(targetOption.querySelector(local('modelName'))?.textContent.trim()||targetOption.textContent.trim()):null;
      text(view.caption,effortLabel(targetLabel||effort.textContent.trim()));
      if(view.button.disabled !== trigger.disabled)view.button.disabled = trigger.disabled;
      view.button.setAttribute('aria-label',`调整思考强度：${effortLabel(effort.textContent.trim())}`);
      const id = trigger.getAttribute('aria-controls');
      const menu = id ? document.getElementById(id) : null;
      const existing=view.control;
      if(existing?.targetIndex!==undefined){
        if(trigger.disabled)existing.sawPending=true;
        if(!menu&&effort.textContent.trim()===targetLabel&&!trigger.disabled){
          const actual=(view.options||[]).findIndex(option=>(option.querySelector(local('modelName'))?.textContent.trim()||option.textContent.trim())===effort.textContent.trim());
          existing.targetIndex=undefined;existing.sawPending=false;
          if(actual>=0){existing.range.value=String(actual);existing.preview();}
        }
      }
      // Hide every bridge pane before drilling, including the intermediate
      // Model/Effort root recreated by native selection completion.
      if(menu&&view.open)mark(menu,'data-codsh-effort-bridge');
      if(!menu&&view.control&&view.control.range.disabled!==trigger.disabled)view.control.range.disabled=trigger.disabled;
      const nativeOptions = menu ? Array.from(menu.querySelectorAll('button[role="menuitemradio"]')) : [];
      // Models live under a groups container. Effort rows are direct children.
      const isEffort = nativeOptions.length > 0 && nativeOptions.every(option => option.parentElement === menu);
      const expanded = view.open;
      if (view.button.getAttribute('aria-expanded') !== String(expanded)) view.button.setAttribute('aria-expanded',String(expanded));
      if (menu && view.pending) {
        const cells = menu.querySelectorAll(local('cell'));
        if (cells.length > 1) { view.pending = false; cells[1].click();return; }
        if (isEffort) view.pending = false;
      }
      if(menu&&!view.open){
        const cells=menu.querySelectorAll(local('cell'));
        if(cells.length){mark(menu,'data-codsh-model-root');cells[0].click();return;}
      }
      if(menu&&!menu.querySelector(local('cell')))menu.removeAttribute('data-codsh-model-root');
      if (!isEffort || view.closed) return;
      mark(menu,'data-codsh-effort-menu');
      // Keep our control in the native trigger root. Native selections may
      // close their portal; this persistent panel survives that lifecycle.
      if(!view.open)view.open=true;
      view.menu=menu;view.options=nativeOptions;
      mark(menu,'data-codsh-effort-bridge');
      let control = view.control;
      if (!control) {
        const panel = document.createElement('div');panel.className = 'codsh-effort-control';
        const title = document.createElement('strong');title.className = 'codsh-effort-title';
        const track = document.createElement('div');track.className = 'codsh-effort-track';
        const fill = document.createElement('div');fill.className = 'codsh-effort-fill';
        const sparks = document.createElement('div');sparks.className = 'codsh-effort-sparks';sparks.setAttribute('aria-hidden','true');
        for(let i=0;i<28;i++) { const spark=document.createElement('i');spark.style.setProperty('--i',String(i));spark.style.setProperty('--arc',((i%2?1:-1)*(4+(i%5)*2))+'px');spark.style.setProperty('--duration',(1.25+(i%4)*.18)+'s');spark.style.setProperty('--dot-size',(2+(i%3)*.6)+'px');sparks.append(spark); }
        const thumb=document.createElement('div');thumb.className='codsh-effort-thumb';
        const range = document.createElement('input');range.type = 'range';range.min = '0';range.step = '0.01';
        range.setAttribute('aria-label','思考强度');
        const ticks = document.createElement('div');ticks.className = 'codsh-effort-ticks';
        fill.append(sparks);track.append(fill,thumb,range);panel.append(title,track,ticks);
        panel.setAttribute('role','dialog');panel.setAttribute('aria-label','调整思考强度');
        const rect=view.button.getBoundingClientRect();
        panel.style.left=`${Math.max(8,Math.min(rect.right-280,window.innerWidth-288))}px`;
        panel.style.bottom=`${Math.max(8,window.innerHeight-rect.top+8)}px`;
        trigger.parentElement.append(panel);
        if(typeof window.requestAnimationFrame==='function'&&!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches){
          let epoch;
          const particles=Array.from(sparks.children);
          const paintJet=time=>{
            if(!panel.isConnected)return;
            epoch??=time;
            const fillBox=fill.getBoundingClientRect(),thumbBox=thumb.getBoundingClientRect();
            particles.forEach((dot,i)=>{
              const duration=1050+(i%5)*90;
              const phase=((time-epoch)/duration+i/particles.length)%1;
              const travel=phase*phase;
              const radius=(thumbBox.width||32)/2;
              const originY=Math.sin(i*2.399963)*Math.min(radius-2,fillBox.height*.4);
              const nozzle=Math.max(0,thumbBox.left-fillBox.left+radius-Math.sqrt(radius*radius-originY*originY)-2);
              const arc=(i%2?1:-1)*(3+(i%6)*1.4);
              dot.style.top=(fillBox.height/2+originY+arc*travel)+'px';
              dot.style.transform='translate('+((1-travel)*nozzle)+'px,-50%)';
              dot.style.opacity=String(phase<.8?.9:.9*(1-phase)/.2);
            });
            window.requestAnimationFrame(paintJet);
          };
          window.requestAnimationFrame(paintJet);
        }
        control = {panel,title,track,range,ticks,signature:null};view.control=control;effortViews.set(menu,control);
        const commit=index=>{
          const option=view.options?.[index];if(!option||trigger.disabled||(option.isConnected&&option.disabled))return;
          range.value=String(index);preview();
          control.targetIndex=index;
          if(option.isConnected){option.click();}
          else {view.commitIndex=index;view.pending=true;if(trigger.getAttribute('aria-expanded')!=='true')trigger.click();refresh();}
        };
        // Pointer dragging previews locally. Commit once on release or keyboard
        // change, rather than sending a request on every pixel of travel.
        const preview = () => {
          const options=view.options || [];
          const position=Number(range.value),index=Math.round(position),option=options[index];if(!option)return;
          const label=option.querySelector(local('modelName'))?.textContent.trim() || option.textContent.trim();
          text(title,effortLabel(label));range.setAttribute('aria-valuetext',effortLabel(label));
          const ratio=options.length>1?position/(options.length-1):0;
          track.style.setProperty('--progress',`${ratio*100}%`);
          track.style.setProperty('--ratio',String(ratio));
          panel.classList.toggle('codsh-effort-max',/\b(max|ultra)\b/i.test(label));
          panel.classList.toggle('codsh-effort-ultra',/\bultra\b/i.test(label));
        };
        control.preview=preview;
        range.addEventListener('input',preview);
        range.addEventListener('keydown',event => {
          if(event.key==='Escape')return;
          event.stopPropagation();
          const keys={ArrowRight:1,ArrowUp:1,ArrowLeft:-1,ArrowDown:-1};
          if(event.key in keys||event.key==='Home'||event.key==='End'){
            event.preventDefault();
            const last=(view.options?.length||1)-1;
            const index=event.key==='Home'?0:event.key==='End'?last:Math.max(0,Math.min(last,Math.round(Number(range.value))+keys[event.key]));
            commit(index);
          }
        });
        range.addEventListener('change',() => {
          commit(Math.round(Number(range.value)));
        });
        control.commit=commit;
        range.focus();
      }
      const labels=nativeOptions.map(option => option.querySelector(local('modelName'))?.textContent.trim() || option.textContent.trim());
      const selected=Math.max(0,nativeOptions.findIndex(option=>option.getAttribute('aria-checked')==='true'));
      control.range.max=String(labels.length-1);
      const locked=nativeOptions.some(option=>option.disabled);
      if(locked&&control.targetIndex!==undefined)control.sawPending=true;
      if(control.range.disabled!==locked)control.range.disabled=locked;
      const signature=JSON.stringify(labels);
      if(control.signature!==signature) {
        control.signature=signature;
        control.ticks.replaceChildren(...labels.map((label,index)=>{
          const button=document.createElement('button');button.type='button';button.textContent=effortLabel(label);
          button.addEventListener('click',()=>control.commit(index));
          return button;
        }));
      }
      const confirmed=labels.indexOf(effort.textContent.trim());
      if(control.targetIndex===confirmed&&!locked)control.targetIndex=undefined;
      if(!control.initialized || (control.targetIndex===undefined&&document.activeElement!==control.range)) {
        const display=control.initialized&&confirmed>=0?confirmed:selected;
        control.initialized=true;
        control.range.value=String(display);text(control.title,effortLabel(labels[display]));
        control.range.setAttribute('aria-valuetext',effortLabel(labels[display]));
        control.track.style.setProperty('--progress',`${labels.length>1?display/(labels.length-1)*100:0}%`);
        control.track.style.setProperty('--ratio',String(labels.length>1?display/(labels.length-1):0));
        control.panel.classList.toggle('codsh-effort-max',/\b(max|ultra)\b/i.test(labels[display]));
        control.panel.classList.toggle('codsh-effort-ultra',/\bultra\b/i.test(labels[display]));
      }
      if(view.commitIndex!==undefined&&!locked){const index=view.commitIndex;view.commitIndex=undefined;nativeOptions[index]?.click();}
    });
  }
  return {refresh,chevron,dispose(){
    for(const state of conversationTabs.values())state.animation?.cancel();conversationTabs.clear();
    clearTimeout(resizeTimer);window.removeEventListener('resize',resizing);document.removeEventListener('click',sidebarToggle,true);
    for(const entry of layoutExits){entry.animation?.cancel();entry.node.remove();}layoutExits.clear();
    document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',escape);
    for(const view of modelViews.values()){closeEffort(view,false);view.button.remove();}
    for(const view of effortViews.values())view.panel.remove();
    for(const view of settingsViews.values()){view.search.remove();view.back.remove();}
    modelViews.clear();effortViews.clear();settingsViews.clear();
  }};
}
