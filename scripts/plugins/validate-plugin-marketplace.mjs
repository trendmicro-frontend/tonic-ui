#!/usr/bin/env node
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { isDeepStrictEqual } from 'node:util';
import { alignPluginMetadata, PLUGIN_NAMES } from './lib/plugin-metadata.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const catalogPaths = { claude: '.claude-plugin/marketplace.json', codex: '.agents/plugins/marketplace.json' };
const json = (root, path) => {
  assert(existsSync(join(root, path)), `Missing file: ${path}`);
  try {
    return JSON.parse(readFileSync(join(root, path), 'utf8'));
  } catch (error) {
    throw new Error(`Invalid JSON: ${path}: ${error.message}`);
  }
};

export function validatePluginMarketplace(root) {
  const claudeCatalog = json(root, catalogPaths.claude);
  const codexCatalog = json(root, catalogPaths.codex);
  assert(claudeCatalog.name === 'tonic-ui' && codexCatalog.name === 'tonic-ui', 'Invalid marketplace identity.');
  const pluginsRoot = join(root, 'plugins');
  const manifests = new Map(readdirSync(pluginsRoot, { withFileTypes: true })
    .filter((entry) => !entry.name.startsWith('.') && entry.isDirectory())
    .map((entry) => [entry.name, json(root, `plugins/${entry.name}/.claude-plugin/plugin.json`)]));
  const names = [...manifests.keys()].sort();
  assert(isDeepStrictEqual(names, PLUGIN_NAMES), 'Marketplace must expose exactly the expected plugins.');
  assert(Array.isArray(codexCatalog.plugins), 'Expected Codex catalog.plugins array.');
  const { mismatches } = alignPluginMetadata(claudeCatalog, manifests);
  assert(mismatches.length === 0,
    `Plugin metadata differs: ${mismatches.map(({ plugin, field }) => `${plugin}/${field}`).join(', ')}. Run node scripts/plugins/sync-plugin-marketplace-metadata.mjs --write`);
  for (const [platform, catalog] of [['Claude', claudeCatalog], ['Codex', codexCatalog]]) {
    const entries = catalog.plugins.map((entry) => entry.name);
    assert(new Set(entries).size === entries.length, `Duplicate ${platform} marketplace plugin entries.`);
    assert(isDeepStrictEqual([...entries].sort(), names), `Marketplace must expose exactly the physical plugins in ${platform}.`);
  }
  for (const name of names) {
    const manifest = manifests.get(name);
    const claude = claudeCatalog.plugins.find((entry) => entry.name === name);
    const codex = codexCatalog.plugins.find((entry) => entry.name === name);
    assert(claude.source === `./plugins/${name}` && claude.version === manifest.version, `Invalid Claude plugin source/version: ${name}`);
    assert(codex.source?.source === 'local' && codex.source?.path === `./plugins/${name}`, `Invalid Codex plugin source: ${name}`);
  }
  return { catalogs: 2, plugins: names.length, metadata: 'aligned' };
}

const invokedDirectly = import.meta.main
  ?? (typeof process.argv[1] === 'string' && resolve(process.argv[1]) === fileURLToPath(import.meta.url));
if (invokedDirectly) {
  try {
    console.log(JSON.stringify(validatePluginMarketplace(repoRoot)));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
