import {dirname, resolve} from 'node:path';
import {apply as wallpaperApply} from 'dsh-plugin-wallpaper-engine';
import {ensureWallpaperCompatibility, wallpaperPackage} from './wallpaper-install.js';

// An already-imported upstream function may survive a live installation in
// Node's module cache. Normalize it before Loader activation as well as fixing
// the file: Cordis must call it and own its returned disposer, not construct it.
if (Object.hasOwn(wallpaperApply, 'prototype')) Object.defineProperty(wallpaperApply, 'prototype', {value: undefined});

export const inject = ['clientModules'];

/** Keep the bundled client compatible without relying on npm install scripts. */
export async function apply(ctx) {
  const modules = ctx.clientModules;
  const logger = ctx.logger;
  let disposed = false, initialized = false, queued = false, pending = Promise.resolve();
  const synchronize = async () => {
    if (disposed) return;
    if (!initialized) {await ensureWallpaperCompatibility();initialized = true;}
    if (disposed) return;
    const clientPath = modules.clientPath(wallpaperPackage);
    if (!clientPath) return;
    // An existing standalone bundle may resolve to a separate package copy.
    await ensureWallpaperCompatibility(resolve(dirname(clientPath), '..'));
    if (!disposed) modules.rebuilt(wallpaperPackage);
  };
  const schedule = () => {
    if (disposed || queued) return pending;
    queued = true;
    pending = pending.catch(() => {}).then(async () => {queued = false;await synchronize();});
    return pending;
  };
  // Own teardown before the first file operation yields, so stopping during
  // installation cannot attach a listener to an already-disposed context.
  ctx.effect(() => {
    const off = modules.onGraphChanged(() => {
      schedule().catch(error => {if (!disposed) logger.error('Codsh 壁纸引擎兼容失败：%s', error.message);});
    });
    return async () => {disposed = true;off();await pending.catch(() => {});};
  });
  await schedule();
}
