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
    }).map(([key,value])=>`${key}:${value}`).join(';');
  }
  const views=new Map(),key='codsh.background';
  let selected='none',custom='',disposed=false,revision=0;
  let paletteId='none';
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
    document.documentElement.toggleAttribute('data-codsh-background',!!url);
    sheet.textContent=url?`html[data-codsh-theme][data-codsh-background]{--codsh-background-image:url(${JSON.stringify(url)})}
${paletteId==='none'?'':`html[data-codsh-theme][data-codsh-background] body{${palette(paletteId,false)}}
html[data-codsh-theme][data-codsh-background] body:not([data-ds-dark-theme]){${palette(paletteId,true)}}`}`:'';
    for(const view of views.values())for(const button of view.grid.querySelectorAll('[data-background]'))button.setAttribute('aria-pressed',String(button.dataset.background===paletteId));
  }
  function choose(id){localStorage.setItem(key,id);if(id!=='custom'){localStorage.setItem(key+'.palette',id);paletteId=id;}selected=id;revision++;paint();}
  const initialRevision=revision;
  imageStore().then(value=>{if(disposed||custom)return;custom=typeof value==='string'&&/^data:image\/(png|jpeg|webp|gif);base64,/.test(value)?value:'';if(initialRevision===revision)paint();}).catch(()=>{});
  paint();
  function refresh(){
    document.querySelectorAll('[data-trajectory-scroll]').forEach(scroll=>mark(scroll.closest(local('root')),'data-codsh-trajectory'));
    document.querySelectorAll(local('page')).forEach(page=>{
      if(page.querySelector(local('pageHeading'))&&page.querySelector(local('filterTab')))mark(page,'data-codsh-automation');
    });
    for(const [row,view] of views)if(!row.isConnected){view.box.remove();views.delete(row);}
    document.querySelectorAll('[data-shortcut-modal="settings"] [class$="_cubeRow"],[data-shortcut-modal="settings"] [class*="_cubeRow "]').forEach(row=>{
      mark(row,'data-codsh-native-appearance');
      let view=views.get(row);
      if(!view){
        const box=document.createElement('div');box.className='codsh-appearance';
        const line=document.createElement('label');line.className='codsh-appearance-mode';line.append('明暗模式');
        const mode=document.createElement('select');mode.setAttribute('aria-label','明暗模式');
        for(const [id,label] of [['light','浅色'],['dark','深色'],['system','跟随系统']])mode.add(new Option(label,id));
        mode.onchange=()=>{try{ctx.theme.setTheme(mode.value);}catch(error){status.textContent=error.message;}};line.append(mode);
        const title=document.createElement('h3');title.textContent='背景主题';
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
        const status=document.createElement('p');status.className='codsh-background-status';status.setAttribute('role','status');
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
        box.append(line,title,grid,change,upload,status);row.after(box);view={box,mode,grid};views.set(row,view);
      }
      if(view.box.previousElementSibling!==row)row.after(view.box);
      const preference=ctx.theme.getTheme?.().preference;
      const buttons=Array.from(row.querySelectorAll('button'));
      view.mode.value=preference||['light','dark','system'][buttons.findIndex(button=>button.getAttribute('aria-pressed')==='true')]||'system';
    });
  }
  return {refresh,dispose(){disposed=true;if(customUrl.startsWith('blob:'))URL.revokeObjectURL(customUrl);for(const view of views.values())view.box.remove();views.clear();sheet.remove();document.documentElement.removeAttribute('data-codsh-background');}};
}
