import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cpSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import test, { describe } from 'node:test';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createTokenMatcher } from '../../skills/tonic-ui-tokens/scripts/token-matcher.mjs';
import { relationSnapshotDigests } from '../../skills/tonic-ui-tokens/scripts/variable-relations.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../../..');
const lookup = join(repoRoot, 'plugins/tonic-ui-tokens/skills/tonic-ui-tokens/scripts/lookup-tokens.mjs');
const generator = join(repoRoot, 'plugins/tonic-ui-tokens/scripts/generate-token-inventory.mjs');
const assets = join(repoRoot, 'plugins/tonic-ui-tokens/skills/tonic-ui-tokens/assets');
const readAsset = (path) => JSON.parse(readFileSync(join(assets, path), 'utf8'));
const relationAssets = () => ({
  inventory: readAsset('tokens.json'),
  relations: readAsset('token-relations.json'),
  libraries: ['foundations', 'semantic'].map((library) => readAsset(`figma-variables/${library}.json`)),
});
const matcher = ({ inventory, relations, libraries }) =>
  createTokenMatcher({ inventory, relations, figmaVariables: libraries });
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
    const records = result(['--theme-token', '_component.keyboardFocused.outerFocusRing']);
    assert.equal(records.length, 1);
    assert.equal(records[0].path, 'colors._component.keyboardFocused.outerFocusRing');
    assert.equal(records[0].visibility, 'private');
    assert.equal(records[0].cssVariable, '--tonic-colors-_component-keyboardFocused-outerFocusRing');
  });

  test('variable selector exposes unreviewed captured modes and redacted source metadata', () => {
    const { relations, libraries } = relationAssets();
    assert.deepEqual(relations, { schemaVersion: 1, variableRelationsCoverage: 'partial', variableRelations: [] });
    const output = response(['--figma-variable', 'semantic:Color/text/primary']);
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
    assert.deepEqual(result(['--figma-variable', captured.figmaKey]), [primary]);
    assert.equal(output.meta.variableRelationCoverage, 'partial');
    assert.equal(Object.hasOwn(output.meta, 'designSources'), false);
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

  test('unreviewed variables and tokens do not manufacture absence or matches', () => {
    const [secondary] = result(['--figma-variable', 'semantic:Color/text/secondary']);
    assert.equal(secondary.variable.codeSyntax.WEB, 'text.secondary');
    assert.equal(secondary.correspondence.status, 'unreviewed');
    assert.deepEqual(secondary.correspondence.relations, []);
    assert.deepEqual(secondary.themeTokens, []);
    for (const path of ['colors.text.secondary', 'colors.text.accent']) {
      const [token] = result(['--theme-token', path]);
      assert.equal(token.path, path);
      assert.equal(token.correspondence.status, 'unreviewed');
      assert.deepEqual(token.correspondence.relations, []);
      assert.deepEqual(token.figmaVariables, []);
      for (const field of ['status', 'mappings', 'designSource', 'resolvedProperties']) {
        assert.equal(Object.hasOwn(token, field), false, field);
      }
    }
  });

  test('CLI matches exact and wildcard selectors across the bundled libraries', () => {
    assert.deepEqual(result(['--theme-token', 'colors.text.primary']).map((entry) => entry.path), ['colors.text.primary']);
    const paths = result(['--theme-token', 'colors.text.*']).map((entry) => entry.path);
    assert.ok(paths.length > 1);
    assert.ok(paths.includes('colors.text.primary'));
    assert.ok(paths.includes('colors.text.accent'));
    assert.ok(paths.every((path) => /^colors\.text\.[^.]+$/.test(path)));
    assert.deepEqual(paths, [...paths].sort());

    const variables = result(['--figma-variable', 'semantic:Color/text/*']);
    const variablePaths = variables.map((entry) => entry.variable.path);
    assert.ok(variablePaths.length > 1);
    assert.ok(variablePaths.includes('Color/text/primary'));
    assert.ok(variables.every((entry) => entry.variable.library === 'semantic'
      && /^Color\/text\/[^/]+$/.test(entry.variable.path)));
    assert.deepEqual(variablePaths, [...variablePaths].sort());

    const { libraries } = relationAssets();
    const expected = libraries.flatMap((library) => library.variables
      .filter((variable) => variable.path === 'Spacing/none')
      .map((variable) => [library.meta.library, variable.path, variable.figmaKey]));
    assert.deepEqual(expected.map((entry) => entry[0]), ['foundations', 'semantic']);
    assert.deepEqual(result(['--figma-variable', 'Spacing/none'])
      .map(({ variable }) => [variable.library, variable.path, variable.figmaKey]), expected);
  });

  test('CLI returns an empty envelope for unmatched and wrong-case selectors', () => {
    for (const args of [
      ['--theme-token', '_component.nonexistent.token'],
      ['--theme-token', 'missing.**'],
      ['--figma-variable', 'semantic:not-a-variable'],
      ['--figma-variable', 'semantic:color/text/*'],
    ]) {
      const output = response(args);
      assert.deepEqual(output.results, [], args.join(' '));
      assert.equal(output.meta.variableRelationCoverage, 'partial');
      assert.equal(typeof output.meta.themeVersion, 'string');
    }
  });

  test('CLI rejects invalid or conflicting arguments without stdout', () => {
    const cases = [
      [[], /exactly one/i],
      [['--theme-token'], /argument|value|selector/i],
      [['--figma-variable'], /argument|value|selector/i],
      [['--theme-token', ''], /exactly one/i],
      [['--figma-variable='], /exactly one/i],
      [['--theme-token', 'colors.text.primary', '--figma-variable', 'semantic:Color/text/primary'], /exactly one/i],
      [['--theme-token', 'colors.text.primary', '--theme-token', 'colors.text.accent'], /exactly one/i],
      [['--theme-token=colors.text.primary', '--theme-token=colors.text.accent'], /exactly one/i],
      [['--figma-variable', 'semantic:Color/text/primary', '--figma-variable', 'semantic:Color/text/accent'], /exactly one/i],
      [['--figma-variable=semantic:Color/text/primary', '--figma-variable=semantic:Color/text/accent'], /exactly one/i],
      [['--help', '--theme-token', 'colors.text.primary'], /exactly one|help/i],
      [['--theme-token', 'colors.text.primary', 'unexpected'], /argument|positional|unexpected/i],
      [['--unknown', 'value'], /unknown|option/i],
      [['--theme-token', 'colors..text'], /Invalid selector pattern/i],
      [['--theme-token', 'colors.***'], /Invalid selector pattern/i],
      [['--figma-variable', 'semantic:Color//text'], /Invalid selector pattern/i],
      [['--figma-variable', 'unknown:Color/text/primary'], /Unknown Figma variable library/i],
      ...['--token', '--variable', '--figma', '--family', '--query']
        .map((flag) => [[flag, 'anything'], /unknown|option/i]),
    ];
    for (const [args, expected] of cases) {
      const execution = run(lookup, args);
      assert.notEqual(execution.status, 0, args.join(' '));
      assert.equal(execution.stdout, '', args.join(' '));
      assert.match(execution.stderr, expected, args.join(' '));
    }
  });

  test('CLI help and import succeed without bundled assets or output side effects', () => {
    const directory = mkdtempSync(join(tmpdir(), 'tonic-lookup-import-'));
    try {
      const scripts = join(directory, 'scripts');
      cpSync(dirname(lookup), scripts, { recursive: true });
      const isolatedLookup = join(scripts, 'lookup-tokens.mjs');
      const help = run(isolatedLookup, ['--help']);
      assert.equal(help.status, 0, help.stderr);
      assert.equal(help.stderr, '');
      assert.match(help.stdout, /Usage: node <skill-directory>\/scripts\/lookup-tokens\.mjs --theme-token PATTERN \| --figma-variable PATTERN/);
      const script = `await import(${JSON.stringify(pathToFileURL(isolatedLookup).href)}); process.stdout.write('imported');`;
      const imported = run('--input-type=module', ['--eval', script]);
      assert.equal(imported.status, 0, imported.stderr);
      assert.equal(imported.stdout, 'imported');
      assert.equal(imported.stderr, '');
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });

  test('CLI executes through a symlink with and without preserving the main symlink', () => {
    const directory = mkdtempSync(join(tmpdir(), 'tonic-lookup-symlink-'));
    try {
      const link = join(directory, 'lookup.mjs');
      symlinkSync(lookup, link);
      const args = ['--theme-token', 'colors.text.primary'];
      const direct = run(lookup, args);
      assert.equal(direct.status, 0, direct.stderr);
      for (const execution of [run(link, args), run('--preserve-symlinks-main', [link, ...args])]) {
        assert.equal(execution.status, 0, execution.stderr);
        assert.equal(execution.stderr, '');
        assert.deepEqual(JSON.parse(execution.stdout), JSON.parse(direct.stdout));
      }
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });

  test('one reviewed variable can map to multiple explicitly reviewed theme tokens', () => {
    const fixture = relationAssets();
    const { inventory, relations, libraries } = fixture;
    relations.variableRelations = [
      syntheticRelation(inventory, libraries, 'colors.text.primary'),
      syntheticRelation(inventory, libraries, 'colors.text.secondary'),
    ];
    const [record] = matcher(fixture).matchFigmaVariables('semantic:Color/text/primary').results;
    assert.equal(record.correspondence.status, 'mapped');
    assert.deepEqual(record.themeTokens.map((entry) => entry.path), ['colors.text.primary', 'colors.text.secondary']);
    assert.equal(record.correspondence.relations.length, 2);
  });

  test('a reviewed variable relation cannot resolve an unresolved theme value', () => {
    const fixture = relationAssets();
    const { inventory, relations, libraries } = fixture;
    const relation = syntheticRelation(inventory, libraries, 'colors.riskLevel.high._gradient.opaque');
    relations.variableRelations = [relation];
    const instance = matcher(fixture);
    const variable = instance.matchFigmaVariables('semantic:Color/text/primary').results[0];
    const unresolved = variable.themeTokens.find((token) => token.path === relation.themePath);
    assert.equal(unresolved.resolutionStatus, 'unresolved-source');
    assert.equal(unresolved.values.dark, '{alert.riskLevel.high.chart}');
    const token = instance.matchThemeTokens(relation.themePath).results[0];
    assert.equal(token.resolutionStatus, 'unresolved-source');
    assert.equal(token.correspondence.status, 'mapped');
    assert.equal(token.figmaVariables[0].path, 'Color/text/primary');
  });

  test('legacy CSS variables and decimal border keys preserve source values', () => {
    const [legacy] = result(['--theme-token', 'blue:60']);
    assert.equal(legacy.kind, 'legacy');
    assert.equal(legacy.cssVariable, '--tonic-colors-blue_60');
    const borders = result(['--theme-token', 'borders.*']);
    assert.equal(borders.find((entry) => entry.path === 'borders["0.5"]').values.dark, '0.5px solid');
    assert.equal(borders.find((entry) => entry.path === 'borders["1.5"]').values.dark, '1.5px solid');
  });

  test('generated inventory round-trips breakpoint values through JSON checks', () => {
    const directory = mkdtempSync(join(tmpdir(), 'tonic-snapshot-check-'));
    try {
      const file = join(directory, 'tokens.json');
      const generated = run(generator, ['--output', file]);
      assert.equal(generated.status, 0, generated.stderr);
      const checked = run(generator, ['--output', file, '--check']);
      assert.equal(checked.status, 0, checked.stderr);
      const data = JSON.parse(readFileSync(file, 'utf8'));
      const breakpoints = data.tokens.filter((entry) => entry.path === 'breakpoints' || entry.path.startsWith('breakpoints.'));
      assert.deepEqual(breakpoints.map((entry) => entry.path), [
        'breakpoints.values.2xl',
        'breakpoints.values.lg',
        'breakpoints.values.md',
        'breakpoints.values.sm',
        'breakpoints.values.xl',
      ]);
      for (const [index, value] of [96, 64, 48, 40, 80].entries()) {
        const token = breakpoints[index];
        assert.equal(token.kind, 'primitive');
        assert.equal(token.raw, value);
        assert.deepEqual(token.values, { dark: value, light: value });
        assert.equal(token.cssVariable, null);
        assert.equal(token.unit, 'rem');
        assert.equal(token.unitValues, undefined);
      }
      for (const file of [
        'packages/utils/src/internal/index.js',
        'packages/utils/src/internal/createBreakpoints.js',
        'packages/utils/src/internal/resolveTheme.js',
        'packages/utils/src/assertion.js',
        'packages/utils/src/shared.js',
      ]) {
        assert.match(data.meta.sourceHashes[file], /^[a-f0-9]{64}$/);
      }
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

      inventory.tokens.find((token) => token.path === 'breakpoints.values.sm').values.dark = 'stale';
      writeFileSync(file, `${JSON.stringify(inventory)}\n`);
      const checked = run(generator, ['--output', file, '--check']);
      assert.notEqual(checked.status, 0);
      assert.match(checked.stderr, /snapshot differs/i);
      const refreshed = run(generator, ['--output', file]);
      assert.equal(refreshed.status, 0, refreshed.stderr);
      const updated = JSON.parse(readFileSync(file, 'utf8'));
      assert.equal(updated.meta.sourceRevision, currentRevision);
      assert.equal(updated.tokens.find((token) => token.path === 'breakpoints.values.sm').values.dark, 40);
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
