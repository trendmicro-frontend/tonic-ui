#!/usr/bin/env node
/** Convert downloaded Figma plugin payloads into the two local variable inventories. */
import { realpathSync } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

import { findPrivateLocations } from '../validate-public-links.mjs';

import {
  FILES,
  identifyLibrary,
  validatePluginPayload,
  flattenFile,
  resolveAliases,
  buildDocument,
} from './variable-inventory.mjs';

const CACHE_DIR = '.payloads';

async function readPayload(filename, expectedFile = null) {
  let payload;
  try {
    const contents = await fs.readFile(filename, 'utf8');
    try {
      payload = JSON.parse(contents);
    } catch {
      throw new Error('Invalid JSON payload');
    }
    if (payload?.schemaVersion != null && Array.isArray(payload.variables)) {
      throw new Error('Converted assets are not raw Figma plugin payloads');
    }
    const file = identifyLibrary(payload);
    if (expectedFile && file.slug !== expectedFile.slug) {
      throw new Error(`Expected ${expectedFile.slug} but payload identifies as ${file.slug}`);
    }
    validatePluginPayload(payload, file);
    if (payload.fileKey == null || payload.fileKey === '') {
      console.log(`Inferred ${file.slug} identity from file name in ${filename}`);
    }
    return { file, payload };
  } catch (error) {
    const message = error.message ?? 'Invalid Figma plugin payload';
    const fileKey = typeof payload?.fileKey === 'string' ? payload.fileKey : '';
    const redacted = findPrivateLocations(message).length || (fileKey && message.includes(fileKey));
    throw new Error(`${filename}: ${redacted ? 'Invalid Figma plugin payload' : message}`, { cause: error });
  }
}

async function writeFile(filename, contents, options = 'utf8') {
  try {
    await fs.writeFile(filename, contents, options);
  } catch (error) {
    throw new Error(`Cannot write ${filename}: ${error.message}`, { cause: error });
  }
}

async function makeDirectory(directory) {
  try {
    await fs.mkdir(directory, { recursive: true });
  } catch (error) {
    throw new Error(`Cannot create ${directory}: ${error.message}`, { cause: error });
  }
}

