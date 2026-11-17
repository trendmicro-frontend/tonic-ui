import { createHash } from 'node:crypto';

// Validation and inventory conversion for Figma plugin captures.
const FILES = [
  {
    slug: 'foundations',
    layer: 'primitive',
    fileKeySha256: 'c78ec8ae359ebdf1cb35a1c24814508f149e53a6c31599d1fd5efd4a02ab8bd1',
    matches: [/foundation/i, /primitive/i],
  },
  {
    slug: 'semantic',
    layer: 'semantic',
    fileKeySha256: '35a6cc923472be122f53c9ce9fd5b8b54b3a9e320e0f1e7a56e17e56dcc6b7fa',
    matches: [/semantic/i, /design tokens/i],
  },
];
const isMap = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
const nonempty = (value) => typeof value === 'string' && value.trim().length > 0;

function fingerprintFileKey(fileKey) {
  return createHash('sha256').update(fileKey).digest('hex');
}

/** Identify only by the known key fingerprint, or by an unambiguous name if absent. */
function identifyLibrary(payload) {
  if (!isMap(payload)) {
    throw new Error('Expected a raw Figma plugin payload');
  }
  if (payload.fileKey != null && typeof payload.fileKey !== 'string') {
    throw new Error('fileKey must be a string or null');
  }
  if (payload.fileKey != null && payload.fileKey !== '') {
    const fingerprint = fingerprintFileKey(payload.fileKey);
    const file = FILES.find((entry) => entry.fileKeySha256 === fingerprint);
    if (!file) {
      throw new Error('Unknown Figma fileKey');
    }
    return file;
  }
  const name = typeof payload.fileName === 'string' ? payload.fileName : '';
  const matches = FILES.filter((entry) => entry.matches.some((pattern) => pattern.test(name)));
  if (matches.length !== 1) {
    throw new Error(`${matches.length ? 'Ambiguous' : 'Unknown'} Figma file identity`);
  }
  return matches[0];
}

function validTimestamp(value) {
  if (typeof value !== 'string' ||
      !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(value) ||
      !Number.isFinite(Date.parse(value))) {
    return false;
  }
  const day = value.slice(0, 10);
  const parsedDay = new Date(`${day}T00:00:00Z`);
  return Number.isFinite(parsedDay.getTime()) && parsedDay.toISOString().slice(0, 10) === day;
}

function validateValue(value, type, label) {
  if (isMap(value) && value.type === 'VARIABLE_ALIAS') {
    if (!nonempty(value.id) ||
        (value.key != null && !nonempty(value.key)) ||
        (value.name != null && !nonempty(value.name))) {
      throw new Error(`${label}: invalid alias target`);
    }
    return;
  }
  if (type === 'COLOR' && isMap(value) &&
      ['r', 'g', 'b'].every((channel) => typeof value[channel] === 'number' &&
        Number.isFinite(value[channel]) && value[channel] >= 0 && value[channel] <= 1) &&
      (value.a === undefined || (typeof value.a === 'number' && Number.isFinite(value.a) &&
        value.a >= 0 && value.a <= 1))) {
    return;
  }
  if (type === 'FLOAT' && typeof value === 'number' && Number.isFinite(value)) {
    return;
  }
  if (type === 'STRING' && typeof value === 'string') {
    return;
  }
  if (type === 'BOOLEAN' && typeof value === 'boolean') {
    return;
  }
  throw new Error(`${label}: invalid ${type} value`);
}

