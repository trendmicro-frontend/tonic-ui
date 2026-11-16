import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, unlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import test, { describe } from 'node:test';
import { fileURLToPath } from 'node:url';

const source = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const checker = join(source, 'check-mcp-version.mjs');
const label = 'v3';

const REQUIRED_FILES = [
  'tonic-ui-mcp.config.js',
  'packages/react-docs/pages/llms.txt',
  'packages/react-docs/pages/getting-started/mcp/index.page.mdx',
  'packages/mcp/README.md',
];

const labelledFiles = (versionLabel) => ({
  'tonic-ui-mcp.config.js': `module.exports = { version: '${versionLabel}' };\n`,
  'packages/react-docs/pages/llms.txt': `# @tonic-ui/react ${versionLabel}\n`,
  'packages/react-docs/pages/getting-started/mcp/index.page.mdx': `\`\`\`js\nmodule.exports = { version: '${versionLabel}' };\n\`\`\`\n`,
  'packages/mcp/README.md': `\`\`\`js\nmodule.exports = { version: '${versionLabel}' };\n\`\`\`\n`,
});

const readmeRows = (rows) => `# Tonic UI

Version | Link
:-- | :--
${rows}
`;

const fixtureFiles = {
  'tonic-ui-version.config.js': `module.exports = {
  versions: [
    { prerelease: true, branch: 'main', label: '${label}' },
    { branch: 'v2', label: 'v2' },
    { branch: 'v1', label: 'v1' },
  ],
};
`,
  ...labelledFiles(label),
  'README.md': readmeRows(`${label} (current) | https://example.test/tonic-ui/${label}`),
};

// A maintenance line plus main, with every duplicated label set to the line a
// suffixed branch (`v2-stg`, `v2-alpha`) must resolve to.
const releaseLineFixture = {
  'tonic-ui-version.config.js': fixtureFiles['tonic-ui-version.config.js'],
  ...labelledFiles('v2'),
  'README.md': readmeRows(
    'v2 | https://example.test/tonic-ui/v2\n' +
      'v1 | https://example.test/tonic-ui/v1\n' +
      `${label} (current) | https://example.test/tonic-ui/${label}`
  ),
};

const createFixture = (overrides = {}) => {
  const root = mkdtempSync(join(tmpdir(), 'tonic-ui-version-sync-'));
  mkdirSync(join(root, '.git'), { recursive: true });
  for (const [file, content] of Object.entries({ ...fixtureFiles, ...overrides })) {
    mkdirSync(dirname(join(root, file)), { recursive: true });
    writeFileSync(join(root, file), content);
  }
  return root;
};

