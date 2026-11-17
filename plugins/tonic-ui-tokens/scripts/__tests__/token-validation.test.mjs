import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { appendFileSync, cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import test, { describe } from 'node:test';
import { fileURLToPath } from 'node:url';
import { validatePluginIsolation } from '../lib/validate-plugin-isolation.mjs';
import { lookupTokens } from '../../skills/tonic-ui-tokens/scripts/lookup-tokens.mjs';
import {
  relationSnapshotDigests,
  validateVariableRelations,
} from '../../skills/tonic-ui-tokens/scripts/variable-relations.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../../..');
const generator = join(repoRoot, 'plugins/tonic-ui-tokens/scripts/generate-token-inventory.mjs');
const validator = join(repoRoot, 'plugins/tonic-ui-tokens/scripts/validate-tokens.mjs');
const assets = join(repoRoot, 'plugins/tonic-ui-tokens/skills/tonic-ui-tokens/assets');
const readAsset = (path) => JSON.parse(readFileSync(join(assets, path), 'utf8'));
const readRelationAssets = () => ({
  inventory: readAsset('tokens.json'),
  mappings: readAsset('figma-mappings.json'),
  libraries: ['foundations', 'semantic'].map((library) => readAsset(`figma-variables/${library}.json`)),
});
const syntheticRelation = (inventory, mappings, libraries, themePath, variablePath = 'Color/text/primary') => {
  const variable = libraries[1].variables.find((entry) => entry.path === variablePath);
  const row = mappings.mappings.find((entry) => entry.figma === '$color.text.primary');
  const relation = {
    status: 'mapped',
    figma: { library: 'semantic', key: variable.figmaKey },
    themePath,
    modeMap: { 'v4 (Dark) Tonic One': ['dark'], 'v4 (Light) Tonic One': ['light'] },
    evidence: {
      reviewedAt: '2026-11-16',
      reason: 'Synthetic review for this test; not shipped correspondence.',
      sourceRows: [{ figma: row.figma, ...row.source }],
    },
  };
  relation.evidence.snapshots = relationSnapshotDigests(relation, inventory, libraries);
  return relation;
};
const reviewedAssets = () => {
  const fixture = readRelationAssets();
  const { inventory, mappings, libraries } = fixture;
  mappings.variableRelationsCoverage = 'partial';
  mappings.variableRelations = [
    syntheticRelation(inventory, mappings, libraries, 'colors.text.primary'),
    syntheticRelation(inventory, mappings, libraries, 'colors.text.accent', 'Color/text/accent'),
    syntheticRelation(inventory, mappings, libraries, 'colors.text.accent', 'Color/icon/accent'),
  ];
  return fixture;
};
const withoutRelations = (mappings) => {
  const legacy = structuredClone(mappings);
  delete legacy.variableRelationsCoverage;
  delete legacy.variableRelations;
  return legacy;
};
const resolvedAlias = (library) => library.variables
  .flatMap((variable) => Object.values(variable.values))
  .find((value) => value.type === 'alias' && value.target);
