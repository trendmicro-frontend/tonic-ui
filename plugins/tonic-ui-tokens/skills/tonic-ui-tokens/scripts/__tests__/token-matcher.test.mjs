import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test, { describe } from 'node:test';
import { createTokenMatcher } from '../token-matcher.mjs';
import { relationSnapshotDigests } from '../variable-relations.mjs';

const emptyRelations = () => ({ schemaVersion: 1, variableRelationsCoverage: 'partial', variableRelations: [] });

function token(path, name, extra = {}) {
  return {
    path,
    token: name,
    scale: path.split('.')[0].split('[')[0],
    kind: 'semantic',
    visibility: 'public',
    raw: `raw:${path}`,
    values: { dark: `dark:${path}`, light: `light:${path}` },
    cssVariable: `--fixture-${name}`,
    resolutionStatus: 'verified',
    ...extra,
  };
}

function variable(figmaKey, path) {
  return {
    figmaKey, path, token: path.split('/').at(-1), collection: path.split('/')[0],
    values: { Dark: { type: 'color', hex: '#123456' }, Light: { type: 'color', hex: '#abcdef' } },
  };
}

function document(library, variables) {
  return {
    schemaVersion: 1,
    meta: {
      library, fileKey: null, figmaUrl: null,
      fileKeySha256: library === 'semantic'
        ? '35a6cc923472be122f53c9ce9fd5b8b54b3a9e320e0f1e7a56e17e56dcc6b7fa'
        : 'c78ec8ae359ebdf1cb35a1c24814508f149e53a6c31599d1fd5efd4a02ab8bd1',
      capturedAt: '2026-11-01T00:00:00Z', exportedAt: '2026-11-02T00:00:00Z',
      captureMethod: 'figma-plugin', pluginVersion: '1.1.0', collectionCount: 1,
      variableCount: variables.length, collections: [],
    },
    variables,
  };
}

function fixture() {
  const inventory = {
    schemaVersion: 1,
    meta: { themeVersion: 'test-theme', sourceRevision: 'test-revision', units: { rem: 16 } },
    tokens: [
      token('colors.text.primary', 'text.primary', {
        raw: '#123456', values: { dark: '#123456', light: '#abcdef' }, cssVariable: '--tonic-colors-text-primary',
      }),
      token('colors.text.pri', 'text.pri'),
      token('colors.text.broken', 'text.broken', {
        raw: '{missing.value}', values: { dark: '{missing.value}', light: '{missing.value}' }, resolutionStatus: 'unresolved-source',
      }),
      token('colors.text.nested.disabled', 'text.nested.disabled'),
      token('colors.disabled', 'disabled'),
      token('colors.text.disabled', 'text.disabled'),
      token('colors._component.keyboardFocused.outerFocusRing', '_component.keyboardFocused.outerFocusRing', {
        visibility: 'private', cssVariable: '--tonic-colors-_component-keyboardFocused-outerFocusRing',
      }),
      token('colors.blue:60', 'blue:60', { kind: 'legacy' }),
      token('borders["0.5"]', '0.5', {
        kind: 'primitive', raw: '0.5px solid', values: { dark: '0.5px solid', light: '0.5px solid' },
        cssVariable: '--tonic-borders-0-5',
        unitValues: { px: { dark: '0.5px solid', light: '0.5px solid' }, rem: { dark: '0.03125rem solid', light: '0.03125rem solid' } },
      }),
      token('borders.1', '1', { kind: 'primitive' }),
      token('breakpoints.0', '0', { kind: 'primitive' }),
      token('colors.text["a+b?(x)"]', 'text.a+b?(x)'),
      token('colors.text["*"]', 'text.*'),
      token('colors.text["*suffix"]', 'text.*suffix'),
      token('colors.text["a\\\"b"]', 'text.a"b'),
      token('colors.text["it\'s"]', "text.it's"),
      token(`colors.text[${JSON.stringify('back\\slash')}]`, 'text.back\\slash'),
      token(`colors.text[${JSON.stringify('line\nbreak')}]`, 'text.line\nbreak'),
      token('colors.text.\uE000', 'text.\uE000'),
      token('colors.text.\u{10000}', 'text.\u{10000}'),
      token('shadows["*"]', '*'),
    ],
  };
  const figmaVariables = [
    document('foundations', [
      variable('shared-key', 'Color/text/primary'),
      variable('foundation-simple', 'Color/simple'),
    ]),
    document('semantic', [
      variable('semantic-stale', 'Color/text/stale'),
      variable('semantic-secondary', 'Color/text/secondary'),
      variable('shared-key', 'Color/text/primary'),
      variable('semantic-nested', 'Color/text/nested/item'),
      variable('semantic-colon', 'Color/text/name:with:colon'),
      variable('semantic-plain', 'Color/plain'),
      variable('semantic-other', 'Other/misc'),
    ]),
  ];
  const relations = emptyRelations();
  const review = (status, figma, themePath) => {
    const relation = {
      status, figma, themePath,
      ...(status === 'mapped' ? { modeMap: { Dark: ['dark'], Light: ['light'] } } : {}),
      evidence: {
        reviewedAt: '2026-11-16', reason: 'Reviewed source role.',
        sourceRows: [{ figma: '$color.historical', contentId: 'old-page', version: 2, row: 7 }],
      },
    };
    relation.evidence.snapshots = relationSnapshotDigests(relation, inventory, figmaVariables);
    return relation;
  };
  const stale = review('mapped', { library: 'semantic', key: 'semantic-stale' }, 'colors.text.primary');
  stale.evidence.snapshots.figma = '0'.repeat(64);
  relations.variableRelations.push(
    review('mapped', { library: 'semantic', key: 'shared-key' }, 'colors.text.primary'),
    review('mapped', { library: 'semantic', key: 'shared-key' }, 'colors.text.nested.disabled'),
    review('mapped', { library: 'foundations', key: 'shared-key' }, 'colors.text.primary'),
    stale,
    review('figma-only', { library: 'semantic', key: 'semantic-secondary' }, null),
    review('theme-only', null, 'borders["0.5"]'),
  );
  return { inventory, figmaVariables, relations };
}

