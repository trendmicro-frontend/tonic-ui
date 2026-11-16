#!/usr/bin/env node
/**
 * Export every local Figma Variable from the two Tonic One v4 libraries and resolve the
 * cross-file aliases between them (semantic → foundations).
 *
 *   Foundations (primitive)  →  🎨 Tonic One Design Foundations (v4)   foundations.json
 *   Semantic                 →  🌓 Tonic One Design Tokens (v4)        semantic.json
 *
 * Usage:
 *   FIGMA_TOKEN=figd_xxx node export-figma-variables.mjs --out <dir>
 *   (or put the token in ~/.figma_token)
 *
 * Read-only. Never writes to Figma. Requires the `file_variables:read` scope; the
 * `/variables/local` endpoint is available on Figma Enterprise plans.
 */

import { findPrivateLocations } from '../validate-public-links.mjs';
import { fingerprintFileKey } from './variable-inventory.mjs';

import { realpathSync } from 'node:fs';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { FILES, isMap, flattenFile, resolveAliases, buildDocument } from './variable-inventory.mjs';


const API = 'https://api.figma.com/v1/files';

function parseArgs(argv) {
  const out = { outDir: './plugins/tonic-ui-tokens/skills/tonic-ui-tokens/assets/figma-variables', source: null };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--out') out.outDir = argv[++i];
    else if (argv[i] === '--source') out.source = argv[++i];
    else if (argv[i] === '--help' || argv[i] === '-h') out.help = true;
  }
  return out;
}

/**
 * Resolve the Figma token, and report WHICH source won.
 *
 * Precedence is env > file, but an exported FIGMA_TOKEN in a shell profile silently
 * shadows ~/.figma_token — that has bitten us before, so the caller prints the source
 * and warns when both are present.
 */
async function readToken(prefer = null) {
  const fromEnv = process.env.FIGMA_TOKEN
    ? { token: process.env.FIGMA_TOKEN.trim(), source: 'env FIGMA_TOKEN' }
    : process.env.FIGMA_ACCESS_TOKEN
      ? { token: process.env.FIGMA_ACCESS_TOKEN.trim(), source: 'env FIGMA_ACCESS_TOKEN' }
      : null;

  let fromFile = null;
  const tokenPath = path.join(os.homedir(), '.figma_token');
  try {
    const token = (await fs.readFile(tokenPath, 'utf8')).trim();
    if (token) fromFile = { token, source: '~/.figma_token' };
  } catch {
    /* no file */
  }

  if (prefer === 'file') return fromFile ?? fromEnv;
  if (prefer === 'env') return fromEnv ?? fromFile;

  const chosen = fromEnv ?? fromFile;
  if (!chosen) return null;
  return {
    ...chosen,
    shadowed: fromEnv && fromFile ? fromFile.source : null,
  };
}

function resolveFileKeys(env = process.env) {
  const keys = new Map();
  for (const file of FILES) {
    const envName = `FIGMA_${file.slug.toUpperCase()}_FILE_KEY`;
    const key = env[envName];
    if (typeof key !== 'string' || !key.trim()) {
      throw new Error(`${file.slug}: ${envName} is required`);
    }
    if (fingerprintFileKey(key) !== file.fileKeySha256) {
      throw new Error(`${file.slug}: ${envName} does not match the expected fingerprint`);
    }
    keys.set(file.slug, key);
  }
  return keys;
}

function fail(msg) {
  console.error(`\n✖ ${msg}\n`);
  process.exit(1);
}

async function getJson(url, token, library) {
  let res;
  let text;
  try {
    res = await fetch(url, { headers: { 'X-Figma-Token': token } });
    text = await res.text();
  } catch {
    throw new Error(`${library}: request failed`);
  }

  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`${library}: non-JSON response (HTTP ${res.status})`);
  }

  const detail = [json?.err, json?.message].filter((value) => typeof value === 'string').join(' ');
  if (/expired/i.test(detail)) {
    throw new Error(`${library}: HTTP ${res.status} — the Figma token has expired.`);
  }
  if (res.status === 401) {
    throw new Error(`${library}: HTTP 401 — token rejected.`);
  }
  if (res.status === 403) {
    throw new Error(
      `${library}: HTTP 403 — access denied. The variables endpoint requires ` +
        'the file_variables:read scope and a Figma Enterprise plan.'
    );
  }
  if (!res.ok) {
    throw new Error(`${library}: HTTP ${res.status} — request failed.`);
  }
  return json;
}

