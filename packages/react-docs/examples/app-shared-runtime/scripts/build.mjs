import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { copyFile, mkdir, rm, writeFile } from 'node:fs/promises';
import { build } from 'vite';
import { localEntries, reactSpecifiers, tonicSpecifiers, isTonic } from '../entries.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputRoot = resolve(root, process.argv[2] || 'dist');
// The output directory is script-owned; wipe it so stale bundles from older
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
  // `URLSearchParams` serializes a presence flag as `standalone=`, but
  // esm.sh only honors the bare `standalone` form from its README.
  const query = ['target=es2022'];
  if (standalone) {
    query.push('standalone');
  }
  if (external.length) {
    query.push(`external=${external.join(',')}`);
  }
  return `https://esm.sh/${name}@${versions[name]}${subpath}?${query.join('&')}`;
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

for (const bundle of ['react', 'react-dom', 'tonic', 'app']) {
  const result = await build({
    configFile: resolve(root, 'vite.config.mjs'),
    // Vite's `mode` option selects the configuration; the value names the bundle.
    mode: bundle,
    build: { outDir: resolve(outputRoot, bundle) },
  });
  const chunks = result.output.filter(item => item.type === 'chunk');
  const files = new Set(chunks.map(chunk => chunk.fileName));
  for (const chunk of chunks) {
    for (const id of [...chunk.imports, ...chunk.dynamicImports]) {
      if (bundle === 'tonic' && isTonic(id)) {
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
      throw new Error(`Missing ${bundle} entry: ${name}`);
    }
    const css = new Set();
    const seen = new Set();
    function collect(chunk) {
      if (seen.has(chunk.fileName)) {
        return;
      }
      seen.add(chunk.fileName);
      for (const file of chunk.viteMetadata.importedCss) {
        css.add(`./${bundle}/${file}`);
      }
      for (const file of chunk.imports) {
        const dependency = chunks.find(item => item.fileName === file);
        if (dependency) {
          collect(dependency);
        }
      }
    }
    collect(entry);
    return { entry: `./${bundle}/${entry.fileName}`, css: [...css] };
  };
  if (bundle === 'app') {
    apps.app = descriptor('app');
  } else if (bundle === 'react') {
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
    // esm.sh serves each specifier from its own URL with its own `default`, so
    // the CDN source has no two-file constraint. Every non-root module
    // externalizes `react`, which the import map resolves to the single CDN
    // React module above.
    groups.react.cdn = {
      imports: {
        react: cdnUrl('react'),
        'react-dom': cdnUrl('react-dom', ['react']),
        'react-dom/client': cdnUrl('react-dom/client', ['react']),
        'react/jsx-runtime': cdnUrl('react/jsx-runtime', ['react']),
        'react/jsx-dev-runtime': cdnUrl('react/jsx-dev-runtime', ['react']),
      },
      probes: [...reactSpecifiers],
    };
  } else if (bundle === 'react-dom') {
    const { local } = groups.react;
    groups.react.local = {
      ...local,
      imports: { ...local.imports, 'react-dom': descriptor('react-dom').entry },
      probes: [...reactSpecifiers],
    };
  } else if (bundle === 'tonic') {
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
  if (!group.local || !group.cdn) {
    throw new Error(`Missing ${name} CDN or local sources`);
  }
}

// esm.sh keeps the Emotion family as separate shared modules even in the
// standalone Tonic build: the Tonic bundle carries hundreds of relative
// `/@emotion/...` imports and each module pulls its whole dependency graph
// as a waterfall of small files. Map every Emotion URL in that graph at its
// single-file `?standalone` build so the CDN load stays a handful of
// requests. The graph is walked from the live CDN wrapper, so the keys
// always match the URLs the browser actually requests.
const sharedImports = {};
async function collectEmotionRedirects() {
  const redirects = new Map();
  const fetched = new Set();
  async function sourceOf(url) {
    if (fetched.has(url)) {
      return null;
    }
    fetched.add(url);
    try {
      const response = await fetch(url);
      return response.ok ? await response.text() : null;
    } catch {
      return null;
    }
  }
  async function visitEmotionUrl(url) {
    if (redirects.has(url)) {
      return;
    }
    redirects.set(url, `${url}&standalone`);
    const source = await sourceOf(`${url}&standalone`);
    if (!source) {
      return;
    }
    const specifiers = [...source.matchAll(/["']([^"']+)["']/g)].map(pair => pair[1]);
    for (const specifier of specifiers) {
      // `/es2022/` paths are prebuilt implementation files; `standalone`
      // only changes package-level builds, so only range-form URLs are mapped.
      if (specifier.startsWith('/@emotion/') && !specifier.includes('/es2022/')) {
        await visitEmotionUrl(new URL(specifier, 'https://esm.sh/').href);
      }
    }
    for (const specifier of specifiers) {
      if (!specifier.startsWith('/') || specifier.startsWith('/@emotion/')) {
        continue;
      }
      const implementation = new URL(specifier, 'https://esm.sh/').href;
      const implSource = await sourceOf(implementation);
      if (!implSource) {
        continue;
      }
      for (const inner of [...implSource.matchAll(/["']([^"']+)["']/g)].map(pair => pair[1])) {
        if (inner.startsWith('/@emotion/') && !inner.includes('/es2022/')) {
          await visitEmotionUrl(new URL(inner, 'https://esm.sh/').href);
        }
      }
    }
  }
  const wrapper = await sourceOf(groups.tonic.cdn.imports['@tonic-ui/react']);
  if (!wrapper) {
    console.warn('The Tonic CDN wrapper is unreachable; keeping esm.sh normal Emotion module graph.');
    return;
  }
  await Promise.all([...wrapper.matchAll(/["'](\/@emotion\/[^"']+)["']/g)]
    .map(pair => visitEmotionUrl(new URL(pair[1], 'https://esm.sh/').href)));
  for (const [key, target] of redirects) {
    sharedImports[key] = target;
  }
}
await collectEmotionRedirects();
await mkdir(outputRoot, { recursive: true });
await writeFile(resolve(outputRoot, 'runtime-manifest.json'), `${JSON.stringify({ versions, groups, apps, shared: { imports: sharedImports } }, null, 2)}\n`);
for (const name of ['index.html', 'bootstrap.js']) {
  await copyFile(resolve(root, 'public', name), resolve(outputRoot, name));
}
console.log('Built the reference app: two React entries, one Tonic bundle, and the app.');
