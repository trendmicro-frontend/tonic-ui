import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import * as fs from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test, { after } from 'node:test';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { runInNewContext } from 'node:vm';

import { FILES as shippedFiles } from '../variable-inventory.mjs';

const directory = path.dirname(fileURLToPath(import.meta.url));
const producer = path.resolve(directory, '../figma-plugin/code.js');
const rawFileKeys = {
  foundations: 'synthetic-foundations-file-identity',
  semantic: 'synthetic-semantic-file-identity',
};
const fingerprint = (key) => createHash('sha256').update(key).digest('hex');
const fixtureRoot = await fs.mkdtemp(path.join(tmpdir(), 'figma-tooling-fixture-'));
after(() => fs.rm(fixtureRoot, { recursive: true, force: true }));
const fixtureScripts = path.join(fixtureRoot, 'scripts');
const fixtureCapture = path.join(fixtureScripts, 'figma-variables');
await fs.mkdir(fixtureCapture, { recursive: true });
await fs.copyFile(path.resolve(directory, '../../validate-public-links.mjs'),
  path.join(fixtureScripts, 'validate-public-links.mjs'));
let inventorySource = await fs.readFile(path.resolve(directory, '../variable-inventory.mjs'), 'utf8');
for (const file of shippedFiles) {
  inventorySource = inventorySource.replace(file.fileKeySha256, fingerprint(rawFileKeys[file.slug]));
}
await fs.writeFile(path.join(fixtureCapture, 'variable-inventory.mjs'), inventorySource);
for (const name of ['convert-figma-variables.mjs', 'export-figma-variables.mjs']) {
  await fs.copyFile(path.resolve(directory, '..', name), path.join(fixtureCapture, name));
}
const converter = path.join(fixtureCapture, 'convert-figma-variables.mjs');
const exporter = path.join(fixtureCapture, 'export-figma-variables.mjs');
const {
  FILES, identifyLibrary, flattenFile, resolveAliases, buildDocument, normalizeValue, colorToHex,
} = await import(pathToFileURL(path.join(fixtureCapture, 'variable-inventory.mjs')).href);
const { fetchFileMeta, fetchVariables, resolveFileKeys, exportSnapshots } =
  await import(pathToFileURL(exporter).href);
const { convert } = await import(pathToFileURL(converter).href);
const [foundationsFile, semanticFile] = FILES;
const foundationKey = 'a'.repeat(40);
const semanticKey = 'b'.repeat(40);
const outsideKey = 'z'.repeat(40);
const timestamp = '2026-11-12T08:00:00.000Z';

function collection(id, modes, variableIds, extra = {}) {
  return {
    id, name: 'Color', key: `key-${id}`, defaultModeId: modes[0].modeId,
    modes, variableIds, remote: false, ...extra,
  };
}

function variable(id, name, collectionId, key, valuesByMode, extra = {}) {
  return {
    id, name, key, variableCollectionId: collectionId, resolvedType: 'COLOR',
    valuesByMode, description: '', scopes: [], codeSyntax: {}, remote: false, ...extra,
  };
}

function fixtureData() {
  const foundations = {
    collections: { fc: collection('fc', [{ modeId: 'f-mode', name: 'Value' }], ['f-red']) },
    variables: {
      'f-red': variable('f-red', 'red/500', 'fc', foundationKey,
        { 'f-mode': { r: 1, g: 0, b: 0, a: 1 } }, {
          description: 'Brand red. Use for destructive actions only.',
          codeSyntax: { WEB: 'var(--red-500)' }, scopes: ['ALL_SCOPES'],
        }),
    },
  };
  const semantic = {
    collections: {
      sc: collection('sc', [{ modeId: 's-dark', name: 'Dark' }, { modeId: 's-light', name: 'Light' }],
        ['s-primary', 's-inverse', 's-external']),
    },
    variables: {
      's-primary': variable('s-primary', 'text/primary', 'sc', semanticKey, {
        's-dark': { type: 'VARIABLE_ALIAS', id: 'remote-red', key: foundationKey, name: 'red/500' },
        's-light': { r: 0, g: 0, b: 0, a: 0.5 },
      }, { hiddenFromPublishing: true }),
      's-inverse': variable('s-inverse', 'text/inverse', 'sc', 'c'.repeat(40), {
        's-dark': { type: 'VARIABLE_ALIAS', id: 'f-red' },
        's-light': { type: 'VARIABLE_ALIAS', id: 's-primary' },
      }, { description: 'Use on inverse surfaces.' }),
      's-external': variable('s-external', 'text/external', 'sc', 'd'.repeat(40), {
        's-dark': { type: 'VARIABLE_ALIAS', id: 'missing', key: outsideKey, name: 'ghost/color' },
        's-light': { r: 1, g: 1, b: 1, a: 1 },
      }),
    },
  };
  return { foundations, semantic };
}

