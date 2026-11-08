#!/usr/bin/env node

/**
 * Build the static MiniSearch index for the documentation site.
 *
 * Pipeline position:
 *   update-docs.sh -> build-search-index.mjs -> next build -> static export
 *
 * The script reads document metadata from `config/sidebar-routes.js` and prose
 * from `pages/**\/*.page.mdx`, then writes a content-hashed index and manifest
 * to `public/search`, or to `.e2e/search` when TONIC_UI_REACT_DOCS_E2E=1.
 */

import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';
import MiniSearch from 'minisearch';
import {
  SEARCH_INDEX_BASENAME,
  SEARCH_INDEX_DIR,
  SEARCH_MANIFEST_FILE,
  createMiniSearchOptions,
} from '../search/config.mjs';
import { extractDocument } from './search-index/extract-document.mjs';
import { flattenSidebarRoutes, parseSidebarRoutes } from './search-index/parse-sidebar-routes.mjs';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, '..');
const pagesDir = path.join(rootDir, 'pages');
const isE2E = process.env.TONIC_UI_REACT_DOCS_E2E === '1';
const outputDir = path.join(rootDir, isE2E ? '.e2e' : 'public', SEARCH_INDEX_DIR);
const sidebarRoutesFile = path.join(rootDir, 'config', 'sidebar-routes.js');

const log = (...args) => console.log('[search-index]', ...args);

const resolvePageFile = (routePath) => {
  const candidates = [
    path.join(pagesDir, routePath, 'index.page.mdx'),
    path.join(pagesDir, `${routePath}.page.mdx`),
    path.join(pagesDir, routePath, 'index.page.js'),
    path.join(pagesDir, `${routePath}.page.js`),
  ];

  return candidates.find((candidate) => fs.existsSync(candidate)) ?? null;
};

const buildDocuments = (routes) => {
  const documents = [];
  const warnings = [];

  for (const route of routes) {
    const pageFile = resolvePageFile(route.path);
    if (!pageFile) {
      warnings.push(`Missing page file for sidebar route "${route.path}"`);
      continue;
    }

    const extension = path.extname(pageFile);
    if (extension === '.mdx') {
      const markdown = fs.readFileSync(pageFile, 'utf8');
      const sections = extractDocument(markdown, route);
      documents.push(...sections);
      continue;
    }

    // JavaScript pages are entry points without prose content.
    const keywords = Array.from(new Set([
      route.title,
      ...route.path.split('/').flatMap((segment) => segment.split('-')),
    ])).join(' ');
    documents.push({
      id: route.path,
      title: route.title,
      heading: '',
      content: '',
      text: '',
      keywords,
      category: route.category,
      path: route.path,
      url: `/${route.path}/`,
    });
  }

  return { documents, warnings };
};

const validateDocuments = (documents) => {
  const errors = [];
  const ids = new Set();

  for (const document of documents) {
    for (const field of ['id', 'title', 'heading', 'content', 'keywords', 'category', 'path', 'url']) {
      if (typeof document[field] !== 'string') {
        errors.push(`Document "${document.id ?? '<unknown>'}" is missing the "${field}" field`);
      }
    }
    if (ids.has(document.id)) {
      errors.push(`Duplicate document id "${document.id}"`);
    }
    ids.add(document.id);
    if (!document.url.startsWith('/')) {
      errors.push(`Document "${document.id}" has a non-canonical URL "${document.url}"`);
    }
  }

  if (errors.length > 0) {
    throw new Error(`Search index validation failed:\n- ${errors.join('\n- ')}`);
  }
};

const validateSearch = (miniSearch) => {
  const expectations = [
    { query: 'Button', label: 'exact component name' },
    { query: 'useColorMode', label: 'exact API name' },
    { query: 'butt', label: 'prefix match' },
    { query: 'Buton', label: 'fuzzy match' },
  ];

  for (const { query, label } of expectations) {
    const results = miniSearch.search(query);
    if (results.length === 0) {
      throw new Error(`Search validation failed: "${query}" (${label}) returned no results`);
    }
  }
};

const measure = (miniSearch) => {
  const queries = ['Button', 'butt', 'Buton', 'useColorMode', 'useColrMode', 'onInteractOutside', 'closeBehavior'];
  const iterations = 50;
  const measurements = [];

  for (const query of queries) {
    const start = process.hrtime.bigint();
    for (let index = 0; index < iterations; index++) {
      miniSearch.search(query);
    }
    const elapsedMs = Number(process.hrtime.bigint() - start) / 1e6;
    measurements.push({
      query,
      results: miniSearch.search(query).length,
      averageMs: Number((elapsedMs / iterations).toFixed(3)),
    });
  }

  return measurements;
};

const writeIndex = ({ miniSearch, documents, pageCount }) => {
  const json = JSON.stringify(miniSearch);
  const hash = createHash('sha256').update(json).digest('hex').slice(0, 12);
  const filename = `${SEARCH_INDEX_BASENAME}.${hash}.json`;

  fs.mkdirSync(outputDir, { recursive: true });

  // Keep E2E artifacts intact; production and dev exports remove stale indexes.
  if (!isE2E) {
    const staleFilePattern = new RegExp(`^${SEARCH_INDEX_BASENAME}\\.[0-9a-f]+\\.json$`);
    for (const file of fs.readdirSync(outputDir)) {
      if (staleFilePattern.test(file) && file !== filename) {
        fs.rmSync(path.join(outputDir, file));
      }
    }
  }

  fs.writeFileSync(path.join(outputDir, filename), json);

  const manifest = {
    version: process.env.TONIC_UI_REACT_DOCS_VERSION || 'local',
    generatedAt: new Date().toISOString(),
    file: filename,
    hash,
    pages: pageCount,
    documents: documents.length,
    bytes: Buffer.byteLength(json),
    gzipBytes: gzipSync(json).length,
  };

  fs.writeFileSync(
    path.join(outputDir, SEARCH_MANIFEST_FILE),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );

  return { manifest, filename };
};

const main = () => {
  const startedAt = Date.now();
  const sidebarSource = fs.readFileSync(sidebarRoutesFile, 'utf8');
  const routes = flattenSidebarRoutes(parseSidebarRoutes(sidebarSource));
  log(`Found ${routes.length} searchable routes`);

  const { documents, warnings } = buildDocuments(routes);
  for (const warning of warnings) {
    log(`Warning: ${warning}`);
  }

  validateDocuments(documents);
  log(`Extracted ${documents.length} searchable sections`);

  const miniSearch = new MiniSearch(createMiniSearchOptions());
  miniSearch.addAll(documents);

  validateSearch(miniSearch);
  const measurements = measure(miniSearch);

  const { manifest } = writeIndex({
    miniSearch,
    documents,
    pageCount: routes.length,
  });

  log(`Wrote ${path.relative(rootDir, outputDir)}/${manifest.file}`);
  log(`Documents: ${manifest.documents}, size: ${(manifest.bytes / 1024).toFixed(1)} KiB, gzip: ${(manifest.gzipBytes / 1024).toFixed(1)} KiB`);
  for (const { query, results, averageMs } of measurements) {
    log(`  "${query}" -> ${results} results in ${averageMs} ms`);
  }
  log(`Completed in ${Date.now() - startedAt} ms`);
};

main();