async function validateCacheIgnore(filename) {
  let contents;
  try {
    contents = await fs.readFile(filename, 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') return;
    throw new Error(`Cannot read ${filename}: ${error.message}`, { cause: error });
  }
  let ignoresAll = false;
  for (const line of contents.split(/\r?\n/)) {
    const rule = line.trim();
    if (rule === '*') ignoresAll = true;
    else if (rule.startsWith('!')) ignoresAll = false;
  }
  if (!ignoresAll) {
    throw new Error(`${filename}: raw cache must be ignored with a * rule and no later exceptions`);
  }
}

/** Validate all inputs, serialize both assets, write both outputs, then update the cache. */
async function convert({ from, outDir }) {
  if (!Array.isArray(from) || from.length === 0 ||
      from.some((filename) => typeof filename !== 'string' || !filename.trim())) {
    throw new Error('At least one --from raw JSON path is required');
  }
  if (typeof outDir !== 'string' || !outDir.trim()) {
    throw new Error('--out directory is required');
  }
  const outputDir = path.resolve(outDir);
  const payloads = new Map();
  const inputPaths = [];
  for (const input of from) {
    const filename = path.resolve(input);
    const { file, payload } = await readPayload(filename);
    if (payloads.has(file.slug)) {
      throw new Error(`${filename}: duplicate ${file.slug} input`);
    }
    payloads.set(file.slug, payload);
    inputPaths.push(filename);
  }

  const reused = [];
  for (const file of FILES) {
    if (payloads.has(file.slug)) {
      continue;
    }
    const filename = path.join(outputDir, CACHE_DIR, `${file.slug}.json`);
    let cached;
    try {
      cached = await readPayload(filename, file);
    } catch (error) {
      throw new Error(`${error.message}. Supply both raw captures.`, { cause: error });
    }
    payloads.set(file.slug, cached.payload);
    inputPaths.push(filename);
    reused.push({ library: file.slug, exportedAt: cached.payload.exportedAt });
  }

  const flattened = FILES.map((file) => {
    const payload = payloads.get(file.slug);
    const document = flattenFile({
      file,
      data: { variables: payload.meta.variables, collections: payload.meta.variableCollections },
      fileMeta: { name: payload.fileName, version: null, lastModified: null },
    });
    document.capturedAt = payload.exportedAt;
    document.pluginVersion = payload.pluginVersion;
    return document;
  });
  let stats;
  try {
    stats = resolveAliases(flattened);
  } catch (error) {
    throw new Error(`Cannot resolve aliases for ${inputPaths.join(', ')}: invalid or duplicate stable variable key`, { cause: error });
  }
  const rawKeys = [...payloads.values()].map((payload) => payload.fileKey)
    .filter((key) => typeof key === 'string' && key.length > 0)
    .map((key) => JSON.stringify(key).slice(1, -1));
  const outputs = flattened.map((document) => {
    const asset = buildDocument(document, stats);
    asset.meta.captureMethod = 'figma-plugin';
    asset.meta.pluginVersion = document.pluginVersion;
    asset.meta.capturedAt = document.capturedAt;
    delete asset.meta.figmaFileVersion;
    delete asset.meta.figmaFileLastModified;
    asset.meta.api = 'figma.variables.getLocalVariablesAsync() (plugin)';
    const contents = `${JSON.stringify(asset, null, 2)}\n`;
    if (findPrivateLocations(contents).length || rawKeys.some((key) => contents.includes(key))) {
      throw new Error(`${document.file.slug}: final snapshot contains a private location`);
    }
    return { filename: path.join(outputDir, `${document.file.slug}.json`), contents };
  });
  const cachedPayloads = FILES.map((file) => ({
    filename: path.join(outputDir, CACHE_DIR, `${file.slug}.json`),
    contents: JSON.stringify(payloads.get(file.slug)),
  }));

  const cacheDir = path.join(outputDir, CACHE_DIR);
  const ignore = path.join(cacheDir, '.gitignore');
  await validateCacheIgnore(ignore);

  await makeDirectory(outputDir);
  for (const output of outputs) {
    await writeFile(output.filename, output.contents);
  }

  await makeDirectory(cacheDir);
  try {
    await fs.writeFile(ignore, '*\n', { encoding: 'utf8', flag: 'wx' });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw new Error(`Cannot write ${ignore}: ${error.message}`, { cause: error });
    }
    await validateCacheIgnore(ignore);
  }
  for (const cached of cachedPayloads) {
    await writeFile(cached.filename, cached.contents);
  }
  return { written: outputs.map((output) => output.filename), reused };
}

async function main() {
  const { values } = parseArgs({
    options: {
      from: { type: 'string', multiple: true },
      out: { type: 'string' },
      help: { type: 'boolean' },
    },
    strict: true,
    allowPositionals: false,
  });
  if (values.help) {
    console.log('Usage: node convert-figma-variables.mjs --from <raw.json> [--from <raw.json>] --out <directory>');
    return;
  }
  const result = await convert({ from: values.from ?? [], outDir: values.out });
  for (const reused of result.reused) {
    const ageHours = ((Date.now() - Date.parse(reused.exportedAt)) / 3_600_000).toFixed(1);
    console.log(`Reused cached ${reused.library} capture exported at ${reused.exportedAt} (age: ${ageHours} hours)`);
  }
  for (const filename of result.written) {
    console.log(`Wrote ${filename}`);
  }
  console.log('Conversion complete.');
}

function isEntryPoint() {
  if (!process.argv[1]) return false;
  try {
    return realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url));
  } catch {
    return false;
  }
}

if (isEntryPoint()) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}

export { convert };
