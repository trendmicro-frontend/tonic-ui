import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, relative, resolve } from 'node:path';

const require = createRequire(import.meta.url);
const { transformSync } = require('@babel/core');
const transformModules = require.resolve('@babel/plugin-transform-modules-commonjs');

// Evaluate repository modules, not published build artifacts, so private exports
// and uncommitted token changes participate in the inventory and its fingerprints.
export function loadThemeSources(repoRoot) {
  const modules = new Map();
  const sourceHashes = {};
  const sourceFile = (candidate) => {
    for (const file of [candidate, `${candidate}.js`, join(candidate, 'index.js')]) {
      if (existsSync(file) && statSync(file).isFile()) return file;
    }
    throw new Error(`Cannot resolve theme source module: ${candidate}`);
  };
  const load = (candidate) => {
    const file = sourceFile(resolve(candidate));
    if (modules.has(file)) return modules.get(file).exports;
    const source = readFileSync(file, 'utf8');
    sourceHashes[relative(repoRoot, file).replaceAll('\\', '/')] = createHash('sha256').update(source).digest('hex');
    const module = { exports: {} };
    modules.set(file, module);
    const compiled = transformSync(source, {
      filename: file,
      babelrc: false,
      configFile: false,
      plugins: [transformModules],
    }).code;
    const localRequire = (request) => {
      if (request.startsWith('.')) return load(resolve(dirname(file), request));
      if (request === '@tonic-ui/utils/internal') {
        return load(join(repoRoot, 'packages/utils/src/internal/toCSSVariable.js'));
      }
      return createRequire(file)(request);
    };
    const execute = new Function('require', 'module', 'exports', '__filename', '__dirname', compiled);
    execute(localRequire, module, module.exports, file, dirname(file));
    return module.exports;
  };
  const createTheme = load(join(repoRoot, 'packages/theme/src/createTheme.js')).default;
  const { createPrimitiveTokens } = load(join(repoRoot, 'packages/theme/src/v3/primitive/index.js'));
  const { createSemanticTokens } = load(join(repoRoot, 'packages/theme/src/v3/semantic/index.js'));
  const { resolveTheme } = load(join(repoRoot, 'packages/utils/src/internal/resolveTheme.js'));
  const { toCSSVariable } = load(join(repoRoot, 'packages/utils/src/internal/toCSSVariable.js'));
  const { mapThemeToCSSVariables } = load(join(repoRoot, 'packages/react/src/theme/utils/css-vars.js'));
  return { createTheme, createPrimitiveTokens, createSemanticTokens, resolveTheme, toCSSVariable, mapThemeToCSSVariables, sourceHashes };
}

function collectTokens(theme) {
  const tokens = new Map();
  const visit = (value, parts) => {
    const path = parts.map((key, index) => key.includes('.') ? `[${JSON.stringify(key)}]` : `${index ? '.' : ''}${key}`).join('');
    const add = () => tokens.set(path, { value, parts });
    if (value === null || typeof value !== 'object') {
      if (typeof value === 'string' || typeof value === 'number') add();
      return;
    }
    if (Object.hasOwn(value, '_dark') || Object.hasOwn(value, '_light')) {
      add();
      return;
    }
    if (Object.hasOwn(value, 'main') || Array.isArray(value)) add();
    for (const [key, child] of Object.entries(value)) visit(child, [...parts, key]);
  };
  for (const [scale, value] of Object.entries(theme)) visit(value, [scale]);
  return tokens;
}

function containsUnresolved(value) {
  if (typeof value === 'string') return /\{[^{}]+\}/.test(value);
  if (value && typeof value === 'object') {
    return Object.entries(value).some(([key, child]) => key === '_dark' || key === '_light' || containsUnresolved(child));
  }
  return false;
}

export function buildTokenInventory(repoRoot) {
  const source = loadThemeSources(repoRoot);
  const px = source.createTheme('px');
  const rem = source.createTheme('rem');
  const rawPx = collectTokens(px);
  const rawRem = collectTokens(rem);
  const primitive = collectTokens(source.createPrimitiveTokens('px'));
  const semantic = collectTokens(source.createSemanticTokens('px'));
  const resolvedPx = source.resolveTheme(px);
  const resolvedRem = source.resolveTheme(rem);
  const pxModes = { dark: resolvedPx.toColorMode('dark'), light: resolvedPx.toColorMode('light') };
  const remModes = { dark: resolvedRem.toColorMode('dark'), light: resolvedRem.toColorMode('light') };
  const cssVariables = source.mapThemeToCSSVariables(resolvedPx, { prefix: 'tonic' });
  const missing = Symbol('missing token');
  // JSON omits named array properties; their alias paths are inventoried separately.
  const serializable = (value) => Array.isArray(value) ? Array.from(value) : value;
  const paths = [...new Set([...rawPx.keys(), ...rawRem.keys()])].sort();
  const tokens = paths.map((path) => {
    const { value, parts } = rawPx.get(path) ?? rawRem.get(path);
    const [scale, ...segments] = parts;
    const values = { dark: serializable(pxModes.dark.get(parts, missing)), light: serializable(pxModes.light.get(parts, missing)) };
    if (values.dark === missing || values.light === missing) throw new Error(`Source token does not resolve by its path: ${path}`);
    const remValues = { dark: serializable(remModes.dark.get(parts, missing)), light: serializable(remModes.light.get(parts, missing)) };
    if (remValues.dark === missing || remValues.light === missing) throw new Error(`Rem source token does not resolve by its path: ${path}`);
    const cssVariable = source.toCSSVariable(parts.join('.'), { prefix: 'tonic' });
    const cssValue = cssVariables[cssVariable];
    const record = {
      path,
      token: segments.join('.'),
      scale,
      kind: semantic.has(path) ? 'semantic' : primitive.has(path) ? 'primitive' : 'legacy',
      visibility: segments.some((part) => part.startsWith('_')) ? 'private' : 'public',
      raw: serializable(value),
      values,
      cssVariable: Object.hasOwn(cssVariables, cssVariable) && ['string', 'number'].includes(typeof cssValue) ? cssVariable : null,
      resolutionStatus: containsUnresolved(values) ? 'unresolved-source' : 'verified',
    };
    if (JSON.stringify(values) !== JSON.stringify(remValues)) record.unitValues = { px: values, rem: remValues };
    return record;
  });
  const themePackage = JSON.parse(readFileSync(join(repoRoot, 'packages/theme/package.json'), 'utf8'));
  const sourceRevision = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: repoRoot, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  const sourceHashes = Object.fromEntries(Object.entries(source.sourceHashes).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0));
  return {
    schemaVersion: 1,
    meta: {
      themeVersion: themePackage.version,
      sourceRevision,
      sourceHashes,
      units: ['px', 'rem'],
      counts: {
        total: tokens.length,
        private: tokens.filter((token) => token.visibility === 'private').length,
        unresolved: tokens.filter((token) => token.resolutionStatus !== 'verified').length,
      },
    },
    tokens,
  };
}
