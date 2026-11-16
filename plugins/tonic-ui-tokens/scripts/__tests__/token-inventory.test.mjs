import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import test, { describe } from 'node:test';
import { fileURLToPath } from 'node:url';
import { lookupTokens } from '../../skills/tonic-ui-tokens/scripts/lookup-tokens.mjs';
import { relationSnapshotDigests } from '../../skills/tonic-ui-tokens/scripts/variable-relations.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../../..');
const lookup = join(repoRoot, 'plugins/tonic-ui-tokens/skills/tonic-ui-tokens/scripts/lookup-tokens.mjs');
const generator = join(repoRoot, 'plugins/tonic-ui-tokens/scripts/generate-token-inventory.mjs');
const assets = join(repoRoot, 'plugins/tonic-ui-tokens/skills/tonic-ui-tokens/assets');
const readAsset = (path) => JSON.parse(readFileSync(join(assets, path), 'utf8'));
const relationAssets = () => ({
  inventory: readAsset('tokens.json'),
  mappings: readAsset('figma-mappings.json'),
  libraries: ['foundations', 'semantic'].map((library) => readAsset(`figma-variables/${library}.json`)),
});
const syntheticRelation = (inventory, libraries, themePath, variablePath = 'Color/text/primary') => {
  const variable = libraries[1].variables.find((entry) => entry.path === variablePath);
  const relation = {
    status: 'mapped',
    figma: { library: 'semantic', key: variable.figmaKey },
    themePath,
    modeMap: { 'v4 (Dark) Tonic One': ['dark'], 'v4 (Light) Tonic One': ['light'] },
    evidence: { reviewedAt: '2026-11-16', reason: 'Synthetic review for this test.', sourceRows: [] },
  };
  relation.evidence.snapshots = relationSnapshotDigests(relation, inventory, libraries);
  return relation;
};
const run = (script, args = [], cwd = repoRoot) => spawnSync(process.execPath, [script, ...args], {
  cwd,
  encoding: 'utf8',
  env: { ...process.env, PLUGIN_BASE_REF: undefined },
  maxBuffer: 8 * 1024 * 1024,
});
const response = (args) => {
  const execution = run(lookup, args);
  assert.equal(execution.status, 0, execution.stderr);
  return JSON.parse(execution.stdout);
};
const result = (args) => response(args).results;

