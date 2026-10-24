// Device-local text preferences share the same appearance controls as backgrounds.
function createTypography(createDropdown) {
  const key='codsh.typography';
  const fonts=[
    ['default','默认字体'],['Microsoft YaHei','微软雅黑'],['Microsoft YaHei UI','微软雅黑 UI'],['SimSun','宋体'],['KaiTi','楷体'],['SimHei','黑体'],['DengXian','等线'],['FangSong','仿宋'],
    ['STSong','华文宋体 · STSong'],['STKaiti','华文楷体 · STKaiti'],['STFangsong','华文仿宋 · STFangsong'],['STHeiti','华文黑体 · STHeiti'],['STXihei','华文细黑 · STXihei'],['STZhongsong','华文中宋 · STZhongsong'],
    ['STXingkai','华文行楷 · STXingkai'],['STXinwei','华文新魏 · STXinwei'],['STHupo','华文琥珀 · STHupo'],['STLiti','华文隶书 · STLiti'],['YouYuan','幼圆'],['LiSu','隶书'],['FZShuTi','方正舒体 · FZShuTi'],['FZYaoTi','方正姚体 · FZYaoTi'],
    ['LXGW WenKai','霞鹜文楷 · LXGW WenKai'],['LXGW WenKai Screen','霞鹜文楷屏幕版 · LXGW WenKai Screen'],['LXGW Neo XiHei','霞鹜新晰黑 · LXGW Neo XiHei'],
    ['Source Han Sans SC','思源黑体 · Source Han Sans SC'],['Source Han Serif SC','思源宋体 · Source Han Serif SC'],['Noto Sans SC','Noto Sans SC'],['Noto Serif SC','Noto Serif SC'],
    ['MiSans','小米 MiSans'],['HarmonyOS Sans SC','鸿蒙 HarmonyOS Sans SC'],['Alibaba PuHuiTi 3.0','阿里巴巴普惠体 · Alibaba PuHuiTi 3.0'],['OPPO Sans','OPPO Sans'],['Smiley Sans','得意黑 · Smiley Sans'],
    ['PingFang SC','苹方 · PingFang SC'],['Hiragino Sans GB','冬青黑体 · Hiragino Sans GB'],['Heiti SC','黑体-简 · Heiti SC'],['Songti SC','宋体-简 · Songti SC'],['Kaiti SC','楷体-简 · Kaiti SC'],
    ['Segoe UI','Segoe UI'],['Arial','Arial'],['Verdana','Verdana'],['Tahoma','Tahoma'],['Trebuchet MS','Trebuchet MS'],['Times New Roman','Times New Roman'],['Georgia','Georgia'],['Inter','Inter'],['Roboto','Roboto'],['Noto Sans','Noto Sans'],
    ['Consolas','Consolas'],['Cascadia Code','Cascadia Code'],['JetBrains Mono','JetBrains Mono'],['Fira Code','Fira Code'],['custom','自定义字体']
  ];
  const defaults=()=>({font:'default',customFamily:'',light:'',dark:''});
  const family=value=>typeof value==='string'&&/^[^"'\\;{}<>\u0000-\u001f\u007f\ufffd]{1,80}$/.test(value.trim())?value.trim():'';
  const validFont=value=>fonts.some(([id])=>id===value)||(typeof value==='string'&&value.startsWith('sys:')&&family(value.slice(4))===value.slice(4)&&!!family(value.slice(4)));
  function color(value){
    if(typeof value!=='string')return '';
    const hex=value.trim().toLowerCase();
    return /^#[\da-f]{6}$/.test(hex)?hex:/^#[\da-f]{3}$/.test(hex)?'#'+Array.from(hex.slice(1),digit=>digit+digit).join(''):'';
  }
  let state=defaults();
  try {
    const stored=JSON.parse(localStorage.getItem(key));
    if(stored&&typeof stored==='object')state={font:validFont(stored.font)?stored.font:'default',customFamily:family(stored.customFamily),light:color(stored.light),dark:color(stored.dark)};
  } catch { /* Invalid or unavailable storage keeps the default theme. */ }
  const views=new Set(),sheet=document.createElement('style');sheet.dataset.codshTypography='';document.head.append(sheet);
  let installed=[],scanned=false,loading=false,disposed=false,scanController,scanTimer;
  let scanMessage='打开列表可读取本机字体；常用选项需要先安装对应字体。';
  function choices(){
    const result=fonts.slice(0,-1),seen=new Set(fonts.map(([id])=>id.toLocaleLowerCase()));
    for(const name of installed)if(!seen.has(name.toLocaleLowerCase())){result.push(['sys:'+name,name]);seen.add(name.toLocaleLowerCase());}
    if(state.font.startsWith('sys:')&&!result.some(([id])=>id===state.font))result.push([state.font,state.font.slice(4)]);
    return [...result,fonts.at(-1)];
  }
  function paintScan(){
    for(const view of views){
      if(view.scanStatus.textContent!==scanMessage)view.scanStatus.textContent=scanMessage;
      if(view.scan.disabled!==loading)view.scan.disabled=loading;
      const label=loading?'正在读取…':scanned?'重新读取本机字体':'读取本机字体';if(view.scan.textContent!==label)view.scan.textContent=label;
    }
  }
  async function loadFonts(force=false){
    if(disposed||loading||scanned&&!force)return;
    loading=true;scanMessage='正在读取本机已安装的字体…';paintScan();
    const controller=new AbortController();scanController=controller;
    scanTimer=setTimeout(()=>controller.abort(),35000);
    try{
      const response=await fetch('/wallpaper-engine/system-fonts'+(force?'?refresh=1':''),{cache:'no-store',signal:controller.signal});
      if(!response.ok)throw Error('request');
      const data=await response.json();
      if(!data||data.ok!==true||!Array.isArray(data.fonts))throw Error('fonts');
      if(disposed)return;
      const found=Array.from(new Set(data.fonts.slice(0,2000).map(family).filter(name=>name&&!name.startsWith('.')&&name!=='default'&&name!=='custom'))).sort((a,b)=>a.localeCompare(b));
      if(!found.length)throw Error('empty');installed=found;
      scanned=true;
      scanMessage=`已读取 ${installed.length} 种本机字体${data.approximate?'（名称由系统信息推测）':''}${data.stale?'；后台扫描中，稍后可重新读取':'；可搜索中文或英文名称'}。`;
      const next=choices();for(const view of views)view.dropdown.setChoices(next);paint();
    }catch{
      if(!disposed)scanMessage='暂时无法读取本机字体；仍可选择常用字体或填写自定义名称，稍后可重试。';
    }finally{
      clearTimeout(scanTimer);scanController=undefined;loading=false;if(!disposed)paintScan();
    }
  }
  function paint(){
    const selected=state.font==='custom'?state.customFamily:state.font==='default'?'':state.font.startsWith('sys:')?state.font.slice(4):state.font;
    document.documentElement.toggleAttribute('data-codsh-font',!!selected);
    document.documentElement.toggleAttribute('data-codsh-text-color',!!state[document.body.hasAttribute('data-ds-dark-theme')?'dark':'light']);
    let css=selected?`html[data-codsh-theme][data-codsh-font] body{--codsh-ui-font:${JSON.stringify(selected)},var(--codsh-default-ui-font)!important;--dsw-font-family:var(--codsh-ui-font)!important;--ds-font-family:var(--codsh-ui-font)!important}`:'';
    for(const mode of ['light','dark']){
      const primary=state[mode];if(!primary)continue;
      const secondary=primary+'cc',tertiary=primary+'aa';
      const tokens={'--codsh-text':primary,'--codsh-title':primary,'--codsh-muted':secondary,'--codsh-description':secondary,
        '--codsh-tone-dedede':primary,'--codsh-tone-ddd':primary,'--codsh-tone-ececec':primary,'--codsh-tone-bdbdbd':secondary,'--codsh-tone-a5a5a5':tertiary,
        '--dsw-alias-label-primary':primary,'--dsw-alias-label-primary-bluish':primary,'--dsw-alias-label-secondary':secondary,
        '--dsw-alias-label-tertiary':tertiary,'--dsw-alias-label-caption':tertiary,'--dsw-alias-label-dimmed':primary+'80'};
      css+=`html[data-codsh-theme][data-codsh-text-color] body${mode==='dark'?'[data-ds-dark-theme]':':not([data-ds-dark-theme])'}{${Object.entries(tokens).map(([name,value])=>`${name}:${value}!important`).join(';')};color:var(--codsh-text)}`;
    }
    if(sheet.textContent!==css)sheet.textContent=css;
    for(const view of views){
      view.dropdown.update(state.font);
      view.custom.hidden=state.font!=='custom';
      if(document.activeElement!==view.family&&view.family.getAttribute('aria-invalid')!=='true')view.family.value=state.customFamily;
      for(const [mode,row] of Object.entries(view.colors)){
        row.picker.value=state[mode]||(mode==='dark'?'#dedede':'#202124');
        if(row.hex.getAttribute('aria-invalid')!=='true')row.hex.value=state[mode];
        if(row.reset.disabled!==!state[mode])row.reset.disabled=!state[mode];
      }
    }
  }
  function save(patch,status){
    try {
      const next={...state,...patch};localStorage.setItem(key,JSON.stringify(next));state=next;paint();status.textContent='已保存到本机';return true;
    } catch(error){status.textContent=error.message||'设置保存失败';return false;}
  }
  function mount(){
    const box=document.createElement('section');box.className='codsh-typography';box.setAttribute('aria-label','字体与文字颜色');
    const heading=document.createElement('h3');heading.textContent='字体与文字颜色';
    const hint=document.createElement('p');hint.className='codsh-background-hint';hint.textContent='选择本机已安装的字体；代码和终端保留等宽字体，浅深色文字颜色分别保存。';
    const status=document.createElement('p');status.className='codsh-typography-status';status.setAttribute('role','status');
    const line=document.createElement('div');line.className='codsh-appearance-mode';line.append('界面字体');
    const dropdown=createDropdown('界面字体',choices(),value=>save({font:value},status),status,{searchable:true,onOpen:()=>loadFonts()});dropdown.mode.classList.add('codsh-font-trigger');line.append(dropdown.mode);
    const scanLine=document.createElement('div');scanLine.className='codsh-font-scan';
    const scanStatus=document.createElement('p');scanStatus.className='codsh-font-scan-status';scanStatus.setAttribute('role','status');
    const scan=document.createElement('button');scan.type='button';scan.onclick=()=>loadFonts(true);scanLine.append(scanStatus,scan);
    const custom=document.createElement('div');custom.className='codsh-font-custom';
    const input=document.createElement('input');input.type='text';input.maxLength=80;input.placeholder='例如：霞鹜文楷';input.setAttribute('aria-label','自定义字体名称');
    const apply=document.createElement('button');apply.type='button';apply.textContent='应用字体';
    const commit=()=>{const value=family(input.value);if(!value){input.setAttribute('aria-invalid','true');status.textContent='请输入有效的字体名称（最多 80 字，不填写 CSS 代码）';return;}if(save({customFamily:value},status))input.removeAttribute('aria-invalid');};
    apply.onclick=commit;input.onkeydown=event=>{if(event.key==='Enter'){event.preventDefault();commit();}};custom.append(input,apply);
    const colors={};
    for(const [mode,label] of [['light','浅色模式字体颜色'],['dark','深色模式字体颜色']]){
      const row=document.createElement('div');row.className='codsh-text-color-row';
      const title=document.createElement('span');title.textContent=label;
      const controls=document.createElement('div');controls.className='codsh-color-controls';
      const picker=document.createElement('input');picker.type='color';picker.setAttribute('aria-label',label);
      const hex=document.createElement('input');hex.type='text';hex.maxLength=7;hex.spellcheck=false;hex.placeholder=mode==='light'?'#202124':'#dedede';hex.className='codsh-color-hex';hex.setAttribute('aria-label',label+' HEX');
      const reset=document.createElement('button');reset.type='button';reset.textContent='跟随主题';reset.setAttribute('aria-label',label+'跟随主题');
      picker.oninput=()=>{if(save({[mode]:picker.value},status))hex.removeAttribute('aria-invalid');};
      hex.onchange=()=>{const value=hex.value.trim()?color(hex.value):'';if(hex.value.trim()&&!value){hex.setAttribute('aria-invalid','true');status.textContent='请输入 #RRGGBB 或 #RGB 格式的颜色';return;}if(save({[mode]:value},status))hex.removeAttribute('aria-invalid');};
      reset.onclick=()=>{if(save({[mode]:''},status)){hex.removeAttribute('aria-invalid');hex.value='';}};
      controls.append(picker,hex,reset);row.append(title,controls);box.append(row);colors[mode]={picker,hex,reset};
    }
    const preview=document.createElement('p');preview.className='codsh-typography-preview';preview.textContent='字体预览 · 你好，Codsh · Aa 0123456789';
    const reset=document.createElement('button');reset.type='button';reset.className='codsh-typography-reset';reset.textContent='恢复默认字体和颜色';
    reset.onclick=()=>{try{localStorage.removeItem(key);state=defaults();input.removeAttribute('aria-invalid');for(const row of Object.values(colors))row.hex.removeAttribute('aria-invalid');paint();status.textContent='已恢复默认字体和颜色';}catch(error){status.textContent=error.message;}};
    box.prepend(heading,hint,line,scanLine,custom);box.append(preview,reset,status);
    const view={box,dropdown,custom,family:input,colors,scan,scanStatus};views.add(view);paint();paintScan();return box;
  }
  paint();
  return {mount,refresh(){for(const view of views)if(!view.box.isConnected)views.delete(view);paint();},dispose(){disposed=true;scanController?.abort();clearTimeout(scanTimer);for(const view of views)view.box.remove();views.clear();sheet.remove();document.documentElement.removeAttribute('data-codsh-font');document.documentElement.removeAttribute('data-codsh-text-color');}};
}
