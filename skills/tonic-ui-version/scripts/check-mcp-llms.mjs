#!/usr/bin/env node
/** Read-only source/template coverage, with optional physical MCP page checks. */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, posix, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { resolveRepoRoot } from './repo-root.mjs';

try {
  const { values } = parseArgs({ options: { mcp: { type: 'boolean', default: false } } });
  const repoRoot = resolveRepoRoot(dirname(fileURLToPath(import.meta.url)));
  const pagesDir = join(repoRoot, 'packages/react-docs/pages');
  const routeOf = (path) => path.replace(/\.page\.mdx(?:\.template)?$/, '').replace(/(?:^|\/)index$/, '');
  const routes = new Set();
  const walk = (directory) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const full = join(directory, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (/\.page\.mdx(?:\.template)?$/.test(entry.name)) {
        routes.add(routeOf(relative(pagesDir, full).split('\\').join('/')));
      }
    }
  };
  walk(pagesDir);
  const llms = readFileSync(join(pagesDir, 'llms.txt'), 'utf8');
  const links = [];
  const errors = [];
  for (const [index, line] of llms.split(/\r?\n/).entries()) {
    if (!line.includes('{{PAGE_BASE}}')) {
      continue;
    }
    const matches = [...line.matchAll(/\[([^\]]*)\]\(\{\{PAGE_BASE\}\}([^)]*)\)/g)];
    if (matches.length !== line.split('{{PAGE_BASE}}').length - 1) {
      errors.push(`Malformed PAGE_BASE link at line ${index + 1}`);
      continue;
    }
    for (const match of matches) {
      const classification = line.slice(match.index + match[0].length).match(/^:\s*<classification>([\s\S]*?)<\/classification>/);
      const path = match[2];
      const segments = path.slice(1).replace(/\/$/, '').split('/');
      if (!match[1].trim() || !classification?.[1].trim()
          || !path.startsWith('/') || path === '/'
          || /[?#%\\\s]/.test(path)
          || segments.some((part) => !part || part === '.' || part === '..')
          || path.endsWith('.template')) {
        errors.push(`Malformed PAGE_BASE link/title/classification at line ${index + 1}`);
        continue;
      }
      const local = path.slice(1).replace(/\/$/, '');
      const exact = local.endsWith('.page.mdx');
      const route = routeOf(local);
      links.push(route);
      // A directory URL must refer to an index, not a non-index MDX route.
      const physical = join(pagesDir, exact ? local : `${local}/index.page.mdx`);
      if (!existsSync(physical) && (values.mcp || !existsSync(`${physical}.template`))) {
        errors.push(`Broken ${values.mcp ? 'MCP physical page' : 'page'}: ${path}`);
      } else if (existsSync(physical) && !statSync(physical).isFile()) {
        errors.push(`Not a page file: ${path}`);
      }
    }
  }
  const indexed = new Set(links);
  const exclusions = new Map([
    ['components/svg-icon', {
      target: 'icons/svg-icon',
      reason: 'Legacy component route is a relocation notice for the icons package.',
      body: 'The `SVGIcon` component has been moved to `@tonic-ui/react-icons`. Please visit [SVGIcon](../../icons/svg-icon) for more information.',
    }],
  ]);
  const excluded = new Set();
  for (const [route, exclusion] of exclusions) {
    if (!routes.has(route)) {
      continue;
    }
    const path = join(pagesDir, route, 'index.page.mdx');
    const source = existsSync(path) ? path : `${path}.template`;
    const body = readFileSync(source, 'utf8').replace(/^# [^\r\n]*(?:\r?\n|$)/, '').replace(/\s+/g, ' ').trim();
    const link = body.match(/\[[^\]]+\]\(([^)]+)\)/);
    const target = link ? posix.normalize(posix.join(route, link[1])) : undefined;
    if (body !== exclusion.body || target !== exclusion.target
        || !routes.has(exclusion.target) || !indexed.has(exclusion.target)) {
      errors.push(`Stale llms exclusion: ${route} (${exclusion.reason})`);
    } else {
      excluded.add(route);
    }
  }
  const missing = [...routes].filter((route) => !indexed.has(route) && !excluded.has(route)).sort();
  const broken = [...indexed].filter((route) => !routes.has(route)).sort();
  const duplicates = [...new Set(links.filter((route, index) => links.indexOf(route) !== index))].sort();
  console.log(`routes on disk: ${routes.size}   links in llms.txt: ${indexed.size}   mode: ${values.mcp ? 'mcp' : 'source'}`);
  for (const [title, entries] of [['PAGES MISSING FROM llms.txt', missing], ['BROKEN LINKS', broken], ['DUPLICATE LINKS (cross-classification allowed)', duplicates], ['INDEX ERRORS', errors]]) {
    console.log(`\n=== ${title} (${entries.length}) ===`);
    console.log(entries.length ? entries.map((entry) => `  ${entry}`).join('\n') : '  none');
  }
  process.exitCode = missing.length || broken.length || errors.length ? 1 : 0;
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
