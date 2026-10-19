#!/usr/bin/env node
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, lstatSync, readFileSync, readlinkSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

// The reviewed ledger locks content, not just a count of existing paths. Source
// Git history is read-only; this check never stages, restores, or writes files.
const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const hash = (value) => createHash('sha256').update(value).digest('hex');
const git = (cwd, args) => execFileSync('git', args, { cwd, maxBuffer: 16 * 1024 * 1024 });
const rename = (path) => path.replaceAll('tonic-one', 'tonic-ui');

try {
  const { values } = parseArgs({ options: { source: { type: 'string' } } });
  assert(values.source, 'Usage: node scripts/skills/verify-backport.mjs --source <upstream-checkout>');
  const source = resolve(values.source);
  const ledger = JSON.parse(readFileSync(resolve(root, 'docs/handoffs/tonic-ui-marketplace-backport.json'), 'utf8'));
  const delta = git(source, ['diff-tree', '--no-commit-id', '--name-status', '-r', '-M', ledger.sourceCommit])
    .toString().trim().split('\n').map((line) => line.split('\t'));
  assert.equal(delta.length, 60, 'Upstream commit must have exactly 60 change records.');
  assert.equal(ledger.entries.length, delta.length, 'Ledger omits or adds source records.');
  assert.equal(new Set(ledger.entries.map((entry) => entry.targetAfter)).size, 60, 'Duplicate target accounting.');
  for (const [index, fields] of delta.entries()) {
    const entry = ledger.entries[index];
    assert.equal(entry.id, index + 1);
    assert.equal(entry.operation, fields[0]);
    assert.equal(entry.sourceBefore, fields[1]);
    assert.equal(entry.sourceAfter, fields.at(-1));
    assert.equal(entry.targetBefore, rename(entry.sourceBefore));
    assert.equal(entry.targetAfter, rename(entry.sourceAfter));
    assert.equal(entry.status, 'verified', `Unverified record: ${entry.targetAfter}`);
    assert(entry.disposition && entry.review && entry.evidence, `Missing review evidence: ${entry.targetAfter}`);
    const deleted = entry.operation === 'D';
    const revision = `${ledger.sourceCommit}${deleted ? '^' : ''}:${entry.sourceAfter}`;
    assert.equal(hash(git(source, ['show', revision])), entry.sourceSha256, `Source hash differs: ${entry.sourceAfter}`);
    const target = resolve(root, entry.targetAfter);
    if (deleted) {
      assert(!existsSync(target), `Deleted path remains: ${entry.targetAfter}`);
      console.log(`${String(entry.id).padStart(2, '0')} PASS D ${entry.targetAfter}`);
      continue;
    }
    const stat = lstatSync(target);
    const bytes = stat.isSymbolicLink() ? Buffer.from(readlinkSync(target)) : readFileSync(target);
    assert.equal(stat.isSymbolicLink() ? 'symlink' : 'file', entry.targetType, `Wrong file type: ${entry.targetAfter}`);
    assert.equal(hash(bytes), entry.targetSha256, `Reviewed content changed: ${entry.targetAfter}`);
    if (entry.operation.startsWith('R')) {
      const previous = resolve(root, entry.targetBefore);
      // Old resource paths may resolve through the new canonical adapter; they
      // must not remain independent physical copies.
      const adapter = resolve(root, '.agents/skills', entry.targetBefore.split('/')[2]);
      assert(!existsSync(previous) || lstatSync(adapter).isSymbolicLink(),
        `Obsolete resource copy remains: ${entry.targetBefore}`);
    }
    // Shared design URLs are allowed; repository-specific source URLs are not.
    assert(!/https?:\/\/[^\s)\]"<>]*(?:tonic-one|trend-common-platform)/i.test(bytes.toString()),
      `Upstream-specific URL remains: ${entry.targetAfter}`);
    if (entry.disposition === 'preserved-target-move') {
      assert.equal(hash(git(root, ['show', `${ledger.targetBase}:${entry.targetBefore}`])), entry.targetSha256,
        `Pure move changed target content: ${entry.targetAfter}`);
    }
    console.log(`${String(entry.id).padStart(2, '0')} PASS ${entry.operation} ${entry.targetAfter}`);
  }
  console.log(JSON.stringify({ sourceCommit: ledger.sourceCommit, covered: 60, verified: 60, missing: 0,
    content: 'reviewed-sha256', sourceOnlyLinks: 0 }));
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