function payload(file, data, exportedAt = timestamp) {
  return {
    source: 'figma-plugin', pluginVersion: '1.1.0', fileKey: rawFileKeys[file.slug],
    fileName: file.slug === 'foundations' ? 'Tonic One Design Foundations (v4)' : 'Tonic One Design Tokens (v4)',
    exportedAt,
    meta: { variables: data.variables, variableCollections: data.collections },
  };
}

async function temp(t) {
  const root = await fs.mkdtemp(path.join(tmpdir(), 'figma-capture-test-'));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  return root;
}

async function writeJson(filename, value) {
  await fs.writeFile(filename, JSON.stringify(value));
  return filename;
}

const readJson = async (filename) => JSON.parse(await fs.readFile(filename, 'utf8'));
const cli = (...args) => spawnSync(process.execPath, [converter, ...args], { encoding: 'utf8' });
const exists = async (filename) => fs.stat(filename).then(() => true, (error) => {
  if (error.code === 'ENOENT') {
    return false;
  }
  throw error;
});
const find = (doc, token) => doc.variables.find((entry) => entry.token === token);

async function inputs(root) {
  const data = fixtureData();
  const f = payload(foundationsFile, data.foundations);
  const s = payload(semanticFile, data.semantic, '2026-11-12T08:05:00.000Z');
  const fPath = await writeJson(path.join(root, 'f.raw.json'), f);
  const sPath = await writeJson(path.join(root, 's.raw.json'), s);
  return { f, s, fPath, sPath, data };
}

async function savedBytes(out) {
  const names = ['foundations.json', 'semantic.json', '.payloads/.gitignore',
    '.payloads/foundations.json', '.payloads/semantic.json'];
  return Promise.all(names.map((name) => fs.readFile(path.join(out, name))));
}

test('CLI entry points run through symlinked paths but do not run on import', async (t) => {
  const root = await temp(t);
  const alias = path.join(root, 'scripts-alias');
  await fs.symlink(fixtureScripts, alias, 'dir');
  for (const filename of ['convert-figma-variables.mjs', 'export-figma-variables.mjs']) {
    const entry = path.join(alias, 'figma-variables', filename);
    for (const nodeArgs of [[], ['--preserve-symlinks-main']]) {
      const execution = spawnSync(process.execPath, [...nodeArgs, entry, '--help'], { encoding: 'utf8' });
      assert.equal(execution.status, 0, execution.stderr);
      assert.match(execution.stdout, /Usage:/);
      assert.equal(execution.stderr, '');
    }
    for (const argument of [path.join(root, 'missing-argument'), path.join(fixtureCapture, 'variable-inventory.mjs')]) {
      const execution = spawnSync(process.execPath, [
        '--input-type=module', '--eval', `await import(${JSON.stringify(pathToFileURL(entry).href)});`, argument,
      ], { encoding: 'utf8' });
      assert.equal(execution.status, 0, execution.stderr);
      assert.equal(execution.stdout, '');
      assert.equal(execution.stderr, '');
    }
  }
});

