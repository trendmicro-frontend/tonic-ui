import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, devices } from '@playwright/test';
import { tests } from './tests/index.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const origin = 'http://127.0.0.1:4182';

export default defineConfig({
  testDir: './tests',
  outputDir: resolve(root, 'test-results'),
  timeout: 60_000,
  expect: { timeout: 30_000 },
  use: { trace: 'retain-on-failure' },
  reporter: [['dot'], ['html', { open: 'never', outputFolder: resolve(root, 'playwright-report') }]],
  projects: tests.map(integration => ({
    name: integration.name,
    testMatch: `**/${integration.specFile}`,
    use: {
      ...devices['Desktop Chrome'],
      baseURL: `${origin}${integration.path}`,
    },
  })),
  webServer: {
    command: 'node e2e/serve.mjs',
    cwd: resolve(root, '..'),
    url: `${origin}${tests[0].path}index.html`,
    timeout: 300_000,
  },
});
