#!/usr/bin/env node
import { readFileSync, realpathSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { buildVariableRelationIndex } from './variable-relations.mjs';

export function lookupTokens(query, inventory, mappingData, variableLibraries = []) {
  if (inventory.schemaVersion !== 1 || mappingData.schemaVersion !== 1) throw new Error('Unsupported token data schema.');
  const selectorNames = ['token', 'figma', 'family', 'query', 'variable'];
  const providedSelectors = selectorNames.filter((name) => Object.hasOwn(query, name));
  if (providedSelectors.length !== 1 || typeof query[providedSelectors[0]] !== 'string'
    || query[providedSelectors[0]].length === 0) {
    throw new Error('Provide exactly one --token, --figma, --family, --query or --variable selector.');
  }
  const index = buildVariableRelationIndex(inventory, mappingData, variableLibraries);
  const tokens = index.tokens;
  const aliases = new Map();
  for (const mapping of mappingData.mappings) {
    if (mapping.path) {
      const entries = aliases.get(mapping.path) ?? [];
      entries.push(mapping);
      aliases.set(mapping.path, entries);
    }
  }
  const variableKey = (library, key) => JSON.stringify([library, key]);
  const correspondence = (relations, negativeStatus) => ({
    status: relations.some((relation) => relation.freshness === 'stale') ? 'stale'
      : relations.some((relation) => relation.status === 'mapped') ? 'mapped'
        : relations.some((relation) => relation.status === negativeStatus) ? negativeStatus : 'unreviewed',
    coverage: index.coverage,
    relations,
  });
  const currentVariables = (relations) => {
    const variables = new Map();
    for (const relation of relations) {
      if (relation.status !== 'mapped' || relation.freshness !== 'current') continue;
      const { library, key } = relation.figma;
      const variable = index.variablesByKey.get(variableKey(library, key));
      if (variable) variables.set(variableKey(library, key), { ...variable, library });
    }
    return [...variables.values()];
  };
  const implemented = (record) => {
    const mappings = aliases.get(record.path) ?? [];
    const status = record.resolutionStatus !== 'verified' ? 'unresolved-source'
      : mappings.some((mapping) => mapping.status === 'source-conflict') ? 'source-conflict'
        : mappings.some((mapping) => mapping.status === 'verified') ? 'verified'
          : mappings.some((mapping) => mapping.status === 'family-mapping') ? 'family-mapping' : 'code-only';
    const relations = index.byTheme.get(record.path) ?? [];
    return { ...record, status, mappings, correspondence: correspondence(relations, 'theme-only'), figmaVariables: currentVariables(relations) };
  };
  const designSource = (mapping) => {
    const source = mappingData.sources?.find((entry) => String(entry.contentId) === String(mapping.source?.contentId)
      && String(entry.version) === String(mapping.source?.version));
    if (!source) return undefined;
    return {
      contentId: source.contentId,
      version: source.version,
      title: source.title,
      ...(source.applicability ? { applicability: source.applicability } : {}),
      ...(source.historicalSourceTitle ? { historicalSourceTitle: source.historicalSourceTitle } : {}),
    };
  };
  const designRecord = (mapping) => {
    if (mapping.path && !tokens.has(mapping.path)) {
      throw new Error(`Invalid mapped token target: ${mapping.path}`);
    }
    if (mapping.path) {
      const record = implemented(tokens.get(mapping.path));
      return { ...record, status: record.resolutionStatus === 'verified' ? mapping.status : 'unresolved-source', mappings: [mapping], designSource: designSource(mapping) };
    }
    const properties = {};
    for (const [property, path] of Object.entries(mapping.properties ?? {})) {
      const token = tokens.get(path);
      if (!token) throw new Error(`Invalid typography token target: ${path}`);
      const related = implemented(token);
      properties[property] = {
        path, token: token.token, values: token.values, ...(token.unitValues ? { unitValues: token.unitValues } : {}),
        correspondence: related.correspondence, figmaVariables: related.figmaVariables,
      };
    }
    return { ...mapping, path: null, designSource: designSource(mapping), ...(Object.keys(properties).length ? { resolvedProperties: properties } : {}) };
  };
  let results;
  if (query.variable) {
    if (index.libraries.size !== 2) {
      throw new Error('Variable lookup requires both foundations and semantic variable library documents.');
    }
    const selector = query.variable;
    let matches;
    if (selector.includes(':')) {
      const separator = selector.indexOf(':');
      const library = selector.slice(0, separator);
      const name = selector.slice(separator + 1);
      if (!index.libraries.has(library) || !name) {
        throw new Error('Qualify a variable with semantic:<key-or-path> or foundations:<key-or-path>.');
      }
      const byKey = index.variablesByKey.get(variableKey(library, name));
      const byPath = index.variablesByPath.get(variableKey(library, name));
      matches = [...new Set([byKey, byPath].filter(Boolean))].map((variable) => ({ library, variable }));
    } else {
      if (selector.includes('/')) throw new Error('Qualify a variable path with semantic: or foundations:.');
      matches = index.bareKeys.get(selector) ?? [];
    }
    if (matches.length > 1) throw new Error(`Ambiguous variable selector ${selector}; qualify the library.`);
    if (!matches.length) throw new Error(`Unknown variable selector: ${selector}`);
    const { library, variable } = matches[0];
    const relations = index.byVariable.get(variableKey(library, variable.figmaKey)) ?? [];
    const linkedTokens = new Map();
    for (const relation of relations) {
      if (relation.status === 'mapped' && relation.freshness === 'current') {
        const token = tokens.get(relation.themePath);
        if (token) linkedTokens.set(token.path, token);
      }
    }
    results = [{
      source: 'figma-variable',
      variable: { ...variable, library },
      correspondence: correspondence(relations, 'figma-only'),
      themeTokens: [...linkedTokens.values()],
    }];
  } else if (query.figma) {
    results = mappingData.mappings.filter((mapping) => mapping.figma === query.figma).map(designRecord);
  } else if (query.token) {
    const exact = tokens.get(query.token);
    results = exact ? [implemented(exact)] : inventory.tokens.filter((record) => record.token === query.token).map(implemented);
  } else if (query.family) {
    const prefix = query.family;
    results = inventory.tokens.filter((record) => record.path === prefix || record.path.startsWith(`${prefix}.`)
      || record.path.startsWith(`${prefix}[`) || record.token === prefix || record.token.startsWith(`${prefix}.`)
      || record.token.startsWith(`${prefix}[`)).map(implemented);
  } else if (query.query) {
    const text = query.query.toLowerCase();
    const mapped = mappingData.mappings.filter((mapping) => [mapping.figma, mapping.role, ...(mapping.notes ?? [])]
      .some((value) => typeof value === 'string' && value.toLowerCase().includes(text)));
    const paths = new Set(mapped.map((mapping) => mapping.path).filter(Boolean));
    results = inventory.tokens.filter((record) => record.path.toLowerCase().includes(text) || paths.has(record.path)).map(implemented);
    results.push(...mapped.filter((mapping) => !mapping.path).map(designRecord));
  } else {
    throw new Error('Choose --token, --figma, --family, --query or --variable.');
  }
  if (!results.length) throw new Error(`Unknown token or design query: ${Object.values(query).find(Boolean)}`);
  return {
    meta: {
      themeVersion: inventory.meta.themeVersion,
      sourceRevision: inventory.meta.sourceRevision,
      units: inventory.meta.units,
      designSources: mappingData.sources,
      variableRelationCoverage: index.coverage,
      variableSources: [...index.libraries].map(([library, document]) => ({
        library,
        fileKeySha256: document.meta.fileKeySha256 ?? null,
        capturedAt: document.meta.capturedAt ?? null,
        exportedAt: document.meta.exportedAt ?? null,
        captureMethod: document.meta.captureMethod ?? null,
        pluginVersion: document.meta.pluginVersion ?? null,
        variableCount: document.meta.variableCount ?? null,
        collectionCount: document.meta.collectionCount ?? null,
      })),
    },
    results,
  };
}

if (process.argv[1] && realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const { values } = parseArgs({ options: {
      token: { type: 'string' }, figma: { type: 'string' }, family: { type: 'string' }, query: { type: 'string' },
      variable: { type: 'string' }, help: { type: 'boolean' },
    } });
    if (values.help) {
      console.log('Usage: node <skill-directory>/scripts/lookup-tokens.mjs --token TOKEN | --figma NAME | --family PREFIX | --query TEXT | --variable SELECTOR');
    } else {
      const queries = Object.fromEntries(Object.entries(values).filter(([, value]) => typeof value === 'string'));
      if (Object.keys(queries).length !== 1) {
        throw new Error('Provide exactly one --token, --figma, --family, --query or --variable selector.');
      }
      const assets = resolve(dirname(fileURLToPath(import.meta.url)), '../assets');
      const inventory = JSON.parse(readFileSync(resolve(assets, 'tokens.json'), 'utf8'));
      const mappings = JSON.parse(readFileSync(resolve(assets, 'figma-mappings.json'), 'utf8'));
      const variableLibraries = ['foundations', 'semantic'].map((library) => JSON.parse(
        readFileSync(resolve(assets, 'figma-variables', `${library}.json`), 'utf8'),
      ));
      console.log(JSON.stringify(lookupTokens(queries, inventory, mappings, variableLibraries), null, 2));
    }
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
