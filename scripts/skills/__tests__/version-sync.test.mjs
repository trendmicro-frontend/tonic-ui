import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, unlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const checker = join(repoRoot, 'skills/internal/tonic-ui-version/scripts/check-version-sync.mjs');
const label = 'v3';

const REQUIRED_FILES = [
  'tonic-ui-mcp.config.js',
  'packages/react-docs/pages/llms.txt',
  'packages/react-docs/pages/getting-started/mcp/index.page.mdx',
  'packages/mcp/README.md',
];

const fixtureFiles = {
  'tonic-ui-version.config.js': `module.exports = {
  versions: [{ prerelease: true, branch: 'main', label: '${label}' }, { branch: 'v2', label: 'v2' }],
};
`,
  'tonic-ui-mcp.config.js': `module.exports = { version: '${label}' };\n`,
  'packages/react-docs/pages/llms.txt': `# @tonic-ui/react ${label}\n`,
  'packages/react-docs/pages/getting-started/mcp/index.page.mdx': `\`\`\`js\nmodule.exports = { version: '${label}' };\n\`\`\`\n`,
  'packages/mcp/README.md': `\`\`\`js\nmodule.exports = { version: '${label}' };\n\`\`\`\n`,
  'README.md': `# Tonic UI

Version | Link
:-- | :--
${label} (current) | https://example.test/tonic-ui/${label}
`,
};

const createFixture = () => {
  const root = mkdtempSync(join(tmpdir(), 'tonic-ui-version-sync-'));
  mkdirSync(join(root, '.git'), { recursive: true });
  for (const [file, content] of Object.entries(fixtureFiles)) {
    mkdirSync(dirname(join(root, file)), { recursive: true });
    writeFileSync(join(root, file), content);
  }
  return root;
};

const check = (root) => spawnSync(process.execPath, [checker, `--label=${label}`], {
  cwd: root,
  encoding: 'utf8',
});

const withFixture = (t, fn) => {
  const root = createFixture();
  t.after(() => rmSync(root, { recursive: true, force: true }));
  return fn(root);
};

test('complete checkout-shaped fixture passes', (t) => withFixture(t, (root) => {
  const result = check(root);
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.match(result.stdout, /All version labels are in sync\./);
}));

for (const file of REQUIRED_FILES) {
  test(`missing required duplicated-label file fails: ${file}`, (t) => withFixture(t, (root) => {
    unlinkSync(join(root, file));
    const result = check(root);
    assert.equal(result.status, 1, result.stdout + result.stderr);
    assert.match(result.stdout, /required file not found/);
    assert.ok(result.stdout.includes(file), result.stdout);
  }));
}

test('missing root README fails', (t) => withFixture(t, (root) => {
  unlinkSync(join(root, 'README.md'));
  const result = check(root);
  assert.equal(result.status, 1, result.stdout + result.stderr);
  assert.match(result.stdout, /README\.md — required file not found/);
}));

test('missing expected README marker fails', (t) => withFixture(t, (root) => {
  writeFileSync(join(root, 'README.md'), `# Tonic UI

Version | Link
:-- | :--
${label} | https://example.test/tonic-ui/${label}
`);
  const result = check(root);
  assert.equal(result.status, 1, result.stdout + result.stderr);
  assert.match(result.stdout, /README\.md — required "\(current\)" marker not found/);
}));

test('incorrect README marker label fails', (t) => withFixture(t, (root) => {
  writeFileSync(join(root, 'README.md'), `# Tonic UI

Version | Link
:-- | :--
${label} | https://example.test/tonic-ui/${label}
v2 (current) | https://example.test/tonic-ui/v2
`);
  const result = check(root);
  assert.equal(result.status, 1, result.stdout + result.stderr);
  assert.match(result.stdout, /"\(current\)" marker says "v2"/);
}));

test('missing version-table row fails', (t) => withFixture(t, (root) => {
  writeFileSync(join(root, 'README.md'), `# Tonic UI

Version | Link
:-- | :--
v2 (current) | https://example.test/tonic-ui/v2
`);
  const result = check(root);
  assert.equal(result.status, 1, result.stdout + result.stderr);
  assert.match(result.stdout, /README\.md — no version-table row for "v3"/);
}));
