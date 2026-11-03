import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { copyFile, mkdir, rm, writeFile } from 'node:fs/promises';
import { build } from 'vite';
import {
  cdnUrl,
  groupCdnSource,
  isTonicUI,
  packageName,
  runtimeSpecifiers,
  specifiersMap,
  versionsOf,
} from './manifest.mjs';
import { localEntries } from '../entries.mjs';
import createEmotionRedirects from './emotion-redirects.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
// The inspector is an opt-in product of the same build: `--inspector` adds
// the control shell and runtime frame to the output; the reference app is
// always built.
const args = process.argv.slice(2);
const outputArg = args.find(arg => !arg.startsWith('--'));
const outputRoot = outputArg ? resolve(process.cwd(), outputArg) : resolve(root, 'dist');
const inspector = args.includes('--inspector');
// The output directory is script-owned; wipe it so stale bundles from older
// builds are never served.
await rm(outputRoot, { recursive: true, force: true });
// The installed package may contain a locally built standalone artifact that
// the published tarball does not include; the manifest helper probes the
// published URL before selecting the raw file, and otherwise falls back to
// the esm.sh build.
const versions = versionsOf([
  ...Object.values(localEntries).map(entry => packageName(entry.specifier)),
  // Emotion is inlined into the @tonic-ui/react bundle; list the primary packages
  // for version visibility in the manifest.
  '@emotion/react',
  '@emotion/styled',
  '@emotion/cache',
  '@emotion/is-prop-valid',
]);
if (versions.react !== versions['react-dom']) {
  throw new Error('React and React DOM versions must match');
}
// npm package runtime bundles emit under assets/npm/<package>@<version>/ so
// manifest paths name their package, like CDN URLs do, and stay distinct
// from the workspace's own app bundle.
const bundleDirs = {
  react: `assets/npm/react@${versions.react}`,
  'react-dom': `assets/npm/react-dom@${versions['react-dom']}`,
  '@tonic-ui/react': `assets/npm/@tonic-ui/react@${versions['@tonic-ui/react']}`,
  app: 'assets/app',
  shell: 'assets/shell',
};

// The shared helper takes versions as a parameter; bind them for the
// Emotion-mapping walker, which calls the two-argument URL shape.
const boundCdnUrl = (specifier, external, standalone) => cdnUrl(specifier, external, standalone, versions);
const groups = {};
for (const family of Object.keys(specifiersMap)) {
  groups[family] = { local: null, cdn: await groupCdnSource(family, versions) };
}
// Bare specifiers a runtime bundle may import; anything else has no import-map
// target and would fail at runtime.
const allowedImports = new Set([
  ...Object.values(localEntries).map(entry => entry.specifier),
  ...runtimeSpecifiers,
]);
const apps = {};

for (const bundle of ['react', 'react-dom', '@tonic-ui/react', 'app', ...(inspector ? ['shell'] : [])]) {
  const result = await build({
    configFile: resolve(root, 'vite.config.mjs'),
    // Vite's `mode` option selects the configuration; the value names the bundle.
    mode: bundle,
    build: { outDir: resolve(outputRoot, bundleDirs[bundle]) },
  });
  const chunks = result.output.filter(item => item.type === 'chunk');
  const files = new Set(chunks.map(chunk => chunk.fileName));
  if (bundle !== 'shell') {
    // The shell bundles its own runtime; every other build must resolve each
    // remaining import through the import map.
    for (const chunk of chunks) {
      for (const id of [...chunk.imports, ...chunk.dynamicImports]) {
        if (bundle === '@tonic-ui/react' && isTonicUI(id)) {
          throw new Error(`Local @tonic-ui/react build still imports ${id}`);
        }
        if (!files.has(id) && !allowedImports.has(id)) {
          throw new Error(`Unmapped runtime import: ${id}`);
        }
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
      for (const file of chunk.viteMetadata?.importedCss || []) {
        css.add(`./${bundleDirs[bundle]}/${file}`);
      }
      for (const file of chunk.imports) {
        const dependency = chunks.find(item => item.fileName === file);
        if (dependency) {
          collect(dependency);
        }
      }
    }
    collect(entry);
    return { entry: `./${bundleDirs[bundle]}/${entry.fileName}`, css: [...css] };
  };
  if (bundle === 'app') {
    apps.app = descriptor('app');
  } else if (bundle === 'react') {
    // The combined entry serves every React package specifier, plus
    // `react-dom/client`; one module can expose only one `default`, so
    // `react-dom` builds as its own bundle.
    const combined = descriptor('react').entry;
    groups.react.local = {
      imports: {
        react: combined,
        'react/jsx-runtime': combined,
        'react/jsx-dev-runtime': combined,
      },
      probes: [...specifiersMap.react],
    };
  } else if (bundle === 'react-dom') {
    // The import map is a flat specifier table, so one group may span two
    // local files: `react-dom/client` is served by the combined entry.
    groups['react-dom'].local = {
      imports: {
        'react-dom': descriptor('react-dom').entry,
        'react-dom/client': groups.react.local.imports.react,
      },
      probes: [...specifiersMap['react-dom']],
    };
  } else if (bundle === '@tonic-ui/react') {
    groups['@tonic-ui/react'].local = {
      imports: { '@tonic-ui/react': descriptor('@tonic-ui/react').entry },
      probes: [...specifiersMap['@tonic-ui/react']],
    };
  }
}
for (const [name, group] of Object.entries(groups)) {
  if (!group.local || !group.cdn) {
    throw new Error(`Missing ${name} CDN or local sources`);
  }
}

// The @tonic-ui/react bundle imports the Emotion family, which esm.sh otherwise
// serves as a waterfall of small shared modules. The manifest maps the family
// at its single-file `?standalone` builds so the CDN load stays a handful of
// requests. The build probes the published tarball URL and selects the esm.sh
// build when the published package lacks the artifact. For the standalone
// artifact the keys are the bare specifiers read from the built file; for the
// esm.sh build the graph is walked from the live CDN wrapper so the URL keys
// always match what the browser requests.
const sharedImports = await createEmotionRedirects({ cdnUrl: boundCdnUrl, packageName }).collect({
  artifactFile: groups['@tonic-ui/react'].cdn.artifactFile,
  entryUrl: groups['@tonic-ui/react'].cdn.imports['@tonic-ui/react'],
});
// artifactFile is a build-time helper, not manifest content.
delete groups['@tonic-ui/react'].cdn.artifactFile;
await mkdir(outputRoot, { recursive: true });
await writeFile(join(outputRoot, 'runtime-manifest.json'), `${JSON.stringify({ versions, groups, apps, shared: { imports: sharedImports } }, null, 2)}\n`);
for (const name of ['index.html', 'bootstrap.js']) {
  await copyFile(resolve(root, 'public', name), join(outputRoot, name));
}
if (inspector) {
  for (const name of ['inspector.html', 'runtime.html', 'inspector-bootstrap.js']) {
    await copyFile(resolve(root, 'public', name), join(outputRoot, name));
  }
}
console.log(inspector
  ? 'Built the reference app and the runtime inspector: two React entries, one @tonic-ui/react bundle, the app, and the shell.'
  : 'Built the reference app: two React entries, one @tonic-ui/react bundle, and the app.');
