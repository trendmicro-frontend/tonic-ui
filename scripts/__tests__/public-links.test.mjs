import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import {
  chmodSync, copyFileSync, mkdirSync, mkdtempSync, readFileSync,
  rmSync, symlinkSync, writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import test, { describe } from 'node:test';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { findPrivateLocations, validatePublicLinks } from '../validate-public-links.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const validator = join(repoRoot, 'scripts/validate-public-links.mjs');
const directories = [
  'skills', 'plugins', 'scripts/skills', 'scripts/plugins', 'scripts/figma-variables',
  'scripts/__tests__', 'test/ai-tooling', 'test/__tests__',
];
const files = [
  '.claude-plugin/marketplace.json', '.agents/plugins/marketplace.json', 'README.md',
  'CONTRIBUTING.md', 'AGENTS.md', 'scripts/README.md', 'test/README.md',
  'scripts/validate-ai-tooling.mjs', 'scripts/validate-public-links.mjs',
];
const link = (scheme, domain, path = '/') => `${scheme ? `${scheme}:` : ''}//${domain.join('.')}${path}`;
const denied = [
  { kind: 'atlassian', value: link('https', ['atlassian', 'net'], '/wiki/example') },
  { kind: 'atlassian', value: link('', ['team', 'service', 'atlassian', 'net'], '/browse/example') },
  { kind: 'trendmicro', value: link('https', ['internal', 'trendmicro', 'com'], '/example') },
  { kind: 'trendmicro', value: link('ftp', ['deep', 'private', 'trendmicro', 'com'], '/example') },
  ...['file', 'design', 'proto', 'board'].map((path) => ({
    kind: 'figma', value: link('https', ['www', 'figma', 'com'], `/${path}/example`),
  })),
  { kind: 'figma', value: link('', ['figma', 'com'], '/design/example') },
];
const publicLinks = [
  link('https', ['github', 'com'], '/trendmicro-frontend/tonic-ui'),
  link('https', ['trendmicro-frontend', 'github', 'io'], '/tonic-ui-docs/v3/'),
  link('https', ['api', 'figma', 'com'], '/v1/files/example/variables/local'),
  link('https', ['figma', 'com'], '/community/example'),
];

function put(root, path, text) {
  const target = join(root, path);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, text);
}