test('normalizers and documents preserve literals, descriptions, aliases and provenance', () => {
  assert.equal(colorToHex({ r: 1, g: 0, b: 0 }), '#ff0000');
  assert.equal(colorToHex({ r: 0.50196, g: 0, b: 0 }), '#800000');
  assert.deepEqual(normalizeValue(8), { type: 'number', value: 8 });
  assert.deepEqual(normalizeValue('x'), { type: 'string', value: 'x' });
  assert.deepEqual(normalizeValue(true), { type: 'boolean', value: true });
  assert.deepEqual(normalizeValue(null), { type: 'unknown', raw: null });
  const { foundations, semantic } = fixtureData();
  const docs = [
    flattenFile({ file: foundationsFile, data: foundations, fileMeta: { name: 'Foundations', version: 1 } }),
    flattenFile({ file: semanticFile, data: semantic, fileMeta: { name: 'Tokens', version: 2 } }),
  ];
  const stats = resolveAliases(docs);
  const f = find(docs[0], 'red/500');
  const primary = find(docs[1], 'text/primary');
  const inverse = find(docs[1], 'text/inverse');
  const external = find(docs[1], 'text/external');
  assert.equal(f.path, 'Color/red/500');
  assert.equal(f.values.Value.hex, '#ff0000');
  assert.equal(f.description, 'Brand red. Use for destructive actions only.');
  assert.equal(f.descriptionByMode, null);
  assert.equal(f.codeSyntax.WEB, 'var(--red-500)');
  assert.equal(primary.hiddenFromPublishing, true);
  assert.equal(primary.values.Light.alpha, 0.5);
  assert.equal(primary.values.Light.hexWithAlpha, '#00000080');
  assert.equal(primary.values.Dark.target.library, 'foundations');
  assert.equal(primary.values.Dark.target.path, 'Color/red/500');
  assert.equal(primary.values.Dark.target.crossFile, true);
  assert.equal(primary.values.Dark.targetKey, foundationKey);
  assert.equal(inverse.values.Dark.target, null); // A raw ID in another document is not a join.
  assert.equal(inverse.values.Dark.targetId, 'f-red');
  assert.equal(inverse.values.Light.target.token, 'text/primary');
  assert.equal(inverse.values.Light.target.crossFile, false);
  assert.equal(external.values.Dark.target, null);
  assert.equal(external.values.Dark.targetId, 'missing');
  assert.equal(external.values.Dark.targetKey, outsideKey);
  assert.equal(external.values.Dark.targetName, 'ghost/color');
  assert.equal(stats.semantic.total, 4);
  assert.equal(stats.semantic.resolvedCrossFile, 1);
  assert.equal(stats.semantic.resolvedWithinFile, 1);
  assert.equal(stats.semantic.unresolved, 2);
  assert.equal(stats.semantic.unresolvedByTarget.find((entry) => entry.target === 'ghost/color').key, outsideKey);
  const document = buildDocument(docs[1], stats);
  assert.equal(document.schemaVersion, 1);
  assert.equal(document.meta.library, 'semantic');
  assert.equal(document.meta.layer, 'semantic');
  assert.equal(document.meta.figmaFileName, 'Tokens');
  assert.equal(document.meta.figmaFileVersion, 2);
  assert.equal(document.meta.variableCount, 3);
  assert.equal(document.meta.collectionCount, 1);
  assert.equal(document.meta.descriptionCount, 1);
});

test('unresolved float aliases retain target hints and are counted', () => {
  const data = {
    collections: { radius: collection('radius', [{ modeId: 'mode', name: 'Mode 1' }], ['sharp'], { name: 'Corner radius' }) },
    variables: {
      sharp: variable('sharp', 'sharp', 'radius', '9'.repeat(40),
        { mode: { type: 'VARIABLE_ALIAS', id: 'missing-radius', key: outsideKey, name: 'ghost/radius' } },
        { resolvedType: 'FLOAT' }),
    },
  };
  const doc = flattenFile({ file: semanticFile, data });
  const stats = resolveAliases([doc]);
  const value = find(doc, 'sharp').values['Mode 1'];
  assert.equal(value.type, 'alias');
  assert.equal(value.target, null);
  assert.equal(value.targetName, 'ghost/radius');
  assert.equal(stats.semantic.unresolved, 1);
  assert.equal(stats.semantic.unresolvedByTarget[0].key, outsideKey);
});

test('raw ID collisions stay local and explicit stable keys are authoritative', () => {
  const mode = [{ modeId: 'mode', name: 'Value' }];
  const literal = { r: 1, g: 0, b: 0, a: 1 };
  const alias = (key) => ({ type: 'VARIABLE_ALIAS', id: 'shared', ...(key ? { key } : {}) });
  const f = {
    collections: { fc: collection('fc', mode, ['shared', 'f-alias']) },
    variables: {
      shared: variable('shared', 'foundation', 'fc', foundationKey, { mode: literal }),
      'f-alias': variable('f-alias', 'foundation-alias', 'fc', 'e'.repeat(40), { mode: alias() }),
    },
  };
  const s = {
    collections: { sc: collection('sc', mode, ['shared', 's-alias', 's-cross', 's-unknown', 's-key-id']) },
    variables: {
      shared: variable('shared', 'semantic', 'sc', semanticKey, { mode: literal }),
      's-alias': variable('s-alias', 'semantic-alias', 'sc', 'f'.repeat(40), { mode: alias() }),
      's-cross': variable('s-cross', 'cross', 'sc', '1'.repeat(40), { mode: alias(foundationKey) }),
      's-unknown': variable('s-unknown', 'unknown', 'sc', '2'.repeat(40), { mode: alias(outsideKey) }),
      's-key-id': variable('s-key-id', 'key-as-id', 'sc', '3'.repeat(40),
        { mode: { type: 'VARIABLE_ALIAS', id: foundationKey } }),
    },
  };
  const docs = [flattenFile({ file: foundationsFile, data: f }), flattenFile({ file: semanticFile, data: s })];
  resolveAliases(docs);
  assert.equal(find(docs[0], 'foundation-alias').values.Value.target.token, 'foundation');
  assert.equal(find(docs[1], 'semantic-alias').values.Value.target.token, 'semantic');
  assert.equal(find(docs[1], 'cross').values.Value.target.library, 'foundations');
  assert.equal(find(docs[1], 'key-as-id').values.Value.target.library, 'foundations');
  assert.equal(find(docs[1], 'unknown').values.Value.target, null);
  assert.equal(find(docs[1], 'unknown').values.Value.targetKey, outsideKey);
  assert.equal(find(docs[1], 'unknown').values.Value.targetName, undefined);
  const duplicate = structuredClone(s);
  duplicate.variables.shared.key = foundationKey;
  assert.throws(() => resolveAliases([docs[0], flattenFile({ file: semanticFile, data: duplicate })]), /duplicate.*key/i);
});

