import {dirname, resolve} from 'node:path';
import {ensureWallpaperCompatibility, wallpaperPackage} from './wallpaper-install.js';

export const inject = ['clientModules'];

/** Keep the bundled client compatible without relying on npm install scripts. */
export async function apply(ctx) {
  await ensureWallpaperCompatibility();
  const modules = ctx.clientModules;
  let disposed = false, pending = Promise.resolve();
  const synchronize = async () => {
    if (disposed) return;
    const clientPath = modules.clientPath(wallpaperPackage);
    if (!clientPath) return;
    // An existing standalone bundle may resolve to a separate package copy.
    await ensureWallpaperCompatibility(resolve(dirname(clientPath), '..'));
    if (!disposed) modules.rebuilt(wallpaperPackage);
  };
  ctx.effect(() => {
    const off = modules.onGraphChanged(() => {
      pending = pending.then(synchronize).catch(error => ctx.logger.error('Codsh 壁纸引擎兼容失败：%s', error.message));
    });
    return () => {disposed = true; off();};
  });
  await synchronize();
}
