#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { isDeepStrictEqual, parseArgs } from 'node:util';
import { buildTokenInventory } from './lib/source-theme.mjs';
import { validatePluginIsolation } from './lib/validate-plugin-isolation.mjs';
import { validateVariableRelations } from '../skills/tonic-ui-tokens/scripts/variable-relations.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const pluginRoot = join(repoRoot, 'plugins/tonic-ui-tokens');
const tokenRoot = join(pluginRoot, 'skills/tonic-ui-tokens');
const json = (path) => JSON.parse(readFileSync(path, 'utf8'));
const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};
const inventoryRepair = 'Run node plugins/tonic-ui-tokens/scripts/generate-token-inventory.mjs, then bump the plugin version and sync catalog metadata.';
try {
  const { values } = parseArgs({ options: { inventory: { type: 'string' }, relations: { type: 'string' } } });
  const inventory = json(values.inventory ? resolve(values.inventory) : join(tokenRoot, 'assets/tokens.json'));
  const expected = buildTokenInventory(repoRoot);
  const actualPaths = new Map(inventory.tokens.map((token) => [token.path, token]));
  const expectedPaths = new Set(expected.tokens.map((token) => token.path));
  assert(actualPaths.size === inventory.tokens.length, 'Duplicate paths in token inventory.');
  for (const token of expected.tokens) {
    assert(actualPaths.has(token.path), `Missing source token: ${token.path}. ${inventoryRepair}`);
    assert(isDeepStrictEqual(actualPaths.get(token.path), token), `Stale source token: ${token.path}. ${inventoryRepair}`);
  }
  for (const path of actualPaths.keys()) {
    assert(expectedPaths.has(path), `Unknown source token: ${path}. ${inventoryRepair}`);
  }
  const comparable = { ...expected, meta: { ...expected.meta, sourceRevision: inventory.meta.sourceRevision } };
  assert(isDeepStrictEqual(inventory, comparable), `Token inventory metadata or source fingerprints differ. ${inventoryRepair}`);

  const relations = json(values.relations ? resolve(values.relations) : join(tokenRoot, 'assets/token-relations.json'));

  const variableLibraries = ['foundations', 'semantic'].map((library) =>
    json(join(tokenRoot, 'assets/figma-variables', `${library}.json`)));
  validateVariableRelations(inventory, relations, variableLibraries);

  validatePluginIsolation(pluginRoot);
  console.log(JSON.stringify({ tokens: inventory.meta.counts, relations: relations.variableRelations.length, themeCoverage: 'complete', standaloneLookup: 'checked' }));
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