/** Validate plugin inventories before filtering or writing. */
function validateVariableInput(data, file) {
  const label = file?.slug ?? 'Figma library';
  if (!isMap(data) || !isMap(data.variables) || !isMap(data.collections)) {
    throw new Error(`${label}: expected variables and collections maps`);
  }
  const { variables, collections } = data;
  const modesByCollection = new Map();
  const idsByCollection = new Map();
  for (const [id, collection] of Object.entries(collections)) {
    if (!isMap(collection) || collection.id !== id || !nonempty(id) ||
        !nonempty(collection.name) || !nonempty(collection.key) ||
        (collection.remote != null && typeof collection.remote !== 'boolean') ||
        (collection.isExtension != null && typeof collection.isExtension !== 'boolean') ||
        (collection.hiddenFromPublishing != null && typeof collection.hiddenFromPublishing !== 'boolean')) {
      throw new Error(`${label}: invalid collection record ${id}`);
    }
    if (!Array.isArray(collection.modes) || collection.modes.length === 0 ||
        !Array.isArray(collection.variableIds) ||
        (collection.inheritedVariableIds != null && !Array.isArray(collection.inheritedVariableIds))) {
      throw new Error(`${label}: invalid modes or variable IDs for collection ${id}`);
    }
    if (collection.remote !== true &&
        (collection.isExtension === true || (collection.inheritedVariableIds?.length ?? 0) > 0)) {
      throw new Error(`${label}: extended collection ${id} is not supported`);
    }
    const modeIds = new Set();
    const modeNames = new Set();
    for (const mode of collection.modes) {
      if (!isMap(mode) || !nonempty(mode.modeId) || !nonempty(mode.name) ||
          (mode.parentModeId != null && !nonempty(mode.parentModeId)) ||
          modeIds.has(mode.modeId) || modeNames.has(mode.name)) {
        throw new Error(`${label}: invalid or duplicate mode in collection ${id}`);
      }
      modeIds.add(mode.modeId);
      modeNames.add(mode.name);
    }
    if (!modeIds.has(collection.defaultModeId)) {
      throw new Error(`${label}: invalid default mode for collection ${id}`);
    }
    if (collection.variableIds.some((variableId) => !nonempty(variableId)) ||
        new Set(collection.variableIds).size !== collection.variableIds.length ||
        (collection.inheritedVariableIds ?? []).some((variableId) => !nonempty(variableId))) {
      throw new Error(`${label}: invalid variable IDs for collection ${id}`);
    }
    modesByCollection.set(id, modeIds);
    idsByCollection.set(id, new Set(collection.variableIds));
  }

  let localCount = 0;
  const localKeys = new Set();
  const localPaths = new Set();
  for (const [id, variable] of Object.entries(variables)) {
    if (!isMap(variable) || variable.id !== id || !nonempty(id) ||
        !nonempty(variable.name) || !nonempty(variable.key) ||
        (variable.remote != null && typeof variable.remote !== 'boolean') ||
        !['COLOR', 'FLOAT', 'STRING', 'BOOLEAN'].includes(variable.resolvedType) ||
        (variable.hiddenFromPublishing != null && typeof variable.hiddenFromPublishing !== 'boolean') ||
        (variable.description != null && typeof variable.description !== 'string') ||
        (variable.descriptionByMode != null && (!isMap(variable.descriptionByMode) ||
          Object.values(variable.descriptionByMode).some((value) => typeof value !== 'string'))) ||
        (variable.scopes != null && (!Array.isArray(variable.scopes) ||
          variable.scopes.some((scope) => !nonempty(scope)))) ||
        (variable.codeSyntax != null && (!isMap(variable.codeSyntax) ||
          Object.values(variable.codeSyntax).some((value) => typeof value !== 'string')))) {
      throw new Error(`${label}: invalid variable record ${id}`);
    }
    const collection = collections[variable.variableCollectionId];
    const remote = variable.remote === true;
    if (!nonempty(variable.variableCollectionId) || (!collection && !remote) ||
        (collection && (collection.remote === true) !== remote)) {
      throw new Error(`${label}: invalid collection ownership for variable ${id}`);
    }
    if (collection && !idsByCollection.get(variable.variableCollectionId).has(id)) {
      throw new Error(`${label}: variable ${id} is missing from its collection`);
    }
    if (!isMap(variable.valuesByMode) || Object.keys(variable.valuesByMode).length === 0) {
      throw new Error(`${label}: invalid valuesByMode for variable ${id}`);
    }
    const modeIds = modesByCollection.get(variable.variableCollectionId);
    for (const [modeId, value] of Object.entries(variable.valuesByMode)) {
      if (!nonempty(modeId) || (modeIds && !modeIds.has(modeId))) {
        throw new Error(`${label}: invalid mode ${modeId} for variable ${id}`);
      }
      validateValue(value, variable.resolvedType, `${label}: variable ${id}, mode ${modeId}`);
    }
    if (!remote) {
      if (Object.keys(variable.valuesByMode).length !== modeIds.size) {
        throw new Error(`${label}: missing mode values for variable ${id}`);
      }
      localCount++;
      const variablePath = `${collection.name}/${variable.name}`;
      if (localKeys.has(variable.key) || localPaths.has(variablePath)) {
        throw new Error(`${label}: duplicate local variable key or path: ${variablePath}`);
      }
      localKeys.add(variable.key);
      localPaths.add(variablePath);
    }
  }
  for (const [id, collection] of Object.entries(collections)) {
    if (collection.remote === true) {
      continue;
    }
    for (const variableId of collection.variableIds) {
      if (!variables[variableId] || variables[variableId].variableCollectionId !== id ||
          variables[variableId].remote === true) {
        throw new Error(`${label}: invalid owner or missing local variable ${variableId} in collection ${id}`);
      }
    }
  }
  if (!localCount) {
    throw new Error(`${label}: local variable inventory is empty`);
  }
}

