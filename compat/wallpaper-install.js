import {readFile, copyFile, writeFile, rename, unlink} from 'node:fs/promises';
import {constants} from 'node:fs';
import {dirname, join} from 'node:path';
import {createRequire} from 'node:module';
import {randomUUID} from 'node:crypto';
import vm from 'node:vm';
import {patchWallpaperEngine} from '../scripts/wallpaper-engine-compat.mjs';

export const wallpaperPackage = 'dsh-plugin-wallpaper-engine';
export const wallpaperVersion = '1.3.3';

/** Resolve the pinned dependency beside Codsh, including nested pnpm installs. */
export function wallpaperDirectory() {
  return dirname(createRequire(import.meta.url).resolve(wallpaperPackage + '/package.json'));
}

/** Apply the compatibility client atomically; preserve the original for repair. */
export async function ensureWallpaperCompatibility(directory = wallpaperDirectory()) {
  const manifest = JSON.parse(await readFile(join(directory, 'package.json'), 'utf8'));
  if (manifest.name !== wallpaperPackage || manifest.version !== wallpaperVersion) {
    throw Error(`Codsh 兼容模式仅支持 ${wallpaperPackage} ${wallpaperVersion}，未修改文件`);
  }
  const target = join(directory, 'lib/client.js');
  const source = await readFile(target, 'utf8');
  const result = await patchWallpaperEngine(source);
  if (result === source) return {changed: false, target};
  new vm.Script(result, {filename: target});
  const backup = target + '.codsh-original';
  try {
    await copyFile(target, backup, constants.COPYFILE_EXCL);
  } catch (error) {
    if (error.code !== 'EEXIST' || await readFile(backup, 'utf8') !== source) throw error;
  }
  // Replace the file instead of modifying a pnpm store hard link in place.
  const temporary = target + '.codsh-' + randomUUID();
  try {
    await writeFile(temporary, result, {encoding: 'utf8', flag: 'wx'});
    await rename(temporary, target);
  } finally {
    await unlink(temporary).catch(error => {if (error.code !== 'ENOENT') throw error;});
  }
  return {changed: true, target};
}
