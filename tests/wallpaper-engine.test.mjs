import {readFile, access} from 'node:fs/promises';
import {join} from 'node:path';
import {wallpaperDirectory} from '../compat/wallpaper-install.js';
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {JSDOM, VirtualConsole} from 'jsdom';
import {patchWallpaperEngine, compatibilityMarker} from '../scripts/wallpaper-engine-compat.mjs';

const bridge = await readFile(new URL('../compat/wallpaper-engine.js', import.meta.url), 'utf8');
const saved = {id:'up-existing', rotationEnabled:true, themeFollow:true, fontCustom:true,
  uiColorCustom:true, accent:'#ff0000', leftSidebarCornerRadius:'20', parallaxEnabled:true,
  thinkingNative:true, extraGlassSelectors:'.custom-panel', blur:24, ropeShown:true, fxEnabled:true};
const tick = () => new Promise(resolve => setTimeout(resolve, 0));

test('compatibility pauses conflicting runtime values, preserves persistence and restores on disable', async () => {
  const dom = new JSDOM('<!doctype html><html><body></body></html>', {runScripts:'outside-only'});
  const w = dom.window;
  w.eval(`const selection = ${JSON.stringify(saved)};
    const sanitizeWallpaperSettings = value => ({...value});
    const calls = [];
    const applySelection = id => calls.push(['wallpaper',id]);
    const reapplyAll = () => calls.push(['effects']);
    const emit = () => calls.push(['render']);
    ${bridge}
    window.subject = {selection, calls, install:installCodshCompatibility,
      mask:codshMaskCurrentSettings, serialize:codshSerializeSettings,
      sanitize:sanitizeSettings, remember:codshRememberSettings, tabs:codshVisibleTabs};`);
  const subject = w.subject, dispose = subject.install();
  assert.equal(subject.selection.id, 'up-existing');
  w.document.documentElement.setAttribute('data-codsh-theme','');
  await tick();
  for (const key of ['rotationEnabled','themeFollow','fontCustom','uiColorCustom','parallaxEnabled','thinkingNative']) assert.equal(subject.selection[key], false, key);
  assert.equal(subject.selection.id, '');
  assert.equal(subject.selection.leftSidebarCornerRadius, 'native');
  assert.equal(subject.selection.extraGlassSelectors, '');
  for (const key of ['blur','ropeShown','fxEnabled']) assert.equal(subject.selection[key], saved[key], key);
  assert.deepEqual(JSON.parse(JSON.stringify(subject.serialize(subject.selection))), {...saved,pickerOpen:false,pickerDraft:false});
  // Whole-profile presets must not revive a hidden feature or lose the user's settings.
  Object.assign(subject.selection, {id:'preset-image',themeFollow:true,fontCustom:true,parallaxEnabled:true,blur:32});
  subject.mask();
  assert.equal(subject.selection.id, '');
  assert.equal(subject.selection.themeFollow, false);
  assert.equal(subject.serialize(subject.selection).id, 'up-existing');
  assert.equal(subject.serialize(subject.selection).blur, 32);
  assert.deepEqual(Array.from(subject.tabs([{id:'wallpaper'},{id:'library'},{id:'appearance'},{id:'playback'},{id:'extensions'}]), tab=>tab.id), ['appearance','extensions']);
  w.document.documentElement.removeAttribute('data-codsh-theme');await tick();
  assert.equal(subject.selection.id, 'up-existing');
  assert.equal(subject.selection.fontCustom, true);
  assert.equal(subject.selection.parallaxEnabled, true);
  assert.equal(subject.selection.blur, 32, 'glass edits survive leaving compatibility mode');
  dispose();
  const count=subject.calls.length;
  w.document.documentElement.setAttribute('data-codsh-theme','');await tick();
  assert.equal(subject.calls.length,count,'observer is released');
  w.close();
});