test('REST remote records provide alias hints but are excluded from local inventories', () => {
  const { foundations, semantic } = fixtureData();
  const remote = structuredClone(foundations.variables['f-red']);
  remote.remote = true;
  semantic.variables['f-red'] = remote;
  semantic.collections.fc = { ...structuredClone(foundations.collections.fc), remote: true };
  const docs = [flattenFile({ file: foundationsFile, data: foundations }), flattenFile({ file: semanticFile, data: semantic })];
  resolveAliases(docs);
  assert.equal(docs[1].variables.length, 3);
  assert.equal(docs[1].collections.length, 1);
  assert.equal(docs[1].collections[0].variableCount, 3);
  const value = find(docs[1], 'text/inverse').values.Dark;
  assert.equal(value.targetKey, foundationKey);
  assert.equal(value.targetName, 'red/500');
  assert.equal(value.target.library, 'foundations');
  // REST can also supply imported metadata without returning its remote collection.
  delete semantic.collections.fc;
  const withoutRemoteCollection = flattenFile({ file: semanticFile, data: semantic });
  resolveAliases([docs[0], withoutRemoteCollection]);
  assert.equal(find(withoutRemoteCollection, 'text/inverse').values.Dark.target.library, 'foundations');
});

test('two downloads convert together and preserve capture provenance', async (t) => {
  const root = await temp(t);
  const { f, s, fPath, sPath } = await inputs(root);
  const out = path.join(root, 'out');
  const result = await convert({ from: [fPath, sPath], outDir: out });
  assert.deepEqual(result.written, [path.join(out, 'foundations.json'), path.join(out, 'semantic.json')]);
  assert.deepEqual(result.reused, []);
  const foundation = await readJson(result.written[0]);
  const semantic = await readJson(result.written[1]);
  assert.equal(foundation.meta.capturedAt, f.exportedAt);
  assert.equal(semantic.meta.capturedAt, s.exportedAt);
  assert.equal(semantic.meta.captureMethod, 'figma-plugin');
  assert.equal(semantic.meta.pluginVersion, s.pluginVersion);
  for (const [doc, file] of [[foundation, foundationsFile], [semantic, semanticFile]]) {
    assert.equal(doc.meta.fileKey, null);
    assert.equal(doc.meta.figmaUrl, null);
    assert.equal(doc.meta.fileKeySha256, fingerprint(rawFileKeys[file.slug]));
  }
  assert.equal(await fs.readFile(path.join(out, '.payloads/.gitignore'), 'utf8'), '*\n');
  assert.equal(find(semantic, 'text/primary').values.Dark.target.key, foundationKey);
  assert.equal(find(semantic, 'text/inverse').values.Dark.target, null);
  assert.deepEqual(await readJson(path.join(out, '.payloads/semantic.json')), s);
});

test('single-input refresh reuses and reports the original cached timestamp', async (t) => {
  const root = await temp(t);
  const { f, s, fPath, sPath } = await inputs(root);
  const out = path.join(root, 'out');
  await convert({ from: [fPath, sPath], outDir: out });
  s.exportedAt = '2026-11-15T14:00:00.000Z';
  s.meta.variables['s-primary'].description = 'Updated description';
  await writeJson(sPath, s);
  const execution = cli('--from', sPath, '--out', out);
  assert.equal(execution.status, 0, execution.stderr);
  assert.match(execution.stdout, new RegExp(`Reused cached foundations.*${f.exportedAt.replaceAll('.', '\\.')}`));
  assert.match(execution.stdout, /age: [-\d.]+ hours/);
  assert.match(execution.stdout, /Conversion complete/);
  assert.equal((await readJson(path.join(out, 'foundations.json'))).meta.capturedAt, f.exportedAt);
  const semantic = await readJson(path.join(out, 'semantic.json'));
  assert.equal(semantic.meta.capturedAt, s.exportedAt);
  assert.equal(find(semantic, 'text/primary').description, 'Updated description');
  assert.deepEqual((await convert({ from: [sPath], outDir: out })).reused,
    [{ library: 'foundations', exportedAt: f.exportedAt }]);
});

