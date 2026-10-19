import assert from 'node:assert/strict';
import test from 'node:test';
import { lookupTokens } from '../../../skills/external/tonic-ui-tokens/scripts/lookup-tokens.mjs';

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

test('exact Figma rows bind provenance to both content ID and version', () => {
  const mappingData = {
    schemaVersion: 1,
    sources: [
      { contentId: '10', version: 1, title: 'Color definitions v1', applicability: 'confirmed: linked migration guide' },
      { contentId: '10', version: 2, title: 'Color definitions v2', applicability: 'unverified for this release' },
      { contentId: '20', version: 7, title: 'Typography definitions', applicability: 'unverified for Tonic UI; upstream design provenance' },
    ],
    mappings: [
      {
        figma: '$color.duplicate.name', path: 'colors.text.primary', status: 'verified',
        source: { contentId: '10', version: 1, row: '35' }, role: 'first duplicate row', notes: [],
      },
      {
        figma: '$color.duplicate.name', path: 'colors.text.primary', status: 'verified',
        source: { contentId: '10', version: 2, row: '99' }, role: 'second duplicate row', notes: [],
      },
      {
        figma: '$color.duplicate.name', path: null, status: 'design-only',
        source: { contentId: 20, version: '7', row: '4' }, role: 'design-only row for a future component', notes: [],
      },
    ],
  };
  const snapshot = structuredClone(mappingData);
  const { results } = lookupTokens({ figma: '$color.duplicate.name' }, inventory, mappingData);
  assert.equal(results.length, 3);

  const byVersion = new Map(results.map((record) => [record.designSource.version, record]));
  assert.deepEqual(byVersion.get(1).designSource, {
    contentId: '10', version: 1, title: 'Color definitions v1', applicability: 'confirmed: linked migration guide',
  });
  assert.deepEqual(byVersion.get(2).designSource, {
    contentId: '10', version: 2, title: 'Color definitions v2', applicability: 'unverified for this release',
  });
  assert.deepEqual(byVersion.get(7).designSource, {
    contentId: '20', version: 7, title: 'Typography definitions', applicability: 'unverified for Tonic UI; upstream design provenance',
  });
  assert.equal(byVersion.get(7).status, 'design-only');
  assert.equal(byVersion.get(7).path, null);
  assert.equal(byVersion.get(7).cssVariable, undefined);

  const queried = lookupTokens({ query: 'design-only row' }, inventory, mappingData).results;
  assert.equal(queried.length, 1);
  assert.equal(queried[0].status, 'design-only');
  assert.deepEqual(queried[0].designSource, byVersion.get(7).designSource);

  assert.deepEqual(mappingData, snapshot);
});

test('composed typography keeps unverified applicability on exact and query routes', () => {
  const mappingData = {
    schemaVersion: 1,
    sources: [
      { contentId: '20', version: 6, title: 'Typography definitions v6', applicability: 'unverified for Tonic UI; superseded snapshot' },
      { contentId: '20', version: 7, title: 'Typography definitions v7', applicability: 'unverified for Tonic UI; rows are retained as upstream design provenance' },
    ],
    mappings: [{
      figma: '$typography.body.md', path: null, status: 'composed',
      source: { contentId: '20', version: 7, row: '10' },
      role: 'Body text: default style',
      notes: [],
      properties: { fontSize: 'fontSizes.sm', fontWeight: 'fontWeights.normal' },
    }],
  };

  const [composed] = lookupTokens({ figma: '$typography.body.md' }, inventory, mappingData).results;
  assert.equal(composed.status, 'composed');
  assert.equal(composed.path, null);
  assert.equal(composed.resolvedProperties.fontSize.path, 'fontSizes.sm');
  assert.equal(composed.resolvedProperties.fontWeight.path, 'fontWeights.normal');
  assert.equal(composed.designSource.version, 7);
  assert.equal(composed.designSource.title, 'Typography definitions v7');
  assert.match(composed.designSource.applicability, /^unverified/);

  const queried = lookupTokens({ query: '$typography.body' }, inventory, mappingData).results;
  assert.equal(queried.length, 1);
  assert.equal(queried[0].status, 'composed');
  assert.deepEqual(queried[0].designSource, composed.designSource);
});

test('matching provenance cannot promote an unresolved source to verified', () => {
  const mappingData = {
    schemaVersion: 1,
    sources: [{ contentId: '10', version: 2, title: 'Color definitions v2', applicability: 'unverified for this release' }],
    mappings: [{
      figma: '$color.risk.high', path: 'colors.risk.high', status: 'verified',
      source: { contentId: '10', version: 2, row: '99' }, role: 'risk color', notes: [],
    }],
  };

  const [record] = lookupTokens({ figma: '$color.risk.high' }, inventory, mappingData).results;
  assert.equal(record.status, 'unresolved-source');
  assert.notEqual(record.status, 'verified');
  assert.equal(record.designSource.version, 2);
  assert.equal(record.values.dark, '{missing.risk.high}');
});

test('absent or undeclared sources do not fabricate provenance or applicability', () => {
  const mappingData = {
    schemaVersion: 1,
    sources: [{ contentId: '10', version: 1, title: 'Color definitions v1' }],
    mappings: [
      {
        figma: '$color.declared', path: 'colors.text.primary', status: 'verified',
        source: { contentId: '10', version: 1, row: '35' }, role: 'declared source without applicability', notes: [],
      },
      {
        figma: '$color.wrong-version', path: 'colors.text.primary', status: 'verified',
        source: { contentId: '10', version: 2, row: '99' }, role: 'undeclared version', notes: [],
      },
      {
        figma: '$color.wrong-id', path: 'colors.text.primary', status: 'verified',
        source: { contentId: '999', version: 1, row: '1' }, role: 'undeclared content ID', notes: [],
      },
    ],
  };

  const [declared] = lookupTokens({ figma: '$color.declared' }, inventory, mappingData).results;
  assert.deepEqual(declared.designSource, { contentId: '10', version: 1, title: 'Color definitions v1' });
  assert.equal(Object.hasOwn(declared.designSource, 'applicability'), false);

  for (const figma of ['$color.wrong-version', '$color.wrong-id']) {
    const [record] = lookupTokens({ figma }, inventory, mappingData).results;
    assert.equal(record.designSource, undefined);
    assert.equal(JSON.parse(JSON.stringify(record)).designSource, undefined);
  }
});
