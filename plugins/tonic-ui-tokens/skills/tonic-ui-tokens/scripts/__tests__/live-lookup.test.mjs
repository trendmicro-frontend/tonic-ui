import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { lookupTokens } from '../lookup-tokens.mjs';

const asset = (name) => JSON.parse(readFileSync(new URL(`../../assets/${name}`, import.meta.url), 'utf8'));
const inventory = asset('tokens.json');
const mappings = asset('figma-mappings.json');
const libraries = ['foundations', 'semantic'].map((name) => asset(`figma-variables/${name}.json`));
const lookup = (query, mappingData = mappings) => lookupTokens(query, inventory, mappingData, libraries).results;
const script = fileURLToPath(new URL('../lookup-tokens.mjs', import.meta.url));

test('private focus token and legacy CSS variable retain source paths', () => {
  const [focus] = lookup({ token: '_component.keyboardFocused.outerFocusRing' });
  assert.equal(focus.path, 'colors._component.keyboardFocused.outerFocusRing');
  assert.equal(focus.visibility, 'private');
  assert.equal(focus.cssVariable, '--tonic-colors-_component-keyboardFocused-outerFocusRing');
  const [legacy] = lookup({ token: 'blue:60' });
  assert.equal(legacy.kind, 'legacy');
  assert.equal(legacy.cssVariable, '--tonic-colors-blue_60');
});

test('selected-disabled uses its named mapping despite reversed source column order', () => {
  const [record] = lookup({ figma: '$color.foreground.primary-variant.selected-disabled' });
  assert.equal(record.path, 'colors._foreground.primaryVariant.selectedDisabled');
  assert.ok(record.mappings[0].notes.some((note) => note.includes('not column position')));
});

test('design-only rows never acquire an invented code path', () => {
  const [record] = lookup({ figma: '$color.status.in-progress.icon' });
  assert.equal(record.status, 'design-only');
  assert.equal(record.path, null);
  assert.equal(record.cssVariable, undefined);
});

test('an exact curated alias cannot promote an unresolved source value', () => {
  const figma = '$color.risk.level.high.gradient.opaque';
  const custom = { schemaVersion: 1, mappings: [{ figma, path: 'colors.riskLevel.high._gradient.opaque', status: 'verified' }] };
  const [record] = lookup({ figma }, custom);
  assert.equal(record.status, 'unresolved-source');
  assert.equal(record.values.dark, '{alert.riskLevel.high.chart}');
});

test('family and query routes retain family correspondence and decimal paths', () => {
  const custom = { schemaVersion: 1, mappings: [{ figma: '$color.text.*', path: 'colors.text.primary', status: 'family-mapping' }] };
  for (const query of [{ token: 'text.primary' }, { family: 'text' }, { query: '$color.text' }]) {
    assert.equal(lookup(query, custom).find((entry) => entry.path === 'colors.text.primary').status, 'family-mapping');
  }
  const borders = lookup({ family: 'borders' });
  assert.equal(borders.find((entry) => entry.path === 'borders["0.5"]').values.dark, '0.5px solid');
  assert.equal(borders.find((entry) => entry.path === 'borders["1.5"]').values.dark, '1.5px solid');
});

test('invalid mapped and typography token targets fail rather than fabricating values', () => {
  const mapped = { schemaVersion: 1, mappings: [{ figma: '$color.example', path: 'colors.missing', status: 'verified' }] };
  assert.throws(() => lookup({ figma: '$color.example' }, mapped), /invalid mapped token target/i);
  const primary = lookup({ token: 'colors.text.primary' }, mapped);
  assert.equal(primary.length, 1);
  assert.equal(primary[0].path, 'colors.text.primary');
  const composed = { schemaVersion: 1, mappings: [{ figma: '$typography.example', properties: { fontSize: 'fontSizes.missing' } }] };
  assert.throws(() => lookup({ figma: '$typography.example' }, composed), /invalid typography token target/i);
});

test('unknown tokens and variables fail without fabricating values', () => {
  for (const args of [['--token', '_component.nonexistent.token'], ['--variable', 'semantic:not-a-variable']]) {
    const execution = spawnSync(process.execPath, [script, ...args], { encoding: 'utf8' });
    assert.notEqual(execution.status, 0);
    assert.equal(execution.stdout, '');
    assert.match(execution.stderr, /unknown|not found/i);
  }
});

test('exactly one nonempty selector is required by the API and CLI', () => {
  for (const query of [{}, { token: '' }, { token: 'colors.text.primary', variable: '' }, { token: 'colors.text.primary', figma: '$color.text.primary' }]) {
    assert.throws(() => lookup(query), /exactly one/i);
  }
  const execution = spawnSync(process.execPath, [script, '--token', 'colors.text.primary', '--variable', ''], { encoding: 'utf8' });
  assert.notEqual(execution.status, 0);
  assert.equal(execution.stdout, '');
  assert.match(execution.stderr, /exactly one/i);
});
