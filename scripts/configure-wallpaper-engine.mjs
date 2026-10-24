import {readFile, copyFile} from 'node:fs/promises';
import {resolve, join} from 'node:path';
import {homedir} from 'node:os';
import {compatibilityMarker} from './wallpaper-engine-compat.mjs';
import {ensureWallpaperCompatibility} from '../compat/wallpaper-install.js';

const directory = resolve(process.argv.slice(2).find(argument => argument !== '--restore') || join(homedir(), '.dsh/profiles/desktop/node_modules/dsh-plugin-wallpaper-engine'));
const target = join(directory, 'lib/client.js');
const backup = target + '.codsh-original';
const source = await readFile(target, 'utf8');
if (process.argv.includes('--restore')) {
  if (!source.includes(compatibilityMarker)) throw Error('当前客户端没有 Codsh 兼容补丁，未修改文件');
  await copyFile(backup, target);
  console.log('已恢复 Wallpaper Engine 原始客户端，重启 Harness 后生效。');
} else {
  await ensureWallpaperCompatibility(directory);
  console.log('已安装 Codsh 兼容补丁；原设置和上传文件保留，重启 Harness 后生效。');
}