test('invalid inputs and missing caches fail before modifying any assets or cache', async (t) => {
  const root = await temp(t);
  const { f, sPath, fPath } = await inputs(root);
  const out = path.join(root, 'existing');
  await convert({ from: [fPath, sPath], outDir: out });
  const before = await savedBytes(out);
  const clone = () => structuredClone(f);
  const cases = [
    ['malformed-json', '{'],
    ['unknown-key', { ...clone(), fileKey: 'unrecognized-synthetic-identity', fileName: 'Foundations' }],
    ['ambiguous-name', { ...clone(), fileKey: null, fileName: 'Foundations and Semantic' }],
    ['no-source', { ...clone(), source: 'other' }],
    ['bad-version', { ...clone(), pluginVersion: '' }],
    ['bad-date', { ...clone(), exportedAt: '2026-02-30T00:00:00.000Z' }],
    ['null-vars', { ...clone(), meta: { ...clone().meta, variables: null } }],
    ['array-vars', { ...clone(), meta: { ...clone().meta, variables: [] } }],
    ['null-collections', { ...clone(), meta: { ...clone().meta, variableCollections: null } }],
    ['array-collections', { ...clone(), meta: { ...clone().meta, variableCollections: [] } }],
  ];
  const mutate = (name, fn) => { const value = clone(); fn(value); cases.push([name, value]); };
  mutate('bad-map-id', (v) => { v.meta.variables['f-red'].id = 'wrong'; });
  mutate('bad-owner', (v) => { v.meta.variables['f-red'].variableCollectionId = 'missing'; });
  mutate('bad-collection-id', (v) => { v.meta.variableCollections.fc.id = 'wrong'; });
  mutate('bad-default-mode', (v) => { v.meta.variableCollections.fc.defaultModeId = 'unknown'; });
  mutate('missing-member', (v) => { v.meta.variableCollections.fc.variableIds = []; });
  mutate('bad-description', (v) => { v.meta.variables['f-red'].description = []; });
  mutate('bad-code-syntax', (v) => { v.meta.variables['f-red'].codeSyntax = { WEB: 7 }; });
  mutate('duplicate-cross-key', (v) => { v.meta.variables['f-red'].key = semanticKey; });
  mutate('bad-mode', (v) => { v.meta.variables['f-red'].valuesByMode = { invalid: { r: 1, g: 0, b: 0 } }; });
  mutate('bad-value', (v) => { v.meta.variables['f-red'].valuesByMode['f-mode'] = { r: 2, g: 0, b: 0 }; });
  mutate('empty', (v) => { v.meta.variables = {}; v.meta.variableCollections.fc.variableIds = []; });
  mutate('extension', (v) => { v.meta.variableCollections.fc.isExtension = true; });
  mutate('inherited', (v) => { v.meta.variableCollections.fc.inheritedVariableIds = ['inherited']; });
  for (const [name, value] of cases) {
    const input = path.join(root, `${name}.json`);
    await fs.writeFile(input, typeof value === 'string' ? value : JSON.stringify(value));
    for (const destination of [out, path.join(root, `fresh-${name}`)]) {
      const execution = cli('--from', input, '--from', sPath, '--out', destination);
      assert.notEqual(execution.status, 0, name);
      if (name === 'unknown-key') {
        assert.equal((execution.stdout + execution.stderr).includes(value.fileKey), false);
      }
      assert.ok(execution.stderr.includes(input), `${name}: ${execution.stderr}`);
      assert.doesNotMatch(execution.stdout, /Conversion complete/);
      if (destination === out) {
        assert.deepEqual(await savedBytes(out), before, name);
      } else {
        assert.equal(await exists(destination), false, name);
      }
    }
  }
  for (const input of [path.join(out, 'foundations.json'), fPath]) {
    const args = input === fPath ? ['--from', fPath, '--from', fPath] : ['--from', input, '--from', sPath];
    for (const destination of [out, path.join(root, `fresh-${input === fPath ? 'duplicate' : 'converted'}`)]) {
      const execution = cli(...args, '--out', destination);
      assert.notEqual(execution.status, 0);
      assert.match(execution.stderr, input === fPath ? /duplicate/i : /converted assets/i);
      assert.doesNotMatch(execution.stdout, /Conversion complete/);
      if (destination === out) {
        assert.deepEqual(await savedBytes(out), before);
      } else {
        assert.equal(await exists(destination), false);
      }
    }
  }
  const fresh = path.join(root, 'missing-cache');
  const missing = cli('--from', sPath, '--out', fresh);
  assert.notEqual(missing.status, 0);
  assert.match(missing.stderr, /\.payloads.*foundations\.json.*supply both/i);
  assert.equal(await exists(fresh), false);
});