function fixture(fn) {
  const root = mkdtempSync(join(tmpdir(), 'tonic-public-links-'));
  try {
    for (const path of directories) mkdirSync(join(root, path), { recursive: true });
    for (const path of files) put(root, path, path.endsWith('.json') ? '{}\n' : 'fixture\n');
    return fn(root);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

function failure(fn) {
  try {
    fn();
    assert.fail('Expected validation to fail');
  } catch (error) {
    if (error.code === 'ERR_ASSERTION') throw error;
    return error.message;
  }
}

describe('public-link locations', () => {
  test('detects each private host and Figma path with protocol or scheme-relative syntax', () => {
    for (const { value, kind } of denied) {
      const prefix = 'prefix 🟣 ';
      const locations = findPrivateLocations(`${prefix}${value}\n`);
      assert.deepEqual(locations, [{ offset: prefix.length, kind }]);
      assert.deepEqual(Object.keys(locations[0]).sort(), ['kind', 'offset']);
    }
  });

  test('allows public sources, non-file Figma pages, fingerprints and null or empty location fields', () => {
    for (const value of publicLinks) assert.deepEqual(findPrivateLocations(value), []);
    const snapshot = JSON.stringify({
      meta: { fileKey: null, figmaUrl: '', fileKeySha256: 'a'.repeat(64) },
      variables: [{ name: 'example', value: 'rgba(12, 34, 56, 0.5)' }],
    });
    assert.deepEqual(findPrivateLocations(snapshot), []);
  });

  test('recognizes escaped locations and field names without exposing their values', () => {
    const value = denied[0].value;
    for (const encoded of [
      JSON.stringify({ description: value }).replaceAll('/', '\\/'),
      JSON.stringify({ description: value }).replaceAll('/', '\\u002f'),
    ]) {
      const locations = findPrivateLocations(encoded);
      assert.deepEqual(locations, [{ offset: encoded.indexOf('https'), kind: 'atlassian' }]);
    }
    const escapedField = String.raw`{"meta":{"file\u004bey":"synthetic-identity"}}`;
    assert.deepEqual(findPrivateLocations(escapedField), [{ offset: escapedField.indexOf('"file'), kind: 'fileKey' }]);
  });

  test('rejects nonempty or non-null private fields in serialized snapshots', () => {
    for (const name of ['fileKey', 'figmaUrl']) {
      for (const value of ['synthetic-identity', 0, false, {}, []]) {
        const text = JSON.stringify({ meta: { [name]: value, fileKeySha256: 'b'.repeat(64) } });
        assert.deepEqual(findPrivateLocations(text), [{ offset: text.indexOf(`"${name}"`), kind: name }]);
      }
    }
  });
});

describe('public-link repository validation', () => {
  test('checks required text files without altering token values', () => fixture((root) => {
    const path = 'plugins/tokens/assets/figma-variables/foundations.json';
    const tokenValue = 'rgba(12, 34, 56, 0.5)';
    const snapshot = `${JSON.stringify({
      meta: { fileKey: null, figmaUrl: null, fileKeySha256: 'c'.repeat(64) },
      variables: [{ value: tokenValue }],
    }, null, 2)}\n`;
    put(root, path, snapshot);
    assert.deepEqual(validatePublicLinks(root), { filesChecked: files.length + 1 });
    assert.equal(readFileSync(join(root, path), 'utf8'), snapshot);
    assert.equal(JSON.parse(readFileSync(join(root, path), 'utf8')).variables[0].value, tokenValue);
  }));

  test('scans every required directory, catalog and root document with redacted file and line diagnostics', () => fixture((root) => {
    const targets = [
      ...directories.map((path) => `${path}/nested/resource.md`),
      ...files,
    ];
    const value = denied[0].value;
    for (const path of targets) put(root, path, `first line\n${value}\n`);
    const message = failure(() => validatePublicLinks(root));
    for (const path of targets) assert.ok(message.includes(`${path}:2: atlassian`));
    assert.ok(!message.includes(value), 'diagnostics must not include the private location');
  }));

  test('finds private locations in nested markdown, JSON and scripts', () => fixture((root) => {
    const targets = [
      ['skills/a/deep/reference.md', denied[1]],
      ['plugins/a/.claude-plugin/plugin.json', denied[2]],
      ['scripts/plugins/nested/example.mjs', denied[8]],
    ];
    put(root, targets[0][0], `# example\n\n${targets[0][1].value}\n`);
    put(root, targets[1][0], JSON.stringify({ description: targets[1][1].value }, null, 2));
    put(root, targets[2][0], `// sample\nconst value = ${JSON.stringify(targets[2][1].value)};\n`);
    const message = failure(() => validatePublicLinks(root));
    for (const [path, { kind, value }] of targets) {
      assert.ok(message.includes(`${path}:`));
      assert.ok(message.includes(`: ${kind}`));
      assert.ok(!message.includes(value), 'diagnostics must not include private locations');
    }
  }));

  test('rejects private snapshot fields without disclosing the field values', () => fixture((root) => {
    const path = 'plugins/tokens/assets/figma-variables/semantic.json';
    const key = 'synthetic-capture-identity';
    put(root, path, JSON.stringify({ meta: { fileKey: key, figmaUrl: null } }, null, 2));
    const message = failure(() => validatePublicLinks(root));
    assert.ok(message.includes(`${path}:3: fileKey`));
    assert.ok(!message.includes(key), 'diagnostics must not include the identity');
  }));

  test('ignores hidden raw caches, generated directories, binary files and directory symlinks', () => fixture((root) => {
    const value = denied[0].value;
    for (const path of [
      'scripts/figma-variables/.payloads/capture.json', 'skills/.cache/value.txt',
      'plugins/component/dist/output.js', 'plugins/node_modules/package/readme.md',
    ]) put(root, path, value);
    put(root, 'private/linked/resource.md', value);
    symlinkSync(join(root, 'private/linked'), join(root, 'skills/linked-directory'), 'dir');
    put(root, 'skills/image.bin', Buffer.from([0, 255, 1]));
    assert.deepEqual(validatePublicLinks(root), { filesChecked: files.length });
  }));

  test('checks linked files without following linked directories', () => fixture((root) => {
    const value = denied[3].value;
    put(root, 'skills/resource.md', value);
    symlinkSync(join(root, 'skills/resource.md'), join(root, 'skills/linked-file.md'));
    const message = failure(() => validatePublicLinks(root));
    assert.ok(message.includes('skills/linked-file.md:1: trendmicro'));
    assert.ok(!message.includes(value), 'diagnostics must not include private locations');
  }));

  test('does not read linked files outside the required scope or inside raw caches', () => fixture((root) => {
    put(root, 'private/resource.md', 'outside scope');
    symlinkSync(join(root, 'private/resource.md'), join(root, 'skills/linked-file.md'));
    assert.match(failure(() => validatePublicLinks(root)), /Linked file escapes scan scope: skills\/linked-file\.md/);
    rmSync(join(root, 'skills/linked-file.md'));
    put(root, 'scripts/figma-variables/.payloads/capture.json', 'private input');
    symlinkSync(join(root, 'scripts/figma-variables/.payloads/capture.json'), join(root, 'skills/linked-file.md'));
    assert.match(failure(() => validatePublicLinks(root)), /Linked file escapes scan scope: skills\/linked-file\.md/);
  }));

  test('fails for missing required roots and unreadable entries', () => fixture((root) => {
    const missing = join(root, 'test/__tests__');
    rmSync(missing, { recursive: true });
    assert.match(failure(() => validatePublicLinks(root)), /required directory: test\/__tests__/);
    mkdirSync(missing);
    rmSync(join(root, 'AGENTS.md'));
    assert.match(failure(() => validatePublicLinks(root)), /required file: AGENTS\.md/);
    put(root, 'AGENTS.md', 'fixture\n');
    symlinkSync('missing-target', join(root, 'skills/unreadable.md'));
    assert.match(failure(() => validatePublicLinks(root)), /Cannot read entry: skills\/unreadable\.md/);
  }));

  test('fails when a required file cannot be read', (t) => fixture((root) => {
    const path = join(root, 'README.md');
    chmodSync(path, 0);
    try {
      let unreadable = false;
      try {
        readFileSync(path);
      } catch {
        unreadable = true;
      }
      if (!unreadable) return t.skip('Current privileges bypass file permissions');
      assert.match(failure(() => validatePublicLinks(root)), /Cannot read file: README\.md/);
    } finally {
      chmodSync(path, 0o600);
    }
  }));

  test('does not execute the CLI on import', () => {
    const execution = spawnSync(process.execPath, [
      '--input-type=module', '--eval', 'await import(process.argv[1])', pathToFileURL(validator).href,
    ], { encoding: 'utf8' });
    assert.equal(execution.status, 0);
    assert.equal(execution.stdout, '');
    assert.equal(execution.stderr, '');
  });

  test('CLI fails with a redacted diagnostic and accepts no arguments', () => fixture((root) => {
    const script = join(root, 'scripts/validate-public-links.mjs');
    copyFileSync(validator, script);
    const value = denied[4].value;
    put(root, 'README.md', `heading\n${value}\n`);
    const execution = spawnSync(process.execPath, [script], { cwd: root, encoding: 'utf8' });
    assert.notEqual(execution.status, 0);
    assert.ok(execution.stderr.includes('README.md:2: figma'), 'CLI must report the file, line and type');
    assert.ok(!execution.stdout.includes(value) && !execution.stderr.includes(value), 'CLI must not echo private locations');
    const args = spawnSync(process.execPath, [script, '--unexpected'], { cwd: root, encoding: 'utf8' });
    assert.notEqual(args.status, 0);
    assert.match(args.stderr, /takes no arguments/);
    assert.ok(!args.stdout.includes(value) && !args.stderr.includes(value));
  }));
});
