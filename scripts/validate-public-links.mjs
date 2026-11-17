#!/usr/bin/env node
import { lstatSync, readFileSync, readdirSync, realpathSync, statSync } from 'node:fs';
import { dirname, extname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const requiredDirectories = [
  'skills',
  'plugins',
  'scripts/skills',
  'scripts/plugins',
  'scripts/figma-variables',
  'scripts/__tests__',
  'test/ai-tooling',
  'test/__tests__',
];
const requiredFiles = [
  '.claude-plugin/marketplace.json',
  '.agents/plugins/marketplace.json',
  'README.md',
  'CONTRIBUTING.md',
  'AGENTS.md',
  'scripts/README.md',
  'test/README.md',
  'scripts/validate-ai-tooling.mjs',
  'scripts/validate-public-links.mjs',
];
const excludedDirectories = new Set([
  '.git', '.cache', '.next', '.output', '.payloads', '.temp', '.tmp', '.turbo',
  'node_modules', '__generated__', 'build', 'coverage', 'dist', 'out', 'output',
]);
const textExtensions = new Set([
  '.bash', '.cjs', '.conf', '.css', '.htm', '.html', '.ini', '.js', '.json',
  '.jsonl', '.jsx', '.md', '.mdx', '.mjs', '.mts', '.py', '.rb', '.scss',
  '.sh', '.sql', '.svg', '.toml', '.ts', '.tsx', '.txt', '.xml', '.yaml', '.yml', '.zsh',
]);
const decoder = new TextDecoder('utf-8', { fatal: true });

// Decode common JSON/JavaScript URL escapes while retaining offsets in the original text.
function decodeLocationEscapes(text) {
  if (!/\\(?:\/|u[\da-f]{4})/i.test(text)) return { text, offsets: null };
  const parts = [];
  const offsets = [];
  for (let i = 0; i < text.length; i += 1) {
    if (text[i] === '\\' && text[i + 1] === '\\') {
      parts.push('\\', '\\');
      offsets.push(i, i + 1);
      i += 1;
    } else if (text[i] === '\\' && text[i + 1] === '/') {
      parts.push('/');
      offsets.push(i);
      i += 1;
    } else if (text[i] === '\\' && text[i + 1] === 'u' && /^[\da-f]{4}$/i.test(text.slice(i + 2, i + 6))) {
      parts.push(String.fromCharCode(parseInt(text.slice(i + 2, i + 6), 16)));
      offsets.push(i);
      i += 5;
    } else {
      parts.push(text[i]);
      offsets.push(i);
    }
  }
  return { text: parts.join(''), offsets };
}

function findUrlLocations(text) {
  const normalized = decodeLocationEscapes(text);
  const locations = [];
  const candidates = /(?:[a-z][\da-z+.-]*:)?\/\/[^\s<>"'`\\]*/gi;
  for (const match of normalized.text.matchAll(candidates)) {
    const candidate = match[0].replace(/[),.;!?\]}]+$/g, '');
    let url;
    try {
      url = new URL(candidate.startsWith('//') ? `https:${candidate}` : candidate);
    } catch {
      continue;
    }
    const host = url.hostname.toLowerCase().replace(/\.$/, '');
    let kind;
    if (host === 'atlassian.net' || host.endsWith('.atlassian.net')) {
      kind = 'atlassian';
    } else if (host.endsWith('.trendmicro.com')) {
      kind = 'trendmicro';
    } else if (host === 'figma.com' || host === 'www.figma.com') {
      let path = url.pathname;
      try {
        path = decodeURIComponent(path);
      } catch {
        // The original path is still useful if an unrelated percent escape is invalid.
      }
      if (/^\/(?:file|design|proto|board)(?:\/|$)/i.test(path)) kind = 'figma';
    }
    if (kind) locations.push({ offset: normalized.offsets?.[match.index] ?? match.index, kind });
  }
  return locations;
}

// JSON tokenization keeps the line of a location field without including its value.
function findPrivateJsonFields(text) {
  try {
    JSON.parse(text);
  } catch {
    return [];
  }
  const locations = [];
  const strings = /"(?:\\.|[^"\\])*"/g;
  for (const match of text.matchAll(strings)) {
    let next = match.index + match[0].length;
    while (/\s/.test(text[next] ?? '')) next += 1;
    if (text[next] !== ':') continue;
    const rawName = match[0];
    if (rawName !== '"fileKey"' && rawName !== '"figmaUrl"' && !rawName.includes('\\')) continue;
    const name = JSON.parse(rawName);
    if (name !== 'fileKey' && name !== 'figmaUrl') continue;
    next += 1;
    while (/\s/.test(text[next] ?? '')) next += 1;
    if (text.startsWith('null', next)) continue;
    if (text[next] === '"') {
      const value = /^"(?:\\.|[^"\\])*"/.exec(text.slice(next))[0];
      if (JSON.parse(value) === '') continue;
    }
    locations.push({ offset: match.index, kind: name });
  }
  return locations;
}

