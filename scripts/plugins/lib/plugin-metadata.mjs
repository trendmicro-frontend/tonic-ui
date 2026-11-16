import { isDeepStrictEqual } from 'node:util';

export const PLUGIN_NAMES = Object.freeze(['tonic-ui-dev', 'tonic-ui-tokens', 'tonic-ui-upgrade']);

export function alignPluginMetadata(catalog, manifests) {
  if (!Array.isArray(catalog?.plugins) || !(manifests instanceof Map)) {
    throw new Error('Expected catalog.plugins and a manifest Map.');
  }
  const names = catalog.plugins.map((entry) => entry?.name);
  if (new Set(names).size !== names.length || names.length !== manifests.size
      || names.some((name) => !manifests.has(name))) {
    throw new Error('Catalog names must match physical manifests exactly, without duplicates.');
  }
  const aligned = structuredClone(catalog);
  const mismatches = [];
  for (const entry of aligned.plugins) {
    const manifest = manifests.get(entry.name);
    if (manifest?.name !== entry.name
        || typeof manifest.version !== 'string'
        || !/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.test(manifest.version)
        || typeof manifest.description !== 'string' || !manifest.description.trim()
        || typeof manifest.author?.name !== 'string' || !manifest.author.name.trim()) {
      throw new Error(`Invalid plugin manifest identity/version/description/author: ${entry.name}`);
    }
    for (const field of ['version', 'description', 'author']) {
      if (!isDeepStrictEqual(entry[field], manifest[field])) {
        mismatches.push({ plugin: entry.name, field });
        entry[field] = structuredClone(manifest[field]);
      }
    }
  }
  return { catalog: aligned, mismatches };
}
