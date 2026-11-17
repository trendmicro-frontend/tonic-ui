import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, readlinkSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, relative, resolve } from 'node:path';
import test, { describe } from 'node:test';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { renderTokenRelations } from '../report-token-relations.mjs';
import { relationSnapshotDigests } from '../../skills/tonic-ui-tokens/scripts/variable-relations.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../../..');
const plugin = join(repoRoot, 'plugins/tonic-ui-tokens');
const assets = join(plugin, 'skills/tonic-ui-tokens/assets');
const readAsset = (path) => JSON.parse(readFileSync(join(assets, path), 'utf8'));
const sectionNames = [
  'Mapped',
  'Stale reviews',
  'Reviewed Figma-only',
  'Reviewed theme-only',
  'Unreviewed Figma variables',
  'Unreviewed theme tokens',
];
const emptyLedger = () => ({ schemaVersion: 1, variableRelationsCoverage: 'partial', variableRelations: [] });
const row = (...cells) => `| ${cells.join(' | ')} |`;
const markdownCell = (value) => String(value ?? '—').replaceAll('\\', '\\\\').replaceAll('|', '\\|').replace(/\r?\n/g, '<br>');

function fixture() {
  const token = (path, scale, kind = 'semantic', visibility = 'public') => ({
    path, scale, kind, visibility, values: { dark: 'RAW_THEME_VALUE', light: 'RAW_THEME_VALUE' },
  });
  const variable = (collection, name, figmaKey) => ({
    collection,
    path: `${collection}/${name}`,
    figmaKey,
    values: { 'Z light': 'RAW_FIGMA_VALUE', 'A dark': 'RAW_FIGMA_VALUE' },
  });
  const inventory = {
    schemaVersion: 1,
    meta: { sourcePath: '/private-fixture-path/never-print' },
    tokens: [
      token('spaces.unreviewed', 'spaces', 'primitive'),
      token('colors.unreviewedZ', 'colors'),
      token('colors.mapped', 'colors'),
      token('fontSizes.solo', 'fontSizes', 'primitive'),
      token('colors.changed', 'colors'),
      token('colors.unreviewedA', 'colors', 'semantic', 'private'),
      token('colors.second', 'colors'),
      token('colors.staleShared', 'colors'),
      token('colors.missingVariable', 'colors'),
    ],
  };
  const libraries = [
    {
      meta: {
        library: 'foundations',
        fileKey: 'PRIVATE_FOUNDATIONS_FILE_KEY',
        figmaUrl: 'https://private.invalid/foundations/never-print',
        fileKeySha256: 'PRIVATE_FOUNDATIONS_FINGERPRINT',
        collections: [{ name: 'Palette' }, { name: 'A|Group\\Part\nNext' }],
      },
      variables: [
        variable('Palette', 'zulu', 'foundation-z'),
        variable('A|Group\\Part\nNext', 'one', 'foundation-odd'),
        variable('Palette', 'alpha', 'foundation-a'),
      ],
    },
    {
      meta: {
        library: 'semantic',
        fileKey: 'PRIVATE_SEMANTIC_FILE_KEY',
        figmaUrl: 'https://private.invalid/semantic/never-print',
        fileKeySha256: 'PRIVATE_SEMANTIC_FINGERPRINT',
        collections: [{ name: 'Color' }, { name: 'Shadow' }],
      },
      variables: [
        variable('Color', 'text/beta', 'semantic-b'),
        variable('Shadow', 'missing-theme', 'semantic-missing-theme'),
        variable('Color', 'text/gamma', 'semantic-g'),
        variable('Color', 'text/alpha|part\\unit', 'semantic-a'),
        variable('Color', 'text/figma-only', 'semantic-only'),
        variable('Color', 'text/unreviewed', 'semantic-unreviewed'),
      ],
    },
  ];
  const review = (status, figma, themePath, reason) => {
    const result = {
      status,
      figma,
      themePath,
      ...(status === 'mapped' ? { modeMap: { 'Z light': ['light'], 'A dark': ['dark'] } } : {}),
      evidence: { reviewedAt: '2026-01-02', reason, sourceRows: [] },
    };
    if (status === 'mapped') {
      result.evidence.snapshots = relationSnapshotDigests(result, inventory, libraries);
      // Missing mapped endpoints still need a syntactically valid recorded digest.
      for (const [name, value] of Object.entries(result.evidence.snapshots)) {
        if (value === null) result.evidence.snapshots[name] = 'a'.repeat(64);
      }
    }
    return result;
  };
  const endpoint = (key) => ({ library: 'semantic', key });
  const alpha = review('mapped', endpoint('semantic-a'), 'colors.mapped', 'Line one | reviewer\\note\nLine two');
  const secondTheme = review('mapped', endpoint('semantic-a'), 'colors.second', 'Second theme match');
  const secondVariable = review('mapped', endpoint('semantic-b'), 'colors.mapped', 'Second Figma match');
  const staleShared = review('mapped', endpoint('semantic-a'), 'colors.staleShared', 'Snapshot differs');
  staleShared.evidence.snapshots.figma = 'f'.repeat(64);
  const changed = review('mapped', endpoint('semantic-g'), 'colors.changed', 'Changed token');
  const missingVariable = review('mapped', endpoint('missing-variable-key'), 'colors.missingVariable', 'Removed variable');
  const missingTheme = review('mapped', endpoint('semantic-missing-theme'), 'missing.deleted', 'Removed theme');

  // Pin absence reviews against the final inventories; only earlier mapped reviews go stale.
  inventory.tokens.find((entry) => entry.path === 'colors.changed').values.light = 'CHANGED_THEME_VALUE';
  const figmaOnly = review('figma-only', endpoint('semantic-only'), null, 'Explicit Figma-only review');
  const themeOnly = review('theme-only', null, 'fontSizes.solo', 'Explicit theme-only review');
  for (const absence of [figmaOnly, themeOnly]) {
    absence.evidence.snapshots = relationSnapshotDigests(absence, inventory, libraries);
  }

  return {
    inventory,
    libraries,
    relations: {
      ...emptyLedger(),
      // Deliberately not sorted by section, group, endpoint, or theme path.
      variableRelations: [themeOnly, missingVariable, secondVariable, figmaOnly, changed,
        secondTheme, missingTheme, staleShared, alpha],
    },
  };
}

