import {readFile, copyFile} from 'node:fs/promises';
import {resolve, join} from 'node:path';
import {homedir} from 'node:os';
import {compatibilityMarker, systemFontsMarker, hostLifecycleMarker} from './wallpaper-engine-compat.mjs';
import {ensureWallpaperCompatibility} from '../compat/wallpaper-install.js';

const directory = resolve(process.argv.slice(2).find(argument => argument !== '--restore') || join(homedir(), '.dsh/profiles/desktop/node_modules/dsh-plugin-wallpaper-engine'));
const target = join(directory, 'lib/client.js');
const backup = target + '.codsh-original';
const source = await readFile(target, 'utf8');
if (process.argv.includes('--restore')) {
  if (!source.includes(compatibilityMarker)) throw Error('当前客户端没有 Codsh 兼容补丁，未修改文件');
  const fonts = join(directory, 'lib/routes/system-fonts.js');
  const restoreFonts = (await readFile(fonts, 'utf8')).includes(systemFontsMarker);
  const host = join(directory, 'lib/index.js');
  const restoreHost = (await readFile(host, 'utf8')).includes(hostLifecycleMarker);
  if (restoreFonts) await readFile(fonts + '.codsh-original', 'utf8');
  if (restoreHost) await readFile(host + '.codsh-original', 'utf8');
  await copyFile(backup, target);
  if (restoreFonts) await copyFile(fonts + '.codsh-original', fonts);
  if (restoreHost) await copyFile(host + '.codsh-original', host);
  console.log('已恢复 Wallpaper Engine 原始客户端及宿主接口，重启 Harness 后生效。');
} else {
  await ensureWallpaperCompatibility(directory);
  console.log('已安装 Codsh 兼容补丁；原设置和上传文件保留，重启 Harness 后生效。');
}