export function findPrivateLocations(text) {
  return [...findUrlLocations(text), ...findPrivateJsonFields(text)]
    .sort((a, b) => a.offset - b.offset || a.kind.localeCompare(b.kind));
}

function safePath(path) {
  return path.replace(/[\x00-\x1f\x7f]/g, '?');
}

function requiredEntry(root, path, type) {
  let stat;
  try {
    stat = lstatSync(join(root, path));
  } catch {
    throw new Error(`Cannot read required ${type}: ${safePath(path)}`);
  }
  if ((type === 'directory' && !stat.isDirectory()) || (type === 'file' && !stat.isFile())) {
    throw new Error(`Invalid required ${type}: ${safePath(path)}`);
  }
}

function readText(root, path) {
  let bytes;
  try {
    bytes = readFileSync(join(root, path));
  } catch {
    throw new Error(`Cannot read file: ${safePath(path)}`);
  }
  const knownText = textExtensions.has(extname(path).toLowerCase());
  if (bytes.includes(0)) {
    if (knownText) throw new Error(`Invalid text file: ${safePath(path)}`);
    return null;
  }
  try {
    return decoder.decode(bytes);
  } catch {
    if (knownText) throw new Error(`Invalid text file: ${safePath(path)}`);
    return null;
  }
}

export function validatePublicLinks(root) {
  root = resolve(root);
  for (const path of requiredDirectories) requiredEntry(root, path, 'directory');
  for (const path of requiredFiles) requiredEntry(root, path, 'file');
  let realRoot;
  try {
    realRoot = realpathSync(root);
  } catch {
    throw new Error('Cannot read required root.');
  }

  let filesChecked = 0;
  const violations = [];
  function checkFile(path) {
    const text = readText(root, path);
    if (text === null) return;
    filesChecked += 1;
    for (const { offset, kind } of findPrivateLocations(text)) {
      const line = 1 + (text.slice(0, offset).match(/\n/g)?.length ?? 0);
      violations.push(`${safePath(path)}:${line}: ${kind}`);
    }
  }
  function visitDirectory(path) {
    let entries;
    try {
      entries = readdirSync(join(root, path), { withFileTypes: true });
    } catch {
      throw new Error(`Cannot read directory: ${safePath(path)}`);
    }
    entries.sort((a, b) => a.name.localeCompare(b.name));
    for (const entry of entries) {
      const child = join(path, entry.name);
      if (entry.isDirectory()) {
        if (!excludedDirectories.has(entry.name)) visitDirectory(child);
      } else if (entry.isFile()) {
        checkFile(child);
      } else if (entry.isSymbolicLink()) {
        let target;
        try {
          target = statSync(join(root, child));
        } catch {
          throw new Error(`Cannot read entry: ${safePath(child)}`);
        }
        if (target.isFile()) {
          let destination;
          try {
            destination = relative(realRoot, realpathSync(join(root, child))).split(sep).join('/');
          } catch {
            throw new Error(`Cannot read entry: ${safePath(child)}`);
          }
          const inScope = requiredFiles.includes(destination)
            || requiredDirectories.some((directory) => destination.startsWith(`${directory}/`));
          if (!inScope || destination.split('/').some((part) => excludedDirectories.has(part))) {
            throw new Error(`Linked file escapes scan scope: ${safePath(child)}`);
          }
          checkFile(child);
        }
      }
    }
  }
  for (const path of requiredDirectories) visitDirectory(path);
  for (const path of requiredFiles) checkFile(path);
  if (violations.length > 0) throw new Error(`Private locations found:\n${violations.join('\n')}`);
  return { filesChecked };
}

const invokedDirectly = import.meta.main
  ?? (typeof process.argv[1] === 'string' && resolve(process.argv[1]) === fileURLToPath(import.meta.url));
if (invokedDirectly) {
  try {
    if (process.argv.length !== 2) throw new Error('This validator takes no arguments.');
    console.log(JSON.stringify(validatePublicLinks(repoRoot)));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
