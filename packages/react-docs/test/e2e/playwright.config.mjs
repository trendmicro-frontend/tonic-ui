import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createE2EConfig } from '../../../../test/e2e/config.mjs';
import { tests } from './index.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../');
const host = process.env.E2E_HOST || '127.0.0.1';
const port = Number(process.env.E2E_PORT || 0);
const origin = process.env.E2E_DOCS_URL;

export default createE2EConfig(root, {
  testDir: '.',
  expect: { timeout: 30_000 },
  tests,
  baseURL: integration => origin && new URL(integration.path, origin).href,
  servers: [{
    commands: [
      ...tests.map(({ build }) => `yarn ${build}`),
      `yarn vite preview --outDir public --base / --host ${host} --port ${port} --strictPort`,
    ],
    cwd: '.',
    env: { TONIC_UI_REACT_DOCS_BASE_PATH: '' },
    wait: { stdout: /Local:\s+(?<E2E_DOCS_URL>https?:\/\/\S+)/ },
    timeout: 300_000,
  }],
});
