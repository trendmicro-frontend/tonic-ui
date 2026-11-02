import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createE2EConfig } from '../../../../test/e2e/config.mjs';
import { tests } from './index.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../');
const host = process.env.E2E_HOST || '127.0.0.1';
const port = Number(process.env.E2E_PORT || 0);
const docsPort = Number(process.env.E2E_PAGES_PORT || 3129);
const demoOrigin = process.env.E2E_DOCS_URL;
const pagesOrigin = process.env.E2E_PAGES_URL;

export default createE2EConfig(root, {
  testDir: '.',
  expect: { timeout: 30_000 },
  tests,
  // Demo targets resolve against the Vite preview; documentation pages resolve
  // against the Next.js dev server.
  baseURL: (integration) => {
    const origin = integration.path.startsWith('/demos/') ? demoOrigin : pagesOrigin;
    return origin && new URL(integration.path, origin).href;
  },
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
    {
      // The documentation pages are rendered by the real docs server. It shares
      // no build directory with a developer's `yarn dev` run.
      commands: [
        `bash -c '. ./tonic-ui.env && TONIC_UI_REACT_DOCS_DIST_DIR=build-e2e node ./scripts/dev.mjs --port ${docsPort}'`,
      ],
      cwd: '.',
      wait: { stdout: /Local:\s+(?<E2E_PAGES_URL>https?:\/\/\S+)/ },
      timeout: 300_000,
    },
  ],
});
