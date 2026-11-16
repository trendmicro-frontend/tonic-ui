import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import test, { describe } from 'node:test';

const source = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(source, '../../../..');
const manifestPath = 'plugins/tonic-ui-tokens/.claude-plugin/plugin.json';
const snapshotPath = 'plugins/tonic-ui-tokens/skills/tonic-ui-tokens/assets/tokens.json';

// Ordered stages of the release updater. Each stage has the marker its fixture writes.
const stages = [
  { name: 'generator', marker: 'generator-done', script: 'plugins/tonic-ui-tokens/scripts/generate-token-inventory.mjs' },
  { name: 'sync', marker: 'sync-done', script: 'scripts/plugins/sync-plugin-marketplace-metadata.mjs' },
  { name: 'token-validator', marker: 'token-validator-done', script: 'plugins/tonic-ui-tokens/scripts/validate-tokens.mjs' },
  { name: 'plugins-validator', marker: 'plugins-validator-done', script: 'scripts/plugins/validate-plugins.mjs' },
  { name: 'marketplace-validator', marker: 'marketplace-validator-done', script: 'scripts/plugins/validate-plugin-marketplace.mjs' },
];
const stageIndex = (name) => stages.findIndex((stage) => stage.name === name);

describe('plugins/tonic-ui-tokens / Release snapshot updates', () => {
  for (const [scenario, name] of [
    ['changed', 'bumps once and syncs a changed snapshot'],
    ['same', 'keeps the version for an unchanged snapshot'],
    ['interrupted', 'repairs a previously interrupted generation'],
    ['generator-fails', 'stops before metadata sync when generation fails'],
    ['sync-fails', 'stops before token validation when metadata sync fails'],
    ['token-validator-fails', 'stops before plugin validation when token validation fails'],
    ['plugins-validator-fails', 'stops before marketplace validation when plugin validation fails'],
    ['marketplace-validator-fails', 'returns failure when marketplace validation fails'],
    ['arguments', 'rejects arguments before any stage runs'],
    ['missing-snapshot', 'creates and versions a missing HEAD snapshot'],
    ['bad-head', 'rejects an invalid HEAD version before generation'],
  ]) {
    test(name, () => {
      const root = mkdtempSync(join(tmpdir(), 'tonic-release-snapshot-'));
      const put = (path, bytes) => {
        mkdirSync(dirname(join(root, path)), { recursive: true });
        writeFileSync(join(root, path), bytes);
      };
      const git = (...args) => {
        const result = spawnSync('git', args, { cwd: root, encoding: 'utf8' });
        assert.equal(result.status, 0, result.stderr);
      };
      const read = (path) => readFileSync(join(root, path), 'utf8');
      const exists = (path) => existsSync(join(root, path));
      const run = (args = []) => spawnSync(process.execPath,
        [join(root, 'plugins/tonic-ui-tokens/scripts/update-release-token-snapshot.mjs'), ...args],
        { encoding: 'utf8' });
      const failingStage = stages.find((stage) => scenario === `${stage.name}-fails`);
      const reached = (stage) => failingStage === undefined || stageIndex(stage.name) <= stageIndex(failingStage.name);
      try {
        git('init', '-b', 'main');
        git('config', 'user.name', 'Fixture');
        git('config', 'user.email', 'fixture@example.invalid');
        git('config', 'commit.gpgsign', 'false');
        put(manifestPath, JSON.stringify({ name: 'tonic-ui-tokens', version: scenario === 'bad-head' ? '01.2.3' : '1.2.3', description: 'preserved' }));
        if (scenario !== 'missing-snapshot') {
          put(snapshotPath, 'old');
        }
        mkdirSync(dirname(join(root, snapshotPath)), { recursive: true });
        put('plugins/tonic-ui-tokens/scripts/update-release-token-snapshot.mjs',
          readFileSync(join(source, '../update-release-token-snapshot.mjs')));
        put(stages[0].script,
          `import { writeFileSync } from 'node:fs'; writeFileSync('${stages[0].marker}', JSON.stringify(process.argv.slice(2))); writeFileSync('${snapshotPath}', '${scenario === 'same' ? 'old' : 'new'}'); process.exit(${scenario === 'generator-fails' ? 1 : 0});`);
        put(stages[1].script,
          `import { readFileSync, writeFileSync } from 'node:fs'; writeFileSync('${stages[1].marker}', JSON.stringify({ args: process.argv.slice(2), manifest: JSON.parse(readFileSync('${manifestPath}', 'utf8')) })); process.exit(${scenario === 'sync-fails' ? 1 : 0});`);
        for (const stage of stages.slice(2)) {
          put(stage.script,
            `import { writeFileSync } from 'node:fs'; writeFileSync('${stage.marker}', JSON.stringify(process.argv.slice(2))); process.exit(${scenario === `${stage.name}-fails` ? 1 : 0});`);
        }
        git('add', '.');
        git('commit', '-m', 'fixture baseline');
        if (scenario === 'interrupted') {
          put(snapshotPath, 'new');
        }

        const result = run(scenario === 'arguments' ? ['--force'] : []);
        const expectedStatus = scenario === 'arguments' || scenario === 'bad-head' || failingStage !== undefined ? 1 : 0;
        assert.equal(result.status, expectedStatus, result.stderr);
        if (scenario === 'arguments' || scenario === 'bad-head') {
          for (const stage of stages) {
            assert.equal(exists(stage.marker), false, `${stage.name} ran without a valid run`);
          }
          return;
        }

        for (const stage of stages) {
          assert.equal(exists(stage.marker), reached(stage), `unexpected ${stage.name} execution state`);
        }
        // The generator always receives no arguments; later stages keep their documented flags.
        assert.deepEqual(JSON.parse(read('generator-done')), []);
        if (reached(stages[1])) {
          assert.deepEqual(JSON.parse(read('sync-done')).args, ['--write']);
        }
        if (reached(stages[2])) {
          assert.deepEqual(JSON.parse(read('token-validator-done')), []);
        }
        if (reached(stages[3])) {
          assert.deepEqual(JSON.parse(read('plugins-validator-done')), ['--base', 'HEAD']);
        }
        if (reached(stages[4])) {
          assert.deepEqual(JSON.parse(read('marketplace-validator-done')), []);
        }

        // The version bump happens after generation and before every subprocess that follows it.
        if (scenario !== 'generator-fails') {
          const expected = scenario === 'same' ? '1.2.3' : '1.2.4';
          const manifest = JSON.parse(read(manifestPath));
          assert.equal(manifest.version, expected);
          assert.equal(manifest.description, 'preserved');
          if (reached(stages[1])) {
            assert.equal(JSON.parse(read('sync-done')).manifest.version, expected);
          }
        }

        if (failingStage === undefined) {
          // Repeating from the same HEAD neither accumulates bumps nor changes the outcome.
          assert.equal(run().status, 0);
          assert.equal(JSON.parse(read(manifestPath)).version, scenario === 'same' ? '1.2.3' : '1.2.4');
        }
      } finally {
        rmSync(root, { recursive: true, force: true });
      }
    });
  }
  test('real release stages regenerate and synchronize a changed theme version once per HEAD', { timeout: 120000 }, () => {
    const root = mkdtempSync(join(tmpdir(), 'tonic-release-integration-'));
    const copy = (path) => {
      const target = join(root, path);
      mkdirSync(dirname(target), { recursive: true });
      cpSync(join(repoRoot, path), target, { recursive: true });
    };
    const git = (...args) => {
      const result = spawnSync('git', args, { cwd: root, encoding: 'utf8' });
      assert.equal(result.status, 0, result.stderr);
    };
    const run = (path, args = []) => {
      const result = spawnSync(process.execPath, [join(root, path), ...args], {
        cwd: root, encoding: 'utf8', timeout: 60000, maxBuffer: 8 * 1024 * 1024,
      });
      assert.equal(result.status, 0, result.stderr);
    };
    const read = (path) => readFileSync(join(root, path), 'utf8');
    const json = (path) => JSON.parse(read(path));
    const update = () => run('plugins/tonic-ui-tokens/scripts/update-release-token-snapshot.mjs');
    try {
      for (const path of [
        'plugins', 'scripts/plugins', '.claude-plugin/marketplace.json', '.agents/plugins/marketplace.json',
        'packages/theme/src', 'packages/theme/package.json', 'packages/utils/src',
        'packages/react/src/theme/utils', 'packages/mcp/bin/cli.js', 'tonic-ui-mcp.config.js',
      ]) copy(path);
      symlinkSync(join(repoRoot, 'node_modules'), join(root, 'node_modules'), 'dir');
      git('init', '-b', 'main');
      git('config', 'user.name', 'Fixture');
      git('config', 'user.email', 'fixture@example.invalid');
      git('config', 'commit.gpgsign', 'false');
      git('add', 'plugins', 'scripts/plugins', '.claude-plugin', '.agents/plugins', 'packages', 'tonic-ui-mcp.config.js');
      git('commit', '-m', 'fixture sources');
      run('plugins/tonic-ui-tokens/scripts/generate-token-inventory.mjs');
      git('add', snapshotPath);
      git('commit', '--allow-empty', '-m', 'fixture baseline');

      const initialVersion = json(manifestPath).version;
      const initialSnapshot = read(snapshotPath);
      const initialCatalog = read('.claude-plugin/marketplace.json');
      update();
      assert.equal(json(manifestPath).version, initialVersion);
      assert.equal(read(snapshotPath), initialSnapshot);
      assert.equal(read('.claude-plugin/marketplace.json'), initialCatalog);

      const themePath = 'packages/theme/package.json';
      const theme = json(themePath);
      theme.version = '9.9.9-fixture';
      writeFileSync(join(root, themePath), `${JSON.stringify(theme, null, 2)}\n`);
      update();
      const [major, minor, patch] = initialVersion.split('.');
      const nextVersion = `${major}.${minor}.${BigInt(patch) + 1n}`;
      assert.equal(json(manifestPath).version, nextVersion);
      assert.notEqual(read(snapshotPath), initialSnapshot);
      assert.equal(json(snapshotPath).meta.themeVersion, theme.version);
      assert.equal(json('.claude-plugin/marketplace.json').plugins.find((plugin) => plugin.name === 'tonic-ui-tokens').version, nextVersion);

      const changedSnapshot = read(snapshotPath);
      const changedManifest = read(manifestPath);
      const changedCatalog = read('.claude-plugin/marketplace.json');
      update();
      assert.equal(read(snapshotPath), changedSnapshot);
      assert.equal(read(manifestPath), changedManifest);
      assert.equal(read('.claude-plugin/marketplace.json'), changedCatalog);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });
});
