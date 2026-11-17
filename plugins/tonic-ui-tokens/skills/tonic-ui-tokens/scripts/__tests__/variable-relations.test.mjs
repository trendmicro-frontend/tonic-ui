import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test, { describe } from 'node:test';
import { createTokenMatcher } from '../token-matcher.mjs';
import { relationSnapshotDigests, validateVariableRelations } from '../variable-relations.mjs';

const inventory = {
  schemaVersion: 1,
  meta: { themeVersion: 'test-theme', sourceRevision: 'test-revision', units: { rem: 16 } },
  tokens: [
    {
      path: 'colors.text.primary',
      token: 'text.primary',
      scale: 'colors',
      kind: 'semantic',
      visibility: 'public',
      raw: '#123456',
      values: { dark: '#123456', light: '#123456' },
      cssVariable: '--tonic-colors-text-primary',
      resolutionStatus: 'verified',
    },
    {
      path: 'colors.risk.high',
      token: 'risk.high',
      scale: 'colors',
      kind: 'semantic',
      visibility: 'public',
      raw: '{missing.risk.high}',
      values: { dark: '{missing.risk.high}', light: '{missing.risk.high}' },
      cssVariable: '--tonic-colors-risk-high',
      resolutionStatus: 'unresolved-source',
    },
    {
      path: 'fontSizes.sm',
      token: 'sm',
      scale: 'fontSizes',
      kind: 'primitive',
      visibility: 'public',
      raw: '14px',
      values: { dark: '14px', light: '14px' },
      cssVariable: '--tonic-fontSizes-sm',
      resolutionStatus: 'verified',
    },
    {
      path: 'fontWeights.normal',
      token: 'normal',
      scale: 'fontWeights',
      kind: 'primitive',
      visibility: 'public',
      raw: '400',
      values: { dark: '400', light: '400' },
      cssVariable: '--tonic-fontWeights-normal',
      resolutionStatus: 'verified',
    },
  ],
};


const asset = (path) => JSON.parse(readFileSync(new URL(`../../assets/${path}`, import.meta.url), 'utf8'));
const liveInventory = asset('tokens.json');
const liveRelations = asset('token-relations.json');
const liveLibraries = ['foundations', 'semantic'].map((library) => asset(`figma-variables/${library}.json`));
const matcher = ({ inventory: tokens, relations, libraries }) =>
  createTokenMatcher({ inventory: tokens, relations, figmaVariables: libraries });

function relationFixture() {
  const makeDocument = (library, key, token) => ({
    schemaVersion: 1,
    meta: {
      source: 'figma-variables',
      library,
      fileKey: null,
      figmaUrl: null,
      fileKeySha256: library === 'semantic' ? '35a6cc923472be122f53c9ce9fd5b8b54b3a9e320e0f1e7a56e17e56dcc6b7fa' : 'c78ec8ae359ebdf1cb35a1c24814508f149e53a6c31599d1fd5efd4a02ab8bd1',
      capturedAt: '2026-11-12T08:32:53.010Z',
      exportedAt: '2026-11-12T08:41:02.057Z',
      collectionCount: 1,
      variableCount: 1,
      collections: [{
        name: 'Color',
        modes: [{ modeId: 'dark', name: 'Dark' }, { modeId: 'light', name: 'Light' }],
        defaultModeId: 'dark',
        variableCount: 1,
        remote: false,
        isExtension: false,
        inheritedVariableCount: 0,
      }],
    },
    variables: [{
      figmaKey: key,
      path: `Color/${token}`,
      token,
      collection: 'Color',
      remote: false,
      values: { Dark: { type: 'color', hex: '#123456', alpha: 1 }, Light: { type: 'color', hex: '#abcdef', alpha: 1 } },
      description: `Captured ${token}`,
    }],
  });
  const libraries = [
    makeDocument('foundations', 'foundations-key', 'primitive'),
    makeDocument('semantic', 'semantic-key', 'primary'),
  ];
  const relations = { schemaVersion: 1, variableRelationsCoverage: 'partial', variableRelations: [] };
  return { inventory: structuredClone(inventory), relations, libraries };
}

