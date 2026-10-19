#!/usr/bin/env node
import { isDeepStrictEqual } from 'node:util';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { buildTokenInventory } from './source-theme.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

try {
  const { values } = parseArgs({ options: { output: { type: 'string' }, check: { type: 'boolean' } } });
  const output = values.output ? resolve(values.output) : resolve(repoRoot, 'skills/external/tonic-ui-tokens/assets/tokens.json');
  const inventory = buildTokenInventory(repoRoot);
  if (values.check) {
    const existing = JSON.parse(readFileSync(output, 'utf8'));
    // Revision identifies generation provenance; identical source can be carried
    // into a later commit without forcing a snapshot-only revision edit.
    const current = { ...inventory, meta: { ...inventory.meta, sourceRevision: existing.meta.sourceRevision } };
    if (!isDeepStrictEqual(existing, current)) throw new Error('Token snapshot differs from the current source; regenerate it.');
  } else {
    mkdirSync(dirname(output), { recursive: true });
    writeFileSync(output, `${JSON.stringify(inventory, null, 2)}\n`);
  }
  console.log(JSON.stringify({ action: values.check ? 'checked' : 'generated', output, ...inventory.meta.counts }));
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
