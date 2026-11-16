import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test, { describe } from 'node:test';
import { lookupTokens } from '../lookup-tokens.mjs';
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
const liveMappings = asset('figma-mappings.json');
const liveLibraries = ['foundations', 'semantic'].map((library) => asset(`figma-variables/${library}.json`));

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
  const mappingData = {
    schemaVersion: 1,
    sources: [{ contentId: '10', version: 2, title: 'Color definitions' }],
    mappings: [{
      figma: '$color.text.primary', path: 'colors.text.primary', status: 'verified',
      source: { contentId: '10', version: 2, row: '36' }, role: 'paragraph text', notes: [],
    }],
    variableRelationsCoverage: 'partial',
    variableRelations: [],
  };
  return { inventory: structuredClone(inventory), mappingData, libraries };
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
    const byPath = lookupTokens({ variable: 'semantic:Color/text/primary' }, liveInventory, liveMappings, liveLibraries);
    const [record] = byPath.results;
    const byKey = lookupTokens({ variable: record.variable.figmaKey }, liveInventory, liveMappings, liveLibraries);
    assert.deepEqual(byKey.results, byPath.results);
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
    validateVariableRelations(liveInventory, liveMappings, liveLibraries);
  });

  test('implemented accent retains its v3 values without an inferred variable', () => {
    const [accent] = lookupTokens({ token: 'colors.text.accent' }, liveInventory, liveMappings, liveLibraries).results;
    assert.equal(accent.path, 'colors.text.accent');
    assert.equal(accent.correspondence.status, 'unreviewed');
    assert.deepEqual(accent.figmaVariables, []);
  });

  test('synthetic mapped review resolves path and keys with scoped modes and separate values', () => {
    const fixture = relationFixture();
    fixture.mappingData.variableRelations.push(reviewedRelation(fixture));
    const byPath = lookupTokens({ variable: 'semantic:Color/primary' }, fixture.inventory, fixture.mappingData, fixture.libraries);
    for (const variable of ['semantic-key', 'semantic:semantic-key']) {
      assert.deepEqual(
        lookupTokens({ variable }, fixture.inventory, fixture.mappingData, fixture.libraries).results,
        byPath.results,
      );
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
    validateVariableRelations(fixture.inventory, fixture.mappingData, fixture.libraries);
  });

  test('synthetic reverse mapping returns every current reviewed variable, not unreviewed tokens', () => {
    const fixture = relationFixture();
    fixture.mappingData.variableRelations.push(reviewedRelation(fixture));
    fixture.mappingData.variableRelations.push(reviewedRelation(fixture, { figma: { library: 'foundations', key: 'foundations-key' } }));
    const [primary] = lookupTokens({ token: 'colors.text.primary' }, fixture.inventory, fixture.mappingData, fixture.libraries).results;
    assert.equal(primary.correspondence.status, 'mapped');
    assert.equal(primary.correspondence.relations.length, 2);
    assert.ok(primary.correspondence.relations.every((relation) => relation.freshness === 'current'));
    assert.deepEqual(primary.figmaVariables.map((variable) => variable.path).sort(), ['Color/primary', 'Color/primitive']);
    const [unreviewed] = lookupTokens({ token: 'colors.risk.high' }, fixture.inventory, fixture.mappingData, fixture.libraries).results;
    assert.equal(unreviewed.correspondence.status, 'unreviewed');
    assert.deepEqual(unreviewed.figmaVariables, []);
    validateVariableRelations(fixture.inventory, fixture.mappingData, fixture.libraries);
  });

  test('one variable can map to several theme paths without resolving an unresolved token', () => {
    const fixture = relationFixture();
    fixture.mappingData.variableRelations.push(reviewedRelation(fixture));
    fixture.mappingData.variableRelations.push(reviewedRelation(fixture, { themePath: 'colors.risk.high' }));
    const [result] = lookupTokens({ variable: 'semantic:Color/primary' }, fixture.inventory, fixture.mappingData, fixture.libraries).results;
    assert.deepEqual(result.themeTokens.map((token) => token.path), ['colors.text.primary', 'colors.risk.high']);
    assert.equal(result.themeTokens[1].resolutionStatus, 'unresolved-source');
    assert.equal(result.themeTokens[1].values.dark, '{missing.risk.high}');
    const [reverse] = lookupTokens({ token: 'colors.risk.high' }, fixture.inventory, fixture.mappingData, fixture.libraries).results;
    assert.equal(reverse.status, 'unresolved-source');
    assert.equal(reverse.correspondence.status, 'mapped');
    validateVariableRelations(fixture.inventory, fixture.mappingData, fixture.libraries);
  });

  test('colliding library keys and paths require qualification and unknown selectors fail', () => {
    const fixture = relationFixture();
    fixture.libraries[0].variables[0].figmaKey = 'semantic-key';
    fixture.libraries[0].variables[0].path = 'Color/primary';
    fixture.libraries[0].variables[0].token = 'primary';
    assert.throws(() => lookupTokens({ variable: 'semantic-key' }, fixture.inventory, fixture.mappingData, fixture.libraries), /ambiguous/i);
    assert.throws(() => lookupTokens({ variable: 'Color/primary' }, fixture.inventory, fixture.mappingData, fixture.libraries), /qualify/i);
    assert.equal(lookupTokens({ variable: 'foundations:semantic-key' }, fixture.inventory, fixture.mappingData, fixture.libraries).results[0].variable.library, 'foundations');
    assert.equal(lookupTokens({ variable: 'semantic:Color/primary' }, fixture.inventory, fixture.mappingData, fixture.libraries).results[0].variable.library, 'semantic');
    assert.throws(() => lookupTokens({ variable: 'semantic:missing' }, fixture.inventory, fixture.mappingData, fixture.libraries), /unknown variable/i);
    assert.throws(() => lookupTokens({ token: 'colors.text.primary', variable: 'semantic-key' }, fixture.inventory, fixture.mappingData, fixture.libraries), /exactly one/i);
  });

  test('a qualified selector cannot choose between a key and another variable path', () => {
    const fixture = relationFixture();
    const semantic = fixture.libraries[1];
    const other = structuredClone(semantic.variables[0]);
    other.figmaKey = 'other-key';
    other.path = 'semantic-key';
    semantic.variables.push(other);
    semantic.meta.variableCount++;
    semantic.meta.collections[0].variableCount++;
    assert.throws(() => lookupTokens({ variable: 'semantic:semantic-key' }, fixture.inventory, fixture.mappingData, fixture.libraries), /ambiguous/i);
  });

  test('old fixtures and unreviewed variables never turn code-only into reviewed absence', () => {
    const old = { schemaVersion: 1, sources: [], mappings: [] };
    const [token] = lookupTokens({ token: 'colors.text.primary' }, inventory, old).results;
    assert.equal(token.status, 'code-only');
    assert.deepEqual(token.correspondence, { status: 'unreviewed', coverage: 'partial', relations: [] });
    assert.deepEqual(token.figmaVariables, []);
    const fixture = relationFixture();
    const [variable] = lookupTokens({ variable: 'semantic:Color/primary' }, fixture.inventory, fixture.mappingData, fixture.libraries).results;
    assert.equal(variable.correspondence.status, 'unreviewed');
    assert.deepEqual(variable.themeTokens, []);
    assert.throws(() => lookupTokens({ token: 'colors.text.primary' }, fixture.inventory, fixture.mappingData), /both foundations and semantic/i);
  });

  test('negative reviews require full-snapshot evidence and become stale when scope grows', () => {
    const fixture = relationFixture();
    fixture.mappingData.variableRelations.push(reviewedRelation(fixture, { status: 'figma-only', themePath: null }));
    fixture.mappingData.variableRelations.push(reviewedRelation(fixture, { status: 'theme-only', figma: null, themePath: 'colors.risk.high' }));
    validateVariableRelations(fixture.inventory, fixture.mappingData, fixture.libraries);
    assert.equal(lookupTokens({ variable: 'semantic:Color/primary' }, fixture.inventory, fixture.mappingData, fixture.libraries).results[0].correspondence.status, 'figma-only');
    assert.equal(lookupTokens({ token: 'colors.risk.high' }, fixture.inventory, fixture.mappingData, fixture.libraries).results[0].correspondence.status, 'theme-only');
    const updated = structuredClone(fixture);
    const extra = structuredClone(updated.libraries[0].variables[0]);
    extra.figmaKey = 'added-key';
    extra.path = 'Color/added';
    extra.token = 'added';
    updated.libraries[0].variables.push(extra);
    updated.libraries[0].meta.variableCount++;
    updated.libraries[0].meta.collections[0].variableCount++;
    const [stale] = lookupTokens({ variable: 'semantic:Color/primary' }, updated.inventory, updated.mappingData, updated.libraries).results;
    assert.equal(stale.correspondence.status, 'stale');
    assert.deepEqual(stale.themeTokens, []);
    assert.throws(() => validateVariableRelations(updated.inventory, updated.mappingData, updated.libraries), /stale.*foundations/i);
    const semanticUpdate = structuredClone(fixture);
    semanticUpdate.libraries[1].variables[0].description = 'Changed captured scope.';
    assert.equal(lookupTokens({ token: 'colors.risk.high' }, semanticUpdate.inventory, semanticUpdate.mappingData, semanticUpdate.libraries).results[0].correspondence.status, 'stale');
    assert.throws(() => validateVariableRelations(semanticUpdate.inventory, semanticUpdate.mappingData, semanticUpdate.libraries), /stale.*semantic/i);
    const themeUpdate = structuredClone(fixture);
    const extraToken = { ...themeUpdate.inventory.tokens[0], path: 'colors.text.added', token: 'text.added' };
    themeUpdate.inventory.tokens.push(extraToken);
    assert.equal(lookupTokens({ token: 'colors.risk.high' }, themeUpdate.inventory, themeUpdate.mappingData, themeUpdate.libraries).results[0].correspondence.status, 'stale');
  });

  test('positive reviews ignore metadata and unrelated records but stale changed endpoints or modes', () => {
    const fixture = relationFixture();
    fixture.mappingData.variableRelations.push(reviewedRelation(fixture));
    const unrelated = structuredClone(fixture);
    unrelated.libraries[1].meta.exportedAt = '2026-11-15T10:00:00.000Z';
    unrelated.libraries[0].variables[0].description = 'An unrelated variable changed.';
    unrelated.inventory.tokens.find((token) => token.path === 'fontSizes.sm').values.dark = '15px';
    assert.equal(lookupTokens({ token: 'colors.text.primary' }, unrelated.inventory, unrelated.mappingData, unrelated.libraries).results[0].correspondence.status, 'mapped');
    const changed = structuredClone(fixture);
    changed.libraries[1].variables[0].description = 'Changed role';
    const before = structuredClone(changed);
    const [record] = lookupTokens({ token: 'colors.text.primary' }, changed.inventory, changed.mappingData, changed.libraries).results;
    assert.equal(record.correspondence.status, 'stale');
    assert.equal(record.correspondence.relations[0].freshness, 'stale');
    assert.deepEqual(record.figmaVariables, []);
    assert.throws(() => validateVariableRelations(changed.inventory, changed.mappingData, changed.libraries), /stale.*semantic:semantic-key/i);
    assert.deepEqual(changed, before);
    const renamed = structuredClone(fixture);
    renamed.mappingData.variableRelations[0].modeMap.Dark = ['missing'];
    assert.equal(lookupTokens({ variable: 'semantic:Color/primary' }, renamed.inventory, renamed.mappingData, renamed.libraries).results[0].correspondence.status, 'stale');
    assert.throws(() => validateVariableRelations(renamed.inventory, renamed.mappingData, renamed.libraries), /theme mode missing/i);
    const variableMode = structuredClone(fixture);
    delete variableMode.libraries[1].variables[0].values.Dark;
    assert.equal(lookupTokens({ variable: 'semantic:Color/primary' }, variableMode.inventory, variableMode.mappingData, variableMode.libraries).results[0].correspondence.status, 'stale');
    assert.throws(() => validateVariableRelations(variableMode.inventory, variableMode.mappingData, variableMode.libraries), /variable mode Dark is missing/i);
    const themeValue = structuredClone(fixture);
    themeValue.inventory.tokens[0].values.dark = '#fedcba';
    const [staleTheme] = lookupTokens({ token: 'colors.text.primary' }, themeValue.inventory, themeValue.mappingData, themeValue.libraries).results;
    assert.equal(staleTheme.correspondence.status, 'stale');
    assert.deepEqual(staleTheme.figmaVariables, []);
    assert.throws(() => validateVariableRelations(themeValue.inventory, themeValue.mappingData, themeValue.libraries), /stale.*theme snapshot digest changed/i);
  });

  test('stale edges remain visible while other current edges remain usable', () => {
    const fixture = relationFixture();
    fixture.mappingData.variableRelations.push(reviewedRelation(fixture));
    fixture.mappingData.variableRelations.push(reviewedRelation(fixture, { figma: { library: 'foundations', key: 'foundations-key' } }));
    fixture.libraries[1].variables[0].description = 'Changed';
    const [result] = lookupTokens({ token: 'colors.text.primary' }, fixture.inventory, fixture.mappingData, fixture.libraries).results;
    assert.equal(result.correspondence.status, 'stale');
    assert.deepEqual(result.correspondence.relations.map((review) => review.freshness), ['stale', 'current']);
    assert.deepEqual(result.figmaVariables.map((variable) => variable.library), ['foundations']);
  });

  test('malformed, contradictory, missing and stale evidence is rejected without mutation', () => {
    const base = relationFixture();
    base.mappingData.variableRelations.push(reviewedRelation(base));
    const cases = [
      [(f) => { delete f.mappingData.variableRelations[0].evidence; }, /evidence/i],
      [(f) => { f.mappingData.variableRelations[0].evidence.reviewedAt = '2026-02-30'; }, /date/i],
      [(f) => { delete f.mappingData.variableRelations[0].evidence.snapshots.figma; }, /digests/i],
      [(f) => { f.mappingData.variableRelations[0].evidence.sourceRows.push({ figma: '$color.text.primary', contentId: '10', version: 2, row: '99' }); }, /source row/i],
      [(f) => { f.mappingData.variableRelations[0].figma = null; f.mappingData.variableRelations[0].themePath = null; }, /endpoints/i],
      [(f) => { f.mappingData.variableRelations[0].figma.key = 'unknown'; }, /stale.*endpoint/i],
      [(f) => { f.mappingData.variableRelations[0].themePath = 'colors.unknown'; }, /stale.*endpoint/i],
      [(f) => { f.mappingData.variableRelations[0].modeMap = {}; }, /modeMap/i],
      [(f) => { f.mappingData.variableRelations.push(structuredClone(f.mappingData.variableRelations[0])); }, /duplicate mapped/i],
      [(f) => { f.mappingData.variableRelations.push(reviewedRelation(f, { status: 'figma-only', themePath: null })); }, /contradictory/i],
      [(f) => { f.mappingData.variableRelations.push(reviewedRelation(f, { status: 'theme-only', figma: null })); }, /contradictory/i],
    ];
    for (const [mutate, expected] of cases) {
      const fixture = structuredClone(base);
      mutate(fixture);
      const original = structuredClone(fixture);
      assert.throws(() => validateVariableRelations(fixture.inventory, fixture.mappingData, fixture.libraries), expected);
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
      assert.throws(() => validateVariableRelations(fixture.inventory, fixture.mappingData, fixture.libraries), (error) => {
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
    validateVariableRelations(fixture.inventory, fixture.mappingData, fixture.libraries);
    for (const change of [
      (target) => { target.path = 'Color/missing'; },
      (target) => { target.key = 'missing'; },
      (target) => { target.token = 'missing'; },
      (target) => { target.collection = 'missing'; },
      (target) => { target.crossFile = false; },
    ]) {
      const changed = structuredClone(fixture);
      change(changed.libraries[1].variables[0].values.Dark.target);
      assert.throws(() => validateVariableRelations(changed.inventory, changed.mappingData, changed.libraries), /invalid resolved alias target/i);
    }
  });

  test('composed properties expose independent correspondence while design-only rows stay design-only', () => {
    const mappingData = {
      schemaVersion: 1,
      sources: [{ contentId: '20', version: 7, title: 'Typography' }],
      mappings: [
        { figma: '$typography.body', path: null, status: 'composed', source: { contentId: '20', version: 7, row: '10' }, properties: { fontSize: 'fontSizes.sm' } },
        { figma: '$color.future', path: null, status: 'design-only', source: { contentId: '20', version: 7, row: '11' } },
      ],
    };
    const [composed] = lookupTokens({ figma: '$typography.body' }, inventory, mappingData).results;
    assert.equal(composed.resolvedProperties.fontSize.correspondence.status, 'unreviewed');
    assert.deepEqual(composed.resolvedProperties.fontSize.figmaVariables, []);
    assert.equal(composed.designSource.version, 7);
    const [designOnly] = lookupTokens({ figma: '$color.future' }, inventory, mappingData).results;
    assert.equal(designOnly.status, 'design-only');
    assert.equal(designOnly.path, null);
    assert.equal(designOnly.correspondence, undefined);
  });
});