describe('plugins/tonic-ui-tokens / Lookup and inventory generation', () => {
  test('lookup exposes internal focus tokens rather than filtering private namespaces', () => {
    const records = result(['--token', '_component.keyboardFocused.outerFocusRing']);
    assert.equal(records.length, 1);
    assert.equal(records[0].path, 'colors._component.keyboardFocused.outerFocusRing');
    assert.equal(records[0].visibility, 'private');
    assert.equal(records[0].cssVariable, '--tonic-colors-_component-keyboardFocused-outerFocusRing');
  });

  test('variable selector exposes unreviewed captured modes and redacted source metadata', () => {
    const { libraries } = relationAssets();
    const output = response(['--variable', 'semantic:Color/text/primary']);
    const primary = output.results[0];
    const captured = libraries[1].variables.find((variable) => variable.path === 'Color/text/primary');
    assert.equal(output.results.length, 1);
    assert.equal(primary.source, 'figma-variable');
    assert.equal(primary.variable.library, 'semantic');
    assert.equal(primary.variable.path, captured.path);
    assert.equal(primary.variable.figmaKey, captured.figmaKey);
    assert.deepEqual(primary.variable.values, captured.values);
    assert.equal(primary.correspondence.status, 'unreviewed');
    assert.equal(primary.correspondence.coverage, 'partial');
    assert.deepEqual(primary.correspondence.relations, []);
    assert.deepEqual(primary.themeTokens, []);
    assert.deepEqual(result(['--variable', captured.figmaKey]), [primary]);
    assert.equal(output.meta.variableRelationCoverage, 'partial');
    for (const library of libraries) {
      const source = output.meta.variableSources.find((entry) => entry.library === library.meta.library);
      assert.ok(source);
      assert.equal(source.fileKeySha256, library.meta.fileKeySha256);
      assert.equal(source.capturedAt, library.meta.capturedAt);
      assert.equal(source.exportedAt, library.meta.exportedAt);
      assert.equal(source.variableCount, library.meta.variableCount);
      assert.equal(Object.hasOwn(source, 'fileKey'), false);
      assert.equal(Object.hasOwn(source, 'figmaUrl'), false);
    }
  });

  test('reverse token lookup leaves accent correspondence unreviewed', () => {
    const records = result(['--token', 'colors.text.accent']);
    assert.equal(records.length, 1);
    const accent = records[0];
    assert.equal(accent.path, 'colors.text.accent');
    assert.equal(accent.correspondence.status, 'unreviewed');
    assert.equal(accent.correspondence.coverage, 'partial');
    assert.deepEqual(accent.correspondence.relations, []);
    assert.deepEqual(accent.figmaVariables, []);
  });

  test('unreviewed variables and tokens do not manufacture absence or matches', () => {
    const [secondary] = result(['--variable', 'semantic:Color/text/secondary']);
    assert.equal(secondary.variable.codeSyntax.WEB, 'text.secondary');
    assert.equal(secondary.correspondence.status, 'unreviewed');
    assert.deepEqual(secondary.correspondence.relations, []);
    assert.deepEqual(secondary.themeTokens, []);
    assert.notEqual(secondary.status, 'design-only');
    const [token] = result(['--token', 'colors.text.secondary']);
    assert.equal(token.correspondence.status, 'unreviewed');
    assert.deepEqual(token.figmaVariables, []);
  });

  test('variable selector errors are explicit and exactly one selector is required', () => {
    const barePath = run(lookup, ['--variable', 'Color/text/primary']);
    assert.notEqual(barePath.status, 0);
    assert.equal(barePath.stdout, '');
    assert.match(barePath.stderr, /qualif/i);
    const unknown = run(lookup, ['--variable', 'semantic:not-a-variable']);
    assert.notEqual(unknown.status, 0);
    assert.equal(unknown.stdout, '');
    assert.match(unknown.stderr, /unknown|not found/i);
    const multiple = run(lookup, ['--token', 'colors.text.primary', '--variable', 'semantic:Color/text/primary']);
    assert.notEqual(multiple.status, 0);
    assert.match(multiple.stderr, /exactly one/i);
    const help = run(lookup, ['--help']);
    assert.equal(help.status, 0, help.stderr);
    for (const selector of ['--token', '--figma', '--family', '--query', '--variable']) {
      assert.ok(help.stdout.includes(selector), selector);
    }
  });

  test('one reviewed variable can map to multiple explicitly reviewed theme tokens', () => {
    const { inventory, mappings, libraries } = relationAssets();
    mappings.variableRelationsCoverage = 'partial';
    mappings.variableRelations = [
      syntheticRelation(inventory, libraries, 'colors.text.primary'),
      syntheticRelation(inventory, libraries, 'colors.text.secondary'),
    ];
    const [record] = lookupTokens({ variable: 'semantic:Color/text/primary' }, inventory, mappings, libraries).results;
    assert.equal(record.correspondence.status, 'mapped');
    assert.deepEqual(record.themeTokens.map((entry) => entry.path).sort(), ['colors.text.primary', 'colors.text.secondary']);
    assert.equal(record.correspondence.relations.length, 2);
  });

  test('a reviewed variable relation cannot resolve an unresolved theme value', () => {
    const { inventory, mappings, libraries } = relationAssets();
    const relation = syntheticRelation(inventory, libraries, 'colors.riskLevel.high._gradient.opaque');
    mappings.variableRelationsCoverage = 'partial';
    mappings.variableRelations = [relation];
    const variable = lookupTokens({ variable: 'semantic:Color/text/primary' }, inventory, mappings, libraries).results[0];
    const unresolved = variable.themeTokens.find((token) => token.path === relation.themePath);
    assert.equal(unresolved.resolutionStatus, 'unresolved-source');
    assert.equal(unresolved.values.dark, '{alert.riskLevel.high.chart}');
    const token = lookupTokens({ token: relation.themePath }, inventory, mappings, libraries).results[0];
    assert.equal(token.status, 'unresolved-source');
    assert.equal(token.correspondence.status, 'mapped');
    assert.equal(token.figmaVariables[0].path, 'Color/text/primary');
  });

  test('duplicate keys and paths across libraries require an explicit library', () => {
    const { inventory, mappings, libraries } = relationAssets();
    const primary = libraries[1].variables.find((variable) => variable.path === 'Color/text/primary');
    const referencedKeys = new Set(libraries.flatMap((library) => library.variables.flatMap((variable) =>
      Object.values(variable.values).map((value) => value.target?.key).filter(Boolean))));
    const collision = libraries[0].variables.find((variable) =>
      variable.collection === 'Color' && !referencedKeys.has(variable.figmaKey));
    assert.ok(collision);
    collision.figmaKey = primary.figmaKey;
    collision.path = primary.path;
    collision.token = primary.token;
    assert.throws(() => lookupTokens({ variable: primary.figmaKey }, inventory, mappings, libraries), /ambiguous/i);
    assert.throws(() => lookupTokens({ variable: primary.path }, inventory, mappings, libraries), /qualif/i);
    const semantic = lookupTokens({ variable: `semantic:${primary.figmaKey}` }, inventory, mappings, libraries).results[0];
    const foundations = lookupTokens({ variable: `foundations:${primary.path}` }, inventory, mappings, libraries).results[0];
    assert.equal(semantic.variable.library, 'semantic');
    assert.equal(semantic.correspondence.status, 'unreviewed');
    assert.equal(foundations.variable.library, 'foundations');
    assert.equal(foundations.correspondence.status, 'unreviewed');
  });

  test('relation-aware lookups require snapshots while old fixtures remain supported', () => {
    const { inventory, mappings, libraries } = relationAssets();
    mappings.variableRelationsCoverage = 'partial';
    mappings.variableRelations = [syntheticRelation(inventory, libraries, 'colors.text.primary')];
    assert.throws(() => lookupTokens({ token: 'colors.text.primary' }, inventory, mappings), /variable|librar|snapshot/i);
    const oldMapping = { schemaVersion: 1, mappings: [] };
    const [record] = lookupTokens({ token: 'colors.text.primary' }, inventory, oldMapping).results;
    assert.equal(record.status, 'code-only');
    assert.equal(record.correspondence.status, 'unreviewed');
    assert.deepEqual(record.figmaVariables, []);
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
    const inventory = JSON.parse(readFileSync(join(repoRoot, 'plugins/tonic-ui-tokens/skills/tonic-ui-tokens/assets/tokens.json'), 'utf8'));
    const figma = '$color.risk.level.high.gradient.opaque';
    const mappings = { schemaVersion: 1, mappings: [{
      figma, path: 'colors.riskLevel.high._gradient.opaque', status: 'verified',
    }] };
    const { results } = lookupTokens({ figma }, inventory, mappings);
    assert.equal(results[0].status, 'unresolved-source');
    assert.equal(results[0].values.dark, '{alert.riskLevel.high.chart}');
  });

  test('family correspondence remains uncertain across token and family routes', () => {
    const inventory = JSON.parse(readFileSync(join(repoRoot, 'plugins/tonic-ui-tokens/skills/tonic-ui-tokens/assets/tokens.json'), 'utf8'));
    const mappingData = { schemaVersion: 1, mappings: [{
      figma: '$color.text.*', path: 'colors.text.primary', status: 'family-mapping',
    }] };
    for (const query of [{ token: 'text.primary' }, { family: 'text' }, { query: '$color.text' }]) {
      const { results } = lookupTokens(query, inventory, mappingData);
      assert.equal(results.find((entry) => entry.path === 'colors.text.primary').status, 'family-mapping');
    }
  });

  test('border family lookup includes literal decimal-key descendants', () => {
    const inventory = JSON.parse(readFileSync(join(repoRoot, 'plugins/tonic-ui-tokens/skills/tonic-ui-tokens/assets/tokens.json'), 'utf8'));
    const { results } = lookupTokens({ family: 'borders' }, inventory, { schemaVersion: 1, mappings: [] });
    assert.equal(results.find((entry) => entry.path === 'borders["0.5"]').values.dark, '0.5px solid');
    assert.equal(results.find((entry) => entry.path === 'borders["1.5"]').values.dark, '1.5px solid');
  });

  test('generated inventory round-trips named breakpoint aliases through JSON checks', () => {
    const directory = mkdtempSync(join(tmpdir(), 'tonic-snapshot-check-'));
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
    const directory = mkdtempSync(join(tmpdir(), 'tonic-decimal-token-'));
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

  test('unchanged inventory preserves provenance while stale values require regeneration', () => {
    const directory = mkdtempSync(join(tmpdir(), 'tonic-scheduled-inventory-'));
    try {
      const file = join(directory, 'tokens.json');
      const generated = run(generator, ['--output', file]);
      assert.equal(generated.status, 0, generated.stderr);
      const inventory = JSON.parse(readFileSync(file, 'utf8'));
      const currentRevision = inventory.meta.sourceRevision;
      inventory.meta.sourceRevision = 'previous-reviewed-revision';
      const preserved = `${JSON.stringify(inventory, null, 2)}\n`;
      writeFileSync(file, preserved);
      const unchanged = run(generator, ['--output', file]);
      assert.equal(unchanged.status, 0, unchanged.stderr);
      assert.equal(readFileSync(file, 'utf8'), preserved);

      inventory.tokens.find((token) => token.path === 'breakpoints.sm').values.dark = 'stale';
      writeFileSync(file, `${JSON.stringify(inventory)}\n`);
      const checked = run(generator, ['--output', file, '--check']);
      assert.notEqual(checked.status, 0);
      assert.match(checked.stderr, /snapshot differs/i);
      const refreshed = run(generator, ['--output', file]);
      assert.equal(refreshed.status, 0, refreshed.stderr);
      const updated = JSON.parse(readFileSync(file, 'utf8'));
      assert.equal(updated.meta.sourceRevision, currentRevision);
      assert.equal(updated.tokens.find((token) => token.path === 'breakpoints.sm').values.dark, '320px');
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });

  test('generation repairs a malformed snapshot instead of failing', () => {
    const directory = mkdtempSync(join(tmpdir(), 'tonic-malformed-snapshot-'));
    try {
      const pristine = join(directory, 'pristine.json');
      const file = join(directory, 'tokens.json');
      const baseline = run(generator, ['--output', pristine]);
      assert.equal(baseline.status, 0, baseline.stderr);
      writeFileSync(file, '{"schemaVersion": 1, "tokens": [');
      const regenerated = run(generator, ['--output', file]);
      assert.equal(regenerated.status, 0, regenerated.stderr);
      assert.equal(readFileSync(file, 'utf8'), readFileSync(pristine, 'utf8'));
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });

  test('generation repairs a snapshot without provenance metadata', () => {
    const directory = mkdtempSync(join(tmpdir(), 'tonic-missing-meta-snapshot-'));
    try {
      const pristine = join(directory, 'pristine.json');
      const file = join(directory, 'tokens.json');
      const baseline = run(generator, ['--output', pristine]);
      assert.equal(baseline.status, 0, baseline.stderr);
      writeFileSync(file, `${JSON.stringify({ schemaVersion: 1, tokens: [] })}\n`);
      const regenerated = run(generator, ['--output', file]);
      assert.equal(regenerated.status, 0, regenerated.stderr);
      assert.equal(readFileSync(file, 'utf8'), readFileSync(pristine, 'utf8'));
      const repaired = JSON.parse(readFileSync(file, 'utf8'));
      assert.equal(repaired.meta.sourceRevision, JSON.parse(readFileSync(pristine, 'utf8')).meta.sourceRevision);
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });

  test('check mode rejects a malformed snapshot without modifying it', () => {
    const directory = mkdtempSync(join(tmpdir(), 'tonic-malformed-check-'));
    try {
      const file = join(directory, 'tokens.json');
      const malformed = '{"schemaVersion": 1, "tokens": [';
      writeFileSync(file, malformed);
      const checked = run(generator, ['--output', file, '--check']);
      assert.notEqual(checked.status, 0);
      assert.match(checked.stderr, /not valid JSON/i);
      assert.equal(readFileSync(file, 'utf8'), malformed);
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });

  test('check mode rejects a snapshot without provenance metadata without modifying it', () => {
    const directory = mkdtempSync(join(tmpdir(), 'tonic-missing-meta-check-'));
    try {
      const file = join(directory, 'tokens.json');
      const missingMeta = `${JSON.stringify({ schemaVersion: 1, tokens: [] })}\n`;
      writeFileSync(file, missingMeta);
      const checked = run(generator, ['--output', file, '--check']);
      assert.notEqual(checked.status, 0);
      assert.match(checked.stderr, /missing provenance metadata/i);
      assert.equal(readFileSync(file, 'utf8'), missingMeta);
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });

});
