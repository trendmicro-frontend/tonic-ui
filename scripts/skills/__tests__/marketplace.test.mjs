import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { appendFileSync, cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { lookupTokens } from '../../../skills/external/tonic-ui-tokens/scripts/lookup-tokens.mjs';
import { validatePluginIsolation } from '../validate-plugin-isolation.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const lookup = join(repoRoot, 'skills/external/tonic-ui-tokens/scripts/lookup-tokens.mjs');
const generator = join(repoRoot, 'scripts/skills/generate-token-inventory.mjs');
const validator = join(repoRoot, 'scripts/skills/validate-marketplace.mjs');
const run = (script, args = [], cwd = repoRoot) => spawnSync(process.execPath, [script, ...args], {
  cwd,
  encoding: 'utf8',
  maxBuffer: 8 * 1024 * 1024,
});
const result = (args) => {
  const execution = run(lookup, args);
  assert.equal(execution.status, 0, execution.stderr);
  return JSON.parse(execution.stdout).results;
};

test('lookup exposes internal focus tokens rather than filtering private namespaces', () => {
  const records = result(['--token', '_component.keyboardFocused.outerFocusRing']);
  assert.equal(records.length, 1);
  assert.equal(records[0].path, 'colors._component.keyboardFocused.outerFocusRing');
  assert.equal(records[0].visibility, 'private');
  assert.equal(records[0].cssVariable, '--tonic-colors-_component-keyboardFocused-outerFocusRing');
});

test('Figma selected-disabled does not follow the reversed order of its source code column', () => {
  const records = result(['--figma', '$color.foreground.primary-variant.selected-disabled']);
  assert.equal(records.length, 1);
  assert.equal(records[0].path, 'colors._foreground.primaryVariant.selectedDisabled');
});

test('unimplemented design tokens remain design-only without an invented code path', () => {
  const records = result(['--figma', '$color.status.in-progress.icon']);
  assert.equal(records.length, 1);
  assert.equal(records[0].status, 'design-only');
  assert.equal(records[0].path, null);
  assert.equal(records[0].cssVariable, undefined);
});

test('legacy CSS variable names preserve the source colon-to-underscore convention', () => {
  const records = result(['--token', 'blue:60']);
  assert.equal(records.length, 1);
  assert.equal(records[0].kind, 'legacy');
  assert.equal(records[0].cssVariable, '--tonic-colors-blue_60');
});

test('unknown tokens fail without manufacturing a usable color', () => {
  const execution = run(lookup, ['--token', '_component.nonexistent.token']);
  assert.notEqual(execution.status, 0);
  assert.equal(execution.stdout, '');
  assert.match(execution.stderr, /unknown|not found/i);
});

test('a confirmed design alias cannot make an unresolved source value verified', () => {
  const inventory = JSON.parse(readFileSync(join(repoRoot, 'skills/external/tonic-ui-tokens/assets/tokens.json'), 'utf8'));
  const figma = '$color.risk.level.high.gradient.opaque';
  const mappings = { schemaVersion: 1, mappings: [{
    figma, path: 'colors.riskLevel.high._gradient.opaque', status: 'verified',
  }] };
  const { results } = lookupTokens({ figma }, inventory, mappings);
  assert.equal(results[0].status, 'unresolved-source');
  assert.equal(results[0].values.dark, '{alert.riskLevel.high.chart}');
});

test('family correspondence remains uncertain across token and family routes', () => {
  const inventory = JSON.parse(readFileSync(join(repoRoot, 'skills/external/tonic-ui-tokens/assets/tokens.json'), 'utf8'));
  const mappingData = { schemaVersion: 1, mappings: [{
    figma: '$color.text.*', path: 'colors.text.primary', status: 'family-mapping',
  }] };
  for (const query of [{ token: 'text.primary' }, { family: 'text' }, { query: '$color.text' }]) {
    const { results } = lookupTokens(query, inventory, mappingData);
    assert.equal(results.find((entry) => entry.path === 'colors.text.primary').status, 'family-mapping');
  }
});

test('border family lookup includes literal decimal-key descendants', () => {
  const inventory = JSON.parse(readFileSync(join(repoRoot, 'skills/external/tonic-ui-tokens/assets/tokens.json'), 'utf8'));
  const { results } = lookupTokens({ family: 'borders' }, inventory, { schemaVersion: 1, mappings: [] });
  assert.equal(results.find((entry) => entry.path === 'borders["0.5"]').values.dark, '0.5px solid');
  assert.equal(results.find((entry) => entry.path === 'borders["1.5"]').values.dark, '1.5px solid');
});

test('generated inventory round-trips named breakpoint aliases through JSON checks', () => {
  const directory = mkdtempSync(join(tmpdir(), 'tonic-ui-snapshot-check-'));
  try {
    const file = join(directory, 'tokens.json');
    assert.equal(run(generator, ['--output', file]).status, 0);
    const checked = run(generator, ['--output', file, '--check']);
    assert.equal(checked.status, 0, checked.stderr);
    const data = JSON.parse(readFileSync(file, 'utf8'));
    assert.equal(data.tokens.find((entry) => entry.path === 'breakpoints.sm').values.dark, '320px');
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test('generation keeps decimal-key tokens addressable with their actual unit values', () => {
  const directory = mkdtempSync(join(tmpdir(), 'tonic-ui-decimal-token-'));
  try {
    const file = join(directory, 'tokens.json');
    const execution = run(generator, ['--output', file]);
    assert.equal(execution.status, 0, execution.stderr);
    const inventory = JSON.parse(readFileSync(file, 'utf8'));
    const token = inventory.tokens.find((entry) => entry.path === 'borders["0.5"]');
    assert.equal(token.values.dark, '0.5px solid');
    assert.equal(token.unitValues.rem.dark, '0.0313rem solid');
    assert.equal(token.cssVariable, '--tonic-borders-0-5');
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test('coverage validation rejects omission of a private token from a real source inventory', () => {
  const directory = mkdtempSync(join(tmpdir(), 'tonic-ui-token-coverage-'));
  try {
    const file = join(directory, 'tokens.json');
    const generated = run(generator, ['--output', file]);
    assert.equal(generated.status, 0, generated.stderr);
    const inventory = JSON.parse(readFileSync(file, 'utf8'));
    const missingPath = 'colors._component.keyboardFocused.outerFocusRing';
    assert.ok(inventory.tokens.some((entry) => entry.path === missingPath));
    inventory.tokens = inventory.tokens.filter((entry) => entry.path !== missingPath);
    writeFileSync(file, `${JSON.stringify(inventory)}\n`);
    const execution = run(validator, ['--inventory', file]);
    assert.notEqual(execution.status, 0);
    assert.match(execution.stderr, /missing.*colors\._component\.keyboardFocused\.outerFocusRing/i);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test('standalone plugin validation allows repository references that are not dependencies', () => {
  const directory = mkdtempSync(join(tmpdir(), 'tonic-ui-isolation-'));
  try {
    const plugin = join(directory, 'plugin');
    cpSync(join(repoRoot, 'skills/external'), plugin, { recursive: true });
    appendFileSync(join(plugin, 'tonic-ui-tokens/SKILL.md'),
      '\nLibrary releases belong to the repository-side tonic-ui-version skill, not this plugin.\n');
    const result = validatePluginIsolation(plugin);
    assert.equal(result.token.path, 'colors._component.keyboardFocused.outerFocusRing');
    assert.equal(result.typography.status, 'composed');
    assert.equal(result.typography.resolvedProperties.fontSize.path, 'fontSizes.sm');
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test('standalone plugin validation rejects an executable dependency outside its package', () => {
  const directory = mkdtempSync(join(tmpdir(), 'tonic-ui-isolation-'));
  try {
    const plugin = join(directory, 'plugin');
    cpSync(join(repoRoot, 'skills/external'), plugin, { recursive: true });
    appendFileSync(join(plugin, 'tonic-ui-tokens/scripts/lookup-tokens.mjs'),
      '\nimport "../../../../internal/tonic-ui-version/scripts/repo-root.mjs";\n');
    assert.throws(() => validatePluginIsolation(plugin), /Standalone token lookup failed.*Cannot find module/s);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
