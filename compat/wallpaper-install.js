import {readFile, copyFile, writeFile, rename, unlink} from 'node:fs/promises';
import {constants} from 'node:fs';
import {dirname, join} from 'node:path';
import {createRequire} from 'node:module';
import {randomUUID} from 'node:crypto';
import vm from 'node:vm';
import {patchWallpaperEngine, patchSystemFonts} from '../scripts/wallpaper-engine-compat.mjs';

export const wallpaperPackage = 'dsh-plugin-wallpaper-engine';
export const wallpaperVersion = '1.3.3';

/** Resolve the pinned dependency beside Codsh, including nested pnpm installs. */
export function wallpaperDirectory() {
  return dirname(createRequire(import.meta.url).resolve(wallpaperPackage + '/package.json'));
}

/** Validate both patches first, then replace each file without editing pnpm hard links. */
export async function ensureWallpaperCompatibility(directory = wallpaperDirectory()) {
  const manifest = JSON.parse(await readFile(join(directory, 'package.json'), 'utf8'));
  if (manifest.name !== wallpaperPackage || manifest.version !== wallpaperVersion) {
    throw Error(`Codsh 兼容模式仅支持 ${wallpaperPackage} ${wallpaperVersion}，未修改文件`);
  }
  const target = join(directory, 'lib/client.js'), fontsTarget = join(directory, 'lib/routes/system-fonts.js');
  const [source, fontsSource] = await Promise.all([readFile(target, 'utf8'), readFile(fontsTarget, 'utf8')]);
  const result = await patchWallpaperEngine(source), fontsResult = patchSystemFonts(fontsSource);
  if (result !== source) new vm.Script(result, {filename: target});
  const changes = [[target, source, result], [fontsTarget, fontsSource, fontsResult]].filter(([, before, after]) => before !== after);
  for (const [file, before] of changes) {
    const backup = file + '.codsh-original';
    try {
      await copyFile(file, backup, constants.COPYFILE_EXCL);
    } catch (error) {
      if (error.code !== 'EEXIST' || await readFile(backup, 'utf8') !== before) throw error;
    }
  }
  for (const [file, , after] of changes) {
    const temporary = file + '.codsh-' + randomUUID();
    try {
      await writeFile(temporary, after, {encoding: 'utf8', flag: 'wx'});
      await rename(temporary, file);
    } finally {
      await unlink(temporary).catch(error => {if (error.code !== 'ENOENT') throw error;});
    }
  }
  return {changed: changes.length > 0, target};
}
