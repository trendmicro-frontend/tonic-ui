#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const checks = [
  ['scripts/skills/validate-skills.mjs', []],
  ['scripts/plugins/validate-plugins.mjs', []],
  ['scripts/plugins/validate-plugin-marketplace.mjs', []],
  ['plugins/tonic-ui-tokens/scripts/validate-tokens.mjs', []],
  ['skills/tonic-ui-version/scripts/check-mcp-version.mjs', []],
  ['skills/tonic-ui-version/scripts/check-mcp-llms.mjs', process.env.VALIDATION_MCP === '1' ? ['--mcp'] : []],
  ['scripts/validate-public-links.mjs', []],
];

let failed = false;
for (const [script, args] of checks) {
  const result = spawnSync(process.execPath, [join(root, script), ...args], { cwd: root, stdio: 'inherit' });
  if (result.error || result.status !== 0) {
    console.error(`Validation failed: ${script}${result.error ? `: ${result.error.message}` : ''}`);
    failed = true;
  }
}
process.exitCode = failed ? 1 : 0;
