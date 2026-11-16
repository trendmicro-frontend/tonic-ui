import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cpSync, mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test, { describe } from 'node:test';

const runner = fileURLToPath(new URL('../ai-tooling/run.mjs', import.meta.url));
const reporter = fileURLToPath(new URL('../test-reporter.mjs', import.meta.url));

function createFixture() {
  const root = mkdtempSync(join(tmpdir(), 'tonic-ai-discovery-'));
  for (const directory of [
    'test/ai-tooling', 'test/__tests__', 'scripts/__tests__', 'scripts/figma-variables/__tests__',
    'scripts/skills/__tests__', 'scripts/plugins/__tests__', 'skills', 'plugins',
  ]) {
    mkdirSync(join(root, directory), { recursive: true });
  }
  cpSync(runner, join(root, 'test/ai-tooling/run.mjs'));
  cpSync(reporter, join(root, 'test/test-reporter.mjs'));
  return root;
}

function add(root, path, body) {
  const file = join(root, path);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, body);
  return file;
}

function run(root) {
  const env = { ...process.env, CI: 'true', NO_COLOR: '1' };
  delete env.NODE_TEST_CONTEXT;
  return spawnSync(process.execPath, [join(root, 'test/ai-tooling/run.mjs')], {
    cwd: root, encoding: 'utf8', env, timeout: 20000,
  });
}

const passing = (name) => `import { describe, it } from 'node:test'; describe('${name}', () => { it('runs', () => {}); });`;

describe('test / AI tooling discovery', () => {
  test('discovers shared, capture, contributor, and recursive plugin tests without traversing dependencies or directory symlinks', () => {
    const root = createFixture();
    try {
      for (const [path, name] of [
        ['scripts/__tests__/shared.test.mjs', 'shared test'],
        ['scripts/figma-variables/__tests__/capture.test.mjs', 'capture test'],
        ['scripts/skills/__tests__/skills.test.mjs', 'skill validator test'],
        ['scripts/plugins/__tests__/plugins.test.mjs', 'plugin validator test'],
        ['test/__tests__/infrastructure.test.mjs', 'infrastructure test'],
        ['skills/demo/scripts/__tests__/contributor.test.mjs', 'contributor test'],
        ['plugins/demo/__tests__/root.test.mjs', 'plugin root test'],
        ['plugins/demo/scripts/__tests__/script.test.mjs', 'plugin script test'],
        ['plugins/demo/skills/demo/scripts/__tests__/lookup.test.mjs', 'plugin lookup test'],
      ]) {
        add(root, path, passing(name));
      }
      const rejected = "throw new Error('excluded path was traversed');";
      add(root, 'plugins/demo/node_modules/pkg/__tests__/ignored.test.mjs', rejected);
      add(root, 'plugins/demo/.hidden/__tests__/ignored.test.mjs', rejected);
      add(root, 'plugins/demo/scripts/ignored.test.mjs', rejected);
      add(root, 'skills/node_modules/scripts/__tests__/ignored.test.mjs', rejected);
      add(root, 'skills/.hidden/scripts/__tests__/ignored.test.mjs', rejected);
      add(root, 'scripts/__tests__/.hidden.test.mjs', rejected);
      add(root, 'outside/scripts/__tests__/ignored.test.mjs', rejected);
      mkdirSync(join(root, 'skills/no-scripts'));
      symlinkSync(join(root, 'outside'), join(root, 'skills/linked'));
      mkdirSync(join(root, 'skills/script-link'));
      mkdirSync(join(root, 'skills/tests-link/scripts'), { recursive: true });
      symlinkSync(join(root, 'outside/scripts'), join(root, 'skills/script-link/scripts'));
      symlinkSync(join(root, 'outside/scripts/__tests__'), join(root, 'skills/tests-link/scripts/__tests__'));
      symlinkSync(join(root, 'outside'), join(root, 'plugins/demo/linked'));
      symlinkSync(join(root, 'outside'), join(root, 'scripts/__tests__/directory.test.mjs'));
      symlinkSync(join(root, 'outside'), join(root, 'plugins/demo/scripts/__tests__/directory.test.mjs'));
      const linkedFile = add(root, 'outside/linked-source.mjs', passing('symlinked file test'));
      symlinkSync(linkedFile, join(root, 'plugins/demo/scripts/__tests__/file-link.test.mjs'));

      const result = run(root);
      assert.equal(result.status, 0, result.stderr + result.stdout);
      for (const name of [
        'shared test', 'capture test', 'skill validator test', 'plugin validator test', 'infrastructure test',
        'contributor test', 'plugin root test', 'plugin script test', 'plugin lookup test', 'symlinked file test',
      ]) {
        assert.match(result.stdout, new RegExp(name));
      }
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });

  test('returns a failing test process status and preserves diagnostics', () => {
    const root = createFixture();
    try {
      add(root, 'plugins/demo/__tests__/failure.test.mjs', "throw new Error('discovered fixture failure');");
      const result = run(root);
      assert.equal(result.status, 1, result.stderr + result.stdout);
      assert.match(result.stderr + result.stdout, /discovered fixture failure/);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });

  test('fails when no tooling tests are discovered', () => {
    const root = createFixture();
    try {
      const result = run(root);
      assert.equal(result.status, 1, result.stderr + result.stdout);
      assert.match(result.stderr, /No AI tooling tests found/);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });
});
