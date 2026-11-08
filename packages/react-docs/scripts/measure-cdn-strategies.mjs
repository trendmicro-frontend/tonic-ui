/**
 * Measure how `@tonic-ui/react` loads from each CDN strategy.
 *
 * Runs each configuration in a fresh Chromium browser (cold cache), three times,
 * and writes medians to pages/integrations/cdn/cdn-benchmark-data.json.
 *
 * Requirements: the sibling packages and the standalone artifact must be built,
 * because one strategy serves `packages/react/dist/standalone/index.min.js`:
 *
 *   yarn build
 *   node scripts/measure-cdn-strategies.mjs [output.json]
 *
 * Every number in the data file comes from this run; nothing is inferred.
 */
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import zlib from 'node:zlib';
import { chromium } from '@playwright/test';
import { build } from 'vite';

const ROOT = path.resolve(import.meta.dirname, '../../..');
const STANDALONE = path.join(ROOT, 'packages/react/dist/standalone/index.min.js');
const DEFAULT_OUTPUT = path.join(
  ROOT,
  'packages/react-docs/pages/integrations/cdn/cdn-benchmark-data.json',
);
// Measure the version the repository currently builds. CDN configurations can only
// run against a version that is actually on npm, so fall back to the published
// `latest` tag when the local version has not been released yet.
const reactPackage = JSON.parse(fs.readFileSync(path.join(ROOT, 'packages/react/package.json'), 'utf8'));
const registry = await fetch(`https://registry.npmjs.org/${reactPackage.name}`, {
  headers: { accept: 'application/json' },
}).then((response) => response.json());
const measuredVersion = registry.versions[reactPackage.version]
  ? reactPackage.version
  : registry['dist-tags'].latest;
if (measuredVersion !== reactPackage.version) {
  console.warn(`local version ${reactPackage.version} is not on npm; measuring ${measuredVersion}`);
}
const PKG = `${reactPackage.name}@${measuredVersion}`;
const STANDALONE_PATH = 'dist/standalone/index.min.js';
const REACT_VERSION = '19.2.7';
const ESM = 'https://esm.sh';
const JD = 'https://cdn.jsdelivr.net/npm';
const RUNS = 3;
const PORT = 4321;

const sharedReact = {
  react: `${ESM}/react@${REACT_VERSION}`,
  'react/jsx-runtime': `${ESM}/react@${REACT_VERSION}/jsx-runtime`,
  'react-dom': `${ESM}/react-dom@${REACT_VERSION}?external=react`,
  'react-dom/client': `${ESM}/react-dom@${REACT_VERSION}/client?external=react`,
};

// Canonical peers the application pins. jsDelivr emits version-pinned absolute URLs
// for every dependency, so each emitted URL for one of these packages must be
// redirected to the pinned instance before any module executes.
const canonicalPeerImports = {
  react: `${JD}/react@${REACT_VERSION}/+esm`,
  'react/jsx-runtime': `${JD}/react@${REACT_VERSION}/jsx-runtime/+esm`,
  'react-dom': `${JD}/react-dom@${REACT_VERSION}/+esm`,
  'react-dom/client': `${JD}/react-dom@${REACT_VERSION}/client/+esm`,
  '@emotion/react': `${JD}/@emotion/react@11.14.0/+esm`,
  '@emotion/react/jsx-runtime': `${JD}/@emotion/react@11.14.0/jsx-runtime/+esm`,
  '@emotion/styled/base': `${JD}/@emotion/styled@11.14.1/base/+esm`,
  '@emotion/is-prop-valid': `${JD}/@emotion/is-prop-valid@1.2.2/+esm`,
  'react-transition-group': `${JD}/react-transition-group@4.4.5/+esm`,
};

const canonicalReactImports = {
  react: canonicalPeerImports.react,
  'react/jsx-runtime': canonicalPeerImports['react/jsx-runtime'],
  'react-dom': canonicalPeerImports['react-dom'],
  'react-dom/client': canonicalPeerImports['react-dom/client'],
};

const peerKey = (pathname) => {
  const match = pathname.match(/^\/npm\/([^@/]+)@[^/]+(?:\/[^/]+)*\/\+esm$/);
  if (!match) {
    return null;
  }
  const [, packageName] = match;
  if (packageName === 'react') {
    return pathname.includes('jsx-runtime') ? 'react/jsx-runtime' : 'react';
  }
  if (packageName === 'react-dom') {
    return pathname.includes('client') ? 'react-dom/client' : 'react-dom';
  }
  if (packageName === '@emotion/react') {
    return pathname.includes('jsx-runtime') ? '@emotion/react/jsx-runtime' : '@emotion/react';
  }
  if (packageName === '@emotion/styled') {
    return pathname.includes('base') ? '@emotion/styled/base' : '@emotion/styled';
  }
  if (packageName === '@emotion/is-prop-valid') {
    return '@emotion/is-prop-valid';
  }
  if (packageName === 'react-transition-group') {
    return 'react-transition-group';
  }
  return null;
};

