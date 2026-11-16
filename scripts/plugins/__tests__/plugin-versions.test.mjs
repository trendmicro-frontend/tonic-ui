import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import test, { describe } from 'node:test';
import { validatePluginVersions } from '../lib/validate-plugin-versions.mjs';

const manifest = { name: 'demo', version: '1.0.0', description: 'Demo.', author: { name: 'Team' } };
const put = (root, path, data) => {
  mkdirSync(dirname(join(root, path)), { recursive: true });
  writeFileSync(join(root, path), typeof data === 'string' ? data : `${JSON.stringify(data, null, 2)}\n`);
};
const fixture = (fn) => {
  const root = mkdtempSync(join(tmpdir(), 'tonic-plugin-versions-'));
  try {
    return fn(root);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
};

describe('scripts/plugins / Version policy', () => {
  const git = (root, ...args) => {
    const result = spawnSync('git', args, { cwd: root, encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    return result.stdout.trim();
  };
  const initialize = (root, version = '1.0.0') => {
    git(root, 'init', '-b', 'main');
    git(root, 'config', 'user.email', 'fixture@example.invalid');
    git(root, 'config', 'user.name', 'Fixture');
    put(root, 'plugins/demo/.claude-plugin/plugin.json', { ...manifest, version });
    for (const path of ['SKILL.md', 'reference.md', 'assets/tokens.json', 'scripts/tool.mjs']) {
      put(root, `plugins/demo/${path}`, 'baseline');
    }
    git(root, 'add', '.');
    git(root, 'commit', '-m', 'fixture baseline');
    return git(root, 'rev-parse', 'HEAD');
  };

  for (const path of ['SKILL.md', 'reference.md', 'assets/tokens.json', 'scripts/tool.mjs']) {
    test(`delivery changes require a bump: ${path}`, () => fixture((root) => {
      const base = initialize(root);
      put(root, `plugins/demo/${path}`, 'changed');
      assert.throws(() => validatePluginVersions(root, base), /demo.*base 1.0.0.*current 1.0.0/);
      git(root, 'add', '.');
      assert.throws(() => validatePluginVersions(root, base), /Increase manifest.version/);
      assert.throws(() => validatePluginVersions(root, base), /node scripts\/plugins\/sync-plugin-marketplace-metadata\.mjs --write/);
      put(root, `plugins/demo/${path}`, 'baseline');
      assert.deepEqual(validatePluginVersions(root, base).changedPlugins, []);
    }));
  }

  test('deletion, rename and untracked assets are delivery changes; tests and root prose are not', () => fixture((root) => {
    const base = initialize(root);
    for (const path of ['tests/a.mjs', '__tests__/b.mjs', 'a.test.mjs', 'a.spec.js', 'README.md', 'CHANGELOG.md', 'LICENSE']) {
      put(root, `plugins/demo/${path}`, 'ignored');
    }
    assert.deepEqual(validatePluginVersions(root, base).changedPlugins, []);
    put(root, 'plugins/demo/assets/new.svg', 'asset');
    assert.throws(() => validatePluginVersions(root, base), /assets\/new.svg/);
    rmSync(join(root, 'plugins/demo/assets/new.svg'));
    git(root, 'mv', 'plugins/demo/reference.md', 'plugins/demo/moved.md');
    assert.throws(() => validatePluginVersions(root, base), /reference.md/);
  }));

  for (const [before, after, passes] of [['1.0.9', '1.0.10', true], ['1.9.0', '1.10.0', true], ['1.1.0', '1.0.9', false], ['1.0.0', '01.0.1', false], ['1.0.0', '1.0.1-beta', false]]) {
    test(`version comparison ${before} -> ${after}`, () => fixture((root) => {
      const base = initialize(root, before);
      put(root, 'plugins/demo/.claude-plugin/plugin.json', { ...manifest, version: after });
      if (passes) {
        assert.deepEqual(validatePluginVersions(root, base).changedPlugins, []);
      } else {
        assert.throws(() => validatePluginVersions(root, base));
      }
    }));
  }

  test('one net bump covers multiple commits but rejects a newer base collision', () => fixture((root) => {
    initialize(root);
    git(root, 'checkout', '-b', 'feature');
    put(root, 'plugins/demo/SKILL.md', 'first');
    put(root, 'plugins/demo/.claude-plugin/plugin.json', { ...manifest, version: '1.0.1' });
    git(root, 'add', '.');
    git(root, 'commit', '-m', 'first');
    put(root, 'plugins/demo/reference.md', 'second');
    git(root, 'add', '.');
    git(root, 'commit', '-m', 'second');
    const beforeValidation = readFileSync(join(root, 'plugins/demo/.claude-plugin/plugin.json'), 'utf8');
    const validated = validatePluginVersions(root, 'main');
    assert.deepEqual(validated.changedPlugins, ['demo']);
    assert.deepEqual(validated.versionReviews[0].candidates, { patch: '1.0.1', minor: '1.1.0', major: '2.0.0' });
    assert.deepEqual(validated.versionReviews[0].files, ['plugins/demo/SKILL.md', 'plugins/demo/reference.md']);
    assert.match(validated.versionReviews[0].guidance, /author review is required/);
    assert.equal(readFileSync(join(root, 'plugins/demo/.claude-plugin/plugin.json'), 'utf8'), beforeValidation);
    git(root, 'checkout', 'main');
    put(root, 'plugins/demo/.claude-plugin/plugin.json', { ...manifest, version: '1.0.1' });
    git(root, 'add', '.');
    git(root, 'commit', '-m', 'base bump');
    git(root, 'checkout', 'feature');
    assert.throws(() => validatePluginVersions(root, 'main'), /base 1.0.1, current 1.0.1/);
  }));

  test('new plugins, malformed baselines, missing refs and unrelated history', () => fixture((root) => {
    const base = initialize(root);
    put(root, 'plugins/new/.claude-plugin/plugin.json', { ...manifest, name: 'new' });
    assert.deepEqual(validatePluginVersions(root, base).newPlugins, ['new']);
    assert.throws(() => validatePluginVersions(root, 'missing-ref'));
    assert.throws(() => validatePluginVersions(root, ''));
    put(root, 'plugins/demo/.claude-plugin/plugin.json', '{bad');
    git(root, 'add', '.');
    git(root, 'commit', '-m', 'bad base');
    const bad = git(root, 'rev-parse', 'HEAD');
    put(root, 'plugins/demo/.claude-plugin/plugin.json', manifest);
    assert.throws(() => validatePluginVersions(root, bad), /JSON/);
    git(root, 'checkout', '--orphan', 'unrelated');
    git(root, 'add', '.');
    git(root, 'commit', '-m', 'unrelated');
    assert.throws(() => validatePluginVersions(root, base));
  }));

  test('manifest formatting does not count as delivery content', () => fixture((root) => {
    const base = initialize(root);
    put(root, 'plugins/demo/.claude-plugin/plugin.json', JSON.stringify({ author: manifest.author, description: manifest.description, version: manifest.version, name: manifest.name }));
    assert.deepEqual(validatePluginVersions(root, base).changedPlugins, []);
  }));

  test('plugin added independently on base still requires a collision-free delivery version', () => fixture((root) => {
    initialize(root);
    git(root, 'checkout', '-b', 'feature');
    put(root, 'plugins/new/.claude-plugin/plugin.json', { ...manifest, name: 'new' });
    git(root, 'add', '.');
    git(root, 'commit', '-m', 'feature plugin');
    git(root, 'checkout', 'main');
    put(root, 'plugins/new/.claude-plugin/plugin.json', { ...manifest, name: 'new' });
    git(root, 'add', '.');
    git(root, 'commit', '-m', 'base plugin');
    git(root, 'checkout', 'feature');
    assert.throws(() => validatePluginVersions(root, 'main'), /Plugin new: base 1.0.0, current 1.0.0/);
  }));
});
