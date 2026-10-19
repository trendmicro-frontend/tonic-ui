#!/usr/bin/env node
/**
 * Cross-check `llms.txt` against the docs pages on disk, in both directions.
 *
 * llms.txt is the index the MCP server serves, and it is hand-maintained, so it
 * drifts silently: a new page is invisible until it is listed, and a renamed
 * page leaves a broken entry that costs the server a page with no error anywhere.
 *
 * Exits 1 when there are broken links (always real defects). Missing pages are
 * reported but don't fail the run, because stub redirect pages are legitimately
 * unindexed -- read the output rather than trusting the exit code alone.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolveRepoRoot } from './repo-root.mjs';

const repoRoot = resolveRepoRoot(dirname(fileURLToPath(import.meta.url)));
const pagesDir = join(repoRoot, 'packages/react-docs/pages');

if (!existsSync(pagesDir)) {
  console.error(`Could not find docs pages at ${pagesDir}`);
  console.error('Run this from inside the tonic-ui repo.');
  process.exit(1);
}

// A route exists if its directory holds index.page.mdx OR index.page.mdx.template.
// Several pages (the Versions table, style-props, pseudo-style-props) are generated
// at build time from templates, so a clean checkout has only the .template file --
// treating those as missing would produce phantom gaps.
const routes = new Set();
const walk = (dir) => {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full);
    } else if (entry === 'index.page.mdx' || entry === 'index.page.mdx.template') {
      routes.add(relative(pagesDir, dir).split('\\').join('/'));
    }
  }
};
walk(pagesDir);

const llms = readFileSync(join(pagesDir, 'llms.txt'), 'utf8');
const links = [...llms.matchAll(/\{\{PAGE_BASE\}\}(\/[^)]*)/g)]
  .map((m) => m[1].replace(/^\//, '').replace(/\/$/, ''));

const linkSet = new Set(links);
const dupes = [...new Set(links.filter((l, i) => links.indexOf(l) !== i))].sort();
const missing = [...routes].filter((r) => !linkSet.has(r)).sort();
const broken = [...linkSet].filter((l) => !routes.has(l)).sort();

const report = (title, arr, hint) => {
  console.log(`\n=== ${title} (${arr.length}) ===`);
  if (arr.length === 0) {
    console.log('  none');
    return;
  }
  arr.forEach((x) => console.log(`  ${x}`));
  if (hint) console.log(`  -> ${hint}`);
};

console.log(`routes on disk: ${routes.size}   links in llms.txt: ${linkSet.size}`);

report(
  'PAGES MISSING FROM llms.txt',
  missing,
  'Real gaps, except stub redirect pages (e.g. components/svg-icon points at icons/svg-icon).'
);
report('BROKEN LINKS (llms.txt -> no such page)', broken, 'Always real. Fix the path or drop the entry.');
report(
  'DUPLICATE LINKS',
  dupes,
  'Usually intentional cross-listings (once under Getting started, once as a section Overview). Leave them.'
);

if (broken.length > 0) {
  console.log(`\n${broken.length} broken link(s) — these silently cost the MCP server pages.`);
  process.exit(1);
}

console.log('\nNo broken links.');
