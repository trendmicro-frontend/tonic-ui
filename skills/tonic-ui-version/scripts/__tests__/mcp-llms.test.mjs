import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import test, { describe } from 'node:test';

const source = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const entry = (path, title = 'Guide', classification = 'Read this guide.') => `[${title}]({{PAGE_BASE}}/${path}): <classification>${classification}</classification>`;
const fixture = (fn) => {
  const root = mkdtempSync(join(tmpdir(), 'tonic-llms-audit-'));
  const put = (path, bytes) => {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), bytes);
  };
  try {
    put('.git', 'fixture');
    put('tonic-ui-version.config.js', 'module.exports = {};');
    for (const file of ['check-mcp-llms.mjs', 'repo-root.mjs']) {
      put(`skills/tonic-ui-version/scripts/${file}`, readFileSync(join(source, file)));
    }
    const page = (path, body = '# Guide\n') => put(`packages/react-docs/pages/${path}`, body);
    const index = (text) => page('llms.txt', text);
    const run = (...args) => spawnSync(process.execPath, [join(root, 'skills/tonic-ui-version/scripts/check-mcp-llms.mjs'), ...args], { cwd: root, encoding: 'utf8' });
    fn({ root, page, index, run });
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
};

describe('skills/tonic-ui-version / Documentation index', () => {
  test('complete source coverage and legitimate cross-classification duplicates pass', () => fixture(({ page, index, run }) => {
    page('guide/index.page.mdx');
    page('_app.page.js', 'framework');
    index(`${entry('guide/')}\n${entry('guide/', 'Also guide', 'Other classification.')}`);
    assert.equal(run().status, 0);
    page('new/index.page.mdx');
    assert.equal(run().status, 1);
  }));

  test('deleted indexed pages fail', () => fixture(({ index, run }) => {
    index(entry('deleted/'));
    assert.equal(run().status, 1);
  }));

  test('missing index fails instead of silently skipping coverage', () => fixture(({ page, run }) => {
    page('guide/index.page.mdx');
    const result = run();
    assert.equal(result.status, 1, result.stdout + result.stderr);
    assert.match(result.stderr, /llms\.txt/);
  }));

  for (const [name, link] of [
    ['empty link titles', entry('guide/', '', 'Read')],
    ['empty classifications', entry('guide/', 'Guide', '')],
    ['links with query parameters', entry('guide/?x=1')],
    ['links with fragments', entry('guide/#section')],
    ['parent-directory paths', entry('../guide/')],
    ['paths escaping the pages directory', entry('guide/../../outside/')],
    ['empty page paths', entry('')],
    ['unclosed Markdown links', '[Guide]({{PAGE_BASE}}/guide/'],
    ['placeholders outside Markdown links', '{{PAGE_BASE}}/guide/'],
    ['encoded traversal segments', entry('guide/%2e%2e/')],
    ['empty path segments', entry('guide//')],
  ]) {
    test(`rejects ${name}`, () => fixture(({ page, index, run }) => {
      page('guide/index.page.mdx');
      index(link);
      assert.equal(run().status, 1, `Expected rejection of: ${link}`);
    }));
  }

  test('templates cover source mode but not physical MCP mode', () => fixture(({ page, index, run }) => {
    page('guide/index.page.mdx.template');
    index(entry('guide/'));
    assert.equal(run().status, 0);
    assert.equal(run('--mcp').status, 1);
    page('guide/index.page.mdx');
    assert.equal(run('--mcp').status, 0);
  }));

  test('non-index MDX requires the explicit physical file URL', () => fixture(({ page, index, run }) => {
    page('guide.page.mdx.template');
    index(entry('guide.page.mdx'));
    assert.equal(run().status, 0);
    assert.equal(run('--mcp').status, 1);
    page('guide.page.mdx');
    assert.equal(run('--mcp').status, 0);
    index(entry('guide/'));
    assert.equal(run().status, 1);
  }));

  test('cached and checkout-loaded helpers resolve nested or unrelated working directories correctly', () => fixture(({ root, page, index }) => {
    page('guide/index.page.mdx');
    index(entry('guide/'));
    const cache = mkdtempSync(join(tmpdir(), 'tonic-ui-llms-cache-'));
    try {
      for (const file of ['check-mcp-llms.mjs', 'repo-root.mjs']) {
        copyFileSync(join(source, file), join(cache, file));
      }
      const cached = join(cache, 'check-mcp-llms.mjs');
      const nested = join(root, 'packages/react-docs/pages/guide');
      const active = spawnSync(process.execPath, [cached], { cwd: nested, encoding: 'utf8' });
      assert.equal(active.status, 0, active.stdout + active.stderr);
      assert.match(active.stdout, /routes on disk: 1   links in llms\.txt: 1/);

      const missing = spawnSync(process.execPath, [cached], { cwd: cache, encoding: 'utf8' });
      assert.equal(missing.status, 1, missing.stdout + missing.stderr);
      assert.match(missing.stderr, /A Tonic UI checkout is required/);

      const inCheckout = join(root, 'skills/tonic-ui-version/scripts/check-mcp-llms.mjs');
      const fallback = spawnSync(process.execPath, [inCheckout], { cwd: cache, encoding: 'utf8' });
      assert.equal(fallback.status, 0, fallback.stdout + fallback.stderr);
      assert.match(fallback.stdout, /routes on disk: 1   links in llms\.txt: 1/);
    } finally {
      rmSync(cache, { recursive: true, force: true });
    }
  }));

  test('relocation exception requires the exact notice and indexed existing destination', () => fixture(({ page, index, run, root }) => {
    const stub = '# SVGIcon\n\nThe `SVGIcon` component has been moved to `@tonic-ui/react-icons`. Please visit [SVGIcon](../../icons/svg-icon) for more information.\n';
    page('components/svg-icon/index.page.mdx', stub);
    page('icons/svg-icon/index.page.mdx');
    index(entry('icons/svg-icon/'));
    assert.equal(run().status, 0);
    page('components/svg-icon/index.page.mdx', stub.replace('Please visit', '\nPlease   visit'));
    assert.equal(run().status, 0);
    for (const changed of [stub + '\nSubstantial extra content.', stub.replace('../../icons/svg-icon', '../../icons/other')]) {
      page('components/svg-icon/index.page.mdx', changed);
      const result = run();
      assert.equal(result.status, 1);
      assert.match(result.stdout, /Stale llms exclusion: components\/svg-icon/);
    }
    page('components/svg-icon/index.page.mdx', stub);
    index('');
    assert.equal(run().status, 1);
    index(entry('icons/svg-icon/'));
    rmSync(join(root, 'packages/react-docs/pages/icons/svg-icon/index.page.mdx'));
    assert.equal(run().status, 1);
  }));
});
