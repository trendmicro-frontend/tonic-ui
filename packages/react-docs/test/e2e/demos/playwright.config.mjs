import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createE2EConfig } from '../../../../../test/e2e/config.mjs';
import { tests } from './index.mjs';

// `test/e2e/demos` -> `packages/react-docs`
const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const host = process.env.E2E_HOST || '127.0.0.1';
const port = Number(process.env.E2E_PORT || 0);

export default createE2EConfig(root, {
  testDir: '.',
  expect: { timeout: 30_000 },
  tests,
  baseURL: (target) => process.env.E2E_DOCS_URL && new URL(target.path, process.env.E2E_DOCS_URL).href,
  servers: [
    {
      commands: [
        ...tests.filter(({ build }) => build).map(({ build }) => `yarn ${build}`),
        `yarn vite preview --outDir public --base / --host ${host} --port ${port} --strictPort`,
      ],
      cwd: '.',
      env: { TONIC_UI_REACT_DOCS_BASE_PATH: '' },
      wait: { stdout: /Local:\s+(?<E2E_DOCS_URL>https?:\/\/\S+)/ },
      timeout: 300_000,
    },
  ],
});