function sections(markdown) {
  const headings = [...markdown.matchAll(/^## ([^\n]+)$/gm)];
  assert.deepEqual(headings.map((heading) => heading[1]), sectionNames);
  return new Map(headings.map((heading, index) => [
    heading[1], markdown.slice(heading.index + heading[0].length, headings[index + 1]?.index ?? markdown.length),
  ]));
}

function tableRows(body) {
  const result = [];
  let readingRows = false;
  for (const line of body.split('\n')) {
    if (line.startsWith('| ---')) {
      readingRows = true;
    } else if (readingRows && line.startsWith('| ')) {
      result.push(line);
    } else {
      readingRows = false;
    }
  }
  return result;
}

function groups(body) {
  const headings = [...body.matchAll(/^### ([^\n]+)$/gm)];
  return headings.map((heading, index) => ({
    name: heading[1],
    body: body.slice(heading.index + heading[0].length, headings[index + 1]?.index ?? body.length),
  }));
}

function assertSection(body, expectedRows, expectedGroups) {
  assert.deepEqual(tableRows(body), expectedRows);
  assert.match(body, new RegExp(`^Rows: ${expectedRows.length}$`, 'm'));
  const actualGroups = groups(body);
  assert.deepEqual(actualGroups.map((group) => group.name), expectedGroups);
  for (const group of actualGroups) {
    assert.match(group.body, new RegExp(`^Rows: ${tableRows(group.body).length}$`, 'm'));
  }
  if (expectedRows.length === 0) assert.match(body, /^None\.$/m);
}

function assertSameRows(actual, expected) {
  assert.equal(actual.length, expected.length);
  assert.deepEqual(new Set(actual), new Set(expected));
}

function snapshotTree(root) {
  const entries = [];
  const visit = (directory) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      const name = relative(root, path);
      if (entry.isSymbolicLink()) {
        entries.push(`link:${name}:${readlinkSync(path)}`);
      } else if (entry.isDirectory()) {
        entries.push(`dir:${name}`);
        visit(path);
      } else if (entry.isFile()) {
        entries.push(`file:${name}:${createHash('sha256').update(readFileSync(path)).digest('hex')}`);
      }
    }
  };
  visit(root);
  return entries.sort();
}

describe('plugins/tonic-ui-tokens / Classified relation report', () => {
  test('classifies every endpoint and review with row counts, grouping, ordering, and escaped data', () => {
    const { inventory, libraries, relations } = fixture();
    const original = structuredClone({ inventory, libraries, relations });
    const report = renderTokenRelations(inventory, libraries, relations);
    const bySection = sections(report);
    const alpha = String.raw`semantic:Color/text/alpha\|part\\unit`;
    const escapedReason = String.raw`Line one \| reviewer\\note<br>Line two`;
    const modes = 'A dark → dark; Z light → light';
    const date = '2026-01-02';

    assert.match(report, /^# Figma variable ↔ theme token relations$/m);
    assert.match(report, /partial/i);
    assert.match(report, /offline snapshots?/i);
    assert.match(report, /unreviewed does not mean a counterpart is absent/i);
    assert.match(report, /rows, not unique endpoints/i);
    assertSection(bySection.get('Mapped'), [
      row(alpha, 'colors.mapped', 'mapped', 'current', modes, date, escapedReason),
      row(alpha, 'colors.second', 'mapped', 'current', modes, date, 'Second theme match'),
      row('semantic:Color/text/beta', 'colors.mapped', 'mapped', 'current', modes, date, 'Second Figma match'),
    ], ['semantic / Color']);
    assertSection(bySection.get('Stale reviews'), [
      row(alpha, 'colors.staleShared', 'mapped', 'stale', modes, date, 'Snapshot differs'),
      row('semantic:Color/text/gamma', 'colors.changed', 'mapped', 'stale', modes, date, 'Changed token'),
      row('semantic:Shadow/missing-theme', 'missing.deleted (missing)', 'mapped', 'stale', modes, date, 'Removed theme'),
      row('semantic:missing-variable-key (missing)', 'colors.missingVariable', 'mapped', 'stale', modes, date, 'Removed variable'),
    ], ['semantic / Color', 'semantic / Shadow', 'semantic / missing endpoint']);
    assertSection(bySection.get('Reviewed Figma-only'), [
      row('semantic:Color/text/figma-only', '—', 'figma-only', 'current', '—', date, 'Explicit Figma-only review'),
    ], ['semantic / Color']);
    assertSection(bySection.get('Reviewed theme-only'), [
      row('—', 'fontSizes.solo', 'theme-only', 'current', '—', date, 'Explicit theme-only review'),
    ], ['fontSizes']);
    assertSection(bySection.get('Unreviewed Figma variables'), [
      row(String.raw`foundations:A\|Group\\Part<br>Next/one`),
      row('foundations:Palette/alpha'),
      row('foundations:Palette/zulu'),
      row('semantic:Color/text/unreviewed'),
    ], [String.raw`foundations / A\|Group\\Part<br>Next`, 'foundations / Palette', 'semantic / Color']);
    assertSection(bySection.get('Unreviewed theme tokens'), [
      row('colors.unreviewedA', 'semantic', 'private'),
      row('colors.unreviewedZ', 'semantic', 'public'),
      row('spaces.unreviewed', 'primitive', 'public'),
    ], ['colors', 'spaces']);

    const changed = relations.variableRelations.find((entry) => entry.themePath === 'colors.changed');
    assert.notEqual(relationSnapshotDigests(changed, inventory, libraries).theme, changed.evidence.snapshots.theme);
    const absence = relations.variableRelations.find((entry) => entry.status === 'figma-only');
    assert.deepEqual(relationSnapshotDigests(absence, inventory, libraries), absence.evidence.snapshots);
    assert.deepEqual({ inventory, libraries, relations }, original);
    for (const forbidden of ['RAW_THEME_VALUE', 'RAW_FIGMA_VALUE', '/private-fixture-path/never-print',
      ...libraries.flatMap((library) => [library.meta.fileKey, library.meta.figmaUrl, library.meta.fileKeySha256])]) {
      assert.ok(!report.includes(forbidden), 'The report must not include raw capture data or private metadata.');
    }
  });

  test('sorts report groups, rows, and modes by Unicode code point', () => {
    const bmp = '\uE000';
    const supplementary = '\u{10000}';
    const inventory = { schemaVersion: 1, tokens: [] };
    const foundations = { meta: { library: 'foundations', collections: [] }, variables: [] };
    const semantic = { meta: { library: 'semantic', collections: [] }, variables: [] };
    const libraries = [foundations, semantic];
    const relations = emptyLedger();
    const addToken = (path, scale) => {
      const token = { path, scale, kind: 'semantic', visibility: 'public', values: { default: 'theme' } };
      inventory.tokens.push(token);
      return token;
    };
    const addVariable = (collection, name, figmaKey) => {
      const variable = {
        collection, path: `${collection}/${name}`, figmaKey, values: { [supplementary]: 'figma', [bmp]: 'figma' },
      };
      semantic.variables.push(variable);
      return variable;
    };
    for (const [index, symbol] of [supplementary, bmp].entries()) {
      addToken(`unicodeRows.${symbol}`, 'unicodeRows');
      addToken(`unicode${symbol}.item`, `unicode${symbol}`);
      addVariable('UnicodeRows', symbol, `plain-row-${index}`);
      addVariable(`Unicode${symbol}`, 'item', `plain-group-${index}`);
      const endpoints = [
        ['ReviewRows', symbol, `mapped.${symbol}`, 'mapped'],
        [`Review${symbol}`, 'item', `mappedGroup${symbol}.item`, `mappedGroup${symbol}`],
      ];
      for (const [collection, name, path, scale] of endpoints) {
        const variable = addVariable(collection, name, `review-${index}-${collection}`);
        const token = addToken(path, scale);
        const review = {
          status: 'mapped',
          figma: { library: 'semantic', key: variable.figmaKey },
          themePath: token.path,
          modeMap: { [supplementary]: ['default'], [bmp]: ['default'] },
          evidence: { reviewedAt: '2026-01-02', reason: 'Reviewed', sourceRows: [] },
        };
        review.evidence.snapshots = relationSnapshotDigests(review, inventory, libraries);
        relations.variableRelations.push(review);
      }
    }

    const report = renderTokenRelations(inventory, libraries, relations);
    assert.equal(typeof report, 'string');
    const bySection = sections(report);
    const modes = `${bmp} → default; ${supplementary} → default`;
    const mappedRow = (variable, token) => row(`semantic:${variable}`, token, 'mapped', 'current', modes, '2026-01-02', 'Reviewed');
    assertSection(bySection.get('Mapped'), [
      mappedRow(`ReviewRows/${bmp}`, `mapped.${bmp}`),
      mappedRow(`ReviewRows/${supplementary}`, `mapped.${supplementary}`),
      mappedRow(`Review${bmp}/item`, `mappedGroup${bmp}.item`),
      mappedRow(`Review${supplementary}/item`, `mappedGroup${supplementary}.item`),
    ], ['semantic / ReviewRows', `semantic / Review${bmp}`, `semantic / Review${supplementary}`]);
    assertSection(bySection.get('Unreviewed Figma variables'), [
      row(`semantic:UnicodeRows/${bmp}`),
      row(`semantic:UnicodeRows/${supplementary}`),
      row(`semantic:Unicode${bmp}/item`),
      row(`semantic:Unicode${supplementary}/item`),
    ], ['semantic / UnicodeRows', `semantic / Unicode${bmp}`, `semantic / Unicode${supplementary}`]);
    assertSection(bySection.get('Unreviewed theme tokens'), [
      row(`unicodeRows.${bmp}`, 'semantic', 'public'),
      row(`unicodeRows.${supplementary}`, 'semantic', 'public'),
      row(`unicode${bmp}.item`, 'semantic', 'public'),
      row(`unicode${supplementary}.item`, 'semantic', 'public'),
    ], ['unicodeRows', `unicode${bmp}`, `unicode${supplementary}`]);
  });

  test('stale absence reviews are neither current absences nor unreviewed endpoints', () => {
    const { inventory, libraries, relations } = fixture();
    inventory.tokens.find((entry) => entry.path === 'colors.unreviewedA').values.dark = 'UPDATED_SCOPE';
    const bySection = sections(renderTokenRelations(inventory, libraries, relations));
    const staleRows = tableRows(bySection.get('Stale reviews'));
    assert.ok(staleRows.includes(row('semantic:Color/text/figma-only', '—', 'figma-only', 'stale', '—', '2026-01-02', 'Explicit Figma-only review')));
    assert.ok(staleRows.includes(row('—', 'fontSizes.solo', 'theme-only', 'stale', '—', '2026-01-02', 'Explicit theme-only review')));
    assertSection(bySection.get('Reviewed Figma-only'), [], []);
    assertSection(bySection.get('Reviewed theme-only'), [], []);
    assert.ok(!tableRows(bySection.get('Unreviewed Figma variables')).includes(row('semantic:Color/text/figma-only')));
    assert.ok(!tableRows(bySection.get('Unreviewed theme tokens')).some((entry) => entry.startsWith('| fontSizes.solo |')));
  });

  test('rejects a duplicate mapped pair instead of silently dropping a review', () => {
    const { inventory, libraries, relations } = fixture();
    const duplicate = relations.variableRelations.find((entry) => entry.status === 'mapped' && entry.themePath === 'colors.mapped');
    relations.variableRelations.push(structuredClone(duplicate));
    assert.throws(() => renderTokenRelations(inventory, libraries, relations), /duplicate mapped pair/i);
  });

  test('an empty ledger lists every captured variable and theme token as unreviewed', () => {
    const { inventory, libraries } = fixture();
    const bySection = sections(renderTokenRelations(inventory, libraries, emptyLedger()));
    for (const name of sectionNames.slice(0, 4)) assertSection(bySection.get(name), [], []);
    const variables = libraries.flatMap((library) => library.variables.map((variable) =>
      row(markdownCell(`${library.meta.library}:${variable.path}`))));
    const tokens = inventory.tokens.map((token) =>
      row(markdownCell(token.path), markdownCell(token.kind), markdownCell(token.visibility)));
    assertSameRows(tableRows(bySection.get('Unreviewed Figma variables')), variables);
    assertSameRows(tableRows(bySection.get('Unreviewed theme tokens')), tokens);
    assert.match(bySection.get('Unreviewed Figma variables'), new RegExp(`^Rows: ${variables.length}$`, 'm'));
    assert.match(bySection.get('Unreviewed theme tokens'), new RegExp(`^Rows: ${tokens.length}$`, 'm'));
  });

  test('shipped UI snapshots are redacted and every endpoint is unreviewed', () => {
    const inventory = readAsset('tokens.json');
    const relations = readAsset('token-relations.json');
    const libraries = ['foundations', 'semantic'].map((library) => readAsset(`figma-variables/${library}.json`));
    assert.deepEqual(relations, emptyLedger());
    const report = renderTokenRelations(inventory, libraries, relations);
    const bySection = sections(report);
    for (const name of sectionNames.slice(0, 4)) assertSection(bySection.get(name), [], []);
    const variables = libraries.flatMap((library) => library.variables.map((variable) =>
      row(markdownCell(`${library.meta.library}:${variable.path}`))));
    const tokens = inventory.tokens.map((token) =>
      row(markdownCell(token.path), markdownCell(token.kind), markdownCell(token.visibility)));
    assertSameRows(tableRows(bySection.get('Unreviewed Figma variables')), variables);
    assertSameRows(tableRows(bySection.get('Unreviewed theme tokens')), tokens);
    assert.match(bySection.get('Unreviewed Figma variables'), new RegExp(`^Rows: ${variables.length}$`, 'm'));
    assert.match(bySection.get('Unreviewed theme tokens'), new RegExp(`^Rows: ${tokens.length}$`, 'm'));
    assert.ok(!report.includes(repoRoot), 'The report must not include the checkout location.');
    for (const library of libraries) {
      assert.equal(library.meta.fileKey, null);
      assert.equal(library.meta.figmaUrl, null);
      assert.match(library.meta.fileKeySha256, /^[a-f0-9]{64}$/);
      assert.ok(!report.includes(library.meta.fileKeySha256), 'The report must not include library fingerprints.');
      for (const variable of library.variables) {
        assert.ok(!report.includes(variable.figmaKey), 'Unreviewed rows must not include raw variable keys.');
      }
    }
  });

  test('CLI help, errors, imports, and deterministic output are offline and do not write files', () => {
    const directory = mkdtempSync(join(tmpdir(), 'tonic-ui-relations-report-'));
    try {
      const sandboxPlugin = join(directory, 'plugins/tonic-ui-tokens');
      const scriptDirectory = join(sandboxPlugin, 'scripts');
      const skill = join(sandboxPlugin, 'skills/tonic-ui-tokens');
      mkdirSync(scriptDirectory, { recursive: true });
      mkdirSync(join(skill, 'scripts'), { recursive: true });
      const script = join(scriptDirectory, 'report-token-relations.mjs');
      const alias = join(scriptDirectory, 'report-link.mjs');
      copyFileSync(join(plugin, 'scripts/report-token-relations.mjs'), script);
      copyFileSync(join(plugin, 'skills/tonic-ui-tokens/scripts/variable-relations.mjs'), join(skill, 'scripts/variable-relations.mjs'));
      symlinkSync('report-token-relations.mjs', alias);
      const externalDirectory = join(directory, 'external-links');
      mkdirSync(externalDirectory);
      const externalAlias = join(externalDirectory, 'report-link.mjs');
      symlinkSync(script, externalAlias);
      const guard = join(directory, 'network-guard.cjs');
      writeFileSync(guard, [
        "const reject = () => { throw new Error('Unexpected network access'); };",
        "for (const name of ['node:http', 'node:https']) { const api = require(name); api.request = reject; api.get = reject; }",
        "const net = require('node:net'); net.connect = reject; net.createConnection = reject;",
        "require('node:tls').connect = reject;",
        'globalThis.fetch = reject;',
      ].join('\n'));
      const run = (args) => spawnSync(process.execPath, ['--require', guard, ...args], {
        cwd: directory,
        encoding: 'utf8',
        env: { ...process.env, NODE_OPTIONS: '' },
        maxBuffer: 16 * 1024 * 1024,
      });
      const beforeHelp = snapshotTree(directory);
      for (const args of [
        [script, '--help'],
        [alias, '--help'],
        ['--preserve-symlinks-main', alias, '--help'],
        [externalAlias, '--help'],
        ['--preserve-symlinks-main', externalAlias, '--help'],
      ]) {
        const help = run(args);
        assert.equal(help.status, 0, help.stderr);
        assert.equal(help.stderr, '');
        assert.match(help.stdout, /node plugins\/tonic-ui-tokens\/scripts\/report-token-relations\.mjs/);
        assert.match(help.stdout, /Markdown.*stdout/i);
        for (const name of sectionNames) assert.ok(help.stdout.includes(name), `Help must describe ${name}.`);
      }
      for (const args of [['--unknown'], ['unexpected'], ['--help', '--unknown'], ['--help', '--help'], ['--theme-token', 'colors.*']]) {
        const result = run([script, ...args]);
        assert.notEqual(result.status, 0);
        assert.equal(result.stdout, '');
        assert.match(result.stderr, /arguments?|help/i);
      }
      const imported = run(['--input-type=module', '--eval', `await import(${JSON.stringify(pathToFileURL(script).href)})`]);
      assert.equal(imported.status, 0, imported.stderr);
      assert.equal(imported.stdout, '');
      assert.equal(imported.stderr, '');
      assert.deepEqual(snapshotTree(directory), beforeHelp);

      const { inventory, libraries, relations } = fixture();
      const sandboxAssets = join(skill, 'assets');
      mkdirSync(join(sandboxAssets, 'figma-variables'), { recursive: true });
      writeFileSync(join(sandboxAssets, 'tokens.json'), JSON.stringify(inventory));
      writeFileSync(join(sandboxAssets, 'token-relations.json'), JSON.stringify(relations));
      for (const library of libraries) {
        writeFileSync(join(sandboxAssets, 'figma-variables', `${library.meta.library}.json`), JSON.stringify(library));
      }
      const beforeReport = snapshotTree(directory);
      const expected = renderTokenRelations(inventory, libraries, relations);
      for (const args of [
        [script],
        [alias],
        ['--preserve-symlinks-main', alias],
        [externalAlias],
        ['--preserve-symlinks-main', externalAlias],
      ]) {
        const result = run(args);
        assert.equal(result.status, 0, result.stderr);
        assert.equal(result.stderr, '');
        assert.equal(result.stdout, expected);
        assert.ok(!result.stdout.includes(directory));
        for (const library of libraries) {
          for (const value of [library.meta.fileKey, library.meta.figmaUrl, library.meta.fileKeySha256]) {
            assert.ok(!result.stdout.includes(value));
          }
        }
      }
      assert.deepEqual(snapshotTree(directory), beforeReport);
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });
});
