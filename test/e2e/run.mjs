import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../../', import.meta.url));
const require = createRequire(import.meta.url);
const cli = require.resolve('@playwright/test/cli');
const args = process.argv.slice(2);
const suite = args[0] && !args[0].startsWith('-') ? args.shift() : 'all';
const modes = process.env.E2E_NODE_ENV ? [process.env.E2E_NODE_ENV] : ['development', 'production'];
const suites = {
  react: modes.map(mode => ({
    name: `react (${mode})`,
    config: 'packages/react/test/e2e/playwright.config.mjs',
    env: { E2E_NODE_ENV: mode },
  })),
  examples: [{ name: 'examples', config: 'examples/cdn-with-local-fallback/test/e2e/playwright.config.mjs' }],
  // Docs demos and documentation pages have separate configs, so a project name
  // only has to be unique within its kind.
  'docs:demos': [{ name: 'docs demos', config: 'packages/react-docs/test/e2e/demos/playwright.config.mjs' }],
  'docs:pages': [{ name: 'docs pages', config: 'packages/react-docs/test/e2e/pages/playwright.config.mjs' }],
  docs: [
    { name: 'docs demos', config: 'packages/react-docs/test/e2e/demos/playwright.config.mjs' },
    { name: 'docs pages', config: 'packages/react-docs/test/e2e/pages/playwright.config.mjs' },
  ],
};
const targets = suite === 'all' ? Object.values(suites).flat() : suites[suite];
if (!targets) {
  throw new Error(`Unknown e2e suite "${suite}". Use all, react, examples, docs, docs:demos, or docs:pages.`);
}

for (const target of targets) {
  process.stdout.write(`\n[e2e] ${target.name}\n`);
  const code = await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [cli, 'test', '--config', target.config, ...args], {
      cwd: root,
      stdio: 'inherit',
      env: { ...process.env, ...target.env },
    });
    child.once('error', reject);
    child.once('exit', code => resolve(code ?? 1));
  });
  if (code !== 0) {
    process.exitCode = code;
    break;
  }
}
