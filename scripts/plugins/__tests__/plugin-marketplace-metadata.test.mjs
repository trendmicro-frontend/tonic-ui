import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import test, { describe } from 'node:test';
import { fileURLToPath } from 'node:url';
import { alignPluginMetadata } from '../lib/plugin-metadata.mjs';

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
    const catalog = { name: 'catalog', plugins: [{ name: 'demo', source: './plugins/demo', version: '0.1.0', description: 'old', author: { name: 'Old' }, category: 'development' }] };
    put(root, '.claude-plugin/marketplace.json', catalog);
    put(root, 'plugins/demo/.claude-plugin/plugin.json', manifest);
    const manifestPath = 'plugins/demo/.claude-plugin/plugin.json';
    const path = join(root, '.claude-plugin/marketplace.json');
    const before = readFileSync(path, 'utf8');
    const check = cli(root);
    assert.notEqual(check.status, 0);
    assert.match(check.stderr, /Run node scripts\/plugins\/sync-plugin-marketplace-metadata\.mjs --write/);
    assert.equal(readFileSync(path, 'utf8'), before);
    assert.equal(cli(root, '--write').status, 0);
    const aligned = readFileSync(path, 'utf8');
    assert.deepEqual(JSON.parse(aligned), { ...catalog, plugins: [{ ...catalog.plugins[0], ...manifest }] });
    assert.equal(cli(root, '--write').status, 0);
    assert.equal(readFileSync(path, 'utf8'), aligned);
    assert.equal(cli(root).status, 0);
    for (const invalid of [null, { ...manifest, name: 'wrong' }, { ...manifest, version: '01.0.0' }, { ...manifest, description: '' }, { ...manifest, author: { name: '' } }]) {
      put(root, manifestPath, invalid);
      assert.notEqual(cli(root, '--write').status, 0);
      assert.equal(readFileSync(path, 'utf8'), aligned);
    }
    put(root, manifestPath, manifest);
    for (const plugins of [[], [catalog.plugins[0], catalog.plugins[0]], [{ ...catalog.plugins[0], name: 'missing' }]]) {
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
  }));
});