test('cache identity is checked and CLI arguments are strict', async (t) => {
  const root = await temp(t);
  const { fPath, sPath, s } = await inputs(root);
  const out = path.join(root, 'out');
  await convert({ from: [fPath, sPath], outDir: out });
  await writeJson(path.join(out, '.payloads/foundations.json'), s);
  const before = await savedBytes(out);
  const swapped = cli('--from', sPath, '--out', out);
  assert.notEqual(swapped.status, 0);
  assert.match(swapped.stderr, /expected foundations.*semantic.*supply both/i);
  assert.deepEqual(await savedBytes(out), before);
  for (const args of [[], ['--from', fPath], ['--out', path.join(root, 'unused')],
    ['--from', '--out', out], ['--unknown'], ['--from', fPath, '--out', out, 'extra']]) {
    const execution = cli(...args);
    assert.notEqual(execution.status, 0, args.join(' '));
    assert.doesNotMatch(execution.stdout, /Conversion complete/);
    assert.deepEqual(await savedBytes(out), before);
  }
  await fs.writeFile(path.join(out, '.payloads/foundations.json'), '{');
  const corruptBefore = await savedBytes(out);
  const corrupt = cli('--from', sPath, '--out', out);
  assert.notEqual(corrupt.status, 0);
  assert.match(corrupt.stderr, /\.payloads.*foundations\.json.*supply both/i);
  assert.deepEqual(await savedBytes(out), corruptBefore);
  assert.equal(cli('--help').status, 0);
  const inferred = { ...s, fileKey: null };
  const inferredPath = await writeJson(path.join(root, 'inferred.json'), inferred);
  const another = path.join(root, 'inferred-out');
  const execution = cli('--from', fPath, '--from', inferredPath, '--out', another);
  assert.equal(execution.status, 0, execution.stderr);
  assert.match(execution.stdout, /inferred semantic identity from file name/i);
});

test('second output write failure is reported before any cache is published', async (t) => {
  const root = await temp(t);
  const { fPath, sPath } = await inputs(root);
  const out = path.join(root, 'out');
  await fs.mkdir(path.join(out, 'semantic.json'), { recursive: true });
  const execution = cli('--from', fPath, '--from', sPath, '--out', out);
  assert.notEqual(execution.status, 0);
  assert.ok(execution.stderr.includes(path.join(out, 'semantic.json')));
  assert.doesNotMatch(execution.stdout, /Conversion complete/);
  assert.equal(await exists(path.join(out, '.payloads')), false);
  assert.equal(await exists(path.join(out, 'foundations.json')), true); // Partial output is possible.
});

test('optional REST metadata failures do not mask required variables failures', async (t) => {
  const oldFetch = globalThis.fetch;
  t.after(() => { globalThis.fetch = oldFetch; });
  const { foundations } = fixtureData();
  const response = (status, body) => ({ status, ok: status >= 200 && status < 300, text: async () => JSON.stringify(body) });
  globalThis.fetch = async (url) => String(url).includes('/variables/local')
    ? response(200, { meta: { variables: foundations.variables, variableCollections: foundations.collections } })
    : response(403, { err: 'forbidden' });
  const [meta, data] = await Promise.all([
    fetchFileMeta(rawFileKeys.foundations, 'fake-token', 'foundations'),
    fetchVariables(rawFileKeys.foundations, 'fake-token', 'foundations'),
  ]);
  assert.deepEqual(meta, { name: null, version: null, lastModified: null });
  const flattened = flattenFile({ file: foundationsFile, data, fileMeta: meta });
  const document = buildDocument(flattened, resolveAliases([flattened]));
  assert.equal(document.meta.figmaFileName, null);
  assert.equal(document.meta.variableCount, 1);
  globalThis.fetch = async () => response(403, { err: 'forbidden' });
  await assert.rejects(fetchVariables(rawFileKeys.foundations, 'fake-token', 'foundations'), /403/);
  globalThis.fetch = async () => response(200, { meta: { variables: null, variableCollections: {} } });
  await assert.rejects(fetchVariables(rawFileKeys.foundations, 'fake-token', 'foundations'),
    /expected variable and collection maps/i);
});