test('host settings replace stale client cache without persisting the runtime mask', () => {
  const dom = new JSDOM('<!doctype html><html data-codsh-theme><body></body></html>', {runScripts:'outside-only'});
  dom.window.eval(`const selection = {}; const sanitizeWallpaperSettings = value => ({...value}); ${bridge}
    window.subject = {sanitize:sanitizeSettings,remember:codshRememberSettings,serialize:codshSerializeSettings};`);
  const subject=dom.window.subject;
  subject.sanitize({id:'stale-cache',fontCustom:false});
  const result=subject.sanitize(subject.remember(saved,true));
  assert.equal(result.id,'');
  assert.equal(subject.serialize(result).id,'up-existing');
  assert.equal(subject.serialize(result).fontCustom,true);
  dom.window.close();
});

let upstream;
const engineDirectory=wallpaperDirectory();
try {
  const file=join(engineDirectory,'lib/client.js');
  let original=file;
  try {await access(file+'.codsh-original');original=file+'.codsh-original';} catch {}
  upstream=await readFile(original,'utf8');
} catch {}

test('installed Wallpaper Engine bundle loads, hides both wallpaper pages and guards native handlers', {skip:!upstream}, async () => {
  const patched=await patchWallpaperEngine(upstream);
  assert.ok(patched.includes(compatibilityMarker));
  assert.equal(await patchWallpaperEngine(patched),patched,'installation is idempotent');
  await assert.rejects(patchWallpaperEngine(upstream.replace('function syncLayers()', 'function upstreamChanged()')),/接口不匹配/);
  const virtualConsole=new VirtualConsole();
  const dom=new JSDOM('<!doctype html><html data-codsh-theme><head></head><body></body></html>',{runScripts:'outside-only',url:'http://localhost',virtualConsole});
  const errors=[];
  virtualConsole.on('jsdomError',error=>{if(error.type!=='css parsing')errors.push(error.message);});
  const w=dom.window;
  w.HTMLCanvasElement.prototype.getContext=()=>null;
  w.localStorage.setItem('dsh-wallpaper-engine:selection',JSON.stringify(saved));
  w.fetch=async()=>({ok:false,status:404,text:async()=>''});
  let subject;
  w.__ModuleLoader__={load(entry){subject=entry.factory(name=>name==='react'?{createElement:(type,props,...children)=>({type,props,children}),Fragment:'fragment'}:{}).subject;}};
  w.eval(patched.replace('return module.exports;', `exports.subject={selection,serializeSelection,loadPersisted,setSetting,applySelection,
    codshVisibleTabs,QP_TABS,PICKER_TABS,qpRenderCurrent,qpRenderRotation,qpRenderPropsButton,
    renderAppearanceThemeSection,renderAppearanceFontSection,renderAppearanceSidebarCornersSection,
    renderAppearanceUiColorSection,renderParallaxIsland,renderWallpaperTab,renderAudioTab}; return module.exports;`));
  assert.deepEqual(Array.from(subject.codshVisibleTabs(subject.QP_TABS),tab=>tab.id),['appearance']);
  assert.deepEqual(Array.from(subject.codshVisibleTabs(subject.PICKER_TABS),tab=>tab.id),['appearance','system','extensions','about']);
  for(const [key,value] of Object.entries(subject))if(/^(qpRender|render)/.test(key))assert.equal(value(),null,key);
  subject.setSetting('fontCustom',true);
  assert.equal(subject.selection.fontCustom,false);
  assert.equal(subject.serializeSelection().fontCustom,true);
  subject.applySelection('preset-image',{fromManual:true});
  assert.equal(subject.selection.id,'');
  assert.equal(subject.selection.url,null);
  assert.equal(w.document.getElementById('dsh-wallpaper-engine-layer'),null);
  assert.equal(subject.serializeSelection().id,'up-existing');
  const host={...saved,id:'host-image',fontCustom:false};
  w.fetch=async()=>({ok:true,status:200,text:async()=>JSON.stringify({settings:host})});
  await subject.loadPersisted();
  assert.equal(subject.selection.id,'');
  assert.equal(subject.serializeSelection().id,'host-image');
  assert.equal(subject.serializeSelection().fontCustom,false);
  assert.deepEqual(errors,[]);
  w.close();
});
