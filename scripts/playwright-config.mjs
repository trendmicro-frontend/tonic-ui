import { devNull } from 'node:os';
import { resolve } from 'node:path';
import { defineConfig, devices } from '@playwright/test';

export function createE2EConfig(root, { tests, baseURL, servers, ...config }) {
  const enableReports = process.env.E2E_REPORTS === '1';

  // Last-run state is unused by both suites, regardless of output mode.
  process.env.PLAYWRIGHT_LAST_RUN_OUTPUT_FILE = devNull;

  return defineConfig({
    timeout: 60_000,
    outputDir: resolve(root, 'output', 'e2e-test-results'),
    preserveOutput: enableReports ? 'failures-only' : 'never',
    use: {
      trace: enableReports ? 'retain-on-failure' : 'off',
      screenshot: 'off',
      video: 'off',
    },
    reporter: [
      ['dot'],
      enableReports && ['html', {
        open: 'never',
        outputFolder: resolve(root, 'output', 'e2e-playwright-report'),
      }],
    ].filter(Boolean),
    projects: tests.map(target => ({
      name: target.name,
      testMatch: `**/${target.specFile}`,
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