function validatePluginPayload(payload, file) {
  if (!isMap(payload)) {
    throw new Error('Expected a raw Figma plugin payload');
  }
  if (payload.schemaVersion != null && Array.isArray(payload.variables)) {
    throw new Error('Converted assets are not raw Figma plugin payloads');
  }
  if (payload.source !== 'figma-plugin' || !nonempty(payload.pluginVersion) ||
      !nonempty(payload.fileName) || !validTimestamp(payload.exportedAt) || !isMap(payload.meta)) {
    throw new Error('Invalid Figma plugin payload envelope (source, version, file name, timestamp or meta)');
  }
  const identified = identifyLibrary(payload);
  if (!file || identified.slug !== file.slug) {
    throw new Error(`Payload does not belong to ${file?.slug ?? 'the requested library'}`);
  }
  validateVariableInput({ variables: payload.meta.variables, collections: payload.meta.variableCollections }, file);
}

/** REST returns COLOR as {r,g,b,a} floats in 0..1. */
function colorToHex(v) {
  const to255 = (n) => Math.max(0, Math.min(255, Math.round((n ?? 0) * 255)));
  const hex = (n) => to255(n).toString(16).padStart(2, '0');
  return `#${hex(v.r)}${hex(v.g)}${hex(v.b)}`;
}

function normalizeValue(raw) {
  if (raw && typeof raw === 'object' && raw.type === 'VARIABLE_ALIAS') {
    // The REST API only gives `id`. The plugin path additionally records the target's
    // stable `key`, which survives across files — that is what makes a semantic →
    // foundations alias resolvable with certainty. It also records the target's `name`,
    // the only clue available when the target lives in a library we did not export.
    const out = { type: 'alias', targetId: raw.id };
    if (raw.key) out.targetKey = raw.key;
    if (raw.name) out.targetName = raw.name;
    return out;
  }
  if (raw && typeof raw === 'object' && 'r' in raw && 'g' in raw && 'b' in raw) {
    const alpha = typeof raw.a === 'number' ? raw.a : 1;
    const out = { type: 'color', hex: colorToHex(raw), alpha };
    if (alpha < 1) {
      out.hexWithAlpha = out.hex + Math.round(alpha * 255).toString(16).padStart(2, '0');
    }
    return out;
  }
  if (typeof raw === 'number') return { type: 'number', value: raw };
  if (typeof raw === 'boolean') return { type: 'boolean', value: raw };
  if (typeof raw === 'string') return { type: 'string', value: raw };
  return { type: 'unknown', raw };
}