/** File name + version, used as provenance (comparable to tokens.json sourceRevision). */
async function fetchFileMeta(fileKey, token, library = 'Figma library') {
  try {
    const json = await getJson(`${API}/${fileKey}?depth=1`, token, library);
    return {
      name: json.name ?? null,
      version: json.version ?? null,
      lastModified: json.lastModified ?? null,
    };
  } catch {
    return { name: null, version: null, lastModified: null };
  }
}

/** Fetch every page of /variables/local. */
async function fetchVariables(fileKey, token, library = 'Figma library') {
  const variables = {};
  const collections = {};
  let cursor = null;
  let page = 0;

  for (;;) {
    page++;
    // Pagination is undocumented for this endpoint; keep the loop for forward
    // compatibility but do not force page_size on the first request.
    const qs = new URLSearchParams();
    if (cursor) qs.set('cursor', cursor);
    const q = qs.toString();
    const json = await getJson(
      `${API}/${fileKey}/variables/local${q ? `?${q}` : ''}`,
      token,
      library
    );

    const meta = json?.meta;
    if (!isMap(meta) || !isMap(meta.variables) || !isMap(meta.variableCollections)) {
      throw new Error(`${library}: invalid variables response; expected variable and collection maps`);
    }
    Object.assign(variables, meta.variables);
    Object.assign(collections, meta.variableCollections);

    const next = meta.cursor ?? meta.next_page ?? null;
    if (!next || next === cursor) break;
    cursor = next;
    if (page > 200) break;
  }

  return { variables, collections };
}


/** Collect and validate both snapshots before writing either final asset. */
async function exportSnapshots({ outDir, token, env = process.env }) {
  const fileKeys = resolveFileKeys(env);
  const flattened = [];
  for (const file of FILES) {
    console.log(`\n→ ${file.slug}`);
    const fileKey = fileKeys.get(file.slug);
    const [data, fileMeta] = await Promise.all([
      fetchVariables(fileKey, token, file.slug),
      fetchFileMeta(fileKey, token, file.slug),
    ]);
    let doc;
    try {
      doc = flattenFile({ file, data, fileMeta });
    } catch {
      throw new Error(`${file.slug}: invalid variable inventory`);
    }
    flattened.push(doc);
    console.log(
      `  variables ${doc.variables.length}  collections ${doc.collections.length}  ` +
        `with description ${doc.variables.filter((v) => v.description).length}`
    );
  }

  let stats;
  try {
    stats = resolveAliases(flattened);
  } catch {
    throw new Error('Cannot resolve aliases across libraries: invalid or duplicate stable variable key');
  }
  const outputDir = path.resolve(outDir);
  const rawKeys = [...fileKeys.values()].map((key) => JSON.stringify(key).slice(1, -1));
  const outputs = flattened.map((doc) => {
    const contents = `${JSON.stringify(buildDocument(doc, stats), null, 2)}\n`;
    if (findPrivateLocations(contents).length || rawKeys.some((key) => contents.includes(key))) {
      throw new Error(`${doc.file.slug}: final snapshot contains a private location`);
    }
    return { library: doc.file.slug, filename: path.join(outputDir, `${doc.file.slug}.json`), contents };
  });

  await fs.mkdir(outputDir, { recursive: true });
  for (const output of outputs) {
    await fs.writeFile(output.filename, output.contents, 'utf8');
    const s = stats[output.library];
    console.log(
      `\n✔ ${output.library}: aliases ${s.total}  within-file ${s.resolvedWithinFile}  ` +
        `cross-file ${s.resolvedCrossFile}  unresolved ${s.unresolved}`
    );
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log(
      'Usage: FIGMA_FOUNDATIONS_FILE_KEY=... FIGMA_SEMANTIC_FILE_KEY=... FIGMA_TOKEN=... ' +
        'node export-figma-variables.mjs [--out <dir>] [--source env|file]\n' +
        '       Token may also be read from ~/.figma_token.\n' +
        '       --source file  prefer ~/.figma_token over the environment'
    );
    return;
  }

  resolveFileKeys();
  const tokenInfo = await readToken(args.source);
  if (!tokenInfo) {
    fail('No Figma token found. Set FIGMA_TOKEN or write the token to ~/.figma_token.');
  }
  console.log(`token source: ${tokenInfo.source}`);
  if (tokenInfo.shadowed) {
    console.log(`${tokenInfo.shadowed} is shadowed by the environment; pass --source file to prefer it.`);
  }
  await exportSnapshots({ outDir: args.outDir, token: tokenInfo.token });
}

function isEntryPoint() {
  if (!process.argv[1]) return false;
  try {
    return realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url));
  } catch {
    return false;
  }
}

if (isEntryPoint()) main().catch((err) => fail(err?.message ?? 'Export failed'));

export { resolveFileKeys, fetchFileMeta, fetchVariables, exportSnapshots };
