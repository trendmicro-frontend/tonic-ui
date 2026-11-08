import { devNull } from 'node:os';
import { resolve } from 'node:path';
import { defineConfig, devices } from '@playwright/test';
import { configureScreenshotDirectory } from './screenshots.mjs';

export function createE2EConfig(root, { tests, baseURL, servers, ...config }) {
  const enableReports = process.env.E2E_REPORTS === '1';
  // `E2E_SCREENSHOTS=1` turns on visual evidence: named light/dark shots written
  // by `test/e2e/screenshots.mjs`, plus Playwright's own screenshot for failures.
  const enableScreenshots = process.env.E2E_SCREENSHOTS === '1';

  // Last-run state is unused by all suites, regardless of output mode.
  process.env.PLAYWRIGHT_LAST_RUN_OUTPUT_FILE = devNull;
  configureScreenshotDirectory(root);

  return defineConfig({
    timeout: 60_000,
    outputDir: resolve(root, '.e2e', 'test-results'),
    preserveOutput: enableReports || enableScreenshots ? 'failures-only' : 'never',
    use: {
      trace: enableReports ? 'retain-on-failure' : 'off',
      screenshot: enableScreenshots ? 'only-on-failure' : 'off',
      video: 'off',
    },
    reporter: [
      ['list'],
      enableReports && ['html', {
        open: 'never',
        outputFolder: resolve(root, '.e2e', 'playwright-report'),
      }],
    ].filter(Boolean),
    projects: tests.map(target => ({
      name: target.name,
      testMatch: target.testMatch,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: baseURL(target),
      },
    })),
    webServer: servers.map(({ commands, cwd, ...server }) => ({
      ...server,
      command: commands.join(' && '),
      cwd: resolve(root, cwd),
    })),
    ...config,
  });
}
