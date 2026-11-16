import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import test, { describe } from 'node:test';
import { fileURLToPath } from 'node:url';
import { PLUGIN_NAMES, validatePlugins } from '../validate-plugins.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const validator = join(repoRoot, 'scripts/plugins/validate-plugins.mjs');
const put = (root, path, data) => {
  mkdirSync(dirname(join(root, path)), { recursive: true });
  writeFileSync(join(root, path), typeof data === 'string' ? data : `${JSON.stringify(data, null, 2)}\n`);
};
const manifestFor = (name, overrides = {}) => ({
  name,
  version: '1.0.0',
  description: `${name} plugin.`,
  author: { name: 'Tonic UI Team' },
  skills: [`./skills/${name}`],
  ...overrides,
});
const fixture = (fn) => {
  const root = mkdtempSync(join(tmpdir(), 'tonic-plugins-'));
  try {
    return fn(root);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
};
const repository = (root) => {
  for (const name of PLUGIN_NAMES) {
    put(root, `plugins/${name}/.claude-plugin/plugin.json`, manifestFor(name));
    put(root, `plugins/${name}/skills/${name}/SKILL.md`, `# ${name}\n`);
  }
  put(root, 'packages/mcp/bin/cli.js', '');
  put(root, 'tonic-ui-mcp.config.js', '');
  return root;
};
const [firstPlugin, secondPlugin] = PLUGIN_NAMES;

describe('scripts/plugins / Plugin structure', () => {
  test('repository plugins pass standalone and report a skipped baseline', () => {
    assert.deepEqual(PLUGIN_NAMES, ['tonic-ui-dev', 'tonic-ui-tokens', 'tonic-ui-upgrade']);
    assert.deepEqual(validatePlugins(repoRoot), {
      plugins: 3,
      pluginBoundary: 'independent',
      pluginVersions: { status: 'skipped' },
    });
    const env = { ...process.env };
    delete env.PLUGIN_BASE_REF;
    const execution = spawnSync(process.execPath, [validator], { cwd: repoRoot, encoding: 'utf8', env });
    assert.equal(execution.status, 0, execution.stderr);
    assert.match(execution.stderr, /Plugin version bump check skipped: no baseline/);
    assert.deepEqual(JSON.parse(execution.stdout).pluginVersions, { status: 'skipped' });
  });

  test('an invalid explicit baseline fails instead of skipping the version policy', () => fixture((root) => {
    repository(root);
    const env = { ...process.env };
    delete env.PLUGIN_BASE_REF;
    const execution = spawnSync(process.execPath, [validator, '--base', 'missing-ref'], { cwd: root, encoding: 'utf8', env });
    assert.notEqual(execution.status, 0);
    assert.match(execution.stderr, /missing-ref/);
  }));

  test('rejects missing or invalid plugin manifests', () => fixture((root) => {
    repository(root);
    put(root, `plugins/${firstPlugin}/.claude-plugin/plugin.json`, manifestFor(secondPlugin));
    assert.throws(() => validatePlugins(root), /Invalid plugin identity\/version/);
    for (const version of ['1.0', ['1.0.0']]) {
      put(root, `plugins/${firstPlugin}/.claude-plugin/plugin.json`, manifestFor(firstPlugin, { version }));
      assert.throws(() => validatePlugins(root), /Invalid plugin identity\/version/);
    }
    put(root, `plugins/${firstPlugin}/.claude-plugin/plugin.json`, null);
    assert.throws(() => validatePlugins(root), /Invalid plugin identity\/version/);
    rmSync(join(root, `plugins/${firstPlugin}/.claude-plugin/plugin.json`));
    assert.throws(() => validatePlugins(root), /Missing plugin manifest/);
    put(root, `plugins/${firstPlugin}/.claude-plugin/plugin.json`, '{bad');
    assert.throws(() => validatePlugins(root), /Invalid JSON: plugins\/[^/]+\/\.claude-plugin\/plugin\.json/);
  }));

  test('rejects undeclared, unexpected or non-enabled capabilities', () => fixture((root) => {
    repository(root);
    put(root, `plugins/${firstPlugin}/.claude-plugin/plugin.json`, manifestFor(firstPlugin, { skills: [] }));
    assert.throws(() => validatePlugins(root), /Plugin must explicitly declare its skill/);
    put(root, `plugins/${firstPlugin}/.claude-plugin/plugin.json`, manifestFor(firstPlugin, { hooks: {} }));
    assert.throws(() => validatePlugins(root), /Unexpected plugin capability: .*\/hooks/);
    put(root, `plugins/${firstPlugin}/.claude-plugin/plugin.json`, manifestFor(firstPlugin, { mcpServers: {} }));
    assert.throws(() => validatePlugins(root), /Unexpected plugin capability: .*\/mcpServers/);
    put(root, `plugins/${firstPlugin}/.claude-plugin/plugin.json`, manifestFor(firstPlugin));
    put(root, `plugins/${firstPlugin}/skills/extra-logic/SKILL.md`, '# extra\n');
    assert.throws(() => validatePlugins(root), /Unexpected bundled skills/);
    rmSync(join(root, `plugins/${firstPlugin}/skills/extra-logic`), { recursive: true });
    put(root, `plugins/${firstPlugin}/.mcp.json`, '{}');
    assert.throws(() => validatePlugins(root), /Unexpected duplicate manifest\/autostart: .*\/\.mcp\.json/);
    rmSync(join(root, `plugins/${firstPlugin}/.mcp.json`));
    put(root, `plugins/${firstPlugin}/.codex-plugin/plugin.json`, '{}');
    assert.throws(() => validatePlugins(root), /Unexpected duplicate manifest\/autostart: .*\/\.codex-plugin/);
  }));

  test('rejects unexpected plugin directories and repository-root legacy residue', () => fixture((root) => {
    repository(root);
    put(root, 'plugins/legacy-plugin/.claude-plugin/plugin.json', manifestFor('legacy-plugin'));
    assert.throws(() => validatePlugins(root), /Unexpected physical directories in plugins/);
    rmSync(join(root, 'plugins/legacy-plugin'), { recursive: true });
    put(root, '.claude-plugin/plugin.json', manifestFor(firstPlugin));
    assert.throws(() => validatePlugins(root), /Obsolete repository-root plugin manifest remains/);
    rmSync(join(root, '.claude-plugin/plugin.json'));
    put(root, '.codex-plugin/plugin.json', manifestFor(firstPlugin));
    assert.throws(() => validatePlugins(root), /Obsolete repository-root plugin manifest remains/);
    rmSync(join(root, '.codex-plugin/plugin.json'));
    put(root, '.mcp.json', '{}');
    assert.throws(() => validatePlugins(root), /MCP autostart entry remains/);
    rmSync(join(root, '.mcp.json'));
    rmSync(join(root, 'packages/mcp/bin/cli.js'));
    assert.throws(() => validatePlugins(root), /Optional MCP implementation\/config was removed/);
    put(root, 'packages/mcp/bin/cli.js', '');
    rmSync(join(root, 'tonic-ui-mcp.config.js'));
    assert.throws(() => validatePlugins(root), /Optional MCP implementation\/config was removed/);
  }));

  test('rejects missing, escaping and symlinked bundled skill resources', () => fixture((root) => {
    repository(root);
    const skillPath = `plugins/${firstPlugin}/skills/${firstPlugin}/SKILL.md`;
    put(root, skillPath, '# plugin\n\nSee [reference](missing.md).\n');
    assert.throws(() => validatePlugins(root), /Missing linked plugin resource: .* -> missing\.md/);
    put(root, 'outside.md', 'outside');
    put(root, skillPath, '# plugin\n\nSee [outside](../../../../outside.md).\n');
    assert.throws(() => validatePlugins(root), /Resource escapes its independent plugin: \.\.\/\.\.\/\.\.\/\.\.\/outside\.md/);
    symlinkSync('shared.md', join(root, `plugins/${firstPlugin}/skills/${firstPlugin}/shared.md`));
    put(root, skillPath, '# plugin\n\nSee [shared](shared.md).\n');
    assert.throws(() => validatePlugins(root), /Skill package contains a resource symlink/);
    rmSync(join(root, `plugins/${firstPlugin}/skills/${firstPlugin}/shared.md`));
    put(root, skillPath, '# plugin\n\nSee [reference](reference.md).\n');
    put(root, `plugins/${firstPlugin}/skills/${firstPlugin}/reference.md`, 'reference');
    validatePlugins(root);
  }));
  test('rejects missing skill entry points and symlinked skill directories', () => fixture((root) => {
    repository(root);
    const skillsRoot = join(root, `plugins/${firstPlugin}/skills`);
    const skillRoot = join(skillsRoot, firstPlugin);
    rmSync(join(skillRoot, 'SKILL.md'));
    assert.throws(() => validatePlugins(root), /Missing bundled skill entry point/);
    rmSync(skillRoot, { recursive: true });
    put(root, 'external-skill/SKILL.md', '# external\n');
    symlinkSync(join(root, 'external-skill'), skillRoot, 'dir');
    assert.throws(() => validatePlugins(root), /Invalid bundled skill directory/);
    rmSync(skillRoot);
    rmSync(skillsRoot, { recursive: true });
    put(root, `external-skills/${firstPlugin}/SKILL.md`, '# external\n');
    symlinkSync(join(root, 'external-skills'), skillsRoot, 'dir');
    assert.throws(() => validatePlugins(root), /Invalid plugin skills directory/);
  }));

  test('each copied plugin retains only its own skill and local resources', () => fixture((root) => {
    for (const name of PLUGIN_NAMES) {
      const isolatedRoot = join(root, name);
      repository(isolatedRoot);
      const copiedPlugin = join(isolatedRoot, 'plugins', name);
      rmSync(copiedPlugin, { recursive: true });
      cpSync(join(repoRoot, 'plugins', name), copiedPlugin, { recursive: true });
      const manifest = JSON.parse(readFileSync(join(copiedPlugin, '.claude-plugin/plugin.json'), 'utf8'));
      assert.deepEqual(manifest.skills, [`./skills/${name}`]);
      validatePlugins(isolatedRoot);
    }
  }));
});