const absenceRelation = (status, figma, themePath, inventory, libraries) => {
  const relation = {
    status,
    figma,
    themePath,
    evidence: {
      reviewedAt: '2026-11-16',
      reason: 'Reviewed the full captured foundations, semantic, and theme inventories.',
      sourceRows: [],
    },
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
describe('plugins/tonic-ui-tokens / Validation and lookup isolation', () => {
  test('coverage validation rejects omission of a private token from a real source inventory', () => {
    const directory = mkdtempSync(join(tmpdir(), 'tonic-token-coverage-'));
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

  test('token validator rejects stale themeVersion without modifying the supplied inventory', () => {
    const directory = mkdtempSync(join(tmpdir(), 'tonic-theme-version-'));
    try {
      const file = join(directory, 'tokens.json');
      const generated = run(generator, ['--output', file]);
      assert.equal(generated.status, 0, generated.stderr);
      const inventory = JSON.parse(readFileSync(file, 'utf8'));
      inventory.meta.themeVersion = '0.0.0-stale';
      const bytes = JSON.stringify(inventory);
      writeFileSync(file, bytes);
      const execution = run(validator, ['--inventory', file]);
      assert.notEqual(execution.status, 0);
      assert.match(execution.stderr, /node plugins\/tonic-ui-tokens\/scripts\/generate-token-inventory.mjs/);
      assert.equal(readFileSync(file, 'utf8'), bytes);
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });

  test('source fingerprint freshness is checked without rewriting the inventory', () => {
    const directory = mkdtempSync(join(tmpdir(), 'tonic-source-fingerprint-'));
    try {
      const file = join(directory, 'tokens.json');
      const generated = run(generator, ['--output', file]);
      assert.equal(generated.status, 0, generated.stderr);
      const inventory = JSON.parse(readFileSync(file, 'utf8'));
      const sourcePath = Object.keys(inventory.meta.sourceHashes)[0];
      inventory.meta.sourceHashes[sourcePath] = '0'.repeat(64);
      const bytes = JSON.stringify(inventory);
      writeFileSync(file, bytes);
      const checked = run(generator, ['--output', file, '--check']);
      assert.notEqual(checked.status, 0);
      assert.match(checked.stderr, /snapshot differs/i);
      const validated = run(validator, ['--inventory', file]);
      assert.notEqual(validated.status, 0);
      assert.match(validated.stderr, /fingerprints differ/i);
      assert.equal(readFileSync(file, 'utf8'), bytes);
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });

  test('token validator rejects invalid mapping targets without modifying the supplied mapping', () => {
    const directory = mkdtempSync(join(tmpdir(), 'tonic-invalid-mapping-'));
    try {
      const file = join(directory, 'mappings.json');
      const mappings = JSON.parse(readFileSync(join(repoRoot, 'plugins/tonic-ui-tokens/skills/tonic-ui-tokens/assets/figma-mappings.json'), 'utf8'));
      mappings.mappings.find((mapping) => mapping.path).path = 'colors.nonexistent';
      const bytes = JSON.stringify(mappings);
      writeFileSync(file, bytes);
      const execution = run(validator, ['--mappings', file]);
      assert.notEqual(execution.status, 0);
      assert.match(execution.stderr, /Invalid mapped token target: colors.nonexistent/);
      assert.equal(readFileSync(file, 'utf8'), bytes);
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });

  test('mapping validation rejects missing provenance and invalid typography targets', () => {
    const directory = mkdtempSync(join(tmpdir(), 'tonic-mapping-provenance-'));
    try {
      const file = join(directory, 'mappings.json');
      for (const [mutate, error] of [
        [(data) => { delete data.mappings[0].source.row; }, /Missing mapping provenance/i],
        [(data) => { data.mappings[0].source.version = -1; }, /Undeclared mapping source/i],
        [(data) => { data.mappings.find((mapping) => mapping.properties).properties.fontSize = 'fontSizes.nonexistent'; }, /Invalid typography target/i],
      ]) {
        const mappings = readAsset('figma-mappings.json');
        mutate(mappings);
        const bytes = JSON.stringify(mappings);
        writeFileSync(file, bytes);
        const execution = run(validator, ['--mappings', file]);
        assert.notEqual(execution.status, 0);
        assert.match(execution.stderr, error);
        assert.equal(readFileSync(file, 'utf8'), bytes);
      }
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });

  test('the validator accepts an older mapping fixture without a variable ledger', () => {
    const directory = mkdtempSync(join(tmpdir(), 'tonic-legacy-mappings-'));
    try {
      const file = join(directory, 'mappings.json');
      const bytes = JSON.stringify(withoutRelations(readAsset('figma-mappings.json')));
      writeFileSync(file, bytes);
      const execution = run(validator, ['--mappings', file]);
      assert.equal(execution.status, 0, execution.stderr);
      assert.equal(readFileSync(file, 'utf8'), bytes);
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });

  test('the validator rejects stale supplied relationship evidence without rewriting it', () => {
    const directory = mkdtempSync(join(tmpdir(), 'tonic-stale-relation-'));
    try {
      const file = join(directory, 'mappings.json');
      const { mappings } = reviewedAssets();
      const relation = mappings.variableRelations.find((entry) => entry.themePath === 'colors.text.primary');
      relation.evidence.snapshots.theme = '0'.repeat(64);
      const bytes = JSON.stringify(mappings);
      writeFileSync(file, bytes);
      const execution = run(validator, ['--mappings', file]);
      assert.notEqual(execution.status, 0);
      assert.match(execution.stderr, /stale/i);
      assert.match(execution.stderr, /colors\.text\.primary|b64780a0d6076fc908b409a47fb5e3e0e9f89a63/i);
      assert.equal(readFileSync(file, 'utf8'), bytes);
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });

  test('variable snapshot validation checks envelopes, ownership, modes, and resolved aliases', () => {
    const { inventory, mappings, libraries } = readRelationAssets();
    const legacy = withoutRelations(mappings);
    assert.ok(libraries.some((library) => library.variables.some((variable) =>
      Object.values(variable.values).some((value) => value.type === 'alias' && value.target === null && value.targetKey))));
    assert.doesNotThrow(() => validateVariableRelations(inventory, legacy, libraries));
    assert.throws(() => validateVariableRelations(inventory, legacy, []));
    assert.throws(() => validateVariableRelations(inventory, legacy, [libraries[0], libraries[0]]));
    const cases = [
      ['schema version', (doc) => { doc.schemaVersion = 2; }],
      ['source', (doc) => { doc.meta.source = 'unknown'; }],
      ['library', (doc) => { doc.meta.library = 'unknown'; }],
      ['file fingerprint', (doc) => { doc.meta.fileKeySha256 = '0'.repeat(64); }],
      ['private file key', (doc) => { doc.meta.fileKey = 'synthetic-key'; }],
      ['private file URL', (doc) => { doc.meta.figmaUrl = 'synthetic-location'; }],
      ['missing modes', (doc) => { doc.meta.collections[0].modes = []; }],
      ['duplicate mode name', (doc) => { doc.meta.collections[0].modes.push({ ...doc.meta.collections[0].modes[0], modeId: 'synthetic-mode' }); }],
      ['duplicate mode ID', (doc) => { doc.meta.collections[0].modes.push({ ...doc.meta.collections[0].modes[0], name: 'synthetic-mode' }); }],
      ['invalid default mode', (doc) => { doc.meta.collections[0].defaultModeId = 'synthetic-mode'; }],
      ['collections array', (doc) => { doc.meta.collections = null; }],
      ['variables array', (doc) => { doc.variables = null; }],
      ['collection count', (doc) => { doc.meta.collectionCount += 1; }],
      ['variable count', (doc) => { doc.meta.variableCount += 1; }],
      ['variables per collection', (doc) => { doc.meta.collections[0].variableCount += 1; }],
      ['description count', (doc) => { doc.meta.descriptionCount += 1; }],
      ['empty key', (doc) => { doc.variables[0].figmaKey = ''; }],
      ['empty path', (doc) => { doc.variables[0].path = ''; }],
      ['duplicate key', (doc) => { doc.variables[1].figmaKey = doc.variables[0].figmaKey; }],
      ['duplicate path', (doc) => { doc.variables[1].path = doc.variables[0].path; }],
      ['missing collection', (doc) => { doc.variables[0].collection = 'missing collection'; }],
      ['undeclared mode', (doc) => { doc.variables[0].values['missing mode'] = { type: 'number', value: 1 }; }],
      ['remote variable', (doc) => { doc.variables[0].remote = true; }],
      ['remote collection', (doc) => { doc.meta.collections[0].remote = true; }],
      ['extended collection', (doc) => { doc.meta.collections[0].isExtension = true; }],
      ['inherited variables', (doc) => { doc.meta.collections[0].inheritedVariableCount = 1; }],
      ['alias library', (doc) => { resolvedAlias(doc).target.library = 'missing'; }],
      ['alias key', (doc) => { resolvedAlias(doc).target.key = 'missing'; }],
      ['alias path', (doc) => { resolvedAlias(doc).target.path = 'missing'; }],
      ['alias token', (doc) => { resolvedAlias(doc).target.token = 'missing'; }],
    ];
    for (const [name, mutate] of cases) {
      const modified = structuredClone(libraries);
      mutate(modified[1]);
      assert.throws(() => validateVariableRelations(inventory, legacy, modified), Error, name);
    }
  });

  test('relation validation rejects malformed, contradictory, and unsupported reviews', () => {
    const { inventory, mappings, libraries } = reviewedAssets();
    assert.doesNotThrow(() => validateVariableRelations(inventory, mappings, libraries));
    const cases = [
      ['unknown status', (relation) => { relation.status = 'unreviewed'; }],
      ['both endpoints null', (relation) => { relation.figma = null; relation.themePath = null; }],
      ['unknown library', (relation) => { relation.figma.library = 'missing'; }],
      ['unknown variable', (relation) => { relation.figma.key = 'missing'; }],
      ['unknown theme token', (relation) => { relation.themePath = 'colors.missing'; }],
      ['empty mode map', (relation) => { relation.modeMap = {}; }],
      ['empty mapped mode list', (relation) => { relation.modeMap['v4 (Dark) Tonic One'] = []; }],
      ['unknown Figma mode', (relation) => { relation.modeMap['missing mode'] = ['dark']; }],
      ['unknown theme mode', (relation) => { relation.modeMap['v4 (Dark) Tonic One'] = ['missing']; }],
      ['missing evidence', (relation) => { delete relation.evidence; }],
      ['empty reason', (relation) => { relation.evidence.reason = ''; }],
      ['invalid review date', (relation) => { relation.evidence.reviewedAt = '2026-02-30'; }],
      ['bad source row', (relation) => { relation.evidence.sourceRows[0].row = '999999'; }],
      ['bad source Figma name', (relation) => { relation.evidence.sourceRows[0].figma = '$color.missing'; }],
      ['bad source content', (relation) => { relation.evidence.sourceRows[0].contentId = '999999'; }],
      ['bad source version', (relation) => { relation.evidence.sourceRows[0].version += 1; }],
      ['missing endpoint digest', (relation) => { delete relation.evidence.snapshots.figma; }],
      ['duplicate pair', (relation, ledger) => { ledger.push(structuredClone(relation)); }],
      ['positive and negative for one endpoint', (relation, ledger) => {
        ledger.push(absenceRelation('figma-only', structuredClone(relation.figma), null, inventory, libraries));
      }],
      ['positive and negative for one theme token', (relation, ledger) => {
        ledger.push(absenceRelation('theme-only', null, relation.themePath, inventory, libraries));
      }],
      ['negative with a mode map', (relation, ledger) => {
        const negative = absenceRelation('figma-only', structuredClone(relation.figma), null, inventory, libraries);
        negative.modeMap = {};
        ledger.splice(0, ledger.length, negative);
      }],
    ];
    for (const [name, mutate] of cases) {
      const modified = structuredClone(mappings);
      const relation = modified.variableRelations.find((entry) => entry.themePath === 'colors.text.primary');
      mutate(relation, modified.variableRelations);
      assert.throws(() => validateVariableRelations(inventory, modified, libraries), Error, name);
    }
  });

  test('positive review freshness depends on its endpoints, not unrelated changes or capture metadata', () => {
    const { inventory, mappings, libraries } = reviewedAssets();
    const relation = mappings.variableRelations.find((entry) => entry.themePath === 'colors.text.primary');
    const originalDigests = relationSnapshotDigests(relation, inventory, libraries);
    assert.deepEqual(originalDigests, relation.evidence.snapshots);

    const unrelatedInventory = structuredClone(inventory);
    unrelatedInventory.tokens.find((token) => token.path === 'colors.text.secondary').values.dark = 'different';
    const unrelatedLibraries = structuredClone(libraries);
    unrelatedLibraries[1].meta.exportedAt = '2030-01-01T00:00:00.000Z';
    unrelatedLibraries[1].meta.capturedAt = '2030-01-01T00:00:00.000Z';
    unrelatedLibraries[1].variables.find((variable) => variable.path === 'Color/text/secondary').description = 'Changed elsewhere';
    unrelatedLibraries[1].meta.descriptionCount += 1;
    assert.deepEqual(relationSnapshotDigests(relation, unrelatedInventory, unrelatedLibraries), originalDigests);
    assert.doesNotThrow(() => validateVariableRelations(unrelatedInventory, mappings, unrelatedLibraries));

    const changedLibraries = structuredClone(libraries);
    changedLibraries[1].variables.find((variable) => variable.path === 'Color/text/primary').description = 'Changed endpoint';
    const before = JSON.stringify({ inventory, mappings, changedLibraries });
    const result = lookupTokens({ variable: 'semantic:Color/text/primary' }, inventory, mappings, changedLibraries).results[0];
    assert.equal(result.correspondence.status, 'stale');
    assert.equal(result.correspondence.relations[0].freshness, 'stale');
    assert.deepEqual(result.themeTokens, []);
    assert.throws(() => validateVariableRelations(inventory, mappings, changedLibraries), /stale/i);
    assert.equal(JSON.stringify({ inventory, mappings, changedLibraries }), before);
  });

  test('stale and current reviews remain visible but only current links are returned', () => {
    const { inventory, mappings, libraries } = reviewedAssets();
    libraries[1].variables.find((variable) => variable.path === 'Color/text/accent').description = 'Changed endpoint';
    const accent = lookupTokens({ token: 'colors.text.accent' }, inventory, mappings, libraries).results[0];
    assert.equal(accent.correspondence.status, 'stale');
    assert.deepEqual(accent.correspondence.relations.map((entry) => entry.freshness).sort(), ['current', 'stale']);
    assert.deepEqual(accent.figmaVariables.map((variable) => variable.path), ['Color/icon/accent']);
    assert.throws(() => validateVariableRelations(inventory, mappings, libraries), /stale/i);
  });

  test('a removed mode or endpoint leaves a review stale instead of fabricating absence', () => {
    const { inventory, mappings, libraries } = reviewedAssets();
    delete libraries[1].variables.find((variable) => variable.path === 'Color/text/primary')
      .values['v4 (Dark) Tonic One'];
    const withoutMode = lookupTokens({ variable: 'semantic:Color/text/primary' }, inventory, mappings, libraries).results[0];
    assert.equal(withoutMode.correspondence.status, 'stale');
    assert.deepEqual(withoutMode.themeTokens, []);
    assert.throws(() => validateVariableRelations(inventory, mappings, libraries), /stale.*variable mode v4 \(Dark\) Tonic One is missing/i);

    const completeLibraries = readRelationAssets().libraries;
    const relation = mappings.variableRelations.find((entry) => entry.themePath === 'colors.text.primary');
    const missingTheme = structuredClone(inventory);
    missingTheme.tokens = missingTheme.tokens.filter((token) => token.path !== 'colors.text.primary');
    assert.equal(relationSnapshotDigests(relation, missingTheme, completeLibraries).theme, null);
    const withoutEndpoint = lookupTokens({ variable: 'semantic:Color/text/primary' }, missingTheme, mappings, completeLibraries).results[0];
    assert.equal(withoutEndpoint.correspondence.status, 'stale');
    assert.deepEqual(withoutEndpoint.themeTokens, []);
    assert.throws(() => validateVariableRelations(missingTheme, mappings, completeLibraries), /stale.*theme endpoint is missing/i);
  });

  test('reviewed absence requires whole-snapshot evidence and becomes stale when scope grows', () => {
    const { inventory, mappings, libraries } = readRelationAssets();
    const variable = libraries[1].variables.find((entry) => entry.path === 'Color/text/secondary');
    const figmaOnly = absenceRelation('figma-only', { library: 'semantic', key: variable.figmaKey }, null, inventory, libraries);
    const themeOnly = absenceRelation('theme-only', null, 'colors.text.secondary', inventory, libraries);
    const reviewed = { ...mappings, variableRelationsCoverage: 'partial', variableRelations: [figmaOnly, themeOnly] };
    assert.doesNotThrow(() => validateVariableRelations(inventory, reviewed, libraries));
    const figmaReview = lookupTokens({ variable: `semantic:${variable.figmaKey}` }, inventory, reviewed, libraries).results[0];
    assert.equal(figmaReview.correspondence.status, 'figma-only');
    assert.deepEqual(figmaReview.themeTokens, []);
    const themeReview = lookupTokens({ token: 'colors.text.secondary' }, inventory, reviewed, libraries).results[0];
    assert.equal(themeReview.correspondence.status, 'theme-only');
    assert.deepEqual(themeReview.figmaVariables, []);

    const incomplete = structuredClone(reviewed);
    delete incomplete.variableRelations[0].evidence.snapshots.foundations;
    assert.throws(() => validateVariableRelations(inventory, incomplete, libraries));

    const expandedLibraries = structuredClone(libraries);
    const semantic = expandedLibraries[1];
    const addedVariable = structuredClone(semantic.variables[0]);
    addedVariable.figmaId = 'VariableID:999999:999999';
    addedVariable.figmaKey = 'new-variable-for-review';
    addedVariable.token = 'new-variable-for-review';
    addedVariable.path = `${addedVariable.collection}/${addedVariable.token}`;
    semantic.variables.push(addedVariable);
    semantic.meta.variableCount += 1;
    semantic.meta.collections.find((collection) => collection.name === addedVariable.collection).variableCount += 1;
    assert.doesNotThrow(() => validateVariableRelations(inventory, withoutRelations(mappings), expandedLibraries));
    const staleVariable = lookupTokens({ variable: `semantic:${variable.figmaKey}` }, inventory, reviewed, expandedLibraries).results[0];
    assert.equal(staleVariable.correspondence.status, 'stale');
    assert.deepEqual(staleVariable.themeTokens, []);
    assert.throws(() => validateVariableRelations(inventory, reviewed, expandedLibraries), /stale.*semantic snapshot digest changed/i);

    const expandedInventory = structuredClone(inventory);
    const addedToken = structuredClone(expandedInventory.tokens.find((token) => token.path === 'colors.text.primary'));
    addedToken.path = 'colors.newVariableReview';
    addedToken.token = 'newVariableReview';
    addedToken.cssVariable = '--tonic-colors-newVariableReview';
    expandedInventory.tokens.push(addedToken);
    expandedInventory.meta.counts.total += 1;
    const staleToken = lookupTokens({ token: 'colors.text.secondary' }, expandedInventory, reviewed, libraries).results[0];
    assert.equal(staleToken.correspondence.status, 'stale');
    assert.deepEqual(staleToken.figmaVariables, []);
    assert.throws(() => validateVariableRelations(expandedInventory, reviewed, libraries), /stale.*theme snapshot digest changed/i);
  });

  test('standalone plugin validation allows repository references that are not dependencies', () => {
    const directory = mkdtempSync(join(tmpdir(), 'tonic-isolation-'));
    try {
      const plugin = join(directory, 'plugin');
      cpSync(join(repoRoot, 'plugins/tonic-ui-tokens'), plugin, { recursive: true });
      appendFileSync(join(plugin, 'skills/tonic-ui-tokens/SKILL.md'),
        '\nLibrary releases belong to the repository-side tonic-ui-version skill, not this plugin.\n');
      const result = validatePluginIsolation(plugin);
      assert.equal(result.token.path, 'colors._component.keyboardFocused.outerFocusRing');
      assert.equal(result.typography.status, 'composed');
      assert.equal(result.typography.resolvedProperties.fontSize.path, 'fontSizes.sm');
      assert.equal(result.variable.source, 'figma-variable');
      assert.equal(result.variable.variable.path, 'Color/text/primary');
      assert.equal(result.variable.variable.library, 'semantic');
      assert.equal(result.variable.correspondence.status, 'unreviewed');
      assert.deepEqual(result.variable.themeTokens, []);
      assert.equal(result.accent.path, 'colors.text.accent');
      assert.equal(result.accent.correspondence.status, 'unreviewed');
      assert.deepEqual(result.accent.figmaVariables, []);
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });

  test('standalone validation detects unexpected variable and reverse correspondence', () => {
    const directory = mkdtempSync(join(tmpdir(), 'tonic-isolation-relations-'));
    try {
      const plugin = join(directory, 'plugin');
      cpSync(join(repoRoot, 'plugins/tonic-ui-tokens'), plugin, { recursive: true });
      const file = join(plugin, 'skills/tonic-ui-tokens/assets/figma-mappings.json');
      const { inventory, mappings, libraries } = readRelationAssets();
      mappings.variableRelationsCoverage = 'partial';
      mappings.variableRelations = [syntheticRelation(inventory, mappings, libraries, 'colors.text.primary')];
      writeFileSync(file, JSON.stringify(mappings));
      assert.throws(() => validatePluginIsolation(plugin), /Standalone variable lookup.*text primary/i);

      mappings.variableRelations = [syntheticRelation(inventory, mappings, libraries, 'colors.text.accent', 'Color/icon/accent')];
      writeFileSync(file, JSON.stringify(mappings));
      assert.throws(() => validatePluginIsolation(plugin), /Standalone token lookup.*accent/i);
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });

  test('standalone validation does not inherit credentials and blocks network APIs', () => {
    const directory = mkdtempSync(join(tmpdir(), 'tonic-isolation-offline-'));
    const oldValue = process.env.TONIC_PLUGIN_ISOLATION_TEST_SECRET;
    try {
      const plugin = join(directory, 'plugin');
      cpSync(join(repoRoot, 'plugins/tonic-ui-tokens'), plugin, { recursive: true });
      process.env.TONIC_PLUGIN_ISOLATION_TEST_SECRET = 'synthetic-test-value';
      appendFileSync(join(plugin, 'skills/tonic-ui-tokens/scripts/lookup-tokens.mjs'),
        '\nif (process.env.TONIC_PLUGIN_ISOLATION_TEST_SECRET) {\n  throw new Error("inherited credential");\n}\nawait fetch();\n');
      assert.throws(() => validatePluginIsolation(plugin), /Network access is disabled during standalone validation/i);
    } finally {
      if (oldValue === undefined) {
        delete process.env.TONIC_PLUGIN_ISOLATION_TEST_SECRET;
      } else {
        process.env.TONIC_PLUGIN_ISOLATION_TEST_SECRET = oldValue;
      }
      rmSync(directory, { recursive: true, force: true });
    }
  });

  test('standalone plugin validation rejects an executable dependency outside its package', () => {
    const directory = mkdtempSync(join(tmpdir(), 'tonic-isolation-'));
    try {
      const plugin = join(directory, 'plugin');
      cpSync(join(repoRoot, 'plugins/tonic-ui-tokens'), plugin, { recursive: true });
      appendFileSync(join(plugin, 'skills/tonic-ui-tokens/scripts/lookup-tokens.mjs'),
        '\nimport "../../../../internal/tonic-ui-version/scripts/repo-root.mjs";\n');
      assert.throws(() => validatePluginIsolation(plugin), /Standalone token lookup failed.*Cannot find module/s);
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });
});
