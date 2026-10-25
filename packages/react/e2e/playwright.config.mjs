import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createE2EConfig } from '../../../e2e/config.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

export default createE2EConfig(root, {
  testDir: './tests',
  timeout: 20_000,
  expect: { timeout: 5_000 },
  workers: 2,
  tests: [{ name: 'react', testMatch: '**/*.spec.mjs' }],
  baseURL: () => process.env.E2E_REACT_URL,
  servers: [{
    commands: ['node server.mjs'],
    cwd: 'e2e',
    wait: { stdout: /E2E_REACT_URL=(?<E2E_REACT_URL>https?:\/\/\S+)/ },
    timeout: 60_000,
  }],
});
