import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import test, { describe } from 'node:test';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const runner = readFileSync(join(root, 'scripts/validate-ai-tooling.mjs'));
const paths = [
  'scripts/skills/validate-skills.mjs',
  'scripts/plugins/validate-plugins.mjs',
  'scripts/plugins/validate-plugin-marketplace.mjs',
  'plugins/tonic-ui-tokens/scripts/validate-tokens.mjs',
  'skills/tonic-ui-version/scripts/check-mcp-version.mjs',
  'skills/tonic-ui-version/scripts/check-mcp-llms.mjs',
  'scripts/validate-public-links.mjs',
];

describe('scripts / Validation composition', () => {
  for (const { scenario, failing = -1, missing = -1, configured = true } of [
    { scenario: 'success' },
    { scenario: 'unconfigured', configured: false },
    { scenario: 'early-failure', failing: 1 },
    { scenario: 'version-failure', failing: 4 },
    { scenario: 'privacy-failure', failing: 6 },
    { scenario: 'missing-check', missing: 1 },
  ]) {
    test(`${scenario} runs all checks and propagates failures`, () => {
      const fixture = mkdtempSync(join(tmpdir(), 'tonic-validation-composition-'));
      try {
        mkdirSync(join(fixture, 'scripts'), { recursive: true });
        writeFileSync(join(fixture, 'scripts/validate-ai-tooling.mjs'), runner);
        for (const [index, path] of paths.entries()) {
          if (index === missing) continue;
          const file = join(fixture, path);
          mkdirSync(dirname(file), { recursive: true });
          writeFileSync(file, `import { appendFileSync } from 'node:fs'; appendFileSync('calls', JSON.stringify({ index: ${index}, args: process.argv.slice(2), base: process.env.PLUGIN_BASE_REF, branch: process.env.VALIDATION_BRANCH, mcp: process.env.VALIDATION_MCP }) + '\\n'); process.exit(${index === failing ? 1 : 0});`);
        }
        const env = { ...process.env };
        delete env.NODE_TEST_CONTEXT;
        if (configured) {
          Object.assign(env, { PLUGIN_BASE_REF: 'base-ref', VALIDATION_BRANCH: 'main', VALIDATION_MCP: scenario === 'success' ? '1' : '0' });
        } else {
          delete env.PLUGIN_BASE_REF;
          delete env.VALIDATION_BRANCH;
          delete env.VALIDATION_MCP;
        }
        const result = spawnSync(process.execPath, [join(fixture, 'scripts/validate-ai-tooling.mjs')], { cwd: fixture, env, encoding: 'utf8' });
        assert.equal(result.status, failing < 0 && missing < 0 ? 0 : 1, result.stderr);
        const calls = readFileSync(join(fixture, 'calls'), 'utf8').trim().split('\n').map(JSON.parse);
        assert.deepEqual(calls.map(({ index }) => index), paths.map((_, index) => index).filter((index) => index !== missing));
        for (const call of calls) {
          assert.equal(call.base, configured ? 'base-ref' : undefined);
          assert.equal(call.branch, configured ? 'main' : undefined);
          assert.equal(call.mcp, configured ? (scenario === 'success' ? '1' : '0') : undefined);
          assert.deepEqual(call.args, call.index === 5 && scenario === 'success' ? ['--mcp'] : []);
        }
        if (failing >= 0 || missing >= 0) {
          assert.match(result.stderr, new RegExp(`Validation failed: ${paths[Math.max(failing, missing)].replaceAll('.', '\\.')}`));
        }
      } finally {
        rmSync(fixture, { recursive: true, force: true });
      }
    });
  }
});
