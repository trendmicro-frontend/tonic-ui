import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';
import { copyFile, mkdir, rm, writeFile } from 'node:fs/promises';
import { build } from 'vite';
import createEmotionRedirects from './emotion-redirects.mjs';
import { localEntries, reactSpecifiers, tonicSpecifiers, isTonic } from '../entries.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputRoot = resolve(root, process.argv[2] || 'dist');
// The output directory is script-owned; wipe it so stale bundles from older
// builds are never served.
await rm(outputRoot, { recursive: true, force: true });
const require = createRequire(import.meta.url);
// The installed Tonic package may or may not ship the single-file standalone
// artifact (it does once the new release format is published). When it does,
// the CDN source switches from the esm.sh build to the raw tarball file, and
// its bare Emotion imports are mapped at pinned single-file builds.
const tonicPackageJson = require.resolve('@tonic-ui/react/package.json');
const standaloneFile = join(dirname(tonicPackageJson), 'dist', 'standalone', 'index.js');
const hasStandalone = existsSync(standaloneFile);
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

for (const bundle of ['react', 'react-dom', 'tonic', 'app', 'shell']) {
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
      if (bundle === 'shell') {
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
  if (bundle === 'shell') {
    apps.shell = descriptor('shell');
  } else if (bundle === 'app') {
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
        imports: { '@tonic-ui/react': hasStandalone
          ? `https://raw.esm.sh/@tonic-ui/react@${versions['@tonic-ui/react']}/dist/standalone/index.js`
          : cdnUrl('@tonic-ui/react', ['react', 'react-dom'], true) },
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

// The Tonic bundle imports the Emotion family, which esm.sh otherwise serves
// as a waterfall of small shared modules. The manifest maps the family at its
// single-file `?standalone` builds so the CDN load stays a handful of
// requests. For the standalone artifact the keys are the bare specifiers read
// from the built file; for the esm.sh build the graph is walked from the live
// CDN wrapper so the URL keys always match what the browser requests.
const sharedImports = await createEmotionRedirects({ cdnUrl, packageName }).collect({
  artifactFile: hasStandalone ? standaloneFile : null,
  tonicEntry: groups.tonic.cdn.imports['@tonic-ui/react'],
});

await mkdir(outputRoot, { recursive: true });
await writeFile(resolve(outputRoot, 'runtime-manifest.json'), `${JSON.stringify({ versions, groups, apps, shared: { imports: sharedImports } }, null, 2)}\n`);
for (const name of ['index.html', 'runtime.html', 'bootstrap.js']) {
  await copyFile(resolve(root, 'public', name), resolve(outputRoot, name));
}
console.log('Built the two-bundle runtime: combined React entries, one Tonic bundle, one app, and the shell.');
