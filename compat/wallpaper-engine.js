// Injected inside Wallpaper Engine 1.3.3's client factory by the installer.
// Keep the user's stored choices; only the effective runtime values yield.
const codshManagedSettings = Object.freeze({
  id: '', rotationEnabled: false, themeFollow: false,
  fontCustom: false, uiColorCustom: false, caretColor: '', accent: '#3478cf',
  leftSidebarCornerRadius: 'native', rightSidebarCornerRadius: 'native',
  leftSidebarSquareTL: false, leftSidebarSquareTR: false,
  leftSidebarSquareBR: false, leftSidebarSquareBL: false,
  rightSidebarSquareTL: false, rightSidebarSquareTR: false,
  rightSidebarSquareBR: false, rightSidebarSquareBL: false,
  parallaxEnabled: false, thinkingNative: false, extraGlassSelectors: '',
});
let codshSavedSettings = {};
const codshCompatibilityActive = () => document.documentElement.hasAttribute('data-codsh-theme');
const codshManaged = key => Object.hasOwn(codshManagedSettings, key);
function codshRememberSettings(settings, replace = false) {
  if (codshCompatibilityActive() && settings) {
    for (const key of Object.keys(codshManagedSettings)) {
      if (replace || !Object.hasOwn(codshSavedSettings, key)) {
        codshSavedSettings[key] = settings[key];
      }
    }
  }
  return settings;
}
function codshMaskSettings(settings) {
  if (!codshCompatibilityActive()) return settings;
  codshRememberSettings(settings);
  return { ...settings, ...codshManagedSettings };
}
function codshMaskCurrentSettings() {
  if (codshCompatibilityActive()) Object.assign(selection, codshMaskSettings(selection));
}
function codshSerializeSettings(settings) {
  return codshCompatibilityActive() ? { ...settings, ...codshSavedSettings } : settings;
}
function codshVisibleTabs(tabs) {
  return codshCompatibilityActive()
    ? tabs.filter(tab => !['wallpaper', 'library', 'playback', 'audio'].includes(tab.id)) : tabs;
}
function codshVisibleTab(id) {
  return codshCompatibilityActive() && ['wallpaper', 'library', 'playback', 'audio'].includes(id) ? 'appearance' : id;
}
function sanitizeSettings(value) {
  return codshMaskSettings(sanitizeWallpaperSettings(value));
}
function installCodshCompatibility() {
  let active = false;
  const update = () => {
    const next = codshCompatibilityActive();
    if (next === active) return;
    active = next;
    if (active) {
      codshMaskCurrentSettings();
      selection.pickerOpen = false;
      selection.pickerDraft = false;
    } else {
      Object.assign(selection, codshSavedSettings);
      codshSavedSettings = {};
    }
    applySelection(selection.id);
    reapplyAll();
    emit();
  };
  const observer = new MutationObserver(update);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-codsh-theme'] });
  update();
  return () => observer.disconnect();
}
