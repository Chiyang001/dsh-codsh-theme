import {readFile, mkdir, writeFile} from 'node:fs/promises';
const manifest = JSON.parse(await readFile(new URL('../package.json', import.meta.url)));
const css = await readFile(new URL('../src/theme.css', import.meta.url), 'utf8');
const source = await readFile(new URL('../src/client.js', import.meta.url), 'utf8');
const refinements = await readFile(new URL('../src/refinements.js', import.meta.url), 'utf8');
const actions = await readFile(new URL('../src/sidebar-actions.js', import.meta.url), 'utf8');
const search = await readFile(new URL('../src/search.js', import.meta.url), 'utf8');
const contract = (await readFile(new URL('../remote-contract.js', import.meta.url),'utf8')).replace(/^export /gm,'');
// CSS module locals may be followed by another class. Normalize every rule,
// instead of leaving one-off selector fixes scattered through the stylesheet.
const scopedCss = css.replace(/\[class\$="(_[\w-]+)"\]/g, (_,name) => `:is([class$="${name}"],[class*="${name} "])`);
await mkdir(new URL('../dist/', import.meta.url), {recursive:true});
await writeFile(new URL('../dist/client.js', import.meta.url),
  `window.__ModuleLoader__.load({id:${JSON.stringify(manifest.name)},factory:(require)=>{\nconst THEME_CSS=${JSON.stringify(scopedCss)};\n${contract}\n${actions}\n${search}\n${refinements}\n${source.replace(/^export /gm, '')}\nreturn {inject,apply};\n}});\n`);
console.log('Built dist/client.js');