const paths = (result) => result.results.map((record) => record.path);
const variables = (result) => result.results.map(({ variable: entry }) => `${entry.library}:${entry.path}:${entry.figmaKey}`);

function deepFreeze(value) {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.values(value).forEach(deepFreeze);
    Object.freeze(value);
  }
  return value;
}

describe('Tonic UI token matcher', () => {
  test('shipped UI v3 assets remain unreviewed and expose only fingerprint metadata', () => {
    const asset = (path) => JSON.parse(readFileSync(new URL(`../../assets/${path}`, import.meta.url), 'utf8'));
    const inventory = asset('tokens.json');
    const relations = asset('token-relations.json');
    const figmaVariables = ['foundations', 'semantic'].map((library) => asset(`figma-variables/${library}.json`));
    assert.deepEqual(relations.variableRelations, []);
    const matcher = createTokenMatcher({ inventory, relations, figmaVariables });
    const primaryResult = matcher.matchThemeTokens('colors.text.primary');
    const [primary] = primaryResult.results;
    assert.equal(primaryResult.meta.themeVersion, '3.0.0-alpha.1');
    assert.deepEqual(primary.values, {
      dark: 'color-mix(in srgb, #ffffff 80%, transparent)',
      light: 'color-mix(in srgb, #000000 80%, transparent)',
    });
    assert.equal(primary.cssVariable, '--tonic-colors-text-primary');
    assert.equal(primary.correspondence.status, 'unreviewed');
    assert.deepEqual(primary.figmaVariables, []);
    const [accent] = matcher.matchThemeTokens('colors.text.accent').results;
    assert.equal(accent.values.dark, 'color-mix(in srgb, #ffffff 96%, transparent)');
    assert.equal(accent.correspondence.status, 'unreviewed');
    assert.deepEqual(accent.figmaVariables, []);
    const [decimal] = matcher.matchThemeTokens('0.5').results;
    assert.equal(decimal.path, 'borders["0.5"]');
    assert.equal(decimal.unitValues.rem.dark, '0.0313rem solid');
    const variableResult = matcher.matchFigmaVariables('semantic:Color/text/primary');
    const [variable] = variableResult.results;
    assert.equal(variable.variable.library, 'semantic');
    assert.equal(variable.variable.path, 'Color/text/primary');
    assert.equal(variable.correspondence.status, 'unreviewed');
    assert.deepEqual(variable.themeTokens, []);
    assert.deepEqual(matcher.matchFigmaVariables(`semantic:${variable.variable.figmaKey}`).results, variableResult.results);
    assert(primaryResult.meta.variableSources.every((source) => /^[a-f0-9]{64}$/.test(source.fileKeySha256)));
    assert(primaryResult.meta.variableSources.every((source) => !Object.hasOwn(source, 'fileKey') && !Object.hasOwn(source, 'figmaUrl')));
    assert.deepEqual(variableResult.meta.variableSources, primaryResult.meta.variableSources);
  });

  test('metadata never exposes library locations or raw file keys supplied in memory', () => {
    const data = fixture();
    for (const document of data.figmaVariables) {
      document.meta.fileKey = 'private-file-key-fixture';
      document.meta.figmaUrl = 'https://example.invalid/private-file-fixture';
    }
    const matcher = createTokenMatcher(data);
    for (const result of [matcher.matchThemeTokens('text.primary'), matcher.matchFigmaVariables('semantic:shared-key')]) {
      assert(!JSON.stringify(result.meta).includes('private-file-key-fixture'));
      assert(!JSON.stringify(result.meta).includes('private-file-fixture'));
      assert(result.meta.variableSources.every((source) => !Object.hasOwn(source, 'fileKey') && !Object.hasOwn(source, 'figmaUrl')));
    }
  });

  test('exact, short, private, legacy and decimal theme selectors preserve inventory records', () => {
    const data = fixture();
    const matcher = createTokenMatcher(data);
    const primary = matcher.matchThemeTokens('colors.text.primary');
    assert.deepEqual(primary.results, matcher.matchThemeTokens('text.primary').results);
    assert.equal(primary.meta.themeVersion, 'test-theme');
    assert.equal(primary.meta.sourceRevision, 'test-revision');
    assert.deepEqual(primary.meta.units, { rem: 16 });
    assert.equal(primary.meta.variableRelationCoverage, 'partial');
    assert.equal(Object.hasOwn(primary.meta, 'designSources'), false);
    assert.deepEqual(primary.meta.variableSources, data.figmaVariables.map(({ meta }) => ({
      library: meta.library, fileKeySha256: meta.fileKeySha256, capturedAt: meta.capturedAt,
      exportedAt: meta.exportedAt, captureMethod: meta.captureMethod, pluginVersion: meta.pluginVersion,
      variableCount: meta.variableCount, collectionCount: meta.collectionCount,
    })));
    assert(primary.meta.variableSources.every((source) => /^[a-f0-9]{64}$/.test(source.fileKeySha256)));
    assert(primary.meta.variableSources.every((source) => !Object.hasOwn(source, 'fileKey') && !Object.hasOwn(source, 'figmaUrl')));
    const [record] = primary.results;
    assert.equal(record.path, 'colors.text.primary');
    assert.deepEqual(record.values, { dark: '#123456', light: '#abcdef' });
    assert.equal(record.raw, '#123456');
    assert.equal(record.cssVariable, '--tonic-colors-text-primary');
    assert.equal(record.resolutionStatus, 'verified');
    for (const retired of ['status', 'mappings', 'designSource', 'resolvedProperties']) {
      assert.equal(Object.hasOwn(record, retired), false);
    }
    const [privateToken] = matcher.matchThemeTokens('_component.keyboardFocused.outerFocusRing').results;
    assert.equal(privateToken.path, 'colors._component.keyboardFocused.outerFocusRing');
    assert.equal(privateToken.visibility, 'private');
    assert.equal(privateToken.cssVariable, '--tonic-colors-_component-keyboardFocused-outerFocusRing');
    const [legacy] = matcher.matchThemeTokens('blue:60').results;
    assert.equal(legacy.path, 'colors.blue:60');
    assert.equal(legacy.kind, 'legacy');
    const [unresolved] = matcher.matchThemeTokens('text.broken').results;
    assert.equal(unresolved.resolutionStatus, 'unresolved-source');
    assert.equal(unresolved.values.dark, '{missing.value}');
    assert.equal(Object.hasOwn(unresolved, 'status'), false);
    const [decimal] = matcher.matchThemeTokens('borders["0.5"]').results;
    assert.deepEqual(matcher.matchThemeTokens('0.5').results, [decimal]);
    assert.deepEqual(matcher.matchThemeTokens("borders['0.5']").results, [decimal]);
    assert.deepEqual(decimal.unitValues.rem, { dark: '0.03125rem solid', light: '0.03125rem solid' });
    assert.equal(decimal.values.dark, '0.5px solid');
    assert.deepEqual(paths(matcher.matchThemeTokens('breakpoints[0]')), ['breakpoints.0']);
  });

  test('exact full paths take priority over all matching short names', () => {
    const { inventory } = fixture();
    inventory.tokens.push(token('other.text.primary', 'text.primary'));
    inventory.tokens.push(token('other.path', 'colors.text.primary'));
    const matcher = createTokenMatcher({ inventory });
    assert.deepEqual(paths(matcher.matchThemeTokens('colors.text.primary')), ['colors.text.primary']);
    assert.deepEqual(paths(matcher.matchThemeTokens('text.primary')), ['colors.text.primary', 'other.text.primary']);
  });

  test('wildcards match complete segments, globstars, short paths and stable code-point order', () => {
    const matcher = createTokenMatcher(fixture());
    assert.deepEqual(paths(matcher.matchThemeTokens('borders.*')), ['borders.1', 'borders["0.5"]']);
    const direct = paths(matcher.matchThemeTokens('colors.text.*'));
    assert(direct.includes('colors.text.primary'));
    assert(direct.includes('colors.text["*"]'));
    assert(direct.includes('colors.text["*suffix"]'));
    assert(!direct.includes('colors.text.nested.disabled'));
    assert.deepEqual(paths(matcher.matchThemeTokens('text.*')), direct);
    assert(paths(matcher.matchThemeTokens('colors.text.**')).includes('colors.text.nested.disabled'));
    assert.deepEqual(paths(matcher.matchThemeTokens('colors.**.disabled')), [
      'colors.disabled', 'colors.text.disabled', 'colors.text.nested.disabled',
    ]);
    assert.deepEqual(paths(matcher.matchThemeTokens('colors.**.**.disabled')), [
      'colors.disabled', 'colors.text.disabled', 'colors.text.nested.disabled',
    ]);
    assert.deepEqual(paths(matcher.matchThemeTokens('colors.text.pri*')), ['colors.text.pri', 'colors.text.primary']);
    assert.deepEqual(paths(matcher.matchThemeTokens('colors.text.*suffix')), ['colors.text["*suffix"]']);
    assert(paths(matcher.matchThemeTokens('*')).includes('borders.1'));
    assert(paths(matcher.matchThemeTokens('*')).includes('shadows["*"]'));
    const all = paths(matcher.matchThemeTokens('**'));
    assert.equal(all.length, fixture().inventory.tokens.length);
    assert.equal(new Set(all).size, all.length);
    assert(all.indexOf('colors.text.\uE000') < all.indexOf('colors.text.\u{10000}'));
  });

  test('punctuation and quoted stars are literal; quoted keys decode without splitting', () => {
    const matcher = createTokenMatcher(fixture());
    assert.deepEqual(paths(matcher.matchThemeTokens('colors.text.a+b?(x)')), ['colors.text["a+b?(x)"]']);
    assert.deepEqual(paths(matcher.matchThemeTokens('colors.text.a+b*')), ['colors.text["a+b?(x)"]']);
    assert.deepEqual(paths(matcher.matchThemeTokens('colors.text["*"]')), ['colors.text["*"]']);
    assert.deepEqual(paths(matcher.matchThemeTokens('colors.text["*"].**')), ['colors.text["*"]']);
    assert.deepEqual(paths(matcher.matchThemeTokens('colors.text[\'a"b\']')), ['colors.text["a\\\"b"]']);
    assert.deepEqual(paths(matcher.matchThemeTokens("colors.text['it\\'s']")), ['colors.text["it\'s"]']);
    assert.deepEqual(paths(matcher.matchThemeTokens("colors.text['back\\\\slash']")), [`colors.text[${JSON.stringify('back\\slash')}]`]);
    assert.deepEqual(paths(matcher.matchThemeTokens('colors.text["line\\nbreak"]')), [`colors.text[${JSON.stringify('line\nbreak')}]`]);
    assert.deepEqual(paths(matcher.matchThemeTokens('colors.text.primary|disabled')), []);
  });

  test('unquoted stars stay wildcards even when they occur in an inventory path', () => {
    const { inventory } = fixture();
    inventory.tokens.push(token('radii.*', '*'), token('radii.other', 'other'));
    const matcher = createTokenMatcher({ inventory });
    assert.deepEqual(paths(matcher.matchThemeTokens('radii["*"]')), ['radii.*']);
    assert.deepEqual(paths(matcher.matchThemeTokens('radii.*')), ['radii.*', 'radii.other']);
  });

  test('Figma exact paths and keys search every library without ambiguity', () => {
    const matcher = createTokenMatcher(fixture());
    const scoped = matcher.matchFigmaVariables('semantic:Color/text/primary');
    assert.deepEqual(scoped.results, matcher.matchFigmaVariables('semantic:shared-key').results);
    assert.deepEqual(variables(matcher.matchFigmaVariables('Color/text/primary')), [
      'foundations:Color/text/primary:shared-key', 'semantic:Color/text/primary:shared-key',
    ]);
    assert.deepEqual(variables(matcher.matchFigmaVariables('shared-key')), [
      'foundations:Color/text/primary:shared-key', 'semantic:Color/text/primary:shared-key',
    ]);
    assert.equal(scoped.results[0].source, 'figma-variable');
    assert.equal(scoped.results[0].variable.values.Dark.hex, '#123456');
    assert.deepEqual(variables(matcher.matchFigmaVariables('Color/text/name:with:colon')), [
      'semantic:Color/text/name:with:colon:semantic-colon',
    ]);
  });

  test('Figma wildcard scope is path-only, case-sensitive and segment-aware', () => {
    const matcher = createTokenMatcher(fixture());
    assert.deepEqual(variables(matcher.matchFigmaVariables('Color/*')), [
      'foundations:Color/simple:foundation-simple', 'semantic:Color/plain:semantic-plain',
    ]);
    assert.deepEqual(variables(matcher.matchFigmaVariables('semantic:Color/text/*')), [
      'semantic:Color/text/name:with:colon:semantic-colon',
      'semantic:Color/text/primary:shared-key',
      'semantic:Color/text/secondary:semantic-secondary',
      'semantic:Color/text/stale:semantic-stale',
    ]);
    assert.deepEqual(variables(matcher.matchFigmaVariables('Color/**')), [
      'foundations:Color/simple:foundation-simple',
      'foundations:Color/text/primary:shared-key',
      'semantic:Color/plain:semantic-plain',
      'semantic:Color/text/name:with:colon:semantic-colon',
      'semantic:Color/text/nested/item:semantic-nested',
      'semantic:Color/text/primary:shared-key',
      'semantic:Color/text/secondary:semantic-secondary',
      'semantic:Color/text/stale:semantic-stale',
    ]);
    assert.deepEqual(variables(matcher.matchFigmaVariables('shared*')), []);
    assert.deepEqual(variables(matcher.matchFigmaVariables('color/text/*')), []);
    assert.notEqual(matcher.matchFigmaVariables('Color/text/*').results.length, 0);
  });

  test('stale reviews remain visible while only current mapped edges become counterparts', () => {
    const data = fixture();
    const matcher = createTokenMatcher(data);
    const [primary] = matcher.matchThemeTokens('colors.text.primary').results;
    assert.equal(primary.correspondence.status, 'stale');
    assert.equal(primary.correspondence.coverage, 'partial');
    assert.deepEqual(primary.correspondence.relations.map(({ freshness }) => freshness), ['current', 'current', 'stale']);
    assert(primary.correspondence.relations[2].staleReasons.some((reason) => reason.includes('figma snapshot digest')));
    assert.deepEqual(primary.figmaVariables.map(({ library, path }) => `${library}:${path}`), [
      'foundations:Color/text/primary', 'semantic:Color/text/primary',
    ]);
    const [mapped] = matcher.matchFigmaVariables('semantic:shared-key').results;
    assert.equal(mapped.correspondence.status, 'mapped');
    assert.deepEqual(mapped.correspondence.relations[0].modeMap, { Dark: ['dark'], Light: ['light'] });
    assert.deepEqual(mapped.correspondence.relations[0].evidence, data.relations.variableRelations[0].evidence);
    assert.deepEqual(mapped.themeTokens.map(({ path }) => path), ['colors.text.nested.disabled', 'colors.text.primary']);
    const [stale] = matcher.matchFigmaVariables('semantic:semantic-stale').results;
    assert.equal(stale.correspondence.status, 'stale');
    assert.deepEqual(stale.themeTokens, []);
    assert.equal(matcher.matchFigmaVariables('semantic:semantic-secondary').results[0].correspondence.status, 'figma-only');
    assert.equal(matcher.matchThemeTokens('0.5').results[0].correspondence.status, 'theme-only');
    assert.equal(matcher.matchThemeTokens('colors.disabled').results[0].correspondence.status, 'unreviewed');
    assert.deepEqual(matcher.matchFigmaVariables('semantic:semantic-plain').results[0].themeTokens, []);
  });

  test('unknown selectors and unloaded supported libraries produce empty envelopes', () => {
    const data = fixture();
    const matcher = createTokenMatcher(data);
    for (const result of [
      matcher.matchThemeTokens('missing.token'), matcher.matchThemeTokens('missing.**'),
      matcher.matchThemeTokens(' colors.text.primary'), matcher.matchFigmaVariables('missing'),
      matcher.matchFigmaVariables('semantic:Color/missing/**'), matcher.matchFigmaVariables(' Color/text/primary'),
    ]) {
      assert.deepEqual(result.results, []);
      assert.equal(result.meta.themeVersion, 'test-theme');
    }
    const oneLibrary = createTokenMatcher({ inventory: data.inventory, figmaVariables: [data.figmaVariables[0]] });
    assert.deepEqual(oneLibrary.matchFigmaVariables('semantic:Color/text/primary').results, []);
    assert.deepEqual(oneLibrary.matchFigmaVariables('semantic:Color/**').results, []);
    const noLibraries = createTokenMatcher({ inventory: data.inventory });
    assert.equal(noLibraries.matchThemeTokens('colors.text.primary').results[0].correspondence.status, 'unreviewed');
    assert.deepEqual(noLibraries.matchFigmaVariables('Color/**').results, []);
    assert.deepEqual(noLibraries.matchFigmaVariables('Color/**').meta.variableSources, []);
    assert.throws(() => createTokenMatcher({ ...data, figmaVariables: [data.figmaVariables[0]] }), /both foundations and semantic/i);
  });

  test('invalid selectors and syntax produce intentional errors', () => {
    const matcher = createTokenMatcher(fixture());
    for (const selector of [null, undefined, 0, {}, [], '', ' \t\n']) {
      assert.throws(() => matcher.matchThemeTokens(selector), /Selector must be a nonempty string\./);
      assert.throws(() => matcher.matchFigmaVariables(selector), /Selector must be a nonempty string\./);
    }
    for (const selector of ['colors..text', 'colors.***', 'colors[', 'colors["unclosed]', 'colors[nope]',
      'colors["bad\\q"]', "colors['bad\\n']", 'colors.', 'colors]text', 'colors.[primary]']) {
      assert.throws(() => matcher.matchThemeTokens(selector), /Invalid selector pattern\./, selector);
    }
    for (const selector of ['semantic:', 'semantic:/Color', 'Color//text', 'Color/***', '/Color', 'Color/']) {
      assert.throws(() => matcher.matchFigmaVariables(selector), /Invalid selector pattern\./, selector);
    }
    assert.throws(() => matcher.matchFigmaVariables('other:Color/text/primary'), /Unknown Figma variable library: other\./);
  });

  test('factory rejects malformed schemas, duplicate identities and malformed historical citations', () => {
    const data = fixture();
    for (const options of [undefined, null, [], 0, 'inventory', {}, { inventory: null },
      { inventory: { ...data.inventory, schemaVersion: 2 } }, { inventory: { ...data.inventory, tokens: {} } },
      { inventory: { ...data.inventory, meta: [] } }, { inventory: data.inventory, figmaVariables: null }]) {
      assert.throws(() => createTokenMatcher(options), /Invalid token matcher data\./);
    }
    for (const relations of [null, undefined, {}, { schemaVersion: 1, mappings: [], sources: [] },
      { schemaVersion: 1, variableRelations: [] }, { ...emptyRelations(), mappings: [] }]) {
      assert.throws(() => createTokenMatcher({ ...data, relations }));
    }
    const duplicatePath = structuredClone(data);
    duplicatePath.inventory.tokens.push(structuredClone(duplicatePath.inventory.tokens[0]));
    assert.throws(() => createTokenMatcher(duplicatePath), /duplicate theme token path/i);
    const duplicateLibrary = structuredClone(data);
    duplicateLibrary.figmaVariables.push(structuredClone(duplicateLibrary.figmaVariables[0]));
    assert.throws(() => createTokenMatcher(duplicateLibrary), /duplicate variable library/i);
    const duplicateKey = structuredClone(data);
    duplicateKey.figmaVariables[0].variables[1].figmaKey = duplicateKey.figmaVariables[0].variables[0].figmaKey;
    assert.throws(() => createTokenMatcher(duplicateKey), /duplicate .* variable key or path/i);
    const duplicateVariablePath = structuredClone(data);
    duplicateVariablePath.figmaVariables[0].variables[1].path = duplicateVariablePath.figmaVariables[0].variables[0].path;
    assert.throws(() => createTokenMatcher(duplicateVariablePath), /duplicate .* variable key or path/i);
    for (const badRow of [null, {}, { figma: '', contentId: 'old', version: 1, row: 1 },
      { figma: '$color.x', contentId: 0, version: 1, row: 1 },
      { figma: '$color.x', contentId: 'old', version: '1', row: 1 },
      { figma: '$color.x', contentId: 'old', version: 1, row: 0 }]) {
      const malformed = structuredClone(data);
      malformed.relations.variableRelations[0].evidence.sourceRows = [badRow];
      assert.throws(() => createTokenMatcher(malformed), /Historical source row requires figma, contentId, version and row\./);
    }
  });

  test('historical citation changes do not change endpoint digests, and inputs remain untouched', () => {
    const data = fixture();
    const beforeDigest = relationSnapshotDigests(data.relations.variableRelations[0], data.inventory, data.figmaVariables);
    data.relations.variableRelations[0].evidence.sourceRows = [{ figma: '$another.row', contentId: 123, version: 99, row: 'different' }];
    assert.deepEqual(relationSnapshotDigests(data.relations.variableRelations[0], data.inventory, data.figmaVariables), beforeDigest);
    const before = structuredClone(data);
    deepFreeze(data);
    const matcher = createTokenMatcher(data);
    assert.equal(matcher.matchFigmaVariables('semantic:shared-key').results[0].correspondence.status, 'mapped');
    assert(matcher.matchThemeTokens('colors.text.**').results.length > 1);
    assert(matcher.matchFigmaVariables('Color/**').results.length > 1);
    assert.deepEqual(data, before);
  });
});
