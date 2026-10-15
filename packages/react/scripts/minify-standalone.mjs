// Minifies the standalone artifact in place (plus a sibling sourcemap) using
// the workspace's esbuild binary, and replaces the one browser-runtime
// reference the bundle cannot have: `process.env.NODE_ENV`.
import { spawnSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const packageDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const artifact = join(packageDirectory, 'dist', 'standalone', 'index.js');

if (!existsSync(artifact)) {
  // The regular build skips the standalone target when a sibling package's
  // dist is missing, so the minify step is a no-op in that case too.
  console.warn('[minify-standalone] No dist/standalone/index.js found; skipping.');
  process.exit(0);
}

const repositoryRoot = resolve(packageDirectory, '..', '..');
const esbuildBinary = join(
  repositoryRoot,
  'node_modules',
  '.bin',
  process.platform === 'win32' ? 'esbuild.cmd' : 'esbuild'
);

const result = spawnSync(
  esbuildBinary,
  [
    artifact,
    '--minify',
    '--format=esm',
    '--target=es2022',
    '--sourcemap',
    '--allow-overwrite',
    '--define:process.env.NODE_ENV="production"',
    `--outfile=${artifact}`,
  ],
  { stdio: 'inherit' }
);

if (result.status !== 0) {
  process.exit(result.status);
}

// The single rule for standalone artifacts: the shipped file may only import
// the external React and Emotion families; anything else is dependency drift
// that would break raw-file consumers. The minified output has no comments,
// so a bare-import scan cannot be fooled by doc-comment examples.
const code = await readFile(artifact, 'utf-8');
const importPatterns = [
  /\bimport\s*["']([^"'./][^"']*)["']/g,
  /\bimport\s*(?:(?:[\w$]+|\*\s*as\s*[\w$]+|\{[^{}]*\})(?:\s*,\s*(?:[\w$]+|\*\s*as\s*[\w$]+|\{[^{}]*\}))?)\s*from\s*["']([^"'./][^"']*)["']/g,
];
const specifiers = new Set();
for (const pattern of importPatterns) {
  for (const match of code.matchAll(pattern)) {
    specifiers.add(match[1]);
  }
}
const isExternal = id =>
  /^(react|react-dom)(\/|$)/.test(id) || id === '@emotion' || id.startsWith('@emotion/');
const violations = [...specifiers].filter(id => !isExternal(id));
if (violations.length > 0) {
  console.error(
    `The standalone bundle imports outside the external set: ${violations.join(', ')}`
  );
  process.exit(1);
}
