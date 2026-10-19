#!/usr/bin/env node
import { readFileSync, realpathSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

export function lookupTokens(query, inventory, mappingData) {
  if (inventory.schemaVersion !== 1 || mappingData.schemaVersion !== 1) throw new Error('Unsupported token data schema.');
  const tokens = new Map(inventory.tokens.map((record) => [record.path, record]));
  const aliases = new Map();
  for (const mapping of mappingData.mappings) {
    if (mapping.path) {
      if (!tokens.has(mapping.path)) throw new Error(`Invalid mapped token target: ${mapping.path}`);
      const entries = aliases.get(mapping.path) ?? [];
      entries.push(mapping);
      aliases.set(mapping.path, entries);
    }
  }
  const implemented = (record) => {
    const mappings = aliases.get(record.path) ?? [];
    const status = record.resolutionStatus !== 'verified' ? 'unresolved-source'
      : mappings.some((mapping) => mapping.status === 'source-conflict') ? 'source-conflict'
        : mappings.some((mapping) => mapping.status === 'verified') ? 'verified'
          : mappings.some((mapping) => mapping.status === 'family-mapping') ? 'family-mapping' : 'code-only';
    return { ...record, status, mappings };
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
    if (mapping.path) {
      const record = implemented(tokens.get(mapping.path));
      return { ...record, status: record.resolutionStatus === 'verified' ? mapping.status : 'unresolved-source', mappings: [mapping], designSource: designSource(mapping) };
    }
    const properties = {};
    for (const [property, path] of Object.entries(mapping.properties ?? {})) {
      const token = tokens.get(path);
      if (!token) throw new Error(`Invalid typography token target: ${path}`);
      properties[property] = { path, token: token.token, values: token.values, ...(token.unitValues ? { unitValues: token.unitValues } : {}) };
    }
    return { ...mapping, path: null, designSource: designSource(mapping), ...(Object.keys(properties).length ? { resolvedProperties: properties } : {}) };
  };
  let results;
  if (query.figma) {
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
    throw new Error('Choose --token, --figma, --family or --query.');
  }
  if (!results.length) throw new Error(`Unknown token or design query: ${Object.values(query).find(Boolean)}`);
  return {
    meta: {
      themeVersion: inventory.meta.themeVersion,
      sourceRevision: inventory.meta.sourceRevision,
      units: inventory.meta.units,
      designSources: mappingData.sources,
    },
    results,
  };
}

if (process.argv[1] && realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const { values } = parseArgs({ options: {
      token: { type: 'string' }, figma: { type: 'string' }, family: { type: 'string' }, query: { type: 'string' }, help: { type: 'boolean' },
    } });
    if (values.help) {
      console.log('Usage: node <skill-directory>/scripts/lookup-tokens.mjs --token TOKEN | --figma NAME | --family PREFIX | --query TEXT');
    } else {
      const queries = Object.fromEntries(Object.entries(values).filter(([, value]) => typeof value === 'string'));
      if (Object.keys(queries).length !== 1) throw new Error('Provide exactly one token, Figma, family or keyword query.');
      const assets = resolve(dirname(fileURLToPath(import.meta.url)), '../assets');
      const inventory = JSON.parse(readFileSync(resolve(assets, 'tokens.json'), 'utf8'));
      const mappings = JSON.parse(readFileSync(resolve(assets, 'figma-mappings.json'), 'utf8'));
      console.log(JSON.stringify(lookupTokens(queries, inventory, mappings), null, 2));
    }
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
