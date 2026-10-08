import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import { build } from 'vite';
import { localEntries, tonicSpecifiers, isTonic } from './entries.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const outputRoot = resolve(root, '../../public/demos/cdn-runtime');
const require = createRequire(import.meta.url);
const packageName = specifier => specifier.startsWith('@')
  ? specifier.split('/').slice(0, 2).join('/')
  : specifier.split('/')[0];
const packages = [...new Set([
  ...Object.values(localEntries).flatMap(entries => Object.values(entries).map(entry => packageName(entry.specifier))),
  ...tonicSpecifiers,
])];
const versions = Object.fromEntries(packages.map(name => [name, require(`${name}/package.json`).version]));
if (versions.react !== versions['react-dom']) {
  throw new Error('React and React DOM versions must match');
}

function cdnUrl(specifier, external = [], standalone = false) {
  const name = packageName(specifier);
  const subpath = specifier.slice(name.length);
  const query = new URLSearchParams({ target: 'es2022' });
  if (standalone) {
    query.set('standalone', '');
  }
  if (external.length) {
    query.set('external', external.join(','));
  }
  return `https://esm.sh/${name}@${versions[name]}${subpath}?${query}`;
}

const groups = {};
const allowedImports = new Set([
  ...Object.values(localEntries).flatMap(entries => Object.values(entries).map(entry => entry.specifier)),
  ...tonicSpecifiers,
]);
const apps = {};

for (const mode of ['react', 'emotion', 'tonic-cdn', 'tonic-local']) {
  const result = await build({ configFile: resolve(root, 'vite.config.mjs'), mode });
  const chunks = result.output.filter(item => item.type === 'chunk');
  const files = new Set(chunks.map(chunk => chunk.fileName));
  for (const chunk of chunks) {
    for (const id of [...chunk.imports, ...chunk.dynamicImports]) {
      if (mode === 'tonic-local' && isTonic(id)) {
        throw new Error(`Local Tonic build still imports ${id}`);
      }
      if (!files.has(id) && !allowedImports.has(id)) {
        throw new Error(`Unmapped runtime import: ${id}`);
      }
    }
  }
  const entryChunks = new Map(chunks.filter(chunk => chunk.isEntry).map(chunk => [chunk.name, chunk]));
  const descriptor = name => {
    const entry = entryChunks.get(name);
    if (!entry) {
      throw new Error(`Missing ${mode} entry: ${name}`);
    }
    const css = new Set();
    const seen = new Set();
    function collect(chunk) {
      if (seen.has(chunk.fileName)) {
        return;
      }
      seen.add(chunk.fileName);
      for (const file of chunk.viteMetadata.importedCss) {
        css.add(`./${mode}/${file}`);
      }
      for (const file of chunk.imports) {
        const dependency = chunks.find(item => item.fileName === file);
        if (dependency) {
          collect(dependency);
        }
      }
    }
    collect(entry);
    return { entry: `./${mode}/${entry.fileName}`, css: [...css] };
  };
  if (localEntries[mode]) {
    const imports = Object.fromEntries(Object.entries(localEntries[mode]).map(([name, entry]) => [entry.specifier, descriptor(name).entry]));
    groups[mode] = { local: { imports, probes: Object.keys(imports) }, cdn: null };
  } else {
    apps[mode === 'tonic-cdn' ? 'cdn' : 'local'] = descriptor('app');
  }
}

const reactExternal = ['react', 'react-dom'];
const emotionExternal = [...reactExternal, '@emotion/react', '@emotion/styled', '@emotion/cache', '@emotion/is-prop-valid'];
for (const group of ['react', 'emotion']) {
  const probes = groups[group].local.probes;
  const imports = Object.fromEntries(probes.map(specifier => {
    const external = group === 'react'
      ? specifier === 'react' ? [] : reactExternal
      : packageName(specifier) === '@emotion/styled'
        ? [...reactExternal, '@emotion/react']
        : reactExternal;
    return [specifier, cdnUrl(specifier, external)];
  }));
  groups[group].cdn = { imports, probes };
}
const tonicImports = {
  '@tonic-ui/react': cdnUrl('@tonic-ui/react', emotionExternal, true),
};
groups.tonic = {
  local: { imports: {}, probes: [] },
  cdn: { imports: tonicImports, probes: tonicSpecifiers },
};

await mkdir(outputRoot, { recursive: true });
await writeFile(resolve(outputRoot, 'runtime-manifest.json'), `${JSON.stringify({ versions, groups, apps }, null, 2)}\n`);
for (const name of ['index.html', 'bootstrap.js']) {
  await copyFile(resolve(root, name), resolve(outputRoot, name));
}
console.log('Built one local app per Tonic source with paired vendors and one public esm.sh Tonic bundled entry.');
