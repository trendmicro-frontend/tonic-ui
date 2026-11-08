import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createE2EConfig } from '../../../../../test/e2e/config.mjs';
import { tests } from './index.mjs';

// `test/e2e/pages` -> `packages/react-docs`
const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
// The docs server shares no build directory with a developer's `yarn dev` run.
const docsPort = Number(process.env.E2E_PAGES_PORT || 3129);

export default createE2EConfig(root, {
  testDir: '.',
  expect: { timeout: 30_000 },
  tests,
  baseURL: (target) => process.env.E2E_PAGES_URL && new URL(target.path, process.env.E2E_PAGES_URL).href,
  servers: [
    {
      commands: [
        `bash -c '. ./tonic-ui.env && TONIC_UI_REACT_DOCS_DIST_DIR=build-e2e node ./scripts/dev.mjs --port ${docsPort}'`,
      ],
      cwd: '.',
      wait: { stdout: /Local:\s+(?<E2E_PAGES_URL>https?:\/\/\S+)/ },
      timeout: 300_000,
    },
  ],
});