test('producer visibly rejects unsupported extended collections', async () => {
  const source = await fs.readFile(producer, 'utf8');
  for (const collection of [
    { name: 'Extended', isExtension: true, remote: false },
    { name: 'Inherited', isExtension: false, inheritedVariableIds: ['v'], remote: false },
  ]) {
    const messages = [];
    let finish;
    const finished = new Promise((resolve) => { finish = resolve; });
    const figma = {
      showUI() {},
      ui: {
        postMessage(message) {
          messages.push(message);
          if (message.type === 'error') {
            finish();
          }
        },
      },
      variables: { async getLocalVariableCollectionsAsync() { return [collection]; } },
    };
    runInNewContext(source, { figma, __html__: '' });
    await finished;
    assert.match(messages.find((message) => message.type === 'error').message, /extended collection.*not supported/i);
    assert.equal(messages.some((message) => message.type === 'payload'), false);
  }
});

test('file identities use fingerprints and never fall back from an unknown supplied key', () => {
  for (const file of FILES) {
    assert.equal(identifyLibrary({ fileKey: rawFileKeys[file.slug] }).slug, file.slug);
    assert.equal(file.fileKeySha256, fingerprint(rawFileKeys[file.slug]));
    assert.equal(Object.hasOwn(file, 'fileKey'), false);
    assert.equal(Object.hasOwn(file, 'url'), false);
  }
  const bad = 'another-synthetic-identity';
  assert.throws(() => identifyLibrary({ fileKey: bad, fileName: 'Foundations' }),
    (error) => /unknown/i.test(error.message) && !error.message.includes(bad));
  assert.throws(() => identifyLibrary({ fileKey: null, fileName: 'Foundations and Semantic' }), /ambiguous/i);
  assert.throws(() => identifyLibrary({ fileKey: null, fileName: 'Unrelated' }), /unknown/i);
  assert.equal(identifyLibrary({ fileKey: '', fileName: 'Foundations' }).slug, 'foundations');
});

test('REST rejects missing or wrong identities before reading credentials or fetching', async (t) => {
  const root = await temp(t);
  const valid = {
    FIGMA_FOUNDATIONS_FILE_KEY: rawFileKeys.foundations,
    FIGMA_SEMANTIC_FILE_KEY: rawFileKeys.semantic,
  };
  assert.deepEqual([...resolveFileKeys(valid).keys()], ['foundations', 'semantic']);
  const wrong = 'unrecognized-synthetic-file-identity';
  const cases = [
    [{}, /FIGMA_FOUNDATIONS_FILE_KEY/],
    [{ FIGMA_FOUNDATIONS_FILE_KEY: valid.FIGMA_FOUNDATIONS_FILE_KEY }, /FIGMA_SEMANTIC_FILE_KEY/],
    [{ ...valid, FIGMA_FOUNDATIONS_FILE_KEY: wrong }, /foundations.*fingerprint/i],
    [{ ...valid, FIGMA_SEMANTIC_FILE_KEY: wrong }, /semantic.*fingerprint/i],
  ];
  for (const [keys, expected] of cases) {
    const env = { ...process.env, HOME: root, FIGMA_TOKEN: '', FIGMA_ACCESS_TOKEN: '' };
    delete env.FIGMA_FOUNDATIONS_FILE_KEY;
    delete env.FIGMA_SEMANTIC_FILE_KEY;
    Object.assign(env, keys);
    const execution = spawnSync(process.execPath, [exporter, '--out', path.join(root, 'out')], {
      encoding: 'utf8', env,
    });
    assert.notEqual(execution.status, 0);
    assert.match(execution.stderr, expected);
    assert.doesNotMatch(execution.stderr, /No Figma token/i);
    assert.equal((execution.stdout + execution.stderr).includes(wrong), false);
    assert.equal((execution.stdout + execution.stderr).includes(rawFileKeys.foundations), false);
    assert.equal(await exists(path.join(root, 'out')), false);
  }
});

test('REST request failures report only library and status, not response data', async (t) => {
  const oldFetch = globalThis.fetch;
  t.after(() => { globalThis.fetch = oldFetch; });
  const key = rawFileKeys.foundations;
  const token = 'synthetic-access-token';
  const location = ['https:', '//', ['tenant', 'atlassian', 'net'].join('.'), '/wiki/example'].join('');
  const secretBody = `private body ${key} ${token} ${location}`;
  const safeError = (error) => {
    assert.match(error.message, /foundations/i);
    for (const value of [key, token, location, secretBody]) {
      assert.equal(error.message.includes(value), false);
    }
    return true;
  };
  globalThis.fetch = async () => ({
    status: 403, ok: false, text: async () => JSON.stringify({ err: secretBody }),
  });
  await assert.rejects(fetchVariables(key, token, 'foundations'), (error) => {
    assert.match(error.message, /HTTP 403/);
    return safeError(error);
  });
  globalThis.fetch = async () => ({ status: 502, ok: false, text: async () => secretBody });
  await assert.rejects(fetchVariables(key, token, 'foundations'), (error) => {
    assert.match(error.message, /HTTP 502/);
    return safeError(error);
  });
  globalThis.fetch = async () => { throw new Error(secretBody); };
  await assert.rejects(fetchVariables(key, token, 'foundations'), safeError);
});

