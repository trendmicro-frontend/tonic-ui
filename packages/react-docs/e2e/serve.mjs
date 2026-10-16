import { spawnSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { preview } from 'vite';
import { tests } from './tests/index.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// Keep local test URLs independent of the docs site's deployment prefix.
for (const integration of tests) {
  const result = spawnSync('yarn', [integration.build], {
    cwd: root,
    env: { ...process.env, TONIC_UI_REACT_DOCS_BASE_PATH: '' },
    stdio: 'inherit',
  });
  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    throw new Error(`${integration.name} build failed (${result.signal || result.status})`);
  }
}

// All demos and their remote assets use same-origin URLs, as in Next's public/.
const server = await preview({
  configFile: false,
  root,
  base: '/',
  build: { outDir: resolve(root, 'public') },
  preview: { host: '127.0.0.1', port: 4182, strictPort: true },
});
server.printUrls();
