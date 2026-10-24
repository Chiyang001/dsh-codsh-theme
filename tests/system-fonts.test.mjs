import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile,writeFile,mkdtemp,rm} from 'node:fs/promises';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {pathToFileURL} from 'node:url';
import {wallpaperDirectory} from '../compat/wallpaper-install.js';
import {patchSystemFonts,systemFontsMarker} from '../scripts/wallpaper-engine-compat.mjs';

test('Windows font enumeration uses UTF-8 and invalidates the cache containing garbled Chinese names',async()=>{
  const routePath=join(wallpaperDirectory(),'lib/routes/system-fonts.js');
  let original;
  try {original=await readFile(routePath+'.codsh-original','utf8');}
  catch {original=await readFile(routePath,'utf8');}
  const patched=patchSystemFonts(original);
  assert.ok(patched.includes(systemFontsMarker));assert.equal(patchSystemFonts(patched),patched);
  assert.throws(()=>patchSystemFonts(original.replace('const SYSTEM_FONTS_CACHE_VERSION = 2;','const SYSTEM_FONTS_CACHE_VERSION = 99;')),/不匹配/);
  // Absolute URLs let the transformed real module use the pinned dependency's helpers.
  const moduleSource=patched.replaceAll("'../settings-schema.js'",JSON.stringify(pathToFileURL(join(wallpaperDirectory(),'lib/settings-schema.js')).href))
    .replaceAll("'../json-response.js'",JSON.stringify(pathToFileURL(join(wallpaperDirectory(),'lib/json-response.js')).href));
  const fonts=await import('data:text/javascript;base64,'+Buffer.from(moduleSource).toString('base64'));
  const command=fonts.authoritativeSources('win32')[0].args.at(-1);
  assert.match(command,/\[Console\]::OutputEncoding = \[System.Text.Encoding\]::UTF8;/);
  assert.equal(fonts.SYSTEM_FONTS_CACHE_VERSION,3);
  const directory=await mkdtemp(join(tmpdir(),'codsh-font-cache-'));
  try {
    const cachePath=join(directory,'fonts.json');
    await writeFile(cachePath,JSON.stringify({v:2,fonts:['坏\ufffd字体'],scannedAt:Date.now()}));
    let route,calls=0;
    fonts.registerSystemFontsRoutes({register(value){route=value;return()=>{};}},{disposers:[],base:'/wallpaper-engine',cachePath:()=>cachePath,log:()=>{},platform:'win32',runFontCommand:async(_cmd,args)=>{
      calls++;assert.match(args.at(-1),/OutputEncoding/);return {ok:true,stdout:'微软雅黑\r\n思源宋体\r\n霞鹜文楷\r\n'};
    }});
    let body;
    await route.handler({method:'GET',url:'/wallpaper-engine/system-fonts'},{setHeader(){},end(value){body=JSON.parse(value);}});
    assert.equal(calls,1);assert.equal(body.ok,true);assert.equal(body.approximate,false);
    assert.deepEqual([...body.fonts].sort(),['微软雅黑','思源宋体','霞鹜文楷'].sort());
    assert.equal(JSON.parse(await readFile(cachePath,'utf8')).v,3);
    await route.handler({method:'GET',url:'/wallpaper-engine/system-fonts'},{setHeader(){},end(){}});assert.equal(calls,1,'the corrected list remains cached');
  } finally {
    // This is the exact disposable fixture directory returned by mkdtemp above.
    await rm(directory,{recursive:true,force:true});
  }
});
