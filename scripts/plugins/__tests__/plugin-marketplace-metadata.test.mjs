import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import test, { describe } from 'node:test';
import { fileURLToPath } from 'node:url';
import { alignPluginMetadata, PLUGIN_NAMES } from '../lib/plugin-metadata.mjs';

const source = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const manifest = { name: 'demo', version: '1.0.0', description: 'Demo.', author: { name: 'Team' } };
const put = (root, path, data) => {
  mkdirSync(dirname(join(root, path)), { recursive: true });
  writeFileSync(join(root, path), typeof data === 'string' ? data : `${JSON.stringify(data, null, 2)}\n`);
};
const fixture = (fn) => {
  const root = mkdtempSync(join(tmpdir(), 'tonic-plugin-marketplace-metadata-'));
  try {
    return fn(root);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
};
const cli = (root, ...args) => {
  const env = { ...process.env };
  delete env.PLUGIN_BASE_REF;
  return spawnSync(process.execPath, [join(root, 'scripts/plugins/sync-plugin-marketplace-metadata.mjs'), ...args], { encoding: 'utf8', env });
};

describe('scripts/plugins / Marketplace metadata', () => {
  test('metadata alignment is pure and reports exactly the synchronized fields', () => {
    const catalog = { plugins: [{ ...manifest, version: '0.1.0', description: 'old', author: { name: 'Old' }, extra: true }] };
    const original = structuredClone(catalog);
    const manifests = new Map([['demo', structuredClone(manifest)]]);
    const result = alignPluginMetadata(catalog, manifests);
    assert.deepEqual(catalog, original);
    assert.deepEqual(manifests.get('demo'), manifest);
    assert.deepEqual(result.mismatches.map(({ field }) => field), ['version', 'description', 'author']);
    assert.deepEqual(result.catalog.plugins[0], { ...manifest, extra: true });
  });

  test('metadata CLI checks without writes, writes only metadata, and is byte-idempotent', () => fixture((root) => {
    for (const file of ['sync-plugin-marketplace-metadata.mjs', 'lib/plugin-metadata.mjs']) {
      put(root, `scripts/plugins/${file}`, readFileSync(join(source, file), 'utf8'));
    }
    const manifests = new Map(PLUGIN_NAMES.map((name) => [name, { ...manifest, name }]));
    const entries = PLUGIN_NAMES.map((name) => ({ name, source: `./plugins/${name}`, version: '0.1.0', description: 'old', author: { name: 'Old' }, category: 'development' }));
    const catalog = { name: 'tonic-ui', plugins: entries };
    put(root, '.claude-plugin/marketplace.json', catalog);
    for (const [name, value] of manifests) put(root, `plugins/${name}/.claude-plugin/plugin.json`, value);
    const first = PLUGIN_NAMES[0];
    const manifestPath = `plugins/${first}/.claude-plugin/plugin.json`;
    const path = join(root, '.claude-plugin/marketplace.json');
    const before = readFileSync(path, 'utf8');
    const check = cli(root);
    assert.notEqual(check.status, 0);
    assert.match(check.stderr, /Run node scripts\/plugins\/sync-plugin-marketplace-metadata\.mjs --write/);
    assert.equal(readFileSync(path, 'utf8'), before);
    assert.equal(cli(root, '--write').status, 0);
    const aligned = readFileSync(path, 'utf8');
    assert.deepEqual(JSON.parse(aligned), { ...catalog, plugins: entries.map((entry) => ({ ...entry, ...manifests.get(entry.name) })) });
    assert.equal(cli(root, '--write').status, 0);
    assert.equal(readFileSync(path, 'utf8'), aligned);
    assert.equal(cli(root).status, 0);
    const valid = manifests.get(first);
    for (const invalid of [null, { ...valid, name: 'wrong' }, { ...valid, version: '01.0.0' }, { ...valid, description: '' }, { ...valid, author: { name: '' } }]) {
      put(root, manifestPath, invalid);
      assert.notEqual(cli(root, '--write').status, 0);
      assert.equal(readFileSync(path, 'utf8'), aligned);
    }
    put(root, manifestPath, valid);
    for (const plugins of [[], [entries[0], entries[0]], [{ ...entries[0], name: 'missing' }]]) {
      put(root, '.claude-plugin/marketplace.json', { plugins });
      const bytes = readFileSync(path, 'utf8');
      assert.notEqual(cli(root, '--write').status, 0);
      assert.equal(readFileSync(path, 'utf8'), bytes);
    }
    put(root, '.claude-plugin/marketplace.json', catalog);
    put(root, manifestPath, '{bad');
    assert.notEqual(cli(root, '--write').status, 0);
    assert.deepEqual(JSON.parse(readFileSync(path)), catalog);
    rmSync(join(root, manifestPath));
    assert.notEqual(cli(root, '--write').status, 0);
    put(root, manifestPath, valid);
    rmSync(join(root, 'plugins', PLUGIN_NAMES.at(-1)), { recursive: true });
    assert.notEqual(cli(root, '--write').status, 0);
    assert.deepEqual(JSON.parse(readFileSync(path)), catalog);
    const last = PLUGIN_NAMES.at(-1);
    put(root, `plugins/${last}/.claude-plugin/plugin.json`, manifests.get(last));
    put(root, 'plugins/tonic-ui/.claude-plugin/plugin.json', { ...manifest, name: 'tonic-ui' });
    assert.notEqual(cli(root, '--write').status, 0);
    assert.deepEqual(JSON.parse(readFileSync(path)), catalog);
  }));
});
