import {readFile} from 'node:fs/promises';
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {JSDOM} from 'jsdom';

const bundle = await readFile(new URL('../dist/client.js',import.meta.url),'utf8');
const fixture = `<div class="abc_root abc_quietBars"><div class="abc_logoRow"></div><button class="abc_newSession">新会话</button><nav class="abc_panelList"><button class="abc_panelRow" aria-label="插件"><span class="abc_panelGlyph"><svg></svg></span><span class="abc_panelTitle abc_wide">插件</span></button></nav><div class="abc_regionArea"><div class="workspace_root"><div class="workspace_sectionHeader"><span class="workspace_sectionLabel workspace_wide">工作区</span><button aria-label="添加工作区">+</button></div><div class="workspace_listArea"><div data-row-key="workspace:project">项目</div></div></div></div></div>
<section data-phase="hero"><div data-composer-seat><div class="Dc7zOa_composerStack Dc7zOa_composerHero"><div class="Hqq-bq_root"><div class="Hqq-bq_stack"><div class="Hqq-bq_headline"><span class="Hqq-bq_fishHitbox"><svg data-native-whale></svg></span><span class="Hqq-bq_titleGroup"><span>探索未至之境</span><span>预览版</span></span></div></div></div><div class="Dc7zOa_heroWorkspaceRow"><button><span class="Hqq-bq_workspaceLabel">Codsh</span></button></div><div class="input_card"><div contenteditable="true">草稿</div><button>发送</button></div></div></div></section>`;
function setup() {
  const dom = new JSDOM(fixture,{runScripts:'outside-only',url:'http://localhost'});
  let plugin,dispose,tokenDispose = 0,tokens;
  dom.window.__ModuleLoader__ = {load(entry){assert.equal(entry.id,'dsh-codsh-theme');plugin=entry.factory(() => {});}};
  dom.window.eval(bundle);
  assert.deepEqual(Array.from(plugin.inject ?? []),['theme','sessions','workspaces','uiWorkspace','remote','remote.session']);
  const sessionListeners=new Set(),workspaceListeners=new Set(),opened=[];
  const sessions={phase:'ready',ids:[],byId:{}};
  const workspaces={phase:'ready',items:[],archivedSessionIds:[]};
  const store=(state,listeners)=>({getSnapshot:()=>state,subscribe(fn){listeners.add(fn);return()=>listeners.delete(fn);}});
  const calls=[];
  const remote={$mount:async()=>()=>{},codshActions:{deleteSession:async request=>{calls.push(['delete',request]);return{ok:true};}},session:{rename:async request=>{calls.push(['rename',request]);return{ok:true};},openWorkspacePath:async request=>{opened.push(request);return {ok:true};}}};
  const context={inject(keys,fn){fn({remote});},remote,effect(fn){dispose=fn();},theme:{overrideTokens(source,values){assert.equal(source,'dsh-codsh-theme');tokens=values;return()=>tokenDispose++;}},
    sessions:{list:store(sessions,sessionListeners)},workspaces:{list:store(workspaces,workspaceListeners)},uiWorkspace:{openSession:id=>opened.push(id)}};
  // Harness gates service property reads on the plugin's exported inject.
  plugin.apply(new Proxy(context,{get(target,key){
    if(key!=='effect' && key!=='inject' && !plugin.inject?.includes(key)) throw Error(`service "${key}" is not declared by your plugin`);
    return target[key];
  }}));
  return {dom,document:dom.window.document,dispose,calls,context,get tokenDispose(){return tokenDispose;},tokens,sessions,workspaces,opened,sessionListeners,workspaceListeners};
}
const settle = () => new Promise(resolve=>setTimeout(resolve,0));
test('header search filters projects and sessions, opens results and restores focus on Escape',async()=>{
  const env=setup(),d=env.document;let projectOpened;
  env.context.uiWorkspace.openWorkspace=async id=>{projectOpened=id;};
  env.workspaces.items=[{workspaceId:'project',title:'测试项目',sessionIds:['s']}];env.sessions.ids=['s'];env.sessions.byId.s={id:'s',title:'修复输入框',updatedAt:1};
  const trigger=d.querySelector('.codsh-search-button');trigger.click();
  const input=d.querySelector('.codsh-search-card input');assert.equal(d.activeElement,input);
  input.value='输入框';input.dispatchEvent(new env.dom.window.Event('input'));assert.equal(d.querySelectorAll('.codsh-search-results button').length,1);
  input.dispatchEvent(new env.dom.window.KeyboardEvent('keydown',{key:'Enter',bubbles:true}));await settle();assert.equal(env.opened[0],'s');assert.equal(d.querySelector('.codsh-search-mask'),null);
  trigger.click();d.querySelector('.codsh-search-results button').click();await settle();assert.equal(projectOpened,'project');
  trigger.click();d.querySelector('.codsh-search-card input').dispatchEvent(new env.dom.window.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));assert.equal(d.activeElement,trigger);
  env.dispose();assert.equal(d.querySelector('.codsh-search-button'),null);env.dom.window.close();
});
test('project deletion waits for the second confirmation and cancellation sends no request',async()=>{
  const env=setup(),d=env.document;let deleted=0;
  env.context.remote.codshActions.deleteProject=async request=>{assert.equal(request.workspaceId,'project');assert.equal(request.confirm,true);deleted++;return {ok:true};};env.context.uiWorkspace.startSession=()=>{};
  env.workspaces.items=[{workspaceId:'project',title:'项目',path:'C:/project'}];for(const fn of env.workspaceListeners)fn();
  const open=()=>{d.querySelector('[data-row-key="workspace:project"] .codsh-row-menu').click();Array.from(d.querySelectorAll('.codsh-actions-menu button')).find(button=>button.textContent==='永久删除项目').click();};
  open();assert.equal(deleted,0);assert.match(d.querySelector('.codsh-action-dialog').textContent,/全部会话/);d.querySelector('.codsh-action-dialog button[type="button"]').click();assert.equal(deleted,0);
  open();d.querySelector('.codsh-action-dialog').dispatchEvent(new env.dom.window.Event('submit',{cancelable:true}));await settle();assert.equal(deleted,1);env.dispose();env.dom.window.close();
});
test('appearance changes preserve skin priority and restore controls removed by host rerenders',async()=>{
  const env=setup(),d=env.document;
  const title=d.querySelector('.codsh-hero-title'),rail=d.querySelector('.codsh-rail-tools'),recent=d.querySelector('.codsh-recent');
  for(const dark of [true,false,true,false]){
    d.body.toggleAttribute('data-ds-dark-theme',dark);
    d.documentElement.style.colorScheme=dark?'dark':'light';
    const native=d.createElement('style');native.textContent='body {background:white}';d.head.append(native);
    title.remove();rail.remove();recent.remove();d.documentElement.removeAttribute('data-codsh-theme');
    await settle();
    const bodyStyle=env.dom.window.getComputedStyle(d.body);
    if(!dark){
      assert.equal(bodyStyle.getPropertyValue('--codsh-base').trim(),'#ffffff');
      assert.equal(bodyStyle.getPropertyValue('--codsh-text').trim(),'#202124');
      assert.equal(bodyStyle.getPropertyValue('--codsh-tone-252525').trim(),'#ffffff');
    }else{
      assert.equal(bodyStyle.getPropertyValue('--codsh-base').trim(),'');
    }
    assert.equal(d.documentElement.style.colorScheme,dark?'dark':'light');
    assert.ok(d.documentElement.hasAttribute('data-codsh-theme'));
    assert.equal(d.head.querySelectorAll('style')[d.head.querySelectorAll('style').length-1].hasAttribute('data-codsh-style'),true);
    assert.ok(title.isConnected&&rail.isConnected&&recent.isConnected);
    assert.equal(d.body.hasAttribute('data-ds-dark-theme'),dark);
    native.remove();
  }
  env.dispose();assert.equal(d.querySelector('[data-codsh-style]'),null);env.dom.window.close();
});
test('whale clicks restart the gentle shake and respect reduced motion and disposal',()=>{
  const env=setup(),whale=env.document.querySelector('.Hqq-bq_fishHitbox');
  const animations=[];let cancelled=0;
  whale.animate=(frames,options)=>{assert.equal(frames[0].transform,frames.at(-1).transform);assert.equal(options.duration,520);const animation={cancel(){cancelled++;}};animations.push(animation);return animation;};
  whale.querySelector('svg').dispatchEvent(new env.dom.window.MouseEvent('click',{bubbles:true}));
  whale.click();assert.equal(animations.length,2);assert.equal(cancelled,1);
  env.dom.window.matchMedia=()=>({matches:true});whale.click();assert.equal(animations.length,2);
  env.dispose();assert.equal(cancelled,2);
  env.dom.window.matchMedia=()=>({matches:false});whale.click();assert.equal(animations.length,2);
  env.dom.window.close();
});
test('session menus rename and pin without a folder action, and require confirmation before permanent deletion',async()=>{
  const env=setup(),d=env.document;
  let started=0;env.context.uiWorkspace.startSession=()=>started++;
  env.sessions.ids=['s'];env.sessions.byId.s={id:'s',title:'会话',cwd:'C:\\project',updatedAt:1,retainedBy:{mainView:1}};
  env.context.workspaces.pinSession=async id=>{env.workspaces.pinnedSessionIds=[id];for(const fn of env.workspaceListeners)fn();};
  env.context.workspaces.unpinSession=async()=>{};
  for(const fn of env.sessionListeners)fn();await settle();
  const open=()=>{d.querySelector('.codsh-session-container .codsh-row-menu').click();};
  const choose=label=>Array.from(d.querySelectorAll('.codsh-actions-menu button')).find(button=>button.textContent===label).click();
  open();choose('重命名');d.querySelector('.codsh-action-dialog input').value='新名称';d.querySelector('.codsh-action-dialog').dispatchEvent(new env.dom.window.Event('submit',{cancelable:true}));await settle();
  assert.deepEqual(JSON.parse(JSON.stringify(env.calls[0])),['rename',{sessionId:'s',title:'新名称'}]);
  open();choose('置顶');await settle();assert.equal(d.querySelector('.codsh-session').dataset.codshPinned,'true');
  open();assert.equal(Array.from(d.querySelectorAll('.codsh-actions-menu button')).some(button=>button.textContent==='在资源管理器中打开'),false);
  open();choose('永久删除会话');assert.equal(env.calls.length,1);assert.match(d.querySelector('.codsh-action-dialog').textContent,/无法恢复/);
  d.querySelector('.codsh-action-dialog').dispatchEvent(new env.dom.window.Event('submit',{cancelable:true}));await settle();assert.deepEqual(JSON.parse(JSON.stringify(env.calls[1])),['delete',{sessionId:'s',confirm:true}]);
  assert.equal(started,1);assert.equal(d.querySelector('.codsh-action-dialog'),null);
  env.dispose();assert.equal(d.querySelector('.codsh-row-menu'),null);env.dom.window.close();
});
test('project menus rename through Harness and persist project pins',async()=>{
  const env=setup(),d=env.document;let renamed;
  env.workspaces.items=[{workspaceId:'project',title:'项目',path:'C:\\project'}];
  env.context.workspaces.rename=async(id,title)=>{renamed=[id,title];};
  for(const fn of env.workspaceListeners)fn();
  const row=d.querySelector('[data-row-key="workspace:project"]');
  row.querySelector('.codsh-row-menu').click();Array.from(d.querySelectorAll('.codsh-actions-menu button')).find(button=>button.textContent==='在资源管理器中打开').click();await settle();
  assert.deepEqual(JSON.parse(JSON.stringify(env.opened[0])),{path:'C:\\project'});
  row.querySelector('.codsh-row-menu').click();d.querySelector('.codsh-actions-menu button').click();
  d.querySelector('.codsh-action-dialog input').value='新项目';d.querySelector('.codsh-action-dialog').dispatchEvent(new env.dom.window.Event('submit',{cancelable:true}));await settle();assert.deepEqual(renamed,['project','新项目']);
  row.querySelector('.codsh-row-menu').click();Array.from(d.querySelectorAll('.codsh-actions-menu button')).find(button=>button.textContent==='置顶').click();await settle();
  assert.equal(row.dataset.codshProjectPinned,'true');assert.deepEqual(JSON.parse(env.dom.window.localStorage.getItem('codsh.project-pins')),['project']);
  env.dispose();assert.equal(row.getAttribute('data-codsh-project-pinned'),null);env.dom.window.close();
});
test('hero project opens its directory and refreshes the target after switching projects',async()=>{
  const env=setup(),d=env.document;
  env.workspaces.items=[{workspaceId:'a',title:'Codsh',path:'C:\\projects\\Codsh'},{workspaceId:'b',title:'Downloads',path:'C:\\Users\\Downloads'}];
  for(const listener of env.workspaceListeners)listener();
  d.querySelector('.codsh-project-folder').click();await settle();
  assert.deepEqual(JSON.parse(JSON.stringify(env.opened)),[{path:'C:\\projects\\Codsh'}]);
  d.querySelector('.Hqq-bq_workspaceLabel').textContent='Downloads';await settle();
  d.querySelector('.codsh-project-folder').click();await settle();
  assert.equal(env.opened[1].path,'C:\\Users\\Downloads');
  env.workspaces.items.push({workspaceId:'c',title:'Downloads',path:'D:\\Downloads'});
  for(const listener of env.workspaceListeners)listener();
  assert.equal(d.querySelector('.codsh-project-folder').disabled,true);
  env.dispose();assert.equal(d.querySelector('.codsh-hero-title'),null);env.dom.window.close();
});
test('model and effort menus are styled across portal remounts without changing selections',async()=>{
  const env=setup(),d=env.document;
  d.body.insertAdjacentHTML('beforeend','<button aria-haspopup="menu" aria-expanded="false"><svg class="m_triggerIcon"></svg><span class="m_triggerLabel">DeepSeek</span><span class="m_triggerEffort">High</span></button>');
  await settle();
  const trigger=d.querySelector('[data-codsh-model-trigger]');
  assert.ok(trigger);
  trigger.setAttribute('aria-controls','model-menu');trigger.setAttribute('aria-expanded','true');
  d.body.insertAdjacentHTML('beforeend','<div id="model-menu" role="menu"><button class="m_cell">模型</button><button class="m_cell">推理模式</button></div>');
  await settle();assert.ok(d.querySelector('#model-menu[data-codsh-model-menu]'));
  d.getElementById('model-menu').remove();
  d.body.insertAdjacentHTML('beforeend','<div id="model-menu" role="menu"><button class="m_option m_selected" role="menuitemradio" aria-checked="true">High</button></div>');
  await settle();
  assert.ok(d.querySelector('#model-menu[data-codsh-model-menu]'));
  const selected=d.querySelector('[aria-checked="true"]');
  let clicks=0;selected.addEventListener('click',()=>clicks++);selected.click();assert.equal(clicks,1);
  env.dispose();assert.equal(d.querySelector('[data-codsh-model-menu]'),null);
  assert.equal(selected.getAttribute('aria-checked'),'true');env.dom.window.close();
});
test('loader activation keeps native composer and whale, and delegates home to the real button',()=>{
  const env=setup(),d=env.document;
  assert.ok(d.querySelector('[data-codsh-sidebar]'));
  assert.equal(d.querySelector('[data-codsh-title]').dataset.codshTitle,'我们应该在 Codsh 中做些什么？');
  assert.equal(d.querySelector('[contenteditable]').textContent,'草稿');
  assert.ok(d.querySelector('[data-native-whale]'));
  let clicks=0;
  d.querySelector('.abc_newSession').addEventListener('click',()=>clicks++);
  d.querySelector('.codsh-home').click();
  assert.equal(clicks,1);
  for(const pair of Object.values(env.tokens)) {assert.equal(typeof pair.light,'string');assert.equal(typeof pair.dark,'string');}
  assert.equal(env.tokens['--dsw-alias-bg-base'].light,'#ffffff');
  assert.equal(env.tokens['--dsw-alias-bg-base'].dark,'#181818');
  env.dispose();env.dom.window.close();
});
test('workspace changes and React remounts update without retaining the old title',async()=>{
  const env=setup(),d=env.document;
  d.querySelector('.Hqq-bq_workspaceLabel').textContent='另一个项目';
  await settle();
  assert.equal(d.querySelector('[data-codsh-title]').dataset.codshTitle,'我们应该在 另一个项目 中做些什么？');
  d.querySelector('.Hqq-bq_workspaceLabel').textContent='选择工作区';await settle();
  assert.equal(d.querySelector('[data-codsh-title]').dataset.codshTitle,'我们应该做些什么？');
  const sidebar=d.querySelector('[data-codsh-sidebar]');
  sidebar.remove();
  d.body.insertAdjacentHTML('beforeend','<div class="new_root"><div class="new_logoRow"></div><button class="new_newSession"></button></div>');
  await settle();
  assert.ok(d.querySelector('.new_root[data-codsh-sidebar] .codsh-home'));
  env.dispose();env.dom.window.close();
});
test('disable removes observers, tokens, style and injected UI; original content survives',async()=>{
  const env=setup(),d=env.document;
  env.dispose();
  assert.equal(env.tokenDispose,1);
  assert.equal(d.querySelector('[data-codsh-style]'),null);
  assert.equal(d.querySelector('[data-codsh-theme]'),null);
  assert.equal(d.querySelector('[data-codsh-title]'),null);
  assert.equal(d.querySelector('.codsh-home'),null);
  assert.equal(d.querySelector('.codsh-recent'),null);
  assert.equal(env.sessionListeners.size,0);
  assert.equal(env.workspaceListeners.size,0);
  assert.equal(d.querySelector('.Hqq-bq_titleGroup').textContent,'探索未至之境预览版');
  assert.equal(d.querySelector('[contenteditable]').textContent,'草稿');
  d.querySelector('.Hqq-bq_workspaceLabel').textContent='关闭后';await settle();
  assert.equal(d.querySelector('[data-codsh-title]'),null);
  env.dom.window.close();
});
test('rail hides multi-class labels; project heading and recent list preserve native actions',()=>{
  const env=setup(),d=env.document;
  assert.equal(env.dom.window.getComputedStyle(d.querySelector('.abc_panelTitle')).display,'none');
  assert.ok(d.querySelector('[data-codsh-projects]'));
  assert.ok(d.querySelector('[aria-label="添加工作区"]'));
  assert.equal(d.querySelector('.codsh-recent h2').textContent,'最近会话');
  assert.equal(d.querySelector('.codsh-empty').textContent,'暂无会话');
  for(const row of [{id:'old',title:'旧会话',updatedAt:1},{id:'new',title:'新会话',updatedAt:10},{id:'blank',blank:true,updatedAt:20},{id:'archived',updatedAt:30},{id:'sub',parentId:'new',updatedAt:40}]) {
    env.sessions.ids.push(row.id);env.sessions.byId[row.id]=row;
  }
  env.workspaces.archivedSessionIds=['archived'];
  for(const fn of env.sessionListeners) fn();
  assert.deepEqual(Array.from(d.querySelectorAll('.codsh-session'),el=>el.dataset.sessionId),['new','old']);
  d.querySelector('.codsh-session').click();
  assert.deepEqual(env.opened,['new']);
  env.sessions.byId.old.updatedAt=50;
  for(const fn of env.sessionListeners) fn();
  assert.equal(d.querySelector('.codsh-session').dataset.sessionId,'old');
  env.dispose();env.dom.window.close();
});
test('section folding blocks hidden focus and restores native project interaction on disable',()=>{
  const env=setup(),d=env.document;
  const projects=d.querySelector('.codsh-projects-toggle'),list=d.querySelector('.workspace_listArea');
  projects.click();assert.equal(projects.getAttribute('aria-expanded'),'false');assert.equal(list.inert,true);
  assert.equal(d.querySelector('[data-codsh-workspaces]').getAttribute('data-codsh-projects-collapsed'),'true');
  const recent=d.querySelector('.codsh-recent .codsh-section-toggle');recent.click();
  assert.ok(d.querySelector('.codsh-section-collapsed'));assert.equal(d.querySelector('.codsh-recent-inner').inert,true);
  d.querySelector('button[aria-label="项目"]').click();assert.equal(projects.getAttribute('aria-expanded'),'true');
  let added=0;d.querySelector('[aria-label="添加工作区"]').addEventListener('click',()=>added++);
  d.querySelector('button[aria-label="添加项目"]').click();assert.equal(added,1);
  projects.click();env.dispose();assert.equal(list.inert,false);
  assert.equal(d.querySelector('.codsh-projects-toggle'),null);assert.equal(d.querySelector('.codsh-rail-tools'),null);
  env.dom.window.close();
});
test('rail switches filtered views with selection and restores the combined view',()=>{
  const env=setup(),d=env.document,root=d.querySelector('[data-codsh-sidebar]');
  const recent=d.querySelector('.codsh-rail-button[aria-label="最近会话"]'),projects=d.querySelector('.codsh-rail-button[aria-label="项目"]');
  recent.click();assert.equal(root.dataset.codshView,'recent');assert.equal(recent.getAttribute('aria-pressed'),'true');assert.equal(projects.getAttribute('aria-pressed'),'false');
  assert.equal(env.dom.window.getComputedStyle(d.querySelector('.workspace_listArea')).display,'none');
  projects.click();assert.equal(root.dataset.codshView,'projects');assert.equal(projects.getAttribute('aria-pressed'),'true');
  assert.equal(env.dom.window.getComputedStyle(d.querySelector('.codsh-recent')).display,'none');
  d.querySelector('.codsh-home').click();assert.equal(root.dataset.codshView,'all');
  assert.equal(env.dom.window.getComputedStyle(d.querySelector('.codsh-recent')).display,'block');
  assert.match(recent.querySelector('path').getAttribute('d'),/0-18Z/);
  env.dispose();assert.equal(root.getAttribute('data-codsh-view'),null);env.dom.window.close();
});
test('account stays in the icon rail; project sessions share recent metrics and animate both directions',async()=>{
  const env=setup(),d=env.document,root=d.querySelector('[data-codsh-sidebar]');
  root.insertAdjacentHTML('beforeend','<div class="side_footArea"><button class="account_trigger"><span class="account_avatar"></span><span class="account_label">已登录 DeepSeek</span></button></div>');
  const group=d.createElement('div');group.className='workspace_groupSection';group.innerHTML='<div data-row-key="workspace:test"></div>';
  let height=32;const animations=[];
  group.getBoundingClientRect=()=>({height});group.animate=(frames,options)=>{animations.push({frames,options});return{cancel(){}};};
  d.querySelector('.workspace_listArea').append(group);await settle();
  const footer=d.querySelector('.side_footArea');assert.equal(env.dom.window.getComputedStyle(footer).left,'7px');
  assert.equal(d.querySelector('.account_trigger').title,'已登录 DeepSeek');
  assert.equal(env.dom.window.getComputedStyle(d.querySelector('.account_label')).display,'none');
  height=62;group.insertAdjacentHTML('beforeend','<div class="row_sessionRow" data-row-key="session:test">新会话</div>');await settle();
  assert.equal(animations.length,1);assert.equal(animations[0].frames[0].height,'32px');assert.equal(animations[0].frames[1].height,'62px');
  assert.equal(env.dom.window.getComputedStyle(group.lastElementChild).height,'26px');
  height=32;group.lastElementChild.remove();await settle();assert.equal(animations.length,2);assert.equal(animations[1].frames[1].height,'32px');
  env.dispose();assert.equal(d.querySelector('.account_trigger').getAttribute('title'),null);env.dom.window.close();
});
test('sidebar close keeps a clipped snapshot until the grid transition finishes; settings sections fill their column',async()=>{
  const env=setup(),d=env.document,root=d.querySelector('[data-codsh-sidebar]');
  const frame=d.createElement('div');frame.className='layout_frame';root.before(frame);frame.append(root);
  const toggle=d.createElement('button');toggle.className='side_toggle';root.append(toggle);
  root.getBoundingClientRect=()=>({left:0,top:40,width:312,height:700});
  const animations=[];env.dom.window.HTMLElement.prototype.animate=function(frames,options){const animation={cancel(){}};animations.push({frames,options,animation});return animation;};
  toggle.addEventListener('click',()=>frame.setAttribute('data-sidebar-collapsed','true'));
  toggle.click();await settle();
  const exit=d.querySelector('.codsh-sidebar-exit');assert.ok(exit);assert.equal(exit.inert,true);assert.equal(exit.getAttribute('aria-hidden'),'true');
  assert.equal(exit.querySelectorAll('.codsh-rail-tools').length,1);assert.equal(animations[0].options.duration,240);
  assert.equal(animations[0].frames[1].clipPath,'inset(0 100% 0 0)');
  animations[0].animation.onfinish();assert.equal(d.querySelector('.codsh-sidebar-exit'),null);
  d.body.insertAdjacentHTML('beforeend','<div data-shortcut-modal="settings"><div class="settings_options"><div data-slot="settings.section"><section class="models_section extra"></section></div><div><section class="inventory_section"></section></div><section class="presets_section"></section><section class="general_section"><div data-slot="settings.general.item"></div></section></div></div>');
  await settle();for(const section of d.querySelectorAll('.settings_options section')){const computed=env.dom.window.getComputedStyle(section);assert.equal(computed.width,'100%');assert.equal(computed.maxWidth,'none');}
  env.dispose();env.dom.window.close();
});
test('reasoning panel survives native close and bridges the next selection; Ultra alone has particles',async()=>{
  const env=setup(),d=env.document;let selected=1,commits=0;
  d.body.insertAdjacentHTML('beforeend','<div><button id="persistent-model" aria-haspopup="menu" aria-expanded="false"><svg class="model_triggerIcon"></svg><span class="model_triggerLabel">DeepSeek</span><span class="model_triggerEffort">Medium</span></button></div>');
  const trigger=d.getElementById('persistent-model'),labels=['Low','Medium','High','Ultra'];
  trigger.addEventListener('click',()=>{
    if(trigger.getAttribute('aria-expanded')==='true'){d.getElementById('persistent-menu')?.remove();trigger.setAttribute('aria-expanded','false');return;}
    trigger.setAttribute('aria-expanded','true');trigger.setAttribute('aria-controls','persistent-menu');
    d.body.insertAdjacentHTML('beforeend','<div id="persistent-menu" role="menu"><button class="model_cell">模型</button><button class="model_cell">推理</button></div>');
    const menu=d.getElementById('persistent-menu');menu.lastElementChild.addEventListener('click',()=>{
      menu.replaceChildren(...labels.map((label,index)=>{
        const option=d.createElement('button');option.setAttribute('role','menuitemradio');option.setAttribute('aria-checked',String(index===selected));option.textContent=label;
        option.addEventListener('click',()=>{selected=index;commits++;trigger.querySelector('.model_triggerEffort').textContent=label;menu.remove();trigger.setAttribute('aria-expanded','false');});return option;
      }));
    });
  });
  await settle();d.querySelector('.codsh-reasoning-trigger').click();await settle();
  const panel=d.querySelector('.codsh-effort-control'),range=panel.querySelector('input');
  range.value='2';range.dispatchEvent(new env.dom.window.Event('change'));await settle();
  assert.equal(commits,1);assert.equal(panel.isConnected,true);assert.equal(panel.classList.contains('codsh-effort-max'),false);
  range.value='2.7';range.dispatchEvent(new env.dom.window.Event('input'));assert.equal(commits,1);assert.equal(panel.classList.contains('codsh-effort-max'),true);
  assert.equal(panel.querySelector('.codsh-effort-sparks').parentElement,panel.querySelector('.codsh-effort-fill'));
  range.dispatchEvent(new env.dom.window.Event('change'));await settle();await settle();
  assert.equal(commits,2);assert.equal(selected,3);assert.equal(panel.isConnected,true);
  d.body.dispatchEvent(new env.dom.window.Event('pointerdown',{bubbles:true}));await settle();assert.equal(panel.isConnected,false);
  assert.equal(d.querySelector('.codsh-reasoning-trigger').getAttribute('aria-expanded'),'false');
  env.dispose();env.dom.window.close();
});
test('reasoning slider uses available native levels and commits once without inventing options',async()=>{
  const env=setup(),d=env.document;
  d.body.insertAdjacentHTML('beforeend','<div><button id="native-model" aria-haspopup="menu" aria-expanded="false"><svg class="model_triggerIcon"></svg><span class="model_triggerLabel">DeepSeek</span><span class="model_triggerEffort">Medium</span></button></div>');
  const trigger=d.getElementById('native-model');let commits=0,selection;
  trigger.addEventListener('click',()=>{
    trigger.setAttribute('aria-expanded','true');trigger.setAttribute('aria-controls','native-menu');
    d.body.insertAdjacentHTML('beforeend','<div id="native-menu" role="menu"><button class="model_cell">模型</button><button class="model_cell">推理模式</button></div>');
    d.getElementById('native-menu').lastElementChild.addEventListener('click',()=>{
      const menu=d.getElementById('native-menu');menu.replaceChildren();
      for(const [index,label] of ['Low','Medium','High'].entries()) {
        const option=d.createElement('button');option.setAttribute('role','menuitemradio');option.setAttribute('aria-checked',String(index===1));
        const span=d.createElement('span');span.className='model_modelName';span.textContent=label;option.append(span);
        option.addEventListener('click',()=>{commits++;selection=label;});menu.append(option);
      }
    });
  });
  await settle();d.querySelector('.codsh-reasoning-trigger').click();await settle();
  const slider=d.querySelector('input[type="range"]');assert.ok(slider);assert.equal(slider.max,'2');
  assert.equal(slider.value,'1');assert.equal(slider.getAttribute('aria-valuetext'),'Medium');
  slider.value='2';slider.dispatchEvent(new env.dom.window.Event('input',{bubbles:true}));assert.equal(commits,0);
  assert.equal(d.querySelector('.codsh-effort-title').textContent,'High');
  slider.dispatchEvent(new env.dom.window.Event('change',{bubbles:true}));assert.equal(commits,1);assert.equal(selection,'High');
  const options=d.querySelectorAll('button[role="menuitemradio"]');options.forEach(option=>{option.disabled=true;});trigger.focus();await settle();
  assert.equal(slider.value,'2');assert.equal(d.querySelector('.codsh-effort-title').textContent,'High');
  assert.equal(slider.disabled,true);slider.dispatchEvent(new env.dom.window.Event('change',{bubbles:true}));assert.equal(commits,1);
  trigger.disabled=true;await settle();
  const oldMenu=d.getElementById('native-menu');oldMenu.remove();trigger.disabled=false;trigger.setAttribute('aria-expanded','false');await settle();
  assert.equal(slider.value,'2');assert.equal(d.querySelector('.codsh-effort-title').textContent,'High');
  assert.equal(d.querySelector('.codsh-reasoning-trigger span').textContent,'High');
  d.body.append(oldMenu);await settle();assert.equal(slider.value,'2');
  env.dispose();assert.equal(d.querySelector('.codsh-effort-control'),null);assert.equal(d.querySelector('.codsh-reasoning-trigger'),null);
  assert.equal(d.querySelectorAll('button[role="menuitemradio"]').length,3);env.dom.window.close();
});
test('one more button remains, menu items have icons and quick pins toggle without opening a menu',async()=>{
  const env=setup(),d=env.document,row=d.querySelector('[data-row-key="workspace:project"]');
  env.workspaces.items=[{workspaceId:'project',title:'项目'}];
  row.insertAdjacentHTML('beforeend','<span class="rows_rowActions"><button aria-label="工作区“项目”的操作" aria-haspopup="menu">native</button></span>');
  await settle();const native=row.querySelector('[data-codsh-native-more]');assert.equal(env.dom.window.getComputedStyle(native).display,'none');
  const pin=row.querySelector('.codsh-row-pin');pin.click();await settle();assert.equal(pin.getAttribute('aria-pressed'),'true');assert.equal(d.querySelector('.codsh-actions-menu'),null);
  pin.click();await settle();assert.equal(pin.getAttribute('aria-pressed'),'false');
  row.querySelector('.codsh-row-menu').click();for(const button of d.querySelectorAll('.codsh-actions-menu button'))assert.ok(button.querySelector('svg'));
  env.dispose();assert.equal(native.hasAttribute('data-codsh-native-more'),false);assert.equal(d.querySelector('.codsh-row-pin'),null);env.dom.window.close();
});
test('model trigger opens only the catalog; Max is purple without Ultra particles or a focus outline',async()=>{
  const env=setup(),d=env.document;
  d.body.insertAdjacentHTML('beforeend','<div><button id="catalog-trigger" aria-haspopup="menu"><svg class="model_triggerIcon"></svg><span class="model_triggerLabel">DeepSeek</span><span class="model_triggerEffort">Max</span></button></div>');
  const trigger=d.getElementById('catalog-trigger');let drilled=0;
  trigger.addEventListener('click',()=>{
    trigger.setAttribute('aria-expanded','true');trigger.setAttribute('aria-controls','catalog-menu');
    d.body.insertAdjacentHTML('beforeend','<div id="catalog-menu" role="menu"><button class="model_cell">模型</button><button class="model_cell">推理等级</button></div>');
    const menu=d.getElementById('catalog-menu');menu.firstElementChild.addEventListener('click',()=>{drilled++;menu.innerHTML='<div role="group"><button role="menuitemradio">DeepSeek-V41-Flash</button></div>';});
  });
  await settle();trigger.click();await settle();assert.equal(drilled,1);assert.equal(d.getElementById('catalog-menu').textContent,'DeepSeek-V41-Flash');
  assert.equal(d.querySelector('.codsh-effort-control'),null);
  const menu=d.getElementById('catalog-menu');menu.innerHTML='<button role="menuitemradio" aria-checked="false">Low</button><button role="menuitemradio" aria-checked="true">Max</button>';
  await settle();const panel=d.querySelector('.codsh-effort-control');assert.ok(panel.classList.contains('codsh-effort-max'));assert.equal(panel.classList.contains('codsh-effort-ultra'),false);
  assert.equal(env.dom.window.getComputedStyle(panel.querySelector('.codsh-effort-sparks')).display,'none');
  assert.match(d.querySelector('[data-codsh-style]').textContent,/\.codsh-effort-track input:focus-visible \{outline:none/);
  env.dispose();env.dom.window.close();
});
test('session archive lives in the menu and native duplicate pin/archive controls are hidden',async()=>{
  const env=setup(),d=env.document;let archived;
  env.sessions.ids=['s'];env.sessions.byId.s={id:'s',title:'Session',updatedAt:1};
  env.context.uiWorkspace.archiveSession=async(id,options)=>{archived={id,options};};
  const project=d.querySelector('[data-row-key="workspace:project"]');
  project.parentElement.insertAdjacentHTML('beforeend','<div data-row-key="session:s" class="rows_sessionRow"><span class="rows_pinIndicator">pin</span><span class="rows_rowActions"><button aria-label="归档会话">archive</button><button aria-label="置顶会话">pin</button></span></div>');
  for(const fn of env.sessionListeners)fn();await settle();
  const row=d.querySelector('[data-row-key="session:s"]');
  for(const button of row.querySelectorAll('.rows_rowActions button'))assert.equal(env.dom.window.getComputedStyle(button).display,'none');
  assert.equal(env.dom.window.getComputedStyle(row.querySelector('.rows_pinIndicator')).display,'none');
  assert.equal(row.querySelectorAll('.codsh-row-pin').length,1);
  row.querySelector('.codsh-row-menu').click();
  const action=Array.from(d.querySelectorAll('.codsh-actions-menu button')).find(button=>button.textContent==='归档会话');assert.ok(action.querySelector('svg'));action.click();await settle();
  assert.deepEqual(JSON.parse(JSON.stringify(archived)),{id:'s',options:{stopActivity:true}});
  env.dispose();for(const button of row.querySelectorAll('.rows_rowActions button'))assert.equal(button.hasAttribute('data-codsh-native-more'),false);env.dom.window.close();
});
