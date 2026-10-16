import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, devices } from '@playwright/test';
import { tests } from './tests/index.mjs';

const e2eRoot = dirname(fileURLToPath(import.meta.url));
const root = resolve(e2eRoot, '..');

export default defineConfig({
  testDir: '.',
  outputDir: resolve(e2eRoot, 'test-results'),
  timeout: 60_000,
  retries: process.env.CI ? 1 : 0,
  reporter: [['dot'], ['html', { open: 'never', outputFolder: resolve(e2eRoot, 'playwright-report') }]],
  projects: tests.map(app => ({
    name: app.name,
    testMatch: `**/${app.specFile}`,
    use: {
      ...devices['Desktop Chrome'],
      baseURL: `http://127.0.0.1:${app.port}`,
    },
  })),
  webServer: tests.map(app => ({
    command: [
      [app.build.command, ...app.build.args].join(' '),
      [app.preview.command, ...app.preview.args].join(' '),
    ].join(' && '),
    cwd: resolve(root, app.dir),
    url: `http://127.0.0.1:${app.port}`,
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
  })),
});
