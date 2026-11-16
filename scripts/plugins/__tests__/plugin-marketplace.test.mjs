import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import test, { describe } from 'node:test';
import { fileURLToPath } from 'node:url';
import { PLUGIN_NAMES } from '../validate-plugins.mjs';
import { validatePluginMarketplace } from '../validate-plugin-marketplace.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const validator = join(repoRoot, 'scripts/plugins/validate-plugin-marketplace.mjs');
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
const claudeEntry = (name, overrides = {}) => ({
  name,
  source: `./plugins/${name}`,
  description: `${name} plugin.`,
  version: '1.0.0',
  author: { name: 'Tonic UI Team' },
  category: 'development',
  ...overrides,
});
const codexEntry = (name, overrides = {}) => ({
  name,
  source: { source: 'local', path: `./plugins/${name}` },
  policy: { installation: 'AVAILABLE', authentication: 'ON_INSTALL' },
  category: 'Developer tools',
  ...overrides,
});
const fixture = (fn) => {
  const root = mkdtempSync(join(tmpdir(), 'tonic-plugin-marketplace-'));
  try {
    return fn(root);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
};
const catalog = (root, { claude = PLUGIN_NAMES.map((name) => claudeEntry(name)), codex = PLUGIN_NAMES.map((name) => codexEntry(name)) } = {}) => {
  put(root, '.claude-plugin/marketplace.json', { name: 'tonic-ui', plugins: claude });
  put(root, '.agents/plugins/marketplace.json', { name: 'tonic-ui', interface: { displayName: 'Tonic UI' }, plugins: codex });
};
const repository = (root) => {
  for (const name of PLUGIN_NAMES) {
    put(root, `plugins/${name}/.claude-plugin/plugin.json`, manifestFor(name));
  }
  catalog(root);
  return root;
};
const [firstPlugin] = PLUGIN_NAMES;

describe('scripts/plugins / Plugin marketplace', () => {
  test('repository catalogs match the physical plugins and their manifests', () => {
    const result = validatePluginMarketplace(repoRoot);
    assert.deepEqual(result, { catalogs: 2, plugins: 3, metadata: 'aligned' });
    const execution = spawnSync(process.execPath, [validator], { cwd: repoRoot, encoding: 'utf8' });
    assert.equal(execution.status, 0, execution.stderr);
    assert.deepEqual(JSON.parse(execution.stdout), result);
  });

  test('skill catalog plugin links resolve from the catalog', () => {
    const catalogPath = join(repoRoot, 'skills/README.md');
    const catalogText = readFileSync(catalogPath, 'utf8');
    for (const [, destination] of catalogText.matchAll(/\]\(((?:\.\.\/)?plugins\/[^)#]+)(?:#[^)]*)?\)/g)) {
      assert.ok(existsSync(resolve(dirname(catalogPath), destination)), `Broken plugin link: ${destination}`);
    }
  });

  test('rejects missing, malformed or foreign catalogs', () => fixture((root) => {
    repository(root);
    put(root, '.claude-plugin/marketplace.json', { name: 'other', plugins: [] });
    assert.throws(() => validatePluginMarketplace(root), /Invalid marketplace identity/);
    put(root, '.claude-plugin/marketplace.json', '{bad');
    assert.throws(() => validatePluginMarketplace(root), /Invalid JSON: \.claude-plugin\/marketplace\.json/);
    catalog(root);
    rmSync(join(root, '.agents/plugins/marketplace.json'));
    assert.throws(() => validatePluginMarketplace(root), /Missing file: \.agents\/plugins\/marketplace\.json/);
    catalog(root);
    rmSync(join(root, `plugins/${firstPlugin}/.claude-plugin/plugin.json`));
    assert.throws(() => validatePluginMarketplace(root), /Missing file: plugins\/[^/]+\/\.claude-plugin\/plugin\.json/);
  }));

  test('catalog entries must match the physical plugin set exactly', () => fixture((root) => {
    repository(root);
    catalog(root, { claude: PLUGIN_NAMES.slice(1).map((name) => claudeEntry(name)) });
    assert.throws(() => validatePluginMarketplace(root), /Catalog names must match physical manifests exactly/);
    catalog(root, { claude: [...PLUGIN_NAMES.map((name) => claudeEntry(name)), claudeEntry('missing-plugin')] });
    assert.throws(() => validatePluginMarketplace(root), /Catalog names must match physical manifests exactly/);
    catalog(root, { claude: [...PLUGIN_NAMES.map((name) => claudeEntry(name)), claudeEntry(firstPlugin)] });
    assert.throws(() => validatePluginMarketplace(root), /without duplicates/);
    catalog(root, { codex: PLUGIN_NAMES.slice(1).map((name) => codexEntry(name)) });
    assert.throws(() => validatePluginMarketplace(root), /Marketplace must expose exactly the physical plugins in Codex/);
  }));

  test('catalog metadata must match manifests and use the plugin source paths', () => fixture((root) => {
    repository(root);
    catalog(root, { claude: PLUGIN_NAMES.map((name) => claudeEntry(name, name === firstPlugin ? { version: '0.1.0' } : {})) });
    assert.throws(() => validatePluginMarketplace(root), /Plugin metadata differs: [^/]+\/version\. Run node scripts\/plugins\/sync-plugin-marketplace-metadata\.mjs --write/);
    catalog(root, { claude: PLUGIN_NAMES.map((name) => claudeEntry(name, name === firstPlugin ? { description: 'Stale.' } : {})) });
    assert.throws(() => validatePluginMarketplace(root), /Plugin metadata differs: [^/]+\/description/);
    catalog(root, { claude: PLUGIN_NAMES.map((name) => claudeEntry(name, name === firstPlugin ? { author: { name: 'Other' } } : {})) });
    assert.throws(() => validatePluginMarketplace(root), /Plugin metadata differs: [^/]+\/author/);
    catalog(root, { claude: PLUGIN_NAMES.map((name) => claudeEntry(name, name === firstPlugin ? { source: './plugins/other' } : {})) });
    assert.throws(() => validatePluginMarketplace(root), /Invalid Claude plugin source\/version/);
    catalog(root, { codex: PLUGIN_NAMES.map((name) => codexEntry(name, name === firstPlugin ? { source: { source: 'local', path: './plugins/other' } } : {})) });
    assert.throws(() => validatePluginMarketplace(root), /Invalid Codex plugin source/);
    catalog(root, { codex: PLUGIN_NAMES.map((name) => codexEntry(name, name === firstPlugin ? { source: { source: 'registry', path: `./plugins/${firstPlugin}` } } : {})) });
    assert.throws(() => validatePluginMarketplace(root), /Invalid Codex plugin source/);
    catalog(root, { codex: PLUGIN_NAMES.map((name) => codexEntry(name, name === firstPlugin ? { source: undefined } : {})) });
    assert.throws(() => validatePluginMarketplace(root), /Invalid Codex plugin source/);
  }));
  test('rejects missing or additional physical plugins even when catalogs match', () => fixture((root) => {
    repository(root);
    const remaining = PLUGIN_NAMES.slice(0, -1);
    rmSync(join(root, 'plugins', PLUGIN_NAMES.at(-1)), { recursive: true });
    catalog(root, { claude: remaining.map((name) => claudeEntry(name)), codex: remaining.map((name) => codexEntry(name)) });
    assert.throws(() => validatePluginMarketplace(root), /exactly the expected plugins/);
    repository(root);
    put(root, 'plugins/tonic-ui/.claude-plugin/plugin.json', manifestFor('tonic-ui'));
    const combined = [...PLUGIN_NAMES, 'tonic-ui'];
    catalog(root, { claude: combined.map((name) => claudeEntry(name)), codex: combined.map((name) => codexEntry(name)) });
    assert.throws(() => validatePluginMarketplace(root), /exactly the expected plugins/);
  }));
});
