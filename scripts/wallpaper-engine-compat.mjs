import {readFile} from 'node:fs/promises';

export const compatibilityMarker = '/* Codsh Wallpaper Engine compatibility v1 */';
export const systemFontsMarker = '/* Codsh system fonts UTF-8 v1 */';
export const hostLifecycleMarker = '/* Codsh Wallpaper Engine host lifecycle v1 */';

/** Cordis constructs ordinary functions; their returned cleanup is not an effect. */
export function patchWallpaperHost(source) {
  if (source.includes(hostLifecycleMarker)) return source;
  const needle = 'export function apply(ctx) {';
  if (source.split(needle).length !== 2) throw Error('Wallpaper Engine 1.3.3 宿主生命周期接口不匹配，未修改文件');
  return source.replace(needle, `${hostLifecycleMarker}\nexport function apply(ctx) {\n  ctx.effect(() => codshApplyWallpaperHost(ctx));\n}\nfunction codshApplyWallpaperHost(ctx) {`);
}

/** PowerShell pipes otherwise use the Windows code page while the reader decodes UTF-8. */
export function patchSystemFonts(source) {
  if (source.includes(systemFontsMarker)) return source;
  for (const [needle, replacement] of [
    ['const SYSTEM_FONTS_CACHE_VERSION = 2;', `${systemFontsMarker}\nconst SYSTEM_FONTS_CACHE_VERSION = 3;`],
    ["'Add-Type -AssemblyName System.Drawing; '", "'[Console]::OutputEncoding = [System.Text.Encoding]::UTF8; Add-Type -AssemblyName System.Drawing; '"],
  ]) {
    if (source.split(needle).length !== 2) throw Error('Wallpaper Engine 1.3.3 本机字体接口不匹配，未修改文件');
    source = source.replace(needle, replacement);
  }
  return source;
}

// Version-specific edits fail before writing when the upstream bundle changes.
export async function patchWallpaperEngine(source) {
  if (source.includes(compatibilityMarker)) return source;
  const bridge = await readFile(new URL('../compat/wallpaper-engine.js', import.meta.url), 'utf8');
  const once = (needle, replacement) => {
    if (source.split(needle).length !== 2) throw Error(`Wallpaper Engine 1.3.3 接口不匹配：${needle}`);
    source = source.replace(needle, replacement);
  };
  const enter = (name, code) => {
    const pattern = new RegExp(`function ${name}\\([^)]*\\) \\{`, 'g');
    const matches = [...source.matchAll(pattern)];
    if (matches.length !== 1) throw Error(`Wallpaper Engine 1.3.3 接口不匹配：${name}`);
    source = source.replace(pattern, match => `${match}\n${code}`);
  };
  once('function sanitizeSettings(', 'function sanitizeWallpaperSettings(');
  once('return serializeSettings(selection);', 'return codshSerializeSettings(serializeSettings(selection));');
  once('Object.assign(selection, sanitizeSettings(hostSettings));',
    'Object.assign(selection, sanitizeSettings(codshRememberSettings(hostSettings, true)));');
  enter('setSetting', 'if (codshCompatibilityActive() && codshManaged(field)) value = codshManagedSettings[field];');
  for (const name of ['reapplyAll', 'applyEffects', 'syncLayers', 'syncParallaxLayer']) enter(name, 'codshMaskCurrentSettings();');
  enter('applySelection', 'if (codshCompatibilityActive()) { codshMaskCurrentSettings(); id = ""; }');
  for (const name of ['themeFollowOnWallpaper', 'themeFollowRelease']) enter(name, 'if (codshCompatibilityActive()) return;');
  for (const name of [
    'renderAppearanceThemeSection', 'renderAppearanceDetailSection', 'renderAppearanceFontSection',
    'renderAppearanceSidebarCornersSection', 'renderAppearanceUiColorSection', 'renderParallaxIsland',
    'renderWallpaperTab', 'renderAudioTab', 'qpRenderCurrent', 'qpRenderRotation',
    'qpRenderPropsButton', 'qpRenderLibrarySection',
  ]) enter(name, 'if (codshCompatibilityActive()) return null;');
  // Keep hook order stable and move an already-mounted wallpaper page to Appearance.
  for (const [variable, setter, read] of [
    ['qpTab', 'setQpTab', 'readQpTab'], ['activeTab', 'setActiveTab', 'readSavedPickerTab'],
  ]) {
    once(`const [${variable}, ${setter}] = React.useState(${read});`,
      `const [${variable}, ${setter}] = React.useState(() => codshVisibleTab(${read}()));\n` +
      `React.useEffect(() => { const next = codshVisibleTab(${variable}); if (next !== ${variable}) ${setter}(next); }, [${variable}, sel]);`);
  }
  source = source.replace(/\b(QP_TABS|PICKER_TABS)\./g, 'codshVisibleTabs($1).');
  enter('renderAppearanceTab', `if (codshCompatibilityActive()) return React.createElement(React.Fragment, null,
    React.createElement("p", {className:"we-picker__hint", role:"note"},
      "背景、配色、字体和侧栏布局由 Codsh 统一管理；背景请到通用设置 → 外观调整。"),
    renderAppearanceGlassSection(ctx));`);
  enter('apply', 'if (ctx.effect) ctx.effect(installCodshCompatibility);');
  once('return [AVATAR_EXTENSION_MODULE, FX_EXTENSION_MODULE, PARALLAX_EXTENSION_MODULE];',
    'return codshCompatibilityActive() ? [AVATAR_EXTENSION_MODULE, FX_EXTENSION_MODULE] : [AVATAR_EXTENSION_MODULE, FX_EXTENSION_MODULE, PARALLAX_EXTENSION_MODULE];');
  once('const thinkGear = (id, label, tip) => React.createElement(',
    'const thinkGear = (id, label, tip) => codshCompatibilityActive() && id === "native" ? null : React.createElement(');
  once('React.createElement("div", { className: "we-picker__ctl we-picker__ctl--wrap", key: "extra-glass-selectors" },',
    '!codshCompatibilityActive() && React.createElement("div", { className: "we-picker__ctl we-picker__ctl--wrap", key: "extra-glass-selectors" },');
  once('var module = { exports: {} };', `var module = { exports: {} };\n${compatibilityMarker}\n${bridge}`);
  return source;
}
