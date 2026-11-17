import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { createTokenMatcher } from '../token-matcher.mjs';

const asset = (name) => JSON.parse(readFileSync(new URL(`../../assets/${name}`, import.meta.url), 'utf8'));
const inventory = asset('tokens.json');
const relations = asset('token-relations.json');
const libraries = ['foundations', 'semantic'].map((name) => asset(`figma-variables/${name}.json`));
const matcher = createTokenMatcher({ inventory, relations, figmaVariables: libraries });
const script = fileURLToPath(new URL('../lookup-tokens.mjs', import.meta.url));

test('private focus token and legacy CSS variable retain source paths', () => {
  const [focus] = matcher.matchThemeTokens('_component.keyboardFocused.outerFocusRing').results;
  assert.equal(focus.path, 'colors._component.keyboardFocused.outerFocusRing');
  assert.equal(focus.visibility, 'private');
  assert.equal(focus.cssVariable, '--tonic-colors-_component-keyboardFocused-outerFocusRing');
  const [legacy] = matcher.matchThemeTokens('blue:60').results;
  assert.equal(legacy.kind, 'legacy');
  assert.equal(legacy.cssVariable, '--tonic-colors-blue_60');
});

test('unresolved source values remain unresolved and unreviewed', () => {
  const [record] = matcher.matchThemeTokens('colors.riskLevel.high._gradient.opaque').results;
  assert.equal(record.resolutionStatus, 'unresolved-source');
  assert.equal(record.values.dark, '{alert.riskLevel.high.chart}');
  assert.equal(record.correspondence.status, 'unreviewed');
  assert.deepEqual(record.figmaVariables, []);
  assert.equal(Object.hasOwn(record, 'status'), false);
});

test('wildcard and exact paths retain decimal border keys and units', () => {
  const borders = matcher.matchThemeTokens('borders.*').results;
  const half = borders.find((entry) => entry.path === 'borders["0.5"]');
  assert.equal(half.values.dark, '0.5px solid');
  assert.equal(half.unitValues.rem.dark, '0.0313rem solid');
  assert.equal(borders.find((entry) => entry.path === 'borders["1.5"]').values.dark, '1.5px solid');
  assert.deepEqual(matcher.matchThemeTokens('0.5').results, [half]);
  assert.deepEqual(matcher.matchThemeTokens("borders['0.5']").results, [half]);
});

test('unknown tokens and variables return empty envelopes without fabricating values', () => {
  for (const args of [
    ['--theme-token', '_component.nonexistent.token'],
    ['--figma-variable', 'semantic:not-a-variable'],
  ]) {
    const execution = spawnSync(process.execPath, [script, ...args], { encoding: 'utf8' });
    assert.equal(execution.status, 0, execution.stderr);
    assert.equal(execution.stderr, '');
    const output = JSON.parse(execution.stdout);
    assert.deepEqual(output.results, []);
    assert.equal(output.meta.variableRelationCoverage, 'partial');
  }
});

test('selectors must be nonempty and the CLI accepts exactly one', () => {
  for (const selector of [null, undefined, 1, {}, '', '  ']) {
    assert.throws(() => matcher.matchThemeTokens(selector), /Selector must be a nonempty string/);
    assert.throws(() => matcher.matchFigmaVariables(selector), /Selector must be a nonempty string/);
  }
  const execution = spawnSync(process.execPath, [
    script, '--theme-token', 'colors.text.primary', '--figma-variable', '',
  ], { encoding: 'utf8' });
  assert.notEqual(execution.status, 0);
  assert.equal(execution.stdout, '');
  assert.match(execution.stderr, /exactly one/i);
});
