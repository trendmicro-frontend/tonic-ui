#!/usr/bin/env node
import { isDeepStrictEqual } from 'node:util';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { buildTokenInventory } from './lib/source-theme.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');

// A snapshot that cannot be parsed or lacks provenance is not trustworthy.
// Generation replaces it; --check reports it as stale instead of crashing.
const readSnapshot = (file) => {
  if (!existsSync(file)) return { snapshot: null, problem: null };
  let snapshot;
  try {
    snapshot = JSON.parse(readFileSync(file, 'utf8'));
  } catch {
    return { snapshot: null, problem: 'Token snapshot is not valid JSON' };
  }
  if (!snapshot || typeof snapshot !== 'object' || Array.isArray(snapshot)
      || !snapshot.meta || typeof snapshot.meta !== 'object' || Array.isArray(snapshot.meta)
      || typeof snapshot.meta.sourceRevision !== 'string') {
    return { snapshot: null, problem: 'Token snapshot is missing provenance metadata' };
  }
  return { snapshot, problem: null };
};

try {
  const { values } = parseArgs({ options: { output: { type: 'string' }, check: { type: 'boolean' } } });
  const output = values.output ? resolve(values.output) : resolve(repoRoot, 'plugins/tonic-ui-tokens/skills/tonic-ui-tokens/assets/tokens.json');
  const inventory = buildTokenInventory(repoRoot);
  const existing = readSnapshot(output);
  // Preserve provenance when implementation and metadata are unchanged, so a
  // scheduled run does not create a PR merely because HEAD moved.
  const comparable = existing.snapshot
    ? { ...inventory, meta: { ...inventory.meta, sourceRevision: existing.snapshot.meta.sourceRevision } }
    : inventory;
  const unchanged = !existing.problem && isDeepStrictEqual(existing.snapshot, comparable);
  if (values.check) {
    if (existing.problem) {
      throw new Error(`${existing.problem}; regenerate it.`);
    }
    if (!unchanged) {
      throw new Error('Token snapshot differs from the current source; regenerate it.');
    }
  } else if (!unchanged) {
    mkdirSync(dirname(output), { recursive: true });
    writeFileSync(output, `${JSON.stringify(inventory, null, 2)}\n`);
  }
  console.log(JSON.stringify({ action: values.check ? 'checked' : 'generated', output, ...inventory.meta.counts }));
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
