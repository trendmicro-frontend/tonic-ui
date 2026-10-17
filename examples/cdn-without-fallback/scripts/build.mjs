import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { copyFile, mkdir, rm, writeFile } from 'node:fs/promises';
import { build } from 'vite';
import {
  cdnUrl,
  groupCdnSource,
  groupKey,
  packageName,
  specifiersMap,
  versionsOf,
} from '../../cdn-shared/manifest.mjs';
import createEmotionRedirects from '../../cdn-shared/emotion-redirects.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputRoot = resolve(root, process.argv[2] || 'dist');
// The output directory is script-owned; wipe it so stale bundles from older
// builds are never served.
await rm(outputRoot, { recursive: true, force: true });

// Installed versions, for the manifest's CDN URLs and version display.
const versions = versionsOf([
  'react',
  'react-dom',
  '@tonic-ui/react',
  // The generated Emotion mappings reference pinned family builds; list every
  // mapped package for the manifest's `versions` fields.
  '@emotion/react',
  '@emotion/styled',
  '@emotion/cache',
  '@emotion/is-prop-valid',
]);
if (versions.react !== versions['react-dom']) {
  throw new Error('React and React DOM versions must match');
}

const result = await build({
  configFile: resolve(root, 'vite.config.mjs'),
  build: { outDir: outputRoot, emptyOutDir: true },
});
const chunks = result.output.filter(item => item.type === 'chunk');
const entry = chunks.find(chunk => chunk.isEntry && chunk.name === 'app');
if (!entry) {
  throw new Error('Missing application entry chunk');
}
const css = new Set();
const seen = new Set();
function collectCss(chunk) {
  if (seen.has(chunk.fileName)) {
    return;
  }
  seen.add(chunk.fileName);
  for (const file of chunk.viteMetadata?.importedCss || []) {
    css.add(`./assets/app/${file}`);
  }
  for (const file of chunk.imports) {
    const dependency = chunks.find(item => item.fileName === file);
    if (dependency) {
      collectCss(dependency);
    }
  }
}
collectCss(entry);

// No group has a local source: the runtime is CDN-only, and a failed probe
// ends startup with a visible error instead of falling back.
const groups = {};
for (const family of Object.keys(specifiersMap)) {
  groups[groupKey(family)] = { local: null, cdn: await groupCdnSource(family, versions) };
}
const boundCdnUrl = (specifier, external, standalone) => cdnUrl(specifier, external, standalone, versions);
// The Emotion mappings of the selected Tonic UI CDN source: the raw artifact
// reads its bare imports from the local file, the esm.sh build walks the
// live CDN graph.
const sharedImports = await createEmotionRedirects({ cdnUrl: boundCdnUrl, packageName }).collect({
  artifactFile: groups[groupKey('@tonic-ui')].cdn.artifactFile,
  entryUrl: groups[groupKey('@tonic-ui')].cdn.imports['@tonic-ui/react'],
});
// artifactFile is a build-time helper, not manifest content.
delete groups[groupKey('@tonic-ui')].cdn.artifactFile;
const manifest = {
  versions,
  groups,
  shared: { imports: sharedImports },
  apps: {
    app: { entry: `./${entry.fileName}`, css: [...css] },
  },
};
await mkdir(outputRoot, { recursive: true });
await writeFile(join(outputRoot, 'runtime-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
await copyFile(resolve(root, 'index.html'), join(outputRoot, 'index.html'));
await copyFile(resolve(root, '../cdn-shared/bootstrap.js'), join(outputRoot, 'bootstrap.js'));
console.log('Built the CDN-only reference app: one application bundle, the generated manifest, and the shared bootstrap.');