test('final conversion guards reject private locations before writing or caching', async (t) => {
  const root = await temp(t);
  const { fPath, sPath, s } = await inputs(root);
  const out = path.join(root, 'existing');
  await convert({ from: [fPath, sPath], outDir: out });
  const before = await savedBytes(out);
  const locations = [
    ['https:', '//', ['tenant', 'atlassian', 'net'].join('.'), '/wiki/example'].join(''),
    ['ftp:', '//', ['www', 'figma', 'com'].join('.'), '/design/example'].join(''),
    ['//', ['internal', 'trendmicro', 'com'].join('.'), '/resource'].join(''),
    rawFileKeys.foundations,
  ];
  for (const [index, location] of locations.entries()) {
    s.meta.variables['s-primary'].description = `Context: ${location}`;
    await writeJson(sPath, s);
    for (const destination of [out, path.join(root, `fresh-${index}`)]) {
      const execution = cli('--from', fPath, '--from', sPath, '--out', destination);
      assert.notEqual(execution.status, 0);
      assert.match(execution.stderr, /semantic.*private location/i);
      assert.equal((execution.stdout + execution.stderr).includes(location), false);
      if (destination === out) assert.deepEqual(await savedBytes(out), before);
      else assert.equal(await exists(destination), false);
    }
  }
});

test('REST validates both serialized snapshots before writing either and preserves strings', async (t) => {
  const root = await temp(t);
  const oldFetch = globalThis.fetch;
  t.after(() => { globalThis.fetch = oldFetch; });
  const data = fixtureData();
  const value = 'literal token value remains unchanged';
  data.foundations.variables['f-red'].resolvedType = 'STRING';
  data.foundations.variables['f-red'].valuesByMode['f-mode'] = value;
  const response = (body) => ({ status: 200, ok: true, text: async () => JSON.stringify(body) });
  globalThis.fetch = async (request) => {
    const key = String(request).includes(rawFileKeys.foundations) ? 'foundations' : 'semantic';
    return String(request).includes('/variables/local')
      ? response({ meta: { variables: data[key].variables, variableCollections: data[key].collections } })
      : response({ name: key });
  };
  const env = {
    FIGMA_FOUNDATIONS_FILE_KEY: rawFileKeys.foundations,
    FIGMA_SEMANTIC_FILE_KEY: rawFileKeys.semantic,
  };
  const good = path.join(root, 'good');
  await exportSnapshots({ outDir: good, token: 'synthetic-token', env });
  const foundation = await readJson(path.join(good, 'foundations.json'));
  assert.equal(find(foundation, 'red/500').values.Value.value, value);
  assert.equal(foundation.meta.fileKey, null);
  assert.equal(foundation.meta.figmaUrl, null);
  assert.equal(foundation.meta.fileKeySha256, fingerprint(rawFileKeys.foundations));
  const location = ['https:', '//', ['www', 'figma', 'com'].join('.'), '/file/example'].join('');
  for (const [index, value] of [location, rawFileKeys.semantic].entries()) {
    data.semantic.variables['s-primary'].description = `Private: ${value}`;
    const rejected = path.join(root, `rejected-${index}`);
    await assert.rejects(exportSnapshots({ outDir: rejected, token: 'synthetic-token', env }),
      (error) => /semantic.*private location/i.test(error.message) && !error.message.includes(value));
    assert.equal(await exists(rejected), false);
  }
});

test('an unsafe preexisting cache ignore file fails before modifying snapshots', async (t) => {
  const root = await temp(t);
  const { fPath, sPath } = await inputs(root);
  const out = path.join(root, 'out');
  await convert({ from: [fPath, sPath], outDir: out });
  await fs.writeFile(path.join(out, '.payloads/.gitignore'), '*\n!*.json\n');
  const before = await savedBytes(out);
  await assert.rejects(convert({ from: [fPath, sPath], outDir: out }), /raw cache must be ignored/i);
  assert.deepEqual(await savedBytes(out), before);
});