function reviewedRelation(fixture, { status = 'mapped', figma = { library: 'semantic', key: 'semantic-key' }, themePath = 'colors.text.primary' } = {}) {
  const relation = {
    status,
    figma,
    themePath,
    ...(status === 'mapped' ? { modeMap: { Dark: ['dark'], Light: ['light'] } } : {}),
    evidence: { reviewedAt: '2026-11-16', reason: 'Reviewed authored role and source.', sourceRows: [] },
  };
  relation.evidence.snapshots = relationSnapshotDigests(relation, fixture.inventory, fixture.libraries);
  return relation;
}

describe('plugins/tonic-ui-tokens / Partial variable relations', () => {
  test('captured primary is unreviewed by path and stable key', () => {
    assert.deepEqual(liveRelations, { schemaVersion: 1, variableRelationsCoverage: 'partial', variableRelations: [] });
    const instance = matcher({ inventory: liveInventory, relations: liveRelations, libraries: liveLibraries });
    const byPath = instance.matchFigmaVariables('semantic:Color/text/primary');
    const [record] = byPath.results;
    assert.deepEqual(instance.matchFigmaVariables(record.variable.figmaKey).results, byPath.results);
    assert.equal(record.source, 'figma-variable');
    assert.equal(record.variable.library, 'semantic');
    assert.equal(record.variable.path, 'Color/text/primary');
    assert.equal(record.correspondence.status, 'unreviewed');
    assert.deepEqual(record.correspondence.relations, []);
    assert.deepEqual(record.themeTokens, []);
    assert.equal(byPath.meta.variableRelationCoverage, 'partial');
    assert.deepEqual(byPath.meta.variableSources.map((source) => source.library), ['foundations', 'semantic']);
    assert.ok(byPath.meta.variableSources.every((source) => /^[a-f0-9]{64}$/.test(source.fileKeySha256)));
    assert.ok(byPath.meta.variableSources.every((source) => !Object.hasOwn(source, 'fileKey') && !Object.hasOwn(source, 'figmaUrl')));
    validateVariableRelations(liveInventory, liveRelations, liveLibraries);
  });

  test('implemented accent retains its v3 values without an inferred variable', () => {
    const [accent] = matcher({ inventory: liveInventory, relations: liveRelations, libraries: liveLibraries })
      .matchThemeTokens('colors.text.accent').results;
    assert.equal(accent.path, 'colors.text.accent');
    assert.equal(accent.correspondence.status, 'unreviewed');
    assert.deepEqual(accent.figmaVariables, []);
  });

  test('synthetic mapped review resolves path and keys with scoped modes and separate values', () => {
    const fixture = relationFixture();
    fixture.relations.variableRelations.push(reviewedRelation(fixture));
    const instance = matcher(fixture);
    const byPath = instance.matchFigmaVariables('semantic:Color/primary');
    for (const variable of ['semantic-key', 'semantic:semantic-key']) {
      assert.deepEqual(instance.matchFigmaVariables(variable).results, byPath.results);
    }
    const [record] = byPath.results;
    assert.equal(record.source, 'figma-variable');
    assert.equal(record.variable.library, 'semantic');
    assert.equal(record.correspondence.status, 'mapped');
    assert.equal(record.correspondence.relations[0].freshness, 'current');
    assert.deepEqual(record.correspondence.relations[0].modeMap, { Dark: ['dark'], Light: ['light'] });
    assert.deepEqual(record.themeTokens.map((token) => token.path), ['colors.text.primary']);
    assert.equal(record.variable.values.Light.hex, '#abcdef');
    assert.equal(record.themeTokens[0].values.light, '#123456');
    assert.equal(byPath.meta.variableRelationCoverage, 'partial');
    validateVariableRelations(fixture.inventory, fixture.relations, fixture.libraries);
  });

  test('synthetic reverse mapping returns every current reviewed variable, not unreviewed tokens', () => {
    const fixture = relationFixture();
    fixture.relations.variableRelations.push(reviewedRelation(fixture));
    fixture.relations.variableRelations.push(reviewedRelation(fixture, { figma: { library: 'foundations', key: 'foundations-key' } }));
    const instance = matcher(fixture);
    const [primary] = instance.matchThemeTokens('colors.text.primary').results;
    assert.equal(primary.correspondence.status, 'mapped');
    assert.equal(primary.correspondence.relations.length, 2);
    assert.ok(primary.correspondence.relations.every((relation) => relation.freshness === 'current'));
    assert.deepEqual(primary.figmaVariables.map((variable) => [variable.library, variable.path]), [
      ['foundations', 'Color/primitive'],
      ['semantic', 'Color/primary'],
    ]);
    const [unreviewed] = instance.matchThemeTokens('colors.risk.high').results;
    assert.equal(unreviewed.correspondence.status, 'unreviewed');
    assert.deepEqual(unreviewed.figmaVariables, []);
    validateVariableRelations(fixture.inventory, fixture.relations, fixture.libraries);
  });

  test('one variable can map to several theme paths without resolving an unresolved token', () => {
    const fixture = relationFixture();
    fixture.relations.variableRelations.push(reviewedRelation(fixture));
    fixture.relations.variableRelations.push(reviewedRelation(fixture, { themePath: 'colors.risk.high' }));
    const instance = matcher(fixture);
    const [result] = instance.matchFigmaVariables('semantic:Color/primary').results;
    assert.deepEqual(result.themeTokens.map((token) => token.path), ['colors.risk.high', 'colors.text.primary']);
    assert.equal(result.themeTokens[0].resolutionStatus, 'unresolved-source');
    assert.equal(result.themeTokens[0].values.dark, '{missing.risk.high}');
    const [reverse] = instance.matchThemeTokens('colors.risk.high').results;
    assert.equal(reverse.resolutionStatus, 'unresolved-source');
    assert.equal(reverse.correspondence.status, 'mapped');
    validateVariableRelations(fixture.inventory, fixture.relations, fixture.libraries);
  });

  test('colliding library keys and paths return both identities unless scoped', () => {
    const fixture = relationFixture();
    fixture.libraries[0].variables[0].figmaKey = 'semantic-key';
    fixture.libraries[0].variables[0].path = 'Color/primary';
    fixture.libraries[0].variables[0].token = 'primary';
    const instance = matcher(fixture);
    for (const selector of ['semantic-key', 'Color/primary']) {
      assert.deepEqual(instance.matchFigmaVariables(selector).results.map((result) => result.variable.library), ['foundations', 'semantic']);
    }
    assert.equal(instance.matchFigmaVariables('foundations:semantic-key').results[0].variable.library, 'foundations');
    assert.equal(instance.matchFigmaVariables('semantic:Color/primary').results[0].variable.library, 'semantic');
    assert.deepEqual(instance.matchFigmaVariables('semantic:missing').results, []);
    assert.throws(() => instance.matchFigmaVariables('unknown:Color/primary'), /Unknown Figma variable library/i);
  });

  test('a qualified selector returns both a key and a different matching path', () => {
    const fixture = relationFixture();
    const semantic = fixture.libraries[1];
    const other = structuredClone(semantic.variables[0]);
    other.figmaKey = 'other-key';
    other.path = 'semantic-key';
    semantic.variables.push(other);
    semantic.meta.variableCount++;
    semantic.meta.collections[0].variableCount++;
    const matches = matcher(fixture).matchFigmaVariables('semantic:semantic-key').results;
    assert.deepEqual(matches.map((entry) => entry.variable.figmaKey), ['semantic-key', 'other-key']);
  });

  test('empty ledgers remain unreviewed and reviews require both libraries', () => {
    const instance = createTokenMatcher({ inventory });
    const [token] = instance.matchThemeTokens('colors.text.primary').results;
    assert.deepEqual(token.correspondence, { status: 'unreviewed', coverage: 'partial', relations: [] });
    assert.deepEqual(token.figmaVariables, []);
    assert.deepEqual(instance.matchFigmaVariables('semantic:Color/primary').results, []);
    assert.throws(() => createTokenMatcher({ inventory, relations: { schemaVersion: 1, sources: [], mappings: [] } }), /schema|relation/i);
    const fixture = relationFixture();
    const [variable] = matcher(fixture).matchFigmaVariables('semantic:Color/primary').results;
    assert.equal(variable.correspondence.status, 'unreviewed');
    assert.deepEqual(variable.themeTokens, []);
    fixture.relations.variableRelations.push(reviewedRelation(fixture));
    assert.throws(() => createTokenMatcher({ inventory: fixture.inventory, relations: fixture.relations }), /both foundations and semantic/i);
  });

  test('negative reviews require full-snapshot evidence and become stale when scope grows', () => {
    const fixture = relationFixture();
    fixture.relations.variableRelations.push(reviewedRelation(fixture, { status: 'figma-only', themePath: null }));
    fixture.relations.variableRelations.push(reviewedRelation(fixture, { status: 'theme-only', figma: null, themePath: 'colors.risk.high' }));
    validateVariableRelations(fixture.inventory, fixture.relations, fixture.libraries);
    const current = matcher(fixture);
    assert.equal(current.matchFigmaVariables('semantic:Color/primary').results[0].correspondence.status, 'figma-only');
    assert.equal(current.matchThemeTokens('colors.risk.high').results[0].correspondence.status, 'theme-only');
    const updated = structuredClone(fixture);
    const extra = structuredClone(updated.libraries[0].variables[0]);
    extra.figmaKey = 'added-key';
    extra.path = 'Color/added';
    extra.token = 'added';
    updated.libraries[0].variables.push(extra);
    updated.libraries[0].meta.variableCount++;
    updated.libraries[0].meta.collections[0].variableCount++;
    const [stale] = matcher(updated).matchFigmaVariables('semantic:Color/primary').results;
    assert.equal(stale.correspondence.status, 'stale');
    assert.deepEqual(stale.themeTokens, []);
    assert.throws(() => validateVariableRelations(updated.inventory, updated.relations, updated.libraries), /stale.*foundations/i);
    const semanticUpdate = structuredClone(fixture);
    semanticUpdate.libraries[1].variables[0].description = 'Changed captured scope.';
    assert.equal(matcher(semanticUpdate).matchThemeTokens('colors.risk.high').results[0].correspondence.status, 'stale');
    assert.throws(() => validateVariableRelations(semanticUpdate.inventory, semanticUpdate.relations, semanticUpdate.libraries), /stale.*semantic/i);
    const themeUpdate = structuredClone(fixture);
    const extraToken = { ...themeUpdate.inventory.tokens[0], path: 'colors.text.added', token: 'text.added' };
    themeUpdate.inventory.tokens.push(extraToken);
    assert.equal(matcher(themeUpdate).matchThemeTokens('colors.risk.high').results[0].correspondence.status, 'stale');
  });

  test('positive reviews ignore metadata and unrelated records but stale changed endpoints or modes', () => {
    const fixture = relationFixture();
    fixture.relations.variableRelations.push(reviewedRelation(fixture));
    const unrelated = structuredClone(fixture);
    unrelated.libraries[1].meta.exportedAt = '2026-11-15T10:00:00.000Z';
    unrelated.libraries[1].meta.capturedAt = '2026-11-14T10:00:00.000Z';
    unrelated.libraries[0].variables[0].description = 'An unrelated variable changed.';
    unrelated.inventory.tokens.find((token) => token.path === 'fontSizes.sm').values.dark = '15px';
    assert.equal(matcher(unrelated).matchThemeTokens('colors.text.primary').results[0].correspondence.status, 'mapped');
    const changed = structuredClone(fixture);
    changed.libraries[1].variables[0].description = 'Changed role';
    const before = structuredClone(changed);
    const [record] = matcher(changed).matchThemeTokens('colors.text.primary').results;
    assert.equal(record.correspondence.status, 'stale');
    assert.equal(record.correspondence.relations[0].freshness, 'stale');
    assert.deepEqual(record.figmaVariables, []);
    assert.throws(() => validateVariableRelations(changed.inventory, changed.relations, changed.libraries), /stale.*semantic:semantic-key/i);
    assert.deepEqual(changed, before);
    const renamed = structuredClone(fixture);
    renamed.relations.variableRelations[0].modeMap.Dark = ['missing'];
    assert.equal(matcher(renamed).matchFigmaVariables('semantic:Color/primary').results[0].correspondence.status, 'stale');
    assert.throws(() => validateVariableRelations(renamed.inventory, renamed.relations, renamed.libraries), /theme mode missing/i);
    const variableMode = structuredClone(fixture);
    delete variableMode.libraries[1].variables[0].values.Dark;
    assert.equal(matcher(variableMode).matchFigmaVariables('semantic:Color/primary').results[0].correspondence.status, 'stale');
    assert.throws(() => validateVariableRelations(variableMode.inventory, variableMode.relations, variableMode.libraries), /variable mode Dark is missing/i);
    const themeValue = structuredClone(fixture);
    themeValue.inventory.tokens[0].values.dark = '#fedcba';
    const [staleTheme] = matcher(themeValue).matchThemeTokens('colors.text.primary').results;
    assert.equal(staleTheme.correspondence.status, 'stale');
    assert.deepEqual(staleTheme.figmaVariables, []);
    assert.throws(() => validateVariableRelations(themeValue.inventory, themeValue.relations, themeValue.libraries), /stale.*theme snapshot digest changed/i);
  });

  test('removing a reviewed aliased variable leaves its theme endpoint stale', () => {
    const fixture = relationFixture();
    fixture.libraries[1].variables[0].values.Dark = {
      type: 'alias',
      targetId: 'synthetic-target-id',
      targetKey: 'foundations-key',
      target: { library: 'foundations', key: 'foundations-key', path: 'Color/primitive', token: 'primitive', collection: 'Color', crossFile: true },
    };
    const relation = reviewedRelation(fixture);
    relation.evidence.sourceRows = [{ figma: '$historical.primary', contentId: 10, version: 2, row: 36 }];
    fixture.relations.variableRelations.push(relation);
    validateVariableRelations(fixture.inventory, fixture.relations, fixture.libraries);
    fixture.libraries[1].variables = [];
    fixture.libraries[1].meta.variableCount = 0;
    fixture.libraries[1].meta.collections[0].variableCount = 0;
    assert.equal(relationSnapshotDigests(relation, fixture.inventory, fixture.libraries).figma, null);
    const [token] = matcher(fixture).matchThemeTokens('colors.text.primary').results;
    assert.equal(token.correspondence.status, 'stale');
    assert.ok(token.correspondence.relations[0].staleReasons.includes('variable endpoint is missing'));
    assert.deepEqual(token.figmaVariables, []);
    assert.throws(() => validateVariableRelations(fixture.inventory, fixture.relations, fixture.libraries), /stale.*variable endpoint is missing/i);
  });

  test('stale edges remain visible while other current edges remain usable', () => {
    const fixture = relationFixture();
    fixture.relations.variableRelations.push(reviewedRelation(fixture));
    fixture.relations.variableRelations.push(reviewedRelation(fixture, { figma: { library: 'foundations', key: 'foundations-key' } }));
    fixture.libraries[1].variables[0].description = 'Changed';
    const [result] = matcher(fixture).matchThemeTokens('colors.text.primary').results;
    assert.equal(result.correspondence.status, 'stale');
    assert.deepEqual(result.correspondence.relations.map((review) => review.freshness), ['stale', 'current']);
    assert.deepEqual(result.figmaVariables.map((variable) => variable.library), ['foundations']);
  });

  test('malformed, contradictory, missing and stale evidence is rejected without mutation', () => {
    const base = relationFixture();
    base.relations.variableRelations.push(reviewedRelation(base));
    const cases = [
      [(f) => { delete f.relations.variableRelations[0].evidence; }, /evidence/i],
      [(f) => { f.relations.variableRelations[0].evidence.reviewedAt = '2026-02-30'; }, /date/i],
      [(f) => { delete f.relations.variableRelations[0].evidence.snapshots.figma; }, /digests/i],
      [(f) => { f.relations.variableRelations[0].evidence.sourceRows.push({ figma: '$historical', contentId: '10', version: 2, row: '' }); }, /Historical source row requires figma, contentId, version and row/],
      [(f) => { f.relations.variableRelations[0].figma = null; f.relations.variableRelations[0].themePath = null; }, /endpoints/i],
      [(f) => { f.relations.variableRelations[0].figma.key = 'unknown'; }, /stale.*endpoint/i],
      [(f) => { f.relations.variableRelations[0].themePath = 'colors.unknown'; }, /stale.*endpoint/i],
      [(f) => { f.relations.variableRelations[0].modeMap = {}; }, /modeMap/i],
      [(f) => { f.relations.variableRelations.push(structuredClone(f.relations.variableRelations[0])); }, /duplicate mapped/i],
      [(f) => { f.relations.variableRelations.push(reviewedRelation(f, { status: 'figma-only', themePath: null })); }, /contradictory/i],
      [(f) => { f.relations.variableRelations.push(reviewedRelation(f, { status: 'theme-only', figma: null })); }, /contradictory/i],
    ];
    for (const [mutate, expected] of cases) {
      const fixture = structuredClone(base);
      mutate(fixture);
      const original = structuredClone(fixture);
      assert.throws(() => validateVariableRelations(fixture.inventory, fixture.relations, fixture.libraries), expected);
      assert.deepEqual(fixture, original);
    }
  });

  test('variable documents reject invalid identities, counts, modes and private locations', () => {
    const cases = [
      [(f) => { f.libraries[0].meta.fileKeySha256 = '0'.repeat(64); }, /identity/i],
      [(f) => { f.libraries[0].meta.fileKey = 'synthetic-private-key'; }, /identity/i],
      [(f) => { f.libraries[0].meta.figmaUrl = 'synthetic-private-location'; }, /identity/i],
      [(f) => { delete f.libraries[0].meta.fileKey; }, /identity/i],
      [(f) => { delete f.libraries[0].meta.figmaUrl; }, /identity/i],
      [(f) => { f.libraries[0].schemaVersion = 2; }, /envelope/i],
      [(f) => { f.libraries[0].meta.variableCount++; }, /counts/i],
      [(f) => { f.libraries[0].meta.collectionCount++; }, /counts/i],
      [(f) => { f.libraries[0].meta.collections[0].variableCount++; }, /variable count/i],
      [(f) => { f.libraries[0].meta.collections[0].modes = []; }, /collection/i],
      [(f) => { f.libraries[0].meta.collections[0].modes.push({ modeId: 'other', name: 'Dark' }); }, /duplicate mode/i],
      [(f) => { f.libraries[0].meta.collections[0].modes.push({ modeId: 'dark', name: 'Other' }); }, /duplicate mode/i],
      [(f) => { f.libraries[0].meta.collections[0].defaultModeId = 'missing'; }, /default mode/i],
      [(f) => { f.libraries[0].meta.collections[0].modes.splice(1, 1); }, /mode/i],
      [(f) => { f.libraries[0].variables[0].values.Other = { type: 'number', value: 1 }; }, /invalid mode/i],
      [(f) => { f.libraries[0].meta.collections[0].remote = true; }, /remote/i],
    ];
    for (const [mutate, expected] of cases) {
      const fixture = relationFixture();
      mutate(fixture);
      const original = structuredClone(fixture);
      assert.throws(() => validateVariableRelations(fixture.inventory, fixture.relations, fixture.libraries), (error) => {
        assert.match(error.message, expected);
        assert.doesNotMatch(error.message, /synthetic-private-(?:key|location)/);
        return true;
      });
      assert.deepEqual(fixture, original);
    }
  });

  test('resolved aliases must identify the actual captured target and library', () => {
    const fixture = relationFixture();
    const values = fixture.libraries[1].variables[0].values;
    values.Dark = {
      type: 'alias',
      targetId: 'synthetic-target-id',
      targetKey: 'foundations-key',
      target: { library: 'foundations', key: 'foundations-key', path: 'Color/primitive', token: 'primitive', collection: 'Color', crossFile: true },
    };
    validateVariableRelations(fixture.inventory, fixture.relations, fixture.libraries);
    for (const change of [
      (target) => { target.path = 'Color/missing'; },
      (target) => { target.key = 'missing'; },
      (target) => { target.token = 'missing'; },
      (target) => { target.collection = 'missing'; },
      (target) => { target.crossFile = false; },
    ]) {
      const changed = structuredClone(fixture);
      change(changed.libraries[1].variables[0].values.Dark.target);
      assert.throws(() => validateVariableRelations(changed.inventory, changed.relations, changed.libraries), /invalid resolved alias target/i);
    }
  });
});
