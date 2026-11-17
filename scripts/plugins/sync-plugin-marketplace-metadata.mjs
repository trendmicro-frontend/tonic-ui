#!/usr/bin/env node
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { alignPluginMetadata } from './lib/plugin-metadata.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
try {
  const { values } = parseArgs({ options: { write: { type: 'boolean', default: false } } });
  const catalogPath = join(repoRoot, '.claude-plugin/marketplace.json');
  const catalog = JSON.parse(readFileSync(catalogPath, 'utf8'));
  const manifests = new Map();
  for (const entry of readdirSync(join(repoRoot, 'plugins'), { withFileTypes: true })) {
    if (entry.name.startsWith('.') || !entry.isDirectory()) {
      continue;
    }
    manifests.set(entry.name, JSON.parse(readFileSync(join(repoRoot, 'plugins', entry.name, '.claude-plugin/plugin.json'), 'utf8')));
  }
  const aligned = alignPluginMetadata(catalog, manifests);
  if (aligned.mismatches.length > 0) {
    const fields = aligned.mismatches.map(({ plugin, field }) => `${plugin}/${field}`).join(', ');
    if (!values.write) {
      throw new Error(`Plugin metadata differs: ${fields}. Run node scripts/plugins/sync-plugin-marketplace-metadata.mjs --write`);
    }
    writeFileSync(catalogPath, `${JSON.stringify(aligned.catalog, null, 2)}\n`);
    console.log(`Synchronized plugin metadata: ${fields}`);
  } else {
    console.log('Plugin metadata is aligned.');
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
