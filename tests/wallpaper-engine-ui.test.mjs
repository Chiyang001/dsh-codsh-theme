// Render the installed plugin with React 18, matching its declared peer range.
import {readFile, access, mkdir, writeFile} from 'node:fs/promises';
import {join} from 'node:path';
import {wallpaperDirectory} from '../compat/wallpaper-install.js';
import {test} from 'node:test';
import React, {act} from 'react';
import * as ReactDOM from 'react-dom';
import {createRoot} from 'react-dom/client';
import assert from 'node:assert/strict';
import {JSDOM, VirtualConsole} from 'jsdom';
import {patchWallpaperEngine} from '../scripts/wallpaper-engine-compat.mjs';

const engine=join(wallpaperDirectory(),'lib/client.js');
let available=true;
try {await access(engine);} catch {available=false;}
test('real React renders both compatibility panels and restores the original wallpaper page without Codsh', {skip:!available}, async () => {
  const original=await readFile(engine,'utf8');
  const patched=await patchWallpaperEngine(original);
  const dom=new JSDOM('<!doctype html><html data-codsh-theme><head></head><body></body></html>',{
    runScripts:'outside-only',url:'http://localhost',virtualConsole:new VirtualConsole(),pretendToBeVisual:true,
  });
  const w=dom.window;
  const previousWindow=globalThis.window,previousDocument=globalThis.document,previousAct=globalThis.IS_REACT_ACT_ENVIRONMENT;
  globalThis.window=w;globalThis.document=w.document;globalThis.IS_REACT_ACT_ENVIRONMENT=true;
  w.localStorage.setItem('dsh-wallpaper-engine:qp-tab','wallpaper');
  w.localStorage.setItem('dsh-wallpaper-engine:picker-tab','library');
  w.HTMLCanvasElement.prototype.getContext=()=>null;
  w.fetch=async()=>({ok:false,status:404,text:async()=>''});
  let subject;
  w.__ModuleLoader__={load(entry){subject=entry.factory(name=>name==='react'?React:ReactDOM).subject;}};
  w.eval(patched.replace('return module.exports;', 'exports.subject={QuickPanel,WallpaperPicker,selection,installCodshCompatibility}; return module.exports;'));
  subject.selection.hostLoaded=true;
  subject.selection.loaded=true;
  subject.selection.loading=false;
  const dispose=subject.installCodshCompatibility();
  const host=w.document.createElement('div');w.document.body.append(host);
  const root=createRoot(host);
  try {
  for (const Component of [subject.QuickPanel,subject.WallpaperPicker]) {
    await act(async()=>root.render(React.createElement(Component)));
    const tabs=Array.from(host.querySelectorAll('[role="tab"]'),node=>node.textContent);
    assert.ok(tabs.includes('外观'));
    assert.ok(!tabs.some(label=>['壁纸','壁纸库','播放'].includes(label)));
    assert.match(host.textContent,/背景、配色、字体和侧栏布局由 Codsh 统一管理/);
    assert.match(host.textContent,/雾化/);
    for(const label of ['主题随壁纸','字体自定义','侧边栏圆角','全局 UI 配色','额外补雾化的选择器']) assert.ok(!host.textContent.includes(label),label);
    assert.equal(host.querySelector('.we-qp__library,.we-qp__current'),null);
    if (Component===subject.WallpaperPicker) {
      const extensions=Array.from(host.querySelectorAll('[role="tab"]')).find(node=>node.textContent==='扩展');
      await act(async()=>extensions.click());
      assert.match(host.textContent,/点击效果与拖尾效果/);
      assert.ok(!host.textContent.includes('3D 效果'));
      const system=Array.from(host.querySelectorAll('[role="tab"]')).find(node=>node.textContent==='系统');
      await act(async()=>system.click());
      assert.match(host.textContent,/吉祥物/);
      const appearance=Array.from(host.querySelectorAll('[role="tab"]')).find(node=>node.textContent==='外观');
      await act(async()=>appearance.click());
    }
    await mkdir(new URL('../artifacts/wallpaper-compat/',import.meta.url),{recursive:true});
    await writeFile(new URL(`../artifacts/wallpaper-compat/${Component.name}.html`,import.meta.url),host.innerHTML);
  }
  // The original UI and preference are available again when Codsh is disabled.
  await act(async()=>{w.document.documentElement.removeAttribute('data-codsh-theme');});
  await act(async()=>root.render(React.createElement(subject.QuickPanel)));
  const originalHtml=host.innerHTML;
  assert.match(originalHtml,/壁纸面板分区/);
  assert.match(originalHtml,/壁纸列表/);
  } finally {
    await act(async()=>root.unmount());
    dispose();dom.window.close();
    if(previousWindow===undefined)delete globalThis.window;else globalThis.window=previousWindow;
    if(previousDocument===undefined)delete globalThis.document;else globalThis.document=previousDocument;
    if(previousAct===undefined)delete globalThis.IS_REACT_ACT_ENVIRONMENT;else globalThis.IS_REACT_ACT_ENVIRONMENT=previousAct;
  }
});
