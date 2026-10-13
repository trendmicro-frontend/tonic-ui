import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { copyFile, mkdir, rm, writeFile } from 'node:fs/promises';
import { build } from 'vite';
import { localEntries, reactSpecifiers, tonicSpecifiers, isTonic } from '../entries.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputRoot = resolve(root, process.argv[2] || 'dist');
// The output directory is script-owned; wipe it so stale modes from older
// builds are never served.
await rm(outputRoot, { recursive: true, force: true });
const require = createRequire(import.meta.url);
const packageName = specifier => specifier.startsWith('@')
  ? specifier.split('/').slice(0, 2).join('/')
  : specifier.split('/')[0];
const packages = [...new Set([
  ...Object.values(localEntries).flatMap(entries => Object.values(entries).map(entry => packageName(entry.specifier))),
  ...tonicSpecifiers,
  // Emotion is inlined into the Tonic bundle; list the primary packages for
  // version visibility in the manifest.
  '@emotion/react',
  '@emotion/styled',
  '@emotion/cache',
  '@emotion/is-prop-valid',
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

const groups = {
  react: { local: null, cdn: null },
  tonic: { local: null, cdn: null },
};
// Bare specifiers a runtime bundle may import; anything else has no import-map
// target and would fail at runtime.
const allowedImports = new Set([
  ...Object.values(localEntries).flatMap(entries => Object.values(entries).map(entry => entry.specifier)),
  ...reactSpecifiers,
  ...tonicSpecifiers,
]);
const apps = {};

for (const mode of ['react', 'react-dom', 'tonic', 'app', 'shell']) {
  const result = await build({
    configFile: resolve(root, 'vite.config.mjs'),
    mode,
    build: { outDir: resolve(outputRoot, mode) },
  });
  const chunks = result.output.filter(item => item.type === 'chunk');
  const files = new Set(chunks.map(chunk => chunk.fileName));
  for (const chunk of chunks) {
    for (const id of [...chunk.imports, ...chunk.dynamicImports]) {
      if (mode === 'tonic' && isTonic(id)) {
        throw new Error(`Local Tonic build still imports ${id}`);
      }
      if (mode === 'shell') {
        // The shell is one self-contained bundle: it owns React, Emotion and
        // Tonic so the fixed controls survive every runtime reload.
        continue;
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
  if (mode === 'shell') {
    apps.shell = descriptor('shell');
  } else if (mode === 'app') {
    apps.app = descriptor('app');
  } else if (mode === 'react') {
    // The combined entry serves every React family specifier except `react-dom`
    // (a module can expose one `default`, and both have default-import consumers).
    const combined = descriptor('react').entry;
    groups.react.local = {
      imports: {
        react: combined,
        'react-dom/client': combined,
        'react/jsx-runtime': combined,
        'react/jsx-dev-runtime': combined,
      },
      probes: reactSpecifiers.filter(specifier => specifier !== 'react-dom'),
    };
  } else if (mode === 'react-dom') {
    const { local } = groups.react;
    groups.react.local = {
      ...local,
      imports: { ...local.imports, 'react-dom': descriptor('react-dom').entry },
      probes: [...reactSpecifiers],
    };
  } else if (mode === 'tonic') {
    groups.tonic = {
      local: {
        imports: { '@tonic-ui/react': descriptor('tonic').entry },
        probes: [...tonicSpecifiers],
      },
      cdn: {
        imports: { '@tonic-ui/react': cdnUrl('@tonic-ui/react', ['react', 'react-dom'], true) },
        probes: [...tonicSpecifiers],
      },
    };
  }
}
for (const [name, group] of Object.entries(groups)) {
  if (!group.local) {
    throw new Error(`Missing ${name} local sources`);
  }
  // `react` deliberately has no CDN source: a single URL cannot expose two
  // `default` exports, so the React family is always self-hosted.
  if (name !== 'react' && !group.cdn) {
    throw new Error(`Missing ${name} CDN sources`);
  }
}

await mkdir(outputRoot, { recursive: true });
await writeFile(resolve(outputRoot, 'runtime-manifest.json'), `${JSON.stringify({ versions, groups, apps }, null, 2)}\n`);
for (const name of ['index.html', 'runtime.html', 'bootstrap.js']) {
  await copyFile(resolve(root, 'public', name), resolve(outputRoot, name));
}
console.log('Built the two-bundle runtime: combined React entries, one Tonic bundle, one app, and the shell.');