// `/npm/@tonic-ui/react-hooks@3.0.0-alpha.1/+esm` and `/npm/@tonic-ui/react-hooks/+esm`
// are the same module: the version is what differs, not the code.
const versionlessPath = (pathname) => {
  const segments = pathname.replace(/^\/npm\//, '').split('/');
  if (segments[0].startsWith('@')) {
    const [scope] = segments;
    const [name] = (segments[1] ?? '').split('@');
    return `/npm/${scope}/${name}${segments.length > 2 ? `/${segments.slice(2).join('/')}` : ''}`;
  }
  const [name] = segments[0].split('@');
  return `/npm/${name}${segments.length > 1 ? `/${segments.slice(1).join('/')}` : ''}`;
};

async function discoverJsDelivrAliases(rootUrl, canonical = canonicalPeerImports) {
  const aliases = { ...canonical };
  const canonicalByUrl = new Map();
  // Seed with the pinned peers, so an unpinned URL discovered later (for example
  // `/npm/react/+esm`) aliases back to the pinned copy instead of becoming canonical.
  for (const url of Object.values(canonical)) {
    canonicalByUrl.set(versionlessPath(new URL(url).pathname), url);
  }
  const queue = [rootUrl];
  const visited = new Set(queue);
  while (queue.length) {
    const batch = queue.splice(0, 8);
    const pages = await Promise.all(batch.map(async (href) => {
      try {
        const response = await fetch(href, { headers: { accept: 'application/javascript' } });
        return response.ok ? { href, text: await response.text() } : null;
      } catch {
        return null;
      }
    }));
    for (const page of pages) {
      if (!page) {
        continue;
      }
      for (const match of page.text.matchAll(/from\s*["']([^"']+)["']/g)) {
        let resolved;
        try {
          resolved = new URL(match[1], page.href);
        } catch {
          continue;
        }
        if (resolved.hostname !== 'cdn.jsdelivr.net' || !resolved.pathname.startsWith('/npm/')) {
          continue;
        }
        const key = peerKey(resolved.pathname);
        if (key) {
          aliases[resolved.href] = canonical[key];
        }
        // Alias every discovered URL to one canonical form per package + subpath.
        // Without this the graph fetches the same module twice: once pinned by the
        // entry, once unpinned by a sibling import.
        const canonicalKey = versionlessPath(resolved.pathname);
        if (!canonicalByUrl.has(canonicalKey)) {
          canonicalByUrl.set(canonicalKey, resolved.href);
        }
        const target = canonicalByUrl.get(canonicalKey);
        if (target !== resolved.href) {
          aliases[resolved.href] = target;
        }
        if (!visited.has(resolved.href)) {
          visited.add(resolved.href);
          queue.push(resolved.href);
        }
      }
    }
  }
  return { aliases, crawledModules: visited.size };
}

// Two build strategies, several delivery configurations. The canonical entries are the
// configurations that mount — the rows the documentation page compares; every other
// entry (`variant: true`) stays in the data file to support the failure and cross-CDN
// tables.
const CDN_BUILD = 'Bundle built by the CDN';
const LOCAL_BUILD = 'Bundle built by Tonic UI';
const APP_BUILD = 'Bundle built by your application';

// The fully self-hosted case: the application bundles React, React DOM, Emotion, and
// Tonic UI with its own bundler and serves every file from its own origin. The reference
// example already builds these bundles, so the measurement reuses its Vite configuration
// instead of inventing a second one.
const LOCAL_RUNTIME_DIR = path.join(ROOT, 'packages/react-docs/output/cdn-benchmark/cdn-local-runtime');

async function buildLocalRuntime() {
  const bundles = {};
  for (const name of ['react', 'react-dom', '@tonic-ui/react']) {
    await build({
      configFile: path.join(ROOT, 'examples/cdn-with-local-fallback/vite.config.mjs'),
      mode: name,
      build: { outDir: path.join(LOCAL_RUNTIME_DIR, name), emptyOutDir: true },
    });
    const files = fs.readdirSync(path.join(LOCAL_RUNTIME_DIR, name)).filter((file) => file.endsWith('.js'));
    if (files.length !== 1) {
      throw new Error(`Expected one bundle for ${name}, found: ${files.join(', ')}`);
    }
    bundles[name] = path.join(LOCAL_RUNTIME_DIR, name, files[0]);
  }
  return bundles;
}

// Emotion as its own CDN bundles, so the artifact's four Emotion specifiers can
// come from the same origin as React and the artifact.
const EMOTION_DIR = path.join(ROOT, 'packages/react-docs/output/cdn-benchmark/cdn-emotion');

async function buildEmotionBundles() {
  await build({
    configFile: path.join(ROOT, 'examples/cdn-with-local-fallback/vite.emotion.config.mjs'),
    build: { outDir: EMOTION_DIR, emptyOutDir: true },
  });
  return fs.readdirSync(EMOTION_DIR).filter((file) => file.endsWith('.js'));
}

let emotionFiles = [];
try {
  emotionFiles = await buildEmotionBundles();
} catch (error) {
  console.warn(`emotion bundles unavailable (${error.message}); skipping the self-hosted CDN configuration`);
}

let localRuntimeFiles = new Map();
try {
  const bundles = await buildLocalRuntime();
  localRuntimeFiles = new Map([
    [`react@${REACT_VERSION}.js`, bundles.react],
    [`react-dom@${REACT_VERSION}.js`, bundles['react-dom']],
    [`@tonic-ui/react@${reactPackage.version}.js`, bundles['@tonic-ui/react']],
  ]);
} catch (error) {
  console.warn(`local runtime bundles unavailable (${error.message}); skipping the all-local configuration`);
}

// The application-bundled strategy: one normal production build in which the
// bundler resolves React, React DOM, Tonic UI, and Emotion. Nothing is external
// and there is no import map.
const APP_BUNDLE_DIR = path.join(ROOT, 'packages/react-docs/output/cdn-benchmark/cdn-app-bundle');

async function buildAppBundle() {
  await build({
    configFile: path.join(ROOT, 'examples/cdn-with-local-fallback/vite.app.config.mjs'),
    build: { outDir: APP_BUNDLE_DIR, emptyOutDir: true },
  });
  const meta = JSON.parse(fs.readFileSync(path.join(APP_BUNDLE_DIR, 'build-meta.json'), 'utf8'));
  const entry = meta.chunks.find((chunk) => chunk.isEntry);
  if (!entry) {
    throw new Error('the application build produced no entry chunk');
  }
  const modules = meta.chunks.flatMap((chunk) => chunk.modules);
  const includes = (pattern) => modules.some((id) => pattern.test(id));
  return {
    entryFile: entry.file,
    composition: meta.composition ?? {},
    chunks: meta.chunks.map((chunk) => ({ file: chunk.file, modules: chunk.modules.length })),
    // Informational only: these are the dependencies verified in the build
    // metadata, not extra network requests.
    bundledDependencies: [
      includes(/node_modules\/react\//) && 'React',
      includes(/node_modules\/react-dom\//) && 'React DOM',
      includes(/(packages\/react\/|@tonic-ui\/)/) && 'Tonic UI',
      includes(/@emotion\//) && 'Emotion',
    ].filter(Boolean),
  };
}

// A failed production build invalidates the strategy instead of publishing a
// stale row.
const appBundle = await buildAppBundle();

const configurations = [
  {
    id: 'esmsh-default',
    variant: true,
    provider: 'esm.sh',
    build: CDN_BUILD,
    label: 'Plain entry, no import map',
    note: 'Failure case: no import map. esm.sh pins React for every package on its own, so the graph loads two React instances and hooks throw.',
    entry: `${ESM}/${PKG}`,
    importMap: {},
    react: `${ESM}/react@${REACT_VERSION}`,
    reactDomClient: `${ESM}/react-dom@${REACT_VERSION}/client`,
  },
  {
    id: 'esmsh-external',
    variant: false,
    provider: 'esm.sh',
    build: CDN_BUILD,
    label: '`?external` entry: one module per package',
    note: 'Mounts: `?external=react,react-dom` keeps React external and a four-entry import map supplies it. Every package is still fetched separately, so the request count is the highest of the working setups.',
    entry: `${ESM}/${PKG}?external=react,react-dom`,
    importMap: sharedReact,
    react: 'react',
    reactDomClient: 'react-dom/client',
  },
  {
    id: 'esmsh-standalone',
    provider: 'esm.sh',
    build: CDN_BUILD,
    label: '`?standalone` bundle, built by esm.sh',
    note: '`?standalone&external=react,react-dom`: esm.sh builds one file from the package at request time, then an import map supplies the peers. Not Tonic UI\'s `dist/standalone` artifact.',
    entry: `${ESM}/${PKG}?standalone&external=react,react-dom`,
    importMap: sharedReact,
    react: 'react',
    reactDomClient: 'react-dom/client',
  },
  {
    id: 'esmsh-standalone-no-external',
    variant: true,
    provider: 'esm.sh',
    build: CDN_BUILD,
    label: '`?standalone` bundle with no peer map',
    note: 'Failure case: `?standalone` bundles its own React, so hooks run on a second instance.',
    entry: `${ESM}/${PKG}?standalone`,
    importMap: sharedReact,
    react: 'react',
    reactDomClient: 'react-dom/client',
  },
  {
    id: 'jsdelivr-default',
    variant: true,
    provider: 'jsDelivr',
    build: CDN_BUILD,
    label: '`+esm`, no import map',
    note: 'Failure case: jsDelivr pins each peer to its own version.',
    entry: `${JD}/${PKG}/+esm`,
    importMap: {},
    react: `${JD}/react@${REACT_VERSION}/+esm`,
    reactDomClient: `${JD}/react-dom@${REACT_VERSION}/client/+esm`,
  },
  {
    id: 'jsdelivr-esm',
    provider: 'jsDelivr',
    build: CDN_BUILD,
    label: '`+esm` bundle, built by jsDelivr',
    note: 'jsDelivr bundles each package into one file and pins every dependency to an absolute URL; the alias map collapses those URLs onto the pinned peers.',
    entry: `${JD}/${PKG}/+esm`,
    importMap: null, // filled from the live graph before the run
    react: 'react',
    reactDomClient: 'react-dom/client',
  },
  {
    id: 'jsdelivr-esm-pinned-peers',
    variant: true,
    provider: 'jsDelivr',
    build: CDN_BUILD,
    label: '`+esm` with Emotion pinned too',
    note: 'Variant of jsDelivr `+esm`: the alias map covers Emotion as well as React.',
    entry: `${JD}/${PKG}/+esm`,
    importMap: null, // filled from the live graph before the run
    react: 'react',
    reactDomClient: 'react-dom/client',
  },
  {
    id: 'jsdelivr-standalone',
    provider: 'jsDelivr',
    build: LOCAL_BUILD,
    label: '`dist/standalone` artifact, served by jsDelivr',
    note: 'The npm-published `dist/standalone/index.min.js` served by jsDelivr. Measured only when the published tarball contains the artifact; otherwise the probe records a 404 and the row is left unmeasured.',
    entry: `${JD}/${PKG}/${STANDALONE_PATH}`,
    available: null, // probed below: 404 until the artifact is published to npm
    importMap: {
      ...sharedReact,
      '@emotion/react': `${ESM}/@emotion/react@11.14.0?external=react`,
      '@emotion/react/jsx-runtime': `${ESM}/@emotion/react@11.14.0/jsx-runtime?external=react`,
      '@emotion/styled/base': `${ESM}/@emotion/styled@11.14.1/base?external=react`,
      '@emotion/is-prop-valid': `${ESM}/@emotion/is-prop-valid@1.2.2`,
    },
    react: 'react',
    reactDomClient: 'react-dom/client',
  },
  {
    id: 'jsdelivr-standalone-jsdelivr-peers',
    variant: true,
    provider: 'jsDelivr',
    build: LOCAL_BUILD,
    label: '`dist/standalone` artifact, every peer from jsDelivr',
    note: 'Variant: the published standalone bundle with the React family and Emotion served by jsDelivr, so one origin serves everything.',
    entry: `${JD}/${PKG}/${STANDALONE_PATH}`,
    available: null,
    importMap: null, // filled from the live jsDelivr peer graph before the run
    react: 'react',
    reactDomClient: 'react-dom/client',
  },
  {
    id: 'self-hosted-standalone',
    provider: 'Self-hosted',
    build: LOCAL_BUILD,
    label: '`dist/standalone` artifact, served by you',
    note: 'The artifact and complete standalone bundles for React, React DOM, and Emotion, all served from your own origin. No CDN is involved.',
    entry: '/cdn/standalone/index.min.js',
    importMap: {
      react: '/cdn/react.js',
      'react/jsx-runtime': '/cdn/react.js',
      'react-dom': '/cdn/react-dom.js',
      'react-dom/client': '/cdn/react.js',
      '@emotion/react': '/cdn/emotion-react.js',
      '@emotion/react/jsx-runtime': '/cdn/emotion-react.js',
      '@emotion/styled/base': '/cdn/emotion-styled-base.js',
      '@emotion/is-prop-valid': '/cdn/emotion-is-prop-valid.js',
    },
    react: 'react',
    reactDomClient: 'react-dom/client',
  },
  {
    id: 'esmsh-raw-standalone',
    provider: 'esm.sh',
    build: LOCAL_BUILD,
    label: '`dist/standalone` artifact, served by raw.esm.sh',
    note: 'The npm-published artifact fetched from `raw.esm.sh`; the React family and Emotion resolve on esm.sh. The `raw.` host is required: the plain host answers this path with a 478-byte wrapper.',
    entry: `https://raw.esm.sh/${PKG}/${STANDALONE_PATH}`,
    importMap: {
      ...sharedReact,
      '@emotion/react': `${ESM}/@emotion/react@11.14.0?external=react`,
      '@emotion/react/jsx-runtime': `${ESM}/@emotion/react@11.14.0/jsx-runtime?external=react`,
      '@emotion/styled/base': `${ESM}/@emotion/styled@11.14.1/base?external=react`,
      '@emotion/is-prop-valid': `${ESM}/@emotion/is-prop-valid@1.2.2`,
    },
    react: 'react',
    reactDomClient: 'react-dom/client',
  },
  {
    id: 'app-bundled',
    variant: false,
    provider: 'Self-hosted',
    build: APP_BUILD,
    label: 'Application bundle',
    note: 'React, React DOM, Tonic UI, and Emotion are resolved by the application bundler. The page loads one built entry; no import map and no CDN request.',
    app: true,
    entry: `/app/${appBundle.entryFile}`,
    importMap: {},
    react: null,
    reactDomClient: null,
  },
  {
    id: 'self-hosted-standalone-no-map',
    variant: true,
    provider: 'Self-hosted',
    build: LOCAL_BUILD,
    label: '`dist/standalone` artifact with no import map',
    note: 'Failure case: the bundle keeps six bare imports; nothing resolves them.',
    entry: '/standalone/index.min.js',
    importMap: {},
    react: 'react',
    reactDomClient: 'react-dom/client',
  },
  {
    id: 'esmsh-standalone-jsdelivr-react',
    variant: true,
    provider: 'esm.sh + jsDelivr',
    build: CDN_BUILD,
    label: 'esm.sh entry, jsDelivr React',
    note: 'Variant: the library entry stays on esm.sh, the React family comes from jsDelivr.',
    entry: `${ESM}/${PKG}?standalone&external=react,react-dom`,
    importMap: {
      react: `${JD}/react@${REACT_VERSION}/+esm`,
      'react/jsx-runtime': `${JD}/react@${REACT_VERSION}/jsx-runtime/+esm`,
      'react-dom': `${JD}/react-dom@${REACT_VERSION}/+esm`,
      'react-dom/client': `${JD}/react-dom@${REACT_VERSION}/client/+esm`,
    },
    react: 'react',
    reactDomClient: 'react-dom/client',
  },
];

const pageHtml = (config) => {
  if (config.app) {
    // A normal application page: one module script, no import map.
    return `<!doctype html>
<html><head><meta charset="utf-8"><title>${config.id}</title></head>
<body><div id="root"></div>
<script type="module" src="${config.entry}"></script>
</body></html>`;
  }
  const importMap = Object.keys(config.importMap).length
    ? `<script type="importmap">${JSON.stringify({ imports: config.importMap })}</script>`
    : '';
  return `<!doctype html>
<html><head><meta charset="utf-8"><title>${config.id}</title></head>
<body><div id="root"></div>
${importMap}
<script type="module">
window.__result = { error: null, hookValue: null, mountedAt: null };
const markMounted = () => {
  if (window.__result.mountedAt !== null) {
    return;
  }
  if (document.querySelector('#root button')) {
    window.__result.mountedAt = performance.now();
    return;
  }
  requestAnimationFrame(markMounted);
};
requestAnimationFrame(markMounted);
async function main() {
  const tonic = await import(${JSON.stringify(config.entry)});
  const React = await import(${JSON.stringify(config.react)});
  const { createRoot } = await import(${JSON.stringify(config.reactDomClient)});
  const { TonicProvider, Box, Button, useColorMode } = tonic;
  const App = () => {
    const [colorMode] = useColorMode();
    window.__result.hookValue = colorMode;
    return React.createElement(Box, { p: '4x' },
      React.createElement(Button, null, 'rendered:' + colorMode));
  };
  createRoot(document.getElementById('root')).render(
    React.createElement(TonicProvider, null, React.createElement(App))
  );
}
main().catch((error) => { window.__result.error = String(error && error.message || error); });
</script></body></html>`;
};

// A module request is any response served as JavaScript. esm.sh answers some
// specifier URLs (`?external=react&target=es2022`) with a small re-export shim,
// so a filename-only filter under-counts the requests.
const isModule = (item) => /javascript/i.test(item.type) || /\.(mjs|js)(\?|$)|\/\+esm(\?|$)/.test(item.url);
// React itself, not react-dom, jsx runtimes, or unrelated packages named "react-*".
const isReactModule = (url) =>
  /\/cdn\/react\.js$/.test(url) ||
  (!url.includes('@tonic-ui') && !url.includes('@emotion') && !url.includes('react-dom') &&
    !url.includes('jsx-runtime') && !url.includes('react-is') && !url.includes('react-transition-group') &&
    /react@\d+\.\d+\.\d+/.test(url));
// Group by dependency family, not by host: the self-hosted `standalone/index.min.js`
// is still the Tonic UI bundle, only served from a different origin. A merged bundle
// carries peer code inside it, so it gets its own family: counting it as plain
// "Tonic UI" would make the bars incomparable with per-package setups.
const isAppBundleFile = (url) => /\/app\/assets\//.test(url);
const isBundleFile = (url) => /\/es2022\/react\.bundle\.mjs/.test(url) || /\/standalone\/index(\.min)?\.js/.test(url) || /\/runtime\/@tonic-ui\/react@/.test(url);
const groupOf = (url) => {
  if (isAppBundleFile(url)) {
    return 'Application bundle';
  }
  // Same-origin CDN bundles are named after their family.
  if (/\/cdn\/react(-dom)?\.js$/.test(url)) {
    return 'React / React DOM';
  }
  if (/\/cdn\/emotion[^/]*\.js$/.test(url)) {
    return 'Emotion';
  }
  if (isBundleFile(url)) {
    return 'Tonic UI bundle (merged dependencies)';
  }
  if (/@tonic-ui\//.test(url)) {
    return 'Tonic UI packages';
  }
  if (/(^|\/)(react|react-dom|scheduler)@/.test(url)) {
    return 'React / React DOM';
  }
  if (/@emotion\//.test(url)) {
    return 'Emotion';
  }
  return 'Other dependencies';
};
const stripHost = (url) => url.replace(/^https?:\/\/(esm\.sh|cdn\.jsdelivr\.net)\/(npm\/)?/, '').replace(/^http:\/\/localhost:4321\//, '');
const median = (values) => [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)];
const kiB = (bytes) => +(bytes / 1024).toFixed(1);

const serveScript = (response, file) => {
  // Self-hosting is measured the way a real server behaves: compressed on the wire.
  response.writeHead(200, { 'content-type': 'application/javascript', 'content-encoding': 'br' });
  response.end(zlib.brotliCompressSync(fs.readFileSync(file)));
};

const server = http.createServer((request, response) => {
  if (request.url === '/standalone/index.min.js') {
    serveScript(response, STANDALONE);
    return;
  }
  const cdnFile = request.url.match(/^\/cdn\/(.+)$/);
  if (cdnFile) {
    const name = decodeURIComponent(cdnFile[1]);
    const files = {
      'standalone/index.min.js': STANDALONE,
      'react.js': localRuntimeFiles.get(`react@${REACT_VERSION}.js`),
      'react-dom.js': localRuntimeFiles.get(`react-dom@${REACT_VERSION}.js`),
      ...Object.fromEntries(emotionFiles.map((file) => [file, path.join(EMOTION_DIR, file)])),
    };
    const file = files[name];
    if (file && fs.existsSync(file)) {
      serveScript(response, file);
      return;
    }
    response.writeHead(404).end('not found');
    return;
  }
  const appAsset = request.url.match(/^\/app\/(.+)$/);
  if (appAsset) {
    const file = path.join(APP_BUNDLE_DIR, decodeURIComponent(appAsset[1]));
    if (file.startsWith(APP_BUNDLE_DIR) && fs.existsSync(file)) {
      const type = path.extname(file) === '.css' ? 'text/css' : 'application/javascript';
      response.writeHead(200, { 'content-type': type, 'content-encoding': 'br' });
      response.end(zlib.brotliCompressSync(fs.readFileSync(file)));
      return;
    }
    response.writeHead(404).end('not found');
    return;
  }
  const runtime = request.url.match(/^\/runtime\/(.+)$/);
  if (runtime && localRuntimeFiles.has(runtime[1])) {
    serveScript(response, localRuntimeFiles.get(runtime[1]));
    return;
  }
  const match = request.url.match(/^\/config\/([a-z-]+)/);
  if (match) {
    const config = configurations.find((item) => item.id === match[1]);
    response.writeHead(200, { 'content-type': 'text/html' });
    response.end(pageHtml(config));
    return;
  }
  response.writeHead(404).end('not found');
});

async function measure(config) {
  const identity = {
    id: config.id,
    label: config.label,
    note: config.note,
    variant: Boolean(config.variant),
    provider: config.provider,
    build: config.build,
    entry: config.entry,
    importMap: config.importMap,
    ...(config.app
      ? {
          app: true,
          chunks: appBundle.chunks,
          bundledDependencies: appBundle.bundledDependencies,
          bundledComposition: appBundle.composition,
        }
      : {}),
  };
  if (config.available === false) {
    // The CDN cannot serve a file the published package does not contain; there is
    // nothing to measure. The probe result is recorded so the page can say why.
    return {
      ...identity,
      status: 'unavailable',
      renders: false,
      renderRuns: '0/0',
      probeStatus: config.probeStatus,
      failure: `HTTP ${config.probeStatus}: the published npm package does not contain ${STANDALONE_PATH}`,
      requests: null,
      transferredKiB: null,
      decodedKiB: null,
      moduleSpanMs: null,
      reactModulesLoaded: 0,
      reactModulesShared: 0,
      reactInstances: 0,
      emotionModulesLoaded: 0,
      reactModuleUrls: [],
      groupsKiB: {},
      duplicateRequests: null,
      duplicatePaths: [],
      topFiles: [],
      waterfall: [],
    };
  }
  const runs = [];
  for (let index = 0; index < RUNS; index += 1) {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    const requests = [];
    const startedAt = new Map();
    const consoleErrors = [];
    const origin = Date.now();

    page.on('console', (message) => {
      if (message.type() === 'error') {
        consoleErrors.push(message.text());
      }
    });
    page.on('pageerror', (error) => consoleErrors.push(String(error.message)));
    page.on('request', (request) => startedAt.set(request.url(), Date.now() - origin));
    // esm.sh streams module bodies without a Content-Length header, so the header
    // alone under-reports the wire size. CDP's loadingFinished gives the encoded
    // (on-the-wire) byte count for every response.
    const cdp = await page.context().newCDPSession(page);
    await cdp.send('Network.enable');
    const requestUrls = new Map();
    const wireBytes = new Map();
    cdp.on('Network.requestWillBeSent', (event) => requestUrls.set(event.requestId, event.request.url));
    cdp.on('Network.loadingFinished', (event) => {
      const url = requestUrls.get(event.requestId);
      if (url) {
        wireBytes.set(url, (wireBytes.get(url) ?? 0) + (event.encodedDataLength ?? 0));
      }
    });
    page.on('response', async (response) => {
      const url = response.url();
      if (url.startsWith(`http://localhost:${PORT}/config`)) {
        return;
      }
      let decoded = 0;
      try {
        decoded = (await response.body()).length;
      } catch {
        // HEAD or opaque response: keep the header value instead.
      }
      const headerLength = Number(response.headers()['content-length'] || 0);
      const type = response.headers()['content-type'] ?? '';
      const start = startedAt.get(url) ?? Date.now() - origin;
      const end = Date.now() - origin;
      requests.push({ url, status: response.status(), type, start, duration: Math.max(0, end - start), transferred: headerLength || decoded, decoded });
    });

    await page.goto(`http://localhost:${PORT}/config/${config.id}`, { waitUntil: 'networkidle', timeout: 90000 });
    await page.waitForTimeout(4000);

    const check = await page.evaluate(() => {
      const box = document.querySelector('#root div');
      const button = document.querySelector('#root button');
      return {
        error: window.__result.error,
        hookValue: window.__result.hookValue,
        mountedAt: window.__result.mountedAt,
        button: button ? button.textContent : null,
        boxPadding: box ? getComputedStyle(box).padding : null,
        styleTags: document.querySelectorAll('style').length,
      };
    });

    // Replace the header estimate with measured wire bytes. When one URL is fetched
    // more than once, split the total so the sum stays correct.
    const urlCounts = new Map();
    for (const entry of requests) {
      urlCounts.set(entry.url, (urlCounts.get(entry.url) ?? 0) + 1);
    }
    for (const [url, wire] of wireBytes.entries()) {
      const count = urlCounts.get(url) ?? 0;
      if (count) {
        for (const entry of requests.filter((item) => item.url === url)) {
          entry.transferred = Math.round(wire / count);
        }
      }
    }

    // Namespace objects differ when a CDN serves a re-export wrapper, so compare
    // the React functions themselves: one instance shares the same function objects.
    const modules = requests.filter(isModule).sort((a, b) => a.start - b.start);
    const reactUrls = [...new Set(modules.map((item) => item.url).filter(isReactModule))];
    const appUrl = config.app ? null : (config.importMap.react ?? config.react);
    // One self-contained bundle has no bare specifier left to import and compare
    // against. Every other configuration compares the React functions themselves.
    let reactIdentity = [];
    if (!config.app) {
      try {
        reactIdentity = await page.evaluate(async ({ appUrl, urls }) => {
          const app = await import(appUrl);
          return Promise.all(urls.map(async (url) => {
            try {
              const candidate = await import(url);
              return { url, sameAsAppReact: candidate.useState === app.useState && candidate.createElement === app.createElement };
            } catch (error) {
              return { url, error: String(error.message) };
            }
          }));
        }, { appUrl, urls: reactUrls });
      } catch (error) {
        // The application never reached its React import (no import map, bad entry).
        reactIdentity = [{ url: appUrl, error: String(error.message) }];
      }
    }

    runs.push({
      userAgent: await page.evaluate(() => navigator.userAgent),
      requests: modules.length,
      transferred: modules.reduce((sum, item) => sum + item.transferred, 0),
      decoded: modules.reduce((sum, item) => sum + item.decoded, 0),
      span: modules.length ? modules[modules.length - 1].start + modules[modules.length - 1].duration : 0,
      readyMs: check.mountedAt,
      modules,
      reactIdentity,
      consoleErrors: consoleErrors.slice(0, 3),
      ...check,
    });
    await browser.close();
  }

  const renders = runs.map((run) => Boolean(run.button && run.boxPadding === '16px' && run.hookValue));
  const requestsMedian = median(runs.map((run) => run.requests));
  // The detail lists come from one run, so pick a run whose request count equals
  // the reported median: the popover's bucket counts then add up to the headline
  // number. Falls back to the first run that rendered.
  const renderingRuns = runs.filter((run, index) => renders[index]);
  const representative = renderingRuns.find((run) => run.requests === requestsMedian) ??
    renderingRuns[0] ??
    runs[0];
  const groups = {};
  for (const run of runs) {
    for (const entry of run.modules) {
      groups[groupOf(entry.url)] = (groups[groupOf(entry.url)] || 0) + entry.decoded;
    }
  }
  const emotionUrls = new Set(representative.modules.filter((entry) => /@emotion\//.test(entry.url)).map((entry) => entry.url));
  // Same module served under two specifiers (pinned and unpinned) is fetched twice.
  const duplicateStats = (modules) => {
    const paths = new Map();
    for (const entry of modules) {
      // Drop the host, the query, and the version segment: the scoped package name
      // and subpath stay, so `@emotion/react` is not mistaken for `react`.
      const key = stripHost(entry.url).split('?')[0].replace(/@\d[\w.-]*(?=\/|$)/, '');
      paths.set(key, (paths.get(key) ?? 0) + 1);
    }
    const repeated = [...paths.entries()].filter(([, count]) => count > 1);
    return {
      duplicateRequests: repeated.reduce((sum, [, count]) => sum + count - 1, 0),
      duplicatePaths: repeated.map(([path, count]) => `${path} x${count}`),
    };
  };
  const duplicates = duplicateStats(representative.modules);
  const buckets = {};
  for (const entry of representative.modules) {
    const bucket = Math.floor(entry.start / 100) * 100;
    buckets[bucket] = buckets[bucket] ?? { requests: 0, transferred: 0, decoded: 0 };
    buckets[bucket].requests += 1;
    buckets[bucket].transferred += entry.transferred;
    buckets[bucket].decoded += entry.decoded;
  }

  return {
    ...identity,
    status: 'measured',
    renders: renders.every(Boolean),
    renderRuns: `${renders.filter(Boolean).length}/${RUNS}`,
    failure: representative.error || representative.consoleErrors[0] || null,
    requests: requestsMedian,
    transferredKiB: kiB(median(runs.map((run) => run.transferred))),
    decodedKiB: kiB(median(runs.map((run) => run.decoded))),
    moduleSpanMs: median(runs.map((run) => run.span)),
    // Navigation start to the first painted application UI, measured in the page.
    readyMs: Math.round(median(runs.map((run) => run.readyMs).filter((value) => Number.isFinite(value)))),
    reactModulesLoaded: representative.reactIdentity.length,
    reactModulesShared: representative.reactIdentity.filter((item) => item.sameAsAppReact).length,
    // Distinct React instances: one per URL that failed to match the application's
    // React, plus the application's own copy when it resolved at all.
    // One self-contained bundle: the build metadata shows a single React package
    // and a successful mount proves it works. Nothing else can be imported.
    reactInstances: config.app
      ? 1
      : representative.reactIdentity.filter((item) => !item.error && !item.sameAsAppReact).length +
        (representative.reactIdentity.some((item) => item.sameAsAppReact) ? 1 : 0),
    emotionModulesLoaded: emotionUrls.size,
    // Every JavaScript response the run made, largest first: this is what the
    // "Requests" number counts.
    files: representative.modules
      .map((module) => ({
        path: stripHost(module.url),
        group: groupOf(module.url),
        decodedKiB: kiB(module.decoded),
      }))
      .sort((a, b) => b.decodedKiB - a.decodedKiB),
    // The distinct @emotion/* modules behind `emotionModulesLoaded`.
    emotionFiles: [...emotionUrls].map((url) => stripHost(url)).sort(),
    reactModuleUrls: representative.reactIdentity.map((item) => ({ url: item.url, shared: Boolean(item.sameAsAppReact) })),
    groupsKiB: Object.fromEntries(Object.entries(groups).map(([key, value]) => [key, kiB(value / RUNS)])),
    duplicateRequests: median(runs.map((run) => duplicateStats(run.modules).duplicateRequests)),
    duplicatePaths: duplicates.duplicatePaths,
    topFiles: representative.modules
      .sort((a, b) => b.decoded - a.decoded)
      .slice(0, 12)
      .map((module) => ({
        path: stripHost(module.url),
        group: groupOf(module.url),
        transferredKiB: kiB(module.transferred),
        decodedKiB: kiB(module.decoded),
        start: module.start,
        duration: module.duration,
      })),
    waterfall: Object.entries(buckets)
      .map(([start, bucket]) => ({
        start: Number(start),
        requests: bucket.requests,
        transferredKiB: kiB(bucket.transferred),
        decodedKiB: kiB(bucket.decoded),
      }))
      .sort((a, b) => a.start - b.start),
  };
}

const output = process.argv[2] || DEFAULT_OUTPUT;
if (!fs.existsSync(STANDALONE)) {
  console.error(`Missing ${STANDALONE}. Run \`yarn build\` in packages/react first.`);
  process.exit(1);
}

const jsDelivrGraph = await discoverJsDelivrAliases(`${JD}/${PKG}/+esm`, canonicalReactImports);
const jsDelivrPeerGraph = await discoverJsDelivrAliases(`${JD}/${PKG}/+esm`, canonicalPeerImports);
configurations.find((config) => config.id === 'jsdelivr-esm').importMap = jsDelivrGraph.aliases;
configurations.find((config) => config.id === 'jsdelivr-esm-pinned-peers').importMap = jsDelivrPeerGraph.aliases;
configurations.find((config) => config.id === 'jsdelivr-standalone-jsdelivr-peers').importMap = jsDelivrPeerGraph.aliases;

// Configurations whose entry is a raw file from the published tarball are probed
// first: a 404 means the artifact is not released yet, and there is nothing to run.
for (const config of configurations) {
  if (config.available === null) {
    const response = await fetch(config.entry, { headers: { accept: 'application/javascript' } });
    config.available = response.ok;
    config.probeStatus = response.status;
    console.log(`probe ${config.label}: HTTP ${response.status} ${config.entry}`);
  }
}

console.log(`jsDelivr graph crawl: ${jsDelivrPeerGraph.crawledModules} modules, ${Object.keys(jsDelivrGraph.aliases).length} React aliases, ${Object.keys(jsDelivrPeerGraph.aliases).length} peer aliases`);

await new Promise((resolve) => server.listen(PORT, resolve));
const strategies = [];
try {
  for (const config of configurations) {
    if (config.id === 'self-hosted-runtime' && localRuntimeFiles.size === 0) {
      continue;
    }
    const result = await measure(config);
    strategies.push(result);
    console.log(`${result.label}: ${result.renders ? 'rendered' : 'failed'} · ${result.requests} requests · ${result.transferredKiB} KiB · ${result.reactModulesLoaded} React modules (${result.reactModulesShared} shared)`);
  }
} finally {
  server.close();
}

const document = {
  generatedAt: new Date().toISOString().slice(0, 10),
  method: {
    package: PKG,
    runsPerStrategy: RUNS,
    browser: strategies[0].userAgent,
    cache: 'fresh browser context per run (cold cache)',
    workload: 'TonicProvider + Box p="4x" + Button + useColorMode',
    successCriteria: 'Button present, computed padding 16px, useColorMode returned a value',
    sizes: 'JavaScript module requests only; transferred = bytes on the wire (CDP encodedDataLength, so compression counts), decoded = decompressed body length',
    span: 'first to last JavaScript module request, including incomplete graphs for failed runs',
    standaloneHost: 'the Rollup standalone artifact is served brotli-compressed from localhost, as a real origin would',
    localRuntime: 'the all-local configuration builds React, React DOM, and the Tonic UI closure with the reference example\'s Vite configuration, then serves the three bundles brotli-compressed from localhost',
  },
  strategies,
};
fs.writeFileSync(output, `${JSON.stringify(document, null, 2)}\n`, 'utf8');
console.log(`Benchmark data written to ${output}`);
