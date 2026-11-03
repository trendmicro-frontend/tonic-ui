import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createE2EConfig } from '../../../../test/e2e/config.mjs';
import { tests } from './index.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../../..');
const host = process.env.E2E_HOST || '127.0.0.1';
const port = Number(process.env.E2E_PORT || 0);
const targets = tests.map((target, index) => ({
  ...target,
  port: port === 0 ? 0 : port + index,
  urlEnv: `E2E_${target.name.replaceAll('-', '_').toUpperCase()}_URL`,
}));

export default createE2EConfig(root, {
  testDir: '.',
  retries: process.env.CI ? 1 : 0,
  tests: targets,
  baseURL: app => process.env[app.urlEnv],
  servers: targets.map(app => ({
    commands: [
      [app.build.command, ...app.build.args].join(' '),
      `${[app.preview.command, ...app.preview.args].join(' ')} --host ${host} --port ${app.port} --strictPort`,
    ],
    cwd: app.dir,
    // Vite prints this URL only after binding; Playwright passes it to workers.
    wait: { stdout: new RegExp(`Local:\\s+(?<${app.urlEnv}>https?://\\S+)`) },
    timeout: 120_000,
  })),
});
