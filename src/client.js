const SOURCE = 'dsh-codsh-theme';
const lightPalette = {
  '--dsw-alias-bg-base':'#ffffff', '--dsw-alias-bg-layer-1':'#f7f7f8',
  '--dsw-alias-bg-layer-2':'#f0f0f2', '--dsw-alias-bg-overlay':'#ececef',
  '--dsw-specific-sidebar-fill':'rgba(236,238,242,0.94)', '--dsw-specific-input-major':'#f0f0f2',
  '--dsw-specific-menu':'#ffffff', '--dsw-specific-tip':'#ececef', '--dsw-specific-bubble':'#e3efff',
  '--dsw-alias-brand-primary':'#202124', '--dsw-alias-label-primary':'#202124',
  '--dsw-alias-label-secondary':'#45474d', '--dsw-alias-label-tertiary':'#62656c',
  '--dsw-alias-label-caption':'#70737a', '--dsw-alias-label-dimmed':'#858890',
  '--dsw-alias-label-primary-bluish':'#202124', '--dsw-alias-border-l1':'#e2e3e6',
  '--dsw-alias-border-l2':'#dcdde1', '--dsw-alias-border-l3':'#e8e8eb', '--dsw-alias-border-l4':'#c7c9cf',
  '--dsw-alias-interactive-bg-hover':'#e9eaed', '--dsw-alias-interactive-bg-active':'#dedfe4',
  '--dsw-alias-state-business-primary':'#3478cf', '--dsw-alias-state-business-secondary':'#2867b8',
  '--dsw-alias-state-business-tertiary':'#e3efff', '--dsw-alias-markdown-code-block':'#f5f5f7',
  '--dsw-alias-markdown-code-inline':'#ededf0', '--dsw-alias-button-info-fill':'#3478cf',
  '--dsw-alias-button-info-hover':'#2867b8', '--dsw-alias-tooltip-bg':'#ececef', '--dsw-alias-bg-mask-1':'#00000040',
};
const palette = {
  '--dsw-alias-bg-base':'#181818',
  '--dsw-alias-bg-layer-1':'#242424',
  '--dsw-alias-bg-layer-2':'#303030',
  '--dsw-alias-bg-overlay':'#282828',
  '--dsw-specific-sidebar-fill':'rgba(32,33,39,0.94)',
  '--dsw-specific-input-major':'#303030',
  '--dsw-specific-menu':'#252525',
  '--dsw-specific-tip':'#353535',
  '--dsw-specific-bubble':'#1c4475',
  '--dsw-alias-brand-primary':'#eeeeee',
  '--dsw-alias-label-primary':'#dedede',
  '--dsw-alias-label-secondary':'#cccccc',
  '--dsw-alias-label-tertiary':'#a0a0a0',
  '--dsw-alias-label-caption':'#858585',
  '--dsw-alias-label-dimmed':'#737373',
  '--dsw-alias-label-primary-bluish':'#eeeeee',
  '--dsw-alias-border-l1':'#383838',
  '--dsw-alias-border-l2':'#3c3c3c',
  '--dsw-alias-border-l3':'#302d2e',
  '--dsw-alias-border-l4':'#454545',
  '--dsw-alias-interactive-bg-hover':'#2d2d2d',
  '--dsw-alias-interactive-bg-active':'#383838',
  '--dsw-alias-state-business-primary':'#3478cf',
  '--dsw-alias-state-business-secondary':'#75aaff',
  '--dsw-alias-state-business-tertiary':'#1c4475',
  '--dsw-alias-markdown-code-block':'#222222',
  '--dsw-alias-markdown-code-inline':'#303030',
  '--dsw-alias-button-info-fill':'#3478cf',
  '--dsw-alias-button-info-hover':'#4389df',
  '--dsw-alias-tooltip-bg':'#353535',
  '--dsw-alias-bg-mask-1':'#00000099',
};

