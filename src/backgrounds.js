// Appearance mode belongs to Harness; background preferences stay on this device.
function createBackgrounds(ctx,mark) {
  const names={cyber:'赛博霓虹',forest:'静谧森林',latte:'拿铁时光',midnight:'午夜星空',mono:'极简灰阶',ocean:'晴空海洋',sakura:'樱花物语',wind:'清风原野'};
  const tones={cyber:[278,28],forest:[146,23],latte:[30,25],midnight:[231,24],mono:[220,3],ocean:[207,28],sakura:[337,22],wind:[177,16],custom:[215,12]};
  function palette(id,light){
    const [h,s]=tones[id]||tones.custom;
    const color=l=>`hsl(${h} ${s}% ${l}%)`;
    const base=color(light?96:10),sidebar=color(light?93:13),rail=color(light?90:11),input=color(light?98:19),raised=color(light?99:17),hover=color(light?87:25),border=color(light?80:29);
    return Object.entries({'--codsh-base':base,'--codsh-sidebar':sidebar,'--codsh-rail':rail,'--codsh-input':input,'--codsh-raised':raised,'--codsh-hover':hover,'--codsh-border':border,
      '--codsh-tone-303030':input,'--codsh-tone-242424':raised,'--codsh-tone-252525':raised,'--codsh-tone-34353c':hover,'--codsh-tone-3b3b3b':hover,'--codsh-tone-2d2d2d':hover,'--codsh-tone-323232':border,'--codsh-tone-363636':border,
      '--codsh-glass-tint':rail,'--dsw-specific-sidebar-fill':sidebar,'--dsw-specific-input-major':input,'--dsw-specific-menu':raised,'--dsw-alias-bg-layer-1':sidebar,'--dsw-alias-bg-layer-2':raised,'--dsw-alias-settings-card-fill':raised,'--dsw-alias-settings-card-stroke':border,
      '--dsw-alias-bg-module-platform':raised,'--dsw-alias-interactive-bg-hover':hover,'--dsw-specific-bubble':color(light?84:27)
    }).filter(([key])=>!externalBackground||key.startsWith('--codsh-')).map(([key,value])=>`${key}:${value}`).join(';');
  }
  const views=new Map(),key='codsh.background';
  let selected='none',custom='',disposed=false,revision=0;
  let paletteId='none';
  const modes=[['light','浅色'],['dark','深色'],['system','跟随系统']];
  let modePopup,modeOwner,popupSequence=0;
  function closeMode(restoreFocus=false){
    const trigger=modeOwner?.mode;
    modePopup?.remove();modePopup=undefined;modeOwner=undefined;
    trigger?.setAttribute('aria-expanded','false');trigger?.removeAttribute('aria-controls');
    if(restoreFocus&&trigger?.isConnected)trigger.focus();
  }
  function positionMode(){
    if(!modePopup)return;
    if(!modeOwner.mode.isConnected){closeMode();return;}
    const rect=modeOwner.mode.getBoundingClientRect(),viewport=window.visualViewport;
    const left=viewport?.offsetLeft||0,top=viewport?.offsetTop||0;
    const width=viewport?.width||window.innerWidth,height=viewport?.height||window.innerHeight;
    modePopup.style.width=`${Math.min(Math.max(rect.width,modeOwner.searchable?280:144),Math.max(0,width-16))}px`;
    modePopup.style.maxHeight=`${Math.max(0,Math.min(modeOwner.searchable?360:height,height-16))}px`;
    const popupWidth=modePopup.offsetWidth||parseFloat(modePopup.style.width),popupHeight=modePopup.offsetHeight||Math.min(110,Math.max(0,height-16));
    modePopup.style.left=`${Math.max(left+8,Math.min(rect.right-popupWidth,left+width-popupWidth-8))}px`;
    const y=rect.bottom+6+popupHeight>top+height-8?rect.top-popupHeight-6:rect.bottom+6;
    modePopup.style.top=`${Math.max(top+8,Math.min(y,top+height-popupHeight-8))}px`;
  }
  function updateMode(view,value){
    if(view.mode.value!==value)view.mode.value=value;
    const label=(view.choices||modes).find(([id])=>id===value)?.[1]||'跟随系统';
    if(view.modeLabel.textContent!==label)view.modeLabel.textContent=label;
    view.mode.setAttribute('aria-label',`${view.label||'明暗模式'}：${label}`);
    if(modeOwner===view)for(const option of modePopup.querySelectorAll('[role="menuitemradio"]')){
      const checked=String(option.value===value);
      if(option.getAttribute('aria-checked')!==checked)option.setAttribute('aria-checked',checked);
    }
  }
  function filterChoices(event){
    const query=(modePopup.querySelector('input')?.value||'').trim().toLocaleLowerCase();
    let visible=0;
    for(const option of modePopup.querySelectorAll('[role="menuitemradio"]')){
      const hidden=!`${option.textContent} ${option.value}`.toLocaleLowerCase().includes(query);
      if(option.hidden!==hidden)option.hidden=hidden;
      if(!hidden)visible++;
    }
    const empty=modePopup.querySelector('.codsh-font-empty');if(empty)empty.hidden=visible>0;
    if(event?.type==='input')modePopup.querySelector('.codsh-font-options').scrollTop=0;
    positionMode();
  }
  function renderChoices(view){
    const list=modePopup.querySelector('.codsh-font-options')||modePopup;
    const focused=document.activeElement,focusedValue=list.contains(focused)?focused.value:undefined;
    list.replaceChildren();
    for(const [id,label] of view.choices||modes){
      const option=document.createElement('button');option.type='button';option.value=id;option.tabIndex=-1;
      option.setAttribute('role','menuitemradio');option.setAttribute('aria-checked',String(id===view.mode.value));
      option.innerHTML='<span></span><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m4 10 4 4 8-8"/></svg>';
      option.firstElementChild.textContent=label;
      option.onclick=()=>{try{if(view.choose){if(view.choose(id)===false)return;}else{ctx.theme.setTheme(id);view.status.textContent='';}updateMode(view,id);closeMode(true);}catch(error){view.status.textContent=error.message;}};
      list.append(option);
    }
    if(view.searchable)filterChoices();
    if(focusedValue!==undefined)(Array.from(list.children).find(option=>option.value===focusedValue&&!option.hidden)||modePopup.querySelector('input'))?.focus();
  }
  function openMode(view,edge){
    closeMode();modeOwner=view;
    modePopup=document.createElement('div');modePopup.className='codsh-appearance-menu';
    modePopup.id=`codsh-appearance-menu-${++popupSequence}`;
    modePopup.setAttribute('role',view.searchable?'dialog':'menu');modePopup.setAttribute('aria-label',view.label||'明暗模式');modePopup.dataset.codshSurface='menu';
    view.mode.setAttribute('aria-controls',modePopup.id);view.mode.setAttribute('aria-expanded','true');
    if(view.searchable){
      modePopup.classList.add('codsh-font-menu');
      const search=document.createElement('input');search.type='search';search.className='codsh-font-search';search.placeholder='搜索中文或英文字体名称…';search.setAttribute('aria-label','搜索字体');search.oninput=filterChoices;
      const list=document.createElement('div');list.className='codsh-font-options';list.id=modePopup.id+'-options';list.setAttribute('role','menu');list.setAttribute('aria-label','字体选项');search.setAttribute('aria-controls',list.id);
      const empty=document.createElement('p');empty.className='codsh-font-empty';empty.textContent='没有匹配的字体';empty.setAttribute('role','status');empty.hidden=true;
      modePopup.append(search,list,empty);
    }
    renderChoices(view);
    document.body.append(modePopup);positionMode();
    const options=Array.from(modePopup.querySelectorAll('[role="menuitemradio"]'));
    (edge==='first'?options[0]:edge==='last'?options.at(-1):view.searchable?modePopup.querySelector('input'):options.find(option=>option.value===view.mode.value)||options[0])?.focus();
    if(!edge)options.find(option=>option.value===view.mode.value)?.scrollIntoView?.({block:'nearest'});
    view.onOpen?.();
  }
  function createDropdown(label,choices,choose,status,settings={}){
    const mode=document.createElement('button');mode.type='button';mode.className='codsh-appearance-trigger';
    mode.setAttribute('aria-haspopup',settings.searchable?'dialog':'menu');mode.setAttribute('aria-expanded','false');
    mode.innerHTML='<span></span><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 8 5 5 5-5"/></svg>';
    const view={...settings,mode,modeLabel:mode.firstElementChild,label,choices,choose,status,update:value=>updateMode(view,value),setChoices(next){view.choices=next;updateMode(view,mode.value);if(modeOwner===view){renderChoices(view);positionMode();}}};
    mode.onclick=()=>modeOwner===view?closeMode(true):openMode(view);
    mode.onkeydown=event=>{if(['ArrowDown','ArrowUp'].includes(event.key)){event.preventDefault();openMode(view,event.key==='ArrowDown'?'first':'last');}};
    return view;
  }
  const typography=createTypography(createDropdown);
  const outsideMode=event=>{if(modePopup&&!modePopup.contains(event.target)&&!modeOwner.mode.contains(event.target))closeMode();};
  const modeKeyboard=event=>{
    if(!modePopup||event.isComposing)return;
    if(event.key==='Escape'){event.preventDefault();event.stopPropagation();closeMode(true);return;}
    if(event.key==='Tab'){closeMode(true);return;}
    const searching=event.target===modePopup.querySelector('input');
    const options=Array.from(modePopup.querySelectorAll('[role="menuitemradio"]')).filter(option=>!option.hidden);
    if(searching&&event.key==='Enter'){event.preventDefault();event.stopPropagation();options[0]?.click();return;}
    if(!['ArrowDown','ArrowUp','Home','End'].includes(event.key)||searching&&['Home','End'].includes(event.key))return;
    event.preventDefault();event.stopPropagation();
    const current=options.indexOf(document.activeElement);
    const next=event.key==='Home'?0:event.key==='End'?options.length-1:current<0?(event.key==='ArrowDown'?0:options.length-1):(current+(event.key==='ArrowDown'?1:-1)+options.length)%options.length;
    options[next]?.focus();options[next]?.scrollIntoView?.({block:'nearest'});
  };
  const modeScroll=event=>{if(modePopup&&!modePopup.contains(event.target))closeMode();};
  document.addEventListener('pointerdown',outsideMode,true);
  document.addEventListener('keydown',modeKeyboard,true);
  document.addEventListener('scroll',modeScroll,true);
  window.addEventListener('resize',positionMode);
  window.visualViewport?.addEventListener('resize',positionMode);
  window.visualViewport?.addEventListener('scroll',positionMode);
  const wallpaperActive=()=>document.body.hasAttribute('data-we-wallpaper')||document.body.hasAttribute('data-we-glass-page');
  let externalBackground=wallpaperActive();
  let customUrl='',customUrlSource='';
  function customImageUrl(){
    if(!custom)return '';
    if(customUrlSource===custom)return customUrl;
    if(customUrl.startsWith('blob:'))URL.revokeObjectURL(customUrl);
    customUrlSource=custom;
    if(typeof URL.createObjectURL!=='function'){customUrl=custom;return customUrl;}
    const [header,encoded]=custom.split(',');
    const bytes=Uint8Array.from(atob(encoded),character=>character.charCodeAt(0));
    customUrl=URL.createObjectURL(new Blob([bytes],{type:header.slice(5,header.indexOf(';'))}));
    return customUrl;
  }
  try{selected=localStorage.getItem(key)||'none';}catch{}
  try{paletteId=localStorage.getItem(key+'.palette')||(selected==='custom'?'none':selected);}catch{}
  const sheet=document.createElement('style');sheet.dataset.codshBackground='';document.head.append(sheet);
  const layer=document.createElement('div');layer.className='codsh-wallpaper-layer';layer.setAttribute('aria-hidden','true');document.body.append(layer);
  function database(){return new Promise((resolve,reject)=>{
    if(!window.indexedDB){reject(Error('当前环境不支持本机图片存储'));return;}
    const request=indexedDB.open('codsh-backgrounds',1);
    request.onupgradeneeded=()=>request.result.createObjectStore('images');
    request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error);
  });}
  async function imageStore(value){const db=await database();try{return await new Promise((resolve,reject)=>{
    const tx=db.transaction('images',value===undefined?'readonly':'readwrite');
    const request=value===undefined?tx.objectStore('images').get('custom'):tx.objectStore('images').put(value,'custom');
    tx.oncomplete=()=>resolve(request.result);tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error||Error('图片保存失败'));
  });}finally{db.close();}}
  function paint(){
    if(disposed)return;
    const url=selected==='custom'?customImageUrl():BACKGROUND_PRESETS.find(p=>p.id===selected)?.url;
    document.documentElement.toggleAttribute('data-codsh-background',!externalBackground&&!!url);
    document.documentElement.toggleAttribute('data-codsh-palette',paletteId!=='none');
    document.documentElement.setAttribute('data-codsh-background-source',externalBackground?'codsh':'native');
    sheet.textContent=(url?`html[data-codsh-theme]{--codsh-background-image:url(${JSON.stringify(url)})}`:'')+
      (paletteId==='none'?'':`html[data-codsh-theme][data-codsh-palette] body{${palette(paletteId,false)}}
html[data-codsh-theme][data-codsh-palette] body:not([data-ds-dark-theme]){${palette(paletteId,true)}}`);
    for(const view of views.values()){
      view.hint.textContent=externalBackground?'背景由此处统一管理，保留壁纸引擎的玻璃效果。':'';
      for(const button of view.grid.querySelectorAll('[data-background]'))button.setAttribute('aria-pressed',String(button.dataset.background===paletteId));
    }
  }
  function choose(id){localStorage.setItem(key,id);if(id!=='custom'){localStorage.setItem(key+'.palette',id);paletteId=id;}selected=id;revision++;paint();}
  const initialRevision=revision;
  imageStore().then(value=>{if(disposed||custom)return;custom=typeof value==='string'&&/^data:image\/(png|jpeg|webp|gif);base64,/.test(value)?value:'';if(initialRevision===revision)paint();}).catch(()=>{});
  paint();
  function refresh(){
    typography.refresh();
    const external=wallpaperActive();
    if(external!==externalBackground){externalBackground=external;paint();}
    document.querySelectorAll('[data-trajectory-scroll]').forEach(scroll=>mark(scroll.closest(local('root')),'data-codsh-trajectory'));
    document.querySelectorAll(local('page')).forEach(page=>{
      if(page.querySelector(local('pageHeading'))&&page.querySelector(local('filterTab')))mark(page,'data-codsh-automation');
    });
    for(const [row,view] of views)if(!row.isConnected){if(modeOwner&&view.box.contains(modeOwner.mode))closeMode();view.box.remove();views.delete(row);}
    document.querySelectorAll('[data-shortcut-modal="settings"] [class$="_cubeRow"],[data-shortcut-modal="settings"] [class*="_cubeRow "]').forEach(row=>{
      mark(row,'data-codsh-native-appearance');
      let view=views.get(row);
      if(!view){
        const box=document.createElement('div');box.className='codsh-appearance';
        const status=document.createElement('p');status.className='codsh-background-status';status.setAttribute('role','status');
        const line=document.createElement('div');line.className='codsh-appearance-mode';line.append('明暗模式');
        view=createDropdown('明暗模式',modes,id=>{ctx.theme.setTheme(id);status.textContent='';},status);
        const {mode}=view;
        line.append(mode);
        const title=document.createElement('h3');title.textContent='背景主题';
        const hint=document.createElement('p');hint.className='codsh-background-hint';
        const grid=document.createElement('div');grid.className='codsh-background-grid';
        for(const preset of [{id:'none'},...BACKGROUND_PRESETS]){
          const button=document.createElement('button');button.type='button';button.dataset.background=preset.id;
          const preview=document.createElement('span');preview.className='codsh-background-preview';
          if(preset.url)preview.style.backgroundImage=`url("${preset.url}")`;
          const label=names[preset.id]||'默认';
          button.append(preview,document.createTextNode(label));button.setAttribute('aria-pressed',String(paletteId===preset.id));
          button.onclick=()=>{try{choose(preset.id);status.textContent='';}catch(error){status.textContent=error.message;}};grid.append(button);
        }
        const upload=document.createElement('input');upload.type='file';upload.accept='image/png,image/jpeg,image/webp,image/gif';upload.hidden=true;
        const change=document.createElement('button');change.type='button';change.className='codsh-background-upload';change.textContent='选择自定义背景图片';change.onclick=()=>upload.click();
        upload.onchange=async()=>{
          const file=upload.files?.[0];if(!file)return;
          change.disabled=true;
          try{
            const extension=file.name.split('.').pop().toLowerCase();
            const mime=file.type||({png:'image/png',jpg:'image/jpeg',jpeg:'image/jpeg',webp:'image/webp',gif:'image/gif'})[extension];
            if(!/^image\/(png|jpeg|webp|gif)$/.test(mime||''))throw Error('请选择 PNG、JPEG、WebP 或 GIF 图片');
            if(file.size>20*1024*1024)throw Error('请选择不超过 20MB 的图片');
            const data=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=()=>reject(Error('图片读取失败'));reader.readAsDataURL(new Blob([file],{type:mime}));});
            await new Promise((resolve,reject)=>{const image=new Image();image.onload=resolve;image.onerror=()=>reject(Error('图片无法解码，请选择其他图片'));image.src=data;});
            await imageStore(data);if(disposed)return;custom=data;choose('custom');status.textContent='已保存到本机';
          }catch(error){if(!disposed)status.textContent=error.message;}finally{change.disabled=false;upload.value='';}
        };
        box.append(line,typography.mount(),title,hint,grid,change,upload,status);row.after(box);Object.assign(view,{box,grid,hint});views.set(row,view);paint();
      }
      if(view.box.previousElementSibling!==row)row.after(view.box);
      const preference=ctx.theme.getTheme?.().preference;
      const buttons=Array.from(row.querySelectorAll('button'));
      updateMode(view,preference||['light','dark','system'][buttons.findIndex(button=>button.getAttribute('aria-pressed')==='true')]||'system');
    });
  }
  return {refresh,dispose(){disposed=true;closeMode();typography.dispose();document.removeEventListener('pointerdown',outsideMode,true);document.removeEventListener('keydown',modeKeyboard,true);document.removeEventListener('scroll',modeScroll,true);window.removeEventListener('resize',positionMode);window.visualViewport?.removeEventListener('resize',positionMode);window.visualViewport?.removeEventListener('scroll',positionMode);if(customUrl.startsWith('blob:'))URL.revokeObjectURL(customUrl);for(const view of views.values())view.box.remove();views.clear();sheet.remove();layer.remove();document.documentElement.removeAttribute('data-codsh-background');document.documentElement.removeAttribute('data-codsh-palette');document.documentElement.removeAttribute('data-codsh-background-source');}};
}