const git = (root, ...args) => {
  const result = spawnSync('git', args, { cwd: root, encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
  return result.stdout.trim();
};

const commitOnBranch = (root, branch) => {
  git(root, 'init', '-b', branch);
  git(root, 'config', 'user.email', 'fixture@example.invalid');
  git(root, 'config', 'user.name', 'Fixture');
  git(root, 'add', '.');
  git(root, 'commit', '-m', 'fixture');
};

const run = (root, { args = [], env = process.env, cwd = root, script = checker } = {}) =>
  spawnSync(process.execPath, [script, ...args], { cwd, encoding: 'utf8', env });

const check = (root) => run(root, { args: [`--label=${label}`] });

// The checker treats VALIDATION_BRANCH as authoritative, so tests that resolve the
// line themselves must start from an environment without it.
const withoutValidationBranch = () => {
  const env = { ...process.env };
  delete env.VALIDATION_BRANCH;
  return env;
};

const withFixture = (t, fn, overrides) => {
  const root = createFixture(overrides);
  t.after(() => rmSync(root, { recursive: true, force: true }));
  return fn(root);
};

describe('skills/tonic-ui-version / Version label consistency', () => {
  test('complete checkout-shaped fixture passes', (t) => withFixture(t, (root) => {
    const result = check(root);
    assert.equal(result.status, 0, result.stdout + result.stderr);
    assert.match(result.stdout, /All version labels are in sync\./);
  }));

  test('VALIDATION_BRANCH resolves the registry label and rejects unknown branches', (t) => withFixture(t, (root) => {
    const withBranch = (branch) => run(root, { env: { ...process.env, VALIDATION_BRANCH: branch } });
    const valid = withBranch('main');
    assert.equal(valid.status, 0, valid.stdout + valid.stderr);
    assert.match(valid.stdout, /VALIDATION_BRANCH/);
    const invalid = withBranch('unknown');
    assert.equal(invalid.status, 1, invalid.stdout + invalid.stderr);
    assert.match(invalid.stderr, /Unknown validation branch: unknown/);
  }));

  test('explicit label overrides validation branch and unknown labels fail', (t) => withFixture(t, (root) => {
    const env = { ...process.env, VALIDATION_BRANCH: 'unknown' };
    const explicit = run(root, { args: ['--label=v3'], env });
    assert.equal(explicit.status, 0, explicit.stdout + explicit.stderr);
    assert.match(explicit.stdout, /explicit --label/);
    const unknown = run(root, { args: ['--label=v9'], env });
    assert.equal(unknown.status, 1, unknown.stdout + unknown.stderr);
    assert.match(unknown.stderr, /does not match any label in the registry/);
  }));

  for (const branch of ['v1', 'v1-alpha']) {
    test(`VALIDATION_BRANCH resolves ${branch} to the v1 maintenance line`, (t) => withFixture(
      t,
      (root) => {
        const result = run(root, { env: { ...process.env, VALIDATION_BRANCH: branch } });
        assert.equal(result.status, 0, result.stdout + result.stderr);
        assert.match(result.stdout, /expected label:  v1/);
      },
      { ...releaseLineFixture, ...labelledFiles('v1') }
    ));
  }

  // ci-branch.yml (github.ref_name) and ci-pr.yml (pull_request.base.ref) both pass
  // suffixed release branches, which must resolve to their release line instead of
  // being rejected as unknown.
  for (const branch of ['v2-stg', 'v2-alpha', 'v2-anything']) {
    test(`VALIDATION_BRANCH resolves CI suffixed branch ${branch} to release line v2`, (t) => withFixture(
      t,
      (root) => {
        const result = run(root, { env: { ...process.env, VALIDATION_BRANCH: branch } });
        assert.equal(result.status, 0, result.stdout + result.stderr);
        assert.match(result.stdout, new RegExp(`VALIDATION_BRANCH ${branch} -> release line v2`));
        assert.match(result.stdout, /expected label:  v2/);
      },
      releaseLineFixture
    ));
  }

  test('unknown branches and malformed suffixed branches stay rejected', (t) => withFixture(t, (root) => {
    // `v3-stg` pins the suffix to a registry *branch*, not a label: v3 is main's
    // label here, so there is no v3 release line for it to resolve to.
    for (const branch of ['unknown', 'v9-stg', 'v2-', 'v2.1', 'main-stg', 'feature/v2', 'v3-stg']) {
      const result = run(root, { env: { ...process.env, VALIDATION_BRANCH: branch } });
      assert.equal(result.status, 1, `${branch}: ${result.stdout}${result.stderr}`);
      assert.ok(
        result.stderr.includes(`Unknown validation branch: ${branch}`),
        `${branch}: ${result.stderr}`
      );
    }
  }, releaseLineFixture));

  test('a suffixed release branch checked out locally resolves its release line', (t) => withFixture(
    t,
    (root) => {
      commitOnBranch(root, 'v2-alpha');
      const result = run(root, { env: withoutValidationBranch() });
      assert.equal(result.status, 0, result.stdout + result.stderr);
      assert.match(result.stdout, /release line v2-alpha -> v2/);
      assert.match(result.stdout, /expected label:  v2/);
    },
    releaseLineFixture
  ));

  test('cached helpers use the nested active checkout, source helpers fall back to their checkout', (t) => withFixture(
    t,
    (root) => {
      const cache = mkdtempSync(join(tmpdir(), 'tonic-ui-version-cache-'));
      const other = createFixture();
      t.after(() => {
        rmSync(cache, { recursive: true, force: true });
        rmSync(other, { recursive: true, force: true });
      });
      for (const file of ['check-mcp-version.mjs', 'repo-root.mjs']) {
        copyFileSync(join(source, file), join(cache, file));
      }
      const cached = join(cache, 'check-mcp-version.mjs');
      const nested = join(root, 'packages/react-docs/pages');
      const active = run(root, { script: cached, cwd: nested, env: { ...process.env, VALIDATION_BRANCH: 'v2' } });
      assert.equal(active.status, 0, active.stdout + active.stderr);
      assert.match(active.stdout, /expected label:  v2/);

      const missing = run(root, { script: cached, cwd: cache, env: withoutValidationBranch() });
      assert.equal(missing.status, 1, missing.stdout + missing.stderr);
      assert.match(missing.stderr, /A Tonic UI checkout is required/);

      const sourceDir = join(other, 'skills/tonic-ui-version/scripts');
      mkdirSync(sourceDir, { recursive: true });
      for (const file of ['check-mcp-version.mjs', 'repo-root.mjs']) {
        copyFileSync(join(source, file), join(sourceDir, file));
      }
      const fallback = run(root, { script: join(sourceDir, 'check-mcp-version.mjs'), cwd: cache, args: ['--label=v3'] });
      assert.equal(fallback.status, 0, fallback.stdout + fallback.stderr);
      assert.match(fallback.stdout, /expected label:  v3/);

      const preferred = run(root, { script: join(sourceDir, 'check-mcp-version.mjs'), cwd: nested, env: { ...process.env, VALIDATION_BRANCH: 'v2' } });
      assert.equal(preferred.status, 0, preferred.stdout + preferred.stderr);
      assert.match(preferred.stdout, /expected label:  v2/);
    },
    releaseLineFixture
  ));

  for (const file of REQUIRED_FILES) {
    test(`missing required duplicated-label file fails: ${file}`, (t) => withFixture(t, (root) => {
      unlinkSync(join(root, file));
      const result = check(root);
      assert.equal(result.status, 1, result.stdout + result.stderr);
      assert.match(result.stdout, /required file not found/);
      assert.ok(result.stdout.includes(file), result.stdout);
    }));

    test(`mismatched or missing duplicated label fails: ${file}`, (t) => withFixture(t, (root) => {
      const path = join(root, file);
      const original = readFileSync(path, 'utf8');
      writeFileSync(path, original.replace(label, 'v2'));
      const mismatch = check(root);
      assert.equal(mismatch.status, 1, mismatch.stdout + mismatch.stderr);
      assert.ok(mismatch.stdout.includes(file), mismatch.stdout);
      assert.match(mismatch.stdout, /found "v2", expected "v3"/);
      writeFileSync(path, 'no label here\n');
      const missing = check(root);
      assert.equal(missing.status, 1, missing.stdout + missing.stderr);
      assert.ok(missing.stdout.includes(file), missing.stdout);
      assert.match(missing.stdout, /no version literal found/);
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
});