// Match semantic CSS-module local names, never release-specific hashes.
const local = name => `[class$="_${name}"], [class*="_${name} "]`;
// Package-level dsh.client.inject fetches the provider bundle; Cordis also
// needs this runtime service declaration before ctx.theme can be accessed.
export const inject = ['theme', 'sessions', 'workspaces', 'uiWorkspace','remote','remote.session'];
export function apply(ctx) {
  ctx.effect(() => {
    const releaseTokens = ctx.theme.overrideTokens(SOURCE,
      Object.fromEntries(Object.entries(palette).map(([key,value]) => [key,{light:lightPalette[key],dark:value}])));
    const style = document.createElement('style');
    style.dataset.codshStyle = '';
    style.textContent = THEME_CSS;
    document.head.append(style);
    const tracked = new Map();
    const owned = new Map();
    const recentViews = new Map();
    let showArchived = false;
    ctx.uiWorkspace.view?.setArchivedFilter?.('default');
    const groupMotion = new Map();
    const heroTitles = new Map();
    const temporaryTitles=new Map();
    const whaleAnimations = new Map();
    const railFrames=new Map();
    let temporarySidebar,temporaryCloseTimer,temporaryAnimation,temporaryClosing=false;
    const closeTemporarySidebar=(immediate=false)=>{
      clearTimeout(temporaryCloseTimer);temporaryCloseTimer=undefined;
      const root=temporarySidebar;if(!root)return;
      if(!immediate&&temporaryAnimation){if(!temporaryClosing){temporaryClosing=true;temporaryAnimation.reverse();}return;}
      temporaryAnimation?.cancel();temporaryAnimation=undefined;temporaryClosing=false;
      const frame=root.closest(local('frame'));
      if(frame?.hasAttribute('data-codsh-sidebar-overlay')){
        if(!frame.hasAttribute('data-sidebar-collapsed'))root.querySelector(local('toggle'))?.click();
        frame.removeAttribute('data-codsh-sidebar-overlay');
      }
      root.removeAttribute('data-codsh-temporary-sidebar');if(temporarySidebar===root)temporarySidebar=undefined;
    };
    const temporaryNavigation=event=>{
      const button=event.target.closest?.('.codsh-rail-button,.codsh-home');
      const root=button?.closest('[data-codsh-sidebar]');
      if(!root?.closest('[data-sidebar-collapsed],[data-codsh-sidebar-overlay]'))return;
      if(temporarySidebar===root){clearTimeout(temporaryCloseTimer);temporaryCloseTimer=undefined;if(temporaryClosing){temporaryClosing=false;temporaryAnimation?.reverse();}return;}
      closeTemporarySidebar(true);temporarySidebar=root;temporaryClosing=false;
      mark(root,'data-codsh-temporary-sidebar');
      const frame=root.closest(local('frame')),toggle=root.querySelector(local('toggle'));
      if(frame&&toggle){mark(frame,'data-codsh-sidebar-overlay');toggle.click();}
      if(root.animate&&!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches){
        temporaryAnimation=root.animate([{clipPath:'inset(0 calc(100% - 52px) 0 0)'},{clipPath:'inset(0 0 0 0)'}],{duration:240,easing:'cubic-bezier(.22,1,.36,1)',fill:'both'});
        temporaryAnimation.onfinish=()=>{if(temporaryClosing)closeTemporarySidebar(true);};
      }
    };
    const temporaryPointer=event=>{
      if(!temporarySidebar)return;
      if(!temporarySidebar.closest('[data-sidebar-collapsed],[data-codsh-sidebar-overlay]')){closeTemporarySidebar();return;}
      if(temporarySidebar.contains(event.target)||event.target.closest?.('.codsh-actions-menu,[role="menu"],.codsh-confirm-mask')){
        if(temporaryClosing){temporaryClosing=false;temporaryAnimation?.reverse();}
        clearTimeout(temporaryCloseTimer);temporaryCloseTimer=undefined;return;
      }
      if(!temporaryCloseTimer&&!temporaryClosing)temporaryCloseTimer=setTimeout(closeTemporarySidebar,160);
    };
    const temporaryEscape=event=>{if(event.key==='Escape')closeTemporarySidebar(true);};
    document.addEventListener('click',temporaryNavigation,true);
    document.addEventListener('pointermove',temporaryPointer);
    document.addEventListener('keydown',temporaryEscape);
    const shakeWhale = event => {
      const whale=event.target.closest?.(local('fishHitbox'));
      if(!whale?.closest('[data-codsh-hero]')||window.matchMedia?.('(prefers-reduced-motion: reduce)').matches||!whale.animate)return;
      whaleAnimations.get(whale)?.cancel();
      const animation=whale.animate([
        {transform:'translateX(0) rotate(0deg)'},
        {transform:'translateX(-2px) rotate(-7deg)'},
        {transform:'translateX(2px) rotate(7deg)'},
        {transform:'translateX(-1px) rotate(-4deg)'},
        {transform:'translateX(1px) rotate(4deg)'},
        {transform:'translateX(0) rotate(0deg)'},
      ],{duration:520,easing:'ease-in-out'});
      whaleAnimations.set(whale,animation);
      animation.onfinish=()=>{if(whaleAnimations.get(whale)===animation)whaleAnimations.delete(whale);};
    };
    document.addEventListener('click',shakeWhale);
    let sidebarMode = 'all';
    const selectSidebar = (mode) => {
      sidebarMode = mode;
      document.querySelectorAll('[data-codsh-sidebar]').forEach(root => {
        mark(root,'data-codsh-view',mode);
        root.querySelectorAll('[data-codsh-navigation]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.codshNavigation===mode)));
      });
    };
    const revealConversation = () => ctx.inject(['layout'],child=>child.layout?.selectPanel(null));
    const mark = (node, key, value = '') => {
      if (!node || node.getAttribute(key) === value) return;
      if (!tracked.has(node)) tracked.set(node, new Map());
      const attributes = tracked.get(node);
      if (!attributes.has(key)) attributes.set(key, node.getAttribute(key));
      node.setAttribute(key, value);
    };
    mark(document.documentElement,'data-codsh-theme');
    const refinements = createRefinements(mark);
    const projectSearch=createProjectSearch(ctx);
    let remoteDisposer,actionsDisposed=false;
    const deleteRemote=ctx.remote.$mount(contribution).then(dispose=>{
      remoteDisposer=dispose;if(actionsDisposed){dispose();throw Error('插件已停用');}
      return new Promise(resolve=>ctx.inject(['remote.codshActions'],child=>resolve(child.remote.codshActions)));
    });
    deleteRemote.catch(()=>{});
    const sidebarActions=createSidebarActions(ctx,mark,()=>refresh(),async id=>{
      const current=ctx.sessions.list.getSnapshot().byId[id]?.retainedBy?.mainView>0;
      const result=await (await deleteRemote).deleteSession({sessionId:id,confirm:true});
      if(!result.ok)throw Error(result.error?.message||'删除失败');
      if(current)ctx.uiWorkspace.startSession();
    },async id=>{
      const result=await (await deleteRemote).deleteProject({workspaceId:id,confirm:true});
      if(!result.ok)throw Error(result.error?.message||'项目删除失败');
      ctx.uiWorkspace.startSession();
    });
    const refresh = () => {
      document.querySelectorAll('[data-codsh-sidebar]').forEach(root=>{
        const panelActive=Array.from(root.querySelectorAll(local('panelRow'))).some(button=>button.getAttribute('aria-current')==='page');
        root.querySelectorAll('[data-codsh-navigation]').forEach(button=>mark(button,'aria-pressed',String(!panelActive&&button.dataset.codshNavigation===sidebarMode)));
      });
      document.querySelectorAll(local('frame')).forEach(frame=>{
        const columns=frame.style.gridTemplateColumns;
        if(!columns)return;
        const expandedWidth=parseFloat(columns);
        if(!frame.hasAttribute('data-sidebar-collapsed')&&expandedWidth>52&&frame.style.getPropertyValue('--codsh-expanded-sidebar-width')!==`${expandedWidth}px`)frame.style.setProperty('--codsh-expanded-sidebar-width',`${expandedWidth}px`);
        if(!railFrames.has(frame))railFrames.set(frame,frame.style.getPropertyValue('--codsh-collapsed-columns'));
        const collapsed=columns.replace(/^\S+\s+/, '52px ');
        if(frame.style.getPropertyValue('--codsh-collapsed-columns')!==collapsed)frame.style.setProperty('--codsh-collapsed-columns',collapsed);
      });
      mark(document.documentElement,'data-codsh-theme');
      // Host theme/module sheets can be mounted again after an appearance change.
      if(!style.isConnected||Array.from(document.head.querySelectorAll('style,link[rel="stylesheet"]')).at(-1)!==style)document.head.append(style);
      for(const [whale,animation] of whaleAnimations)if(!whale.isConnected){animation.cancel();whaleAnimations.delete(whale);}
      for(const [group,title] of heroTitles)if(!group.isConnected){title.remove();heroTitles.delete(group);}
      for(const node of tracked.keys())if(!node.isConnected)tracked.delete(node);
      for(const [root,view] of recentViews)if(!root.isConnected){view.section.remove();view.projectsToggle.remove();view.archiveToggle.remove();recentViews.delete(root);}
      for(const [root,node] of owned)if(!root.isConnected){node.remove();owned.delete(root);}
      for(const [root,node] of owned)if(node.parentElement!==root)root.append(node);
      document.querySelectorAll(local('triggerLabel')).forEach(label => {
        const permissionButton=label.closest('button');
        if(permissionButton&&permissionButton.querySelector(local('triggerIcon'))&&!permissionButton.querySelector(local('triggerEffort'))){
          mark(permissionButton,'data-codsh-full-access',String(/^(完全权限|完全访问|Full access)$/i.test(label.textContent.trim())));
        }
        const trigger = label.closest('button[aria-haspopup="menu"]');
        if (!trigger?.querySelector(local('triggerIcon'))) return;
        mark(trigger,'data-codsh-model-trigger');
        const menuId = trigger.getAttribute('aria-controls');
        if (menuId) mark(document.getElementById(menuId),'data-codsh-model-menu');
      });
      refinements.refresh();
      document.querySelectorAll('[role="menu"] button[role="menuitem"]').forEach(button=>{
        const label=button.querySelector(local('optionLabelText'))||button.querySelector(local('itemLabel'));
        if(label)mark(button,'data-codsh-full-access-option',String(/^(完全权限|完全访问|Full access)$/i.test(label.textContent.trim())));
      });
      document.querySelectorAll('[role="menu"],[role="dialog"],[role="tooltip"]').forEach(node => {
        if (node.closest('[data-codsh-model-menu]')) return;
        mark(node,'data-codsh-surface',node.getAttribute('role'));
      });
      document.querySelectorAll(local('logoRow')).forEach(row => {
        if(row.closest('.codsh-sidebar-exit'))return;
        const root = row.parentElement;
        if (root?.querySelector(local('newSession'))) {
          mark(root,'data-codsh-sidebar');
          if(!temporaryTitles.has(row)){const title=document.createElement('span');title.className='codsh-temporary-brand';title.textContent='DeepSeek';row.prepend(title);temporaryTitles.set(row,title);}
          else if(temporaryTitles.get(row).parentElement!==row)row.prepend(temporaryTitles.get(row));
          projectSearch.attach(row);
          if (!owned.has(root)) {
            const home = document.createElement('button');
            home.type = 'button';
            home.className = 'codsh-home';
            home.title = '新会话';
            home.setAttribute('aria-label','新会话');
            const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
            svg.setAttribute('viewBox','0 0 24 24');
            svg.setAttribute('aria-hidden','true');
            const path = document.createElementNS('http://www.w3.org/2000/svg','path');
            path.setAttribute('d','M4 10.2 10.8 4.5a1.9 1.9 0 0 1 2.4 0l6.8 5.7a2 2 0 0 1 .7 1.5v7.1a1.7 1.7 0 0 1-1.7 1.7h-3.1a.9.9 0 0 1-.9-.9v-4.8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v4.8a.9.9 0 0 1-.9.9H5a1.7 1.7 0 0 1-1.7-1.7v-7.1a2 2 0 0 1 .7-1.5Z');
            path.setAttribute('fill','none');path.setAttribute('stroke','currentColor');path.setAttribute('stroke-width','1.5');path.setAttribute('stroke-linecap','round');path.setAttribute('stroke-linejoin','round');
            svg.append(path);
            home.append(svg);
            home.dataset.codshNavigation='all';
            home.addEventListener('click', () => {revealConversation();selectSidebar('all');root.querySelector(local('newSession'))?.click();});
            const tools=document.createElement('div');tools.className='codsh-rail-tools';
            tools.append(home);
            for(const [label,path,action] of [
              ['最近会话','M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18Z M12 7v5l3 2',()=>{
                revealConversation();selectSidebar('recent');
                const toggle=root.querySelector('.codsh-recent .codsh-section-toggle');if(toggle?.getAttribute('aria-expanded')==='false')toggle.click();
                root.querySelector('.codsh-recent')?.scrollIntoView?.({block:'nearest',behavior:window.matchMedia?.('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
              }],
              ['项目','M3 6h6l2 2h10v12H3z',()=>{
                revealConversation();selectSidebar('projects');
                const toggle=root.querySelector('.codsh-projects-toggle');if(toggle?.getAttribute('aria-expanded')==='false')toggle.click();toggle?.focus();
              }],
            ]) {
              const button=document.createElement('button');button.type='button';button.className='codsh-rail-button';button.title=label;button.setAttribute('aria-label',label);
              if(label==='最近会话'||label==='项目')button.dataset.codshNavigation=label==='项目'?'projects':'recent';
              const icon=document.createElementNS('http://www.w3.org/2000/svg','svg');icon.setAttribute('viewBox','0 0 24 24');icon.setAttribute('aria-hidden','true');
              const stroke=document.createElementNS(icon.namespaceURI,'path');stroke.setAttribute('d',path);stroke.setAttribute('fill','none');stroke.setAttribute('stroke','currentColor');stroke.setAttribute('stroke-width','1.5');stroke.setAttribute('stroke-linecap','round');stroke.setAttribute('stroke-linejoin','round');
              icon.append(stroke);button.append(icon);button.addEventListener('click',action);tools.append(button);
            }
            root.append(tools);
            owned.set(root,tools);
            selectSidebar(sidebarMode);
          }
        }
      });
      document.querySelectorAll('[data-codsh-sidebar]').forEach(sidebar => {
        if(sidebar.closest('.codsh-sidebar-exit'))return;
        sidebar.querySelectorAll(local('footArea')).forEach(footer=>{
          footer.querySelectorAll('button').forEach(button=>{
            const label=button.querySelector(local('label'))?.textContent.trim();
            if(label){mark(button,'title',label);mark(button,'aria-label',label);}
          });
        });
        sidebar.querySelectorAll(local('groupSection')).forEach(group=>{
          const previous=groupMotion.get(group);
          const signature=Array.from(group.querySelectorAll('[data-row-key]'),node=>node.dataset.rowKey).join('|');
          if(previous?.signature===signature)return;
          previous?.animation?.cancel();
          const height=group.getBoundingClientRect().height;
          if(previous&&height!==previous.height&&group.animate&&!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches){
            const animation=group.animate([{height:`${previous.height}px`,overflow:'hidden'},{height:`${height}px`,overflow:'hidden'}],{duration:240,easing:'cubic-bezier(.22,1,.36,1)'});
            groupMotion.set(group,{height,animation,signature});
          }else groupMotion.set(group,{height,signature});
        });
        for(const [group,state] of groupMotion)if(!group.isConnected){state.animation?.cancel();groupMotion.delete(group);}
        const header = sidebar.querySelector(local('sectionHeader'));
        const workspaceRoot = header?.parentElement;
        if (!workspaceRoot) return;
        mark(workspaceRoot,'data-codsh-workspaces');
        mark(workspaceRoot,'data-codsh-no-projects',String((ctx.workspaces.list.getSnapshot().items||[]).length===0));
        mark(header.querySelector(local('sectionLabel')),'data-codsh-projects');
        header.querySelectorAll('button[aria-label="视图选项"],button[aria-label="View options"]').forEach(button=>mark(button,'data-codsh-native-view-options'));
        let view = recentViews.get(workspaceRoot);
        if(view){if(view.projectsToggle.parentElement!==header)header.prepend(view.projectsToggle);if(view.archiveToggle.parentElement!==header)header.append(view.archiveToggle);if(view.section.parentElement!==workspaceRoot)workspaceRoot.append(view.section);}
        if (!view) {
          const section = document.createElement('section');
          section.className = 'codsh-recent';
          section.setAttribute('aria-label','最近会话');
          const heading = document.createElement('h2');
          const toggle = document.createElement('button');toggle.type='button';toggle.className='codsh-section-toggle';
          toggle.append(refinements.chevron(),document.createTextNode('最近会话'));toggle.setAttribute('aria-expanded','true');
          heading.append(toggle);
          const list = document.createElement('div');
          list.className = 'codsh-recent-list';
          const inner = document.createElement('div');inner.className='codsh-recent-inner';list.append(inner);
          toggle.addEventListener('click',()=>{
            const expanded=toggle.getAttribute('aria-expanded')!=='true';
            toggle.setAttribute('aria-expanded',String(expanded));list.classList.toggle('codsh-section-collapsed',!expanded);
            inner.inert=!expanded;
          });
          const projectsToggle=document.createElement('button');projectsToggle.type='button';projectsToggle.className='codsh-section-toggle codsh-projects-toggle';
          projectsToggle.append(refinements.chevron(),document.createTextNode('项目'));projectsToggle.setAttribute('aria-expanded','true');
          header.prepend(projectsToggle);
          projectsToggle.addEventListener('click',()=>{
            const expanded=projectsToggle.getAttribute('aria-expanded')!=='true';projectsToggle.setAttribute('aria-expanded',String(expanded));
            mark(workspaceRoot,'data-codsh-projects-collapsed',String(!expanded));
            const projectList=workspaceRoot.querySelector(local('listArea'));if(projectList)projectList.inert=!expanded;
          });
          section.append(heading,list);
          workspaceRoot.append(section);
          const archiveToggle=document.createElement('button');archiveToggle.type='button';archiveToggle.className='codsh-archive-toggle';
          archiveToggle.textContent='归档';archiveToggle.setAttribute('aria-label','显示归档内容');archiveToggle.setAttribute('aria-pressed',String(showArchived));archiveToggle.title='显示全部项目和会话（含归档）';
          archiveToggle.addEventListener('click',()=>{
            showArchived=!showArchived;
            ctx.uiWorkspace.view?.setArchivedFilter?.(showArchived?'show':'default');
            for(const item of recentViews.values()){
              item.archiveToggle.setAttribute('aria-pressed',String(showArchived));
              item.archiveToggle.title=showArchived?'隐藏归档内容':'显示全部项目和会话（含归档）';
              item.signature=null;
            }
            refresh();
          });header.append(archiveToggle);
          view = {section,list,inner,projectsToggle,archiveToggle,signature:null};
          recentViews.set(workspaceRoot,view);
        }
        const sessions = ctx.sessions.list.getSnapshot();
        const workspaces = ctx.workspaces.list.getSnapshot();
        const archived = new Set(workspaces.archivedSessionIds || []);
        const pinned=workspaces.pinnedSessionIds||[];
        const rows = (sessions.ids || []).map(id => sessions.byId[id])
          .filter(row => row && !row.blank && !row.parentId && row.origin !== 'subagent' && (showArchived || !archived.has(row.id)))
          .sort((a,b) => (pinned.includes(a.id)?pinned.indexOf(a.id):Infinity)-(pinned.includes(b.id)?pinned.indexOf(b.id):Infinity) || b.updatedAt-a.updatedAt || a.id.localeCompare(b.id));
        const signature = JSON.stringify([sessions.phase,pinned, rows.map(row => [row.id,row.title,row.displayTitle,row.updatedAt])]);
        if (view.signature === signature) return;
        view.signature = signature;
        const children = rows.map(row => {
          const button = document.createElement('button');
          button.type = 'button';
          button.className = 'codsh-session';
          button.dataset.sessionId = row.id;
          const label = document.createElement('span');
          label.textContent = row.title || row.displayTitle || '未命名会话';
          button.title = label.textContent;
          button.append(label);
          if(pinned.includes(row.id))button.dataset.codshPinned='true';
          button.addEventListener('click', () => ctx.uiWorkspace.openSession(row.id));
          const container=document.createElement('div');container.className='codsh-session-container';container.append(button);return container;
        });
        if (!children.length) {
          const empty = document.createElement('p');
          empty.className = 'codsh-empty';
          empty.textContent = sessions.phase === 'ready' ? '暂无会话' : '正在加载…';
          children.push(empty);
        }
        const focusedId=view.inner.contains(document.activeElement)?document.activeElement?.dataset.sessionId:undefined;
        view.inner.replaceChildren(...children);
        if(focusedId)Array.from(view.inner.querySelectorAll('button')).find(button=>button.dataset.sessionId===focusedId)?.focus();
      });
      sidebarActions.refresh();
      document.querySelectorAll(local('titleGroup')).forEach(group => {
        const headline = group.parentElement;
        if (!headline?.querySelector(local('fishHitbox'))) return;
        const hero = headline.closest(local('root'));
        mark(hero,'data-codsh-hero');
        const seat = hero?.closest('[data-composer-seat]') || hero?.closest(local('composerHero'));
        const label = seat?.querySelector(local('workspaceLabel'))?.textContent?.trim();
        const isPlaceholder = !label || /^(选择工作区|Choose workspace|Select workspace)$/i.test(label);
        mark(group,'data-codsh-title', isPlaceholder ? '我们应该做些什么？' : `我们应该在 ${label} 中做些什么？`);
        let title=heroTitles.get(group);
        if(title&&title.parentElement!==group)group.append(title);
        if(!title){title=document.createElement('div');title.className='codsh-hero-title';group.append(title);heroTitles.set(group,title);}
        const matches=(ctx.workspaces.list.getSnapshot().items||[]).filter(item=>item.title===label);
        const path=!isPlaceholder&&matches.length===1?matches[0].path:undefined;
        const signature=JSON.stringify([label,path,isPlaceholder]);
        if(title.dataset.signature===signature)return;
        title.dataset.signature=signature;
        if(isPlaceholder){title.textContent='我们应该做些什么？';return;}
        const button=document.createElement('button');button.type='button';button.className='codsh-project-folder';
        button.textContent=label;button.disabled=!path;
        button.title=path?`在资源管理器中打开 ${path}`:'项目文件夹暂不可用';
        button.setAttribute('aria-label',`在资源管理器中打开 ${label} 的文件夹`);
        const error=document.createElement('span');error.className='codsh-folder-error';error.setAttribute('role','alert');
        button.addEventListener('click',async()=>{
          button.disabled=true;error.textContent='';
          try{const result=await ctx.remote.session.openWorkspacePath({path});if(result?.ok===false)throw Error(result.error?.message||'无法打开项目文件夹');}
          catch(reason){error.textContent=reason.message||'无法打开项目文件夹';}
          finally{button.disabled=false;}
        });
        title.replaceChildren(document.createTextNode('我们应该在 '),button,document.createTextNode(' 中做些什么？'),error);
      });
    };
    refresh();
    // React retains ownership of every control. Only reversible attributes
    // are added; workspace/session changes trigger one coalesced refresh.
    let queued = false;
    let disposed = false;
    const observer = new MutationObserver(() => {
      if (queued || disposed) return;
      queued = true;
      queueMicrotask(() => { queued = false; if (!disposed) refresh(); });
    });
    observer.observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['style','data-sidebar-collapsed','class','data-phase','data-content-phase','data-ds-dark-theme','data-dsh-theme-source','data-codsh-theme','aria-controls','aria-current','aria-expanded','aria-checked','disabled']});
    const updateStores=()=>{refresh();projectSearch.refresh();};
    const unsubscribeSessions = ctx.sessions.list.subscribe(updateStores);
    const unsubscribeWorkspaces = ctx.workspaces.list.subscribe(updateStores);
    return () => {
      disposed = true;
      observer.disconnect();
      for(const [frame,value] of railFrames){if(value)frame.style.setProperty('--codsh-collapsed-columns',value);else frame.style.removeProperty('--codsh-collapsed-columns');}railFrames.clear();
      document.removeEventListener('click',shakeWhale);
      closeTemporarySidebar(true);
      document.removeEventListener('click',temporaryNavigation,true);
      document.removeEventListener('pointermove',temporaryPointer);
      document.removeEventListener('keydown',temporaryEscape);
      for(const animation of whaleAnimations.values())animation.cancel();whaleAnimations.clear();
      unsubscribeSessions();
      unsubscribeWorkspaces();
      refinements.dispose();
      projectSearch.dispose();
      for(const title of temporaryTitles.values())title.remove();temporaryTitles.clear();
      for(const title of heroTitles.values())title.remove();heroTitles.clear();
      sidebarActions.dispose();actionsDisposed=true;remoteDisposer?.();
      for(const state of groupMotion.values())state.animation?.cancel();groupMotion.clear();
      ctx.uiWorkspace.view?.setArchivedFilter?.('default');
      for (const [root,view] of recentViews) {const list=root.querySelector(local('listArea'));if(list)list.inert=false;view.section.remove();view.projectsToggle.remove();view.archiveToggle.remove();}
      recentViews.clear();
      for (const node of owned.values()) node.remove();
      owned.clear();
      style.remove();
      releaseTokens();
      for (const [node, attributes] of tracked) for (const [key,value] of attributes) {
        if (value === null) node.removeAttribute(key); else node.setAttribute(key,value);
      }
      tracked.clear();
    };
  });
}

