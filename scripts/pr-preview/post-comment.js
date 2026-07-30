#!/usr/bin/env node
'use strict';

// Reads tab-separated "<npm-name>\t<dir>" lines from stdin (see
// list-packages.sh) and prints a Markdown PR comment listing the
// git dependency snippet for every package, using literal "\n" so the
// result can be passed directly to scripts/github-issue-comment-cli.
//
// Usage: post-comment.js <host> <repo> <branch> <sha>

const [host, repo, branch, sha] = process.argv.slice(2);
if (!host || !repo || !branch || !sha) {
  console.error('Usage: post-comment.js <host> <repo> <branch> <sha>');
  process.exit(1);
}

let input = '';
process.stdin.on('data', (chunk) => {
  input += chunk;
});
process.stdin.on('end', () => {
  const names = input
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.split('\t')[0]);

  const dependencies = {};
  for (const name of names) {
    dependencies[name] = `git+https://${host}/${repo}.git#head=${branch}&workspace=${name}`;
  }

  const snippet = JSON.stringify({ dependencies }, null, 2).replace(/\n/g, '\\n');
  const body = [
    '## \u{1F4E6} Preview packages',
    '',
    `Built from ${sha}. Install any package from this PR with Yarn (v2+):`,
    '',
    '```json',
    snippet,
    '```',
  ].join('\\n');

  process.stdout.write(body);
});