/** Turn one /variables/local response into the document body for that file. */
function flattenFile({ file, data, fileMeta = {} }) {
  validateVariableInput(data, file);
  const { variables, collections } = data;
  const localCollections = Object.values(collections).filter((collection) => collection.remote !== true);
  const localVariables = Object.values(variables).filter((variable) =>
    variable.remote !== true && collections[variable.variableCollectionId].remote !== true
  );

  const outVariables = localVariables.map((v) => {
    const collection = collections[v.variableCollectionId]?.name ?? null;

    const values = {};
    for (const [modeId, raw] of Object.entries(v.valuesByMode ?? {})) {
      const modeName = collections[v.variableCollectionId].modes.find((mode) => mode.modeId === modeId).name;
      const hint = raw?.type === 'VARIABLE_ALIAS' ? variables[raw.id] : null;
      const enriched = hint && (!raw.key || raw.key === hint.key)
        ? { ...raw, key: raw.key ?? hint.key, name: raw.name ?? hint.name }
        : raw;
      const normalized = normalizeValue(enriched);
      // Alias targets are filled in later by resolveAliases(), which needs both files.
      if (normalized.type === 'alias') normalized.target = null;
      values[modeName] = normalized;
    }

    return {
      path: `${collection}/${v.name}`,
      token: v.name,
      collection,
      resolvedType: v.resolvedType ?? null,
      values,
      // Design-authored usage guidance. Single string per variable; Figma does not
      // document a per-mode description, so `descriptionByMode` is passed through
      // defensively in case it ever appears.
      description: v.description || null,
      descriptionByMode: v.descriptionByMode ?? null,
      figmaKey: v.key ?? null,
      figmaId: v.id ?? null,
      scopes: v.scopes ?? null,
      hiddenFromPublishing: v.hiddenFromPublishing ?? null,
      codeSyntax: v.codeSyntax && Object.keys(v.codeSyntax).length ? v.codeSyntax : null,
      remote: v.remote ?? null,
    };
  });

  outVariables.sort(
    (a, b) =>
      String(a.collection).localeCompare(String(b.collection)) ||
      String(a.token).localeCompare(String(b.token))
  );

  const outCollections = localCollections
    .map((c) => ({
      key: c.key ?? null,
      id: c.id ?? null,
      name: c.name,
      defaultModeId: c.defaultModeId ?? null,
      defaultModeName:
        (c.modes ?? []).find((m) => m.modeId === c.defaultModeId)?.name ?? null,
      modes: (c.modes ?? []).map((m) => ({
        modeId: m.modeId,
        name: m.name,
        ...(m.parentModeId ? { parentModeId: m.parentModeId } : {}),
      })),
      variableCount: localVariables.filter((v) => v.variableCollectionId === c.id).length,
      isExtension: c.isExtension ?? false,
      inheritedVariableCount: (c.inheritedVariableIds ?? []).length,
      hiddenFromPublishing: c.hiddenFromPublishing ?? null,
      remote: c.remote ?? null,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const byId = new Map();
  const byKey = new Map();
  for (const v of outVariables) {
    if (v.figmaId) byId.set(v.figmaId, v);
    if (v.figmaKey) byKey.set(v.figmaKey, v);
  }

  return {
    file,
    variables: outVariables,
    collections: outCollections,
    byId,
    byKey,
    fileMeta,
  };
}

/**
 * Resolve alias targets across both files.
 *
 * Aliases are emitted by Figma as `{ type: "VARIABLE_ALIAS", id }`. `id` is what the
 * alias carries; `key` is the stable 40-char identifier. A semantic variable pointing at
 * a Foundations library variable is therefore only resolvable if we index both files.
 */
function resolveAliases(flattened) {
  const allByKey = new Map();

  for (const doc of flattened) {
    for (const v of doc.variables) {
      if (v.figmaKey) {
        if (allByKey.has(v.figmaKey)) {
          throw new Error(`Duplicate exported stable variable key: ${v.figmaKey}`);
        }
        allByKey.set(v.figmaKey, { doc, variable: v });
      }
    }
  }

  // Explicit stable keys are authoritative. Raw IDs are meaningful only in their own file.
  const resolve = (doc, value) => {
    if (value.targetKey) {
      return allByKey.get(value.targetKey) ?? null;
    }
    const local = doc.byId.get(value.targetId);
    return local ? { doc, variable: local } : allByKey.get(value.targetId) ?? null;
  };

  const stats = {};

  for (const doc of flattened) {
    const s = {
      total: 0,
      resolvedWithinFile: 0,
      resolvedCrossFile: 0,
      unresolved: 0,
      unresolvedSample: [],
      unresolvedByTarget: [],
    };

    // An unresolved alias is a hole in the data, so it has to be diagnosable. Group the
    // misses by what they point at — prefer the human name the plugin recovered, since
    // the key alone is unreadable when the target belongs to a library we never saw.
    const misses = new Map();

    for (const v of doc.variables) {
      for (const modeValue of Object.values(v.values)) {
        if (modeValue.type !== 'alias') continue;
        s.total++;

        const hit = resolve(doc, modeValue);
        if (!hit) {
          s.unresolved++;
          const label =
            modeValue.targetName ?? modeValue.targetKey ?? modeValue.targetId ?? '(unknown)';
          if (s.unresolvedSample.length < 10) s.unresolvedSample.push(label);

          const entry = misses.get(label) ?? {
            target: label,
            key: modeValue.targetKey ?? null,
            targetId: modeValue.targetId ?? null,
            count: 0,
          };
          entry.count++;
          misses.set(label, entry);

          modeValue.target = null;
          continue;
        }

        const crossFile = hit.doc.file.slug !== doc.file.slug;
        if (crossFile) s.resolvedCrossFile++;
        else s.resolvedWithinFile++;

        modeValue.target = {
          library: hit.doc.file.slug,
          collection: hit.variable.collection,
          token: hit.variable.token,
          path: hit.variable.path,
          key: hit.variable.figmaKey,
          crossFile,
        };
      }
    }

    s.unresolvedByTarget = [...misses.values()].sort((a, b) => b.count - a.count);
    stats[doc.file.slug] = s;
  }

  return stats;
}

function buildDocument(flattened, stats) {
  const { file, variables, collections, fileMeta } = flattened;
  const descriptionCount = variables.filter((v) => v.description).length;
  const alias = stats[file.slug];

  return {
    schemaVersion: 1,
    meta: {
      source: 'figma-variables',
      library: file.slug,
      layer: file.layer,
      figmaFileName: fileMeta.name ?? null,
      figmaFileVersion: fileMeta.version ?? null,
      figmaFileLastModified: fileMeta.lastModified ?? null,
      fileKey: null,
      figmaUrl: null,
      fileKeySha256: file.fileKeySha256,
      api: 'GET /v1/files/:file_key/variables/local',
      exportedAt: new Date().toISOString(),
      variableCount: variables.length,
      collectionCount: collections.length,
      descriptionCount,
      aliasStats: alias,
      collections,
      notes: [
        'Location-redacted snapshot of the Figma Variables in this library. Independent',
        'design evidence, not reconciled with Tonic UI v3 tokens or token-relations.json.',
        'Alias values carry a resolved `target` when the destination variable exists in',
        'either Figma library; `null` means it could not be resolved.',
      ],
    },
    variables,
  };
}

export {
  FILES,
  fingerprintFileKey,
  isMap,
  identifyLibrary,
  validateVariableInput,
  validatePluginPayload,
  colorToHex,
  normalizeValue,
  flattenFile,
  resolveAliases,
  buildDocument,
};
