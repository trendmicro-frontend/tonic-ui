import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createE2EConfig } from '../../../../test/e2e/config.mjs';
import { tests } from './index.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../');
const host = process.env.E2E_HOST || '127.0.0.1';
const port = Number(process.env.E2E_PORT || 0);
const origin = process.env.E2E_DOCS_URL;
const demoBuilds = tests
  .filter(({ build, server }) => build && server !== 'search')
  .map(({ build }) => `yarn ${build}`);
const searchBuilds = tests
  .filter(({ build, server }) => build && server === 'search')
  .map(({ build }) => `yarn ${build}`);
const projectFilters = process.argv.slice(2).reduce((filters, arg, index, args) => {
  if (arg === '--project') {
    filters.push(args[index + 1]);
  } else if (arg.startsWith('--project=')) {
    filters.push(arg.slice('--project='.length));
  }
  return filters;
}, []);
const includeDemoServer = projectFilters.length === 0 || projectFilters.some((project) => project !== 'docs-search');
const includeSearchServer = projectFilters.length === 0 || projectFilters.includes('docs-search');
const servers = [];

if (includeDemoServer) {
  servers.push({
    commands: [
      ...demoBuilds,
      `yarn vite preview --outDir public --base / --host ${host} --port ${port} --strictPort`,
    ],
    cwd: '.',
    env: {
      TONIC_UI_REACT_DOCS_BASE_PATH: '',
      TONIC_UI_REACT_DOCS_VERSION: 'dev',
    },
    wait: { stdout: /Local:\s+(?<E2E_DOCS_URL>https?:\/\/\S+)/ },
    timeout: 300_000,
  });
}

if (includeSearchServer) {
  servers.push({
    commands: [
      ...searchBuilds,
      // Port 0 lets the OS pick one; the spec reads the printed origin.
      `yarn vite preview --outDir dist-search-e2e --base / --host ${host} --port 0 --strictPort`,
    ],
    cwd: '.',
    env: {
      TONIC_UI_REACT_DOCS_BASE_PATH: '',
      TONIC_UI_REACT_DOCS_VERSION: 'dev',
    },
    wait: { stdout: /Local:\s+(?<E2E_SEARCH_URL>https?:\/\/\S+)/ },
    timeout: 900_000,
  });
}

export default createE2EConfig(root, {
  testDir: '.',
  expect: { timeout: 30_000 },
  tests,
  baseURL: (integration) => {
    if (integration.server === 'search') {
      return undefined;
    }
    return origin && new URL(integration.path, origin).href;
  },
  servers,
});
