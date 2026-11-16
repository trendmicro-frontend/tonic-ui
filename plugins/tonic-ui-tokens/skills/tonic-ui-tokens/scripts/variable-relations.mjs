import { createHash } from 'node:crypto';

const LIBRARY_KEYS = {
  foundations: 'c78ec8ae359ebdf1cb35a1c24814508f149e53a6c31599d1fd5efd4a02ab8bd1',
  semantic: '35a6cc923472be122f53c9ce9fd5b8b54b3a9e320e0f1e7a56e17e56dcc6b7fa',
};
const pairKey = (library, key) => JSON.stringify([library, key]);
const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
const nonempty = (value) => typeof value === 'string' && value.trim().length > 0;
const digest = (value) => value === undefined || value === null ? null
  : createHash('sha256').update(JSON.stringify(value)).digest('hex');

function libraryDocuments(variableLibraries) {
  if (!Array.isArray(variableLibraries)) {
    throw new Error('Variable libraries must be an array of documents.');
  }
  const libraries = new Map();
  for (const document of variableLibraries) {
    const library = document?.meta?.library;
    if (!Object.hasOwn(LIBRARY_KEYS, library) || libraries.has(library) || !Array.isArray(document.variables)) {
      throw new Error(`Invalid or duplicate variable library: ${library ?? '(missing)'}.`);
    }
    libraries.set(library, document);
  }
  return libraries;
}

/** Hash the exact records reviewed, or the complete searchable scope for an absence review. */
export function relationSnapshotDigests(relation, inventory, variableLibraries) {
  const libraries = libraryDocuments(variableLibraries);
  if (relation.status === 'mapped') {
    const variable = libraries.get(relation.figma?.library)?.variables.find((entry) => entry.figmaKey === relation.figma?.key);
    const token = inventory.tokens?.find((entry) => entry.path === relation.themePath);
    return { figma: digest(variable), theme: digest(token) };
  }
  const libraryDigest = (name) => {
    const document = libraries.get(name);
    return document && Array.isArray(document.meta.collections)
      ? digest({ collections: document.meta.collections, variables: document.variables }) : null;
  };
  return { theme: digest(inventory.tokens), foundations: libraryDigest('foundations'), semantic: libraryDigest('semantic') };
}

function validateEvidence(relation, mappingData, label) {
  const evidence = relation.evidence;
  const date = evidence?.reviewedAt;
  if (!isObject(evidence) || !nonempty(evidence.reason) || typeof date !== 'string'
    || !/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(`${date}T00:00:00.000Z`))
    || new Date(`${date}T00:00:00.000Z`).toISOString().slice(0, 10) !== date) {
    throw new Error(`${label}: evidence requires a nonempty reason and real YYYY-MM-DD review date.`);
  }
  if (!Array.isArray(evidence.sourceRows)) {
    throw new Error(`${label}: evidence.sourceRows must be an array.`);
  }
  for (const row of evidence.sourceRows) {
    if (!isObject(row) || !nonempty(row.figma) || !['contentId', 'version', 'row'].every((field) => Object.hasOwn(row, field))
      || !mappingData.mappings.some((mapping) => mapping.figma === row.figma
      && mapping.source?.contentId === row.contentId && mapping.source?.version === row.version
      && mapping.source?.row === row.row)) {
      throw new Error(`${label}: source row does not exactly match a curated mapping.`);
    }
  }
  const required = relation.status === 'mapped' ? ['figma', 'theme'] : ['theme', 'foundations', 'semantic'];
  if (!isObject(evidence.snapshots) || required.some((key) => typeof evidence.snapshots[key] !== 'string'
    || !/^[a-f0-9]{64}$/.test(evidence.snapshots[key]))) {
    throw new Error(`${label}: evidence requires ${required.join(', ')} SHA-256 snapshot digests.`);
  }
}

function append(map, key, value) {
  const entries = map.get(key) ?? [];
  entries.push(value);
  map.set(key, entries);
}

/** Validate ledger structure and index both endpoints without upgrading stale reviews. */
export function buildVariableRelationIndex(inventory, mappingData, variableLibraries = []) {
  if (inventory?.schemaVersion !== 1 || mappingData?.schemaVersion !== 1
    || !Array.isArray(inventory.tokens) || !Array.isArray(mappingData.mappings)) {
    throw new Error('Invalid token or mapping inventory schema.');
  }
  const libraries = libraryDocuments(variableLibraries);
  const hasLedger = Object.hasOwn(mappingData, 'variableRelations') || Object.hasOwn(mappingData, 'variableRelationsCoverage');
  if (hasLedger && (mappingData.variableRelationsCoverage !== 'partial' || !Array.isArray(mappingData.variableRelations))) {
    throw new Error('Variable relations require partial coverage and a relations array.');
  }
  if (hasLedger && Object.keys(LIBRARY_KEYS).some((name) => !libraries.has(name))) {
    throw new Error('Variable relation reviews require both foundations and semantic variable library documents.');
  }

  const variablesByKey = new Map();
  const variablesByPath = new Map();
  const bareKeys = new Map();
  const tokens = new Map();
  for (const token of inventory.tokens) {
    if (!nonempty(token.path) || tokens.has(token.path)) {
      throw new Error(`Invalid or duplicate theme token path: ${token.path}.`);
    }
    tokens.set(token.path, token);
  }
  for (const [library, document] of libraries) {
    for (const variable of document.variables) {
      if (!isObject(variable) || !nonempty(variable.figmaKey) || !nonempty(variable.path)) {
        throw new Error(`Invalid ${library} variable key or path.`);
      }
      const key = pairKey(library, variable.figmaKey);
      const path = pairKey(library, variable.path);
      if (variablesByKey.has(key) || variablesByPath.has(path)) {
        throw new Error(`Duplicate ${library} variable key or path: ${variable.path}.`);
      }
      variablesByKey.set(key, variable);
      variablesByPath.set(path, variable);
      append(bareKeys, variable.figmaKey, { library, variable });
    }
  }

  const byVariable = new Map();
  const byTheme = new Map();
  const reviews = [];
  const positivePairs = new Set();
  const positiveVariables = new Set();
  const positiveThemes = new Set();
  const negativeVariables = new Set();
  const negativeThemes = new Set();
  let absenceDigests;
  for (const relation of mappingData.variableRelations ?? []) {
    const label = `Variable relation ${relation?.figma ? `${relation.figma.library}:${relation.figma.key}` : '(no variable)'} → ${relation?.themePath ?? '(no theme)'}`;
    if (!isObject(relation) || !['mapped', 'figma-only', 'theme-only'].includes(relation.status)) {
      throw new Error(`${label}: invalid status.`);
    }
    const hasFigma = isObject(relation.figma) && Object.hasOwn(LIBRARY_KEYS, relation.figma.library) && nonempty(relation.figma.key);
    const hasTheme = nonempty(relation.themePath);
    if ((relation.status === 'mapped' && (!hasFigma || !hasTheme))
      || (relation.status === 'figma-only' && (!hasFigma || relation.themePath !== null))
      || (relation.status === 'theme-only' && (relation.figma !== null || !hasTheme))) {
      throw new Error(`${label}: endpoints do not match ${relation.status}.`);
    }
    if (relation.status === 'mapped') {
      if (!isObject(relation.modeMap) || !Object.keys(relation.modeMap).length
        || Object.entries(relation.modeMap).some(([mode, values]) => !nonempty(mode) || !Array.isArray(values)
          || !values.length || values.some((value) => !nonempty(value)) || new Set(values).size !== values.length)) {
        throw new Error(`${label}: a mapped relation requires a nonempty modeMap of theme-mode arrays.`);
      }
    } else if (Object.hasOwn(relation, 'modeMap')) {
      throw new Error(`${label}: absence reviews must not have a modeMap.`);
    }
    validateEvidence(relation, mappingData, label);
    const variableKey = hasFigma ? pairKey(relation.figma.library, relation.figma.key) : null;
    if (relation.status === 'mapped') {
      const pair = JSON.stringify([variableKey, relation.themePath]);
      if (positivePairs.has(pair)) {
        throw new Error(`${label}: duplicate mapped pair.`);
      }
      positivePairs.add(pair);
      positiveVariables.add(variableKey);
      positiveThemes.add(relation.themePath);
    } else if (relation.status === 'figma-only') {
      if (negativeVariables.has(variableKey)) {
        throw new Error(`${label}: duplicate figma-only review.`);
      }
      negativeVariables.add(variableKey);
    } else {
      if (negativeThemes.has(relation.themePath)) {
        throw new Error(`${label}: duplicate theme-only review.`);
      }
      negativeThemes.add(relation.themePath);
    }

    const variable = hasFigma ? variablesByKey.get(variableKey) : null;
    const token = hasTheme ? tokens.get(relation.themePath) : null;
    const staleReasons = [];
    if (hasFigma && !variable) {
      staleReasons.push('variable endpoint is missing');
    }
    if (hasTheme && !token) {
      staleReasons.push('theme endpoint is missing');
    }
    if (relation.status === 'mapped') {
      for (const [figmaMode, themeModes] of Object.entries(relation.modeMap)) {
        if (variable && !Object.hasOwn(variable.values ?? {}, figmaMode)) {
          staleReasons.push(`variable mode ${figmaMode} is missing`);
        }
        for (const mode of themeModes) {
          if (token && !Object.hasOwn(token.values ?? {}, mode)) {
            staleReasons.push(`theme mode ${mode} is missing`);
          }
        }
      }
    }
    const current = relation.status === 'mapped'
      ? { figma: digest(variable), theme: digest(token) }
      : (absenceDigests ??= relationSnapshotDigests(relation, inventory, variableLibraries));
    for (const [name, value] of Object.entries(current)) {
      if (value === null || relation.evidence.snapshots[name] !== value) {
        staleReasons.push(`${name} snapshot digest changed`);
      }
    }
    const review = { ...relation, freshness: staleReasons.length ? 'stale' : 'current', ...(staleReasons.length ? { staleReasons } : {}) };
    reviews.push(review);
    if (hasFigma) {
      append(byVariable, variableKey, review);
    }
    if (hasTheme) {
      append(byTheme, relation.themePath, review);
    }
  }
  for (const key of negativeVariables) {
    if (positiveVariables.has(key)) {
      throw new Error(`Contradictory mapped and figma-only reviews for ${key}.`);
    }
  }
  for (const path of negativeThemes) {
    if (positiveThemes.has(path)) {
      throw new Error(`Contradictory mapped and theme-only reviews for ${path}.`);
    }
  }

  return { coverage: 'partial', libraries, variablesByKey, variablesByPath, bareKeys, tokens, byVariable, byTheme, reviews };
}

function validateVariableDocuments(variableLibraries) {
  const libraries = libraryDocuments(variableLibraries);
  const targetVariables = new Map([...libraries].map(([name, document]) => [
    name, new Map(document.variables.filter(isObject).map((variable) => [variable.figmaKey, variable])),
  ]));
  for (const [name, fileKeySha256] of Object.entries(LIBRARY_KEYS)) {
    const document = libraries.get(name);
    if (!document) {
      throw new Error(`Missing ${name} variable library document.`);
    }
    const meta = document.meta;
    if (document.schemaVersion !== 1 || meta.source !== 'figma-variables' || meta.fileKeySha256 !== fileKeySha256
      || meta.fileKey !== null || meta.figmaUrl !== null
      || !Array.isArray(meta.collections) || meta.variableCount !== document.variables.length
      || meta.collectionCount !== meta.collections.length) {
      throw new Error(`Invalid ${name} variable envelope, identity or declared counts.`);
    }
    const collections = new Map();
    for (const collection of meta.collections) {
      if (!isObject(collection) || !nonempty(collection.name) || collections.has(collection.name) || collection.remote === true
        || collection.isExtension === true || (collection.inheritedVariableCount ?? 0) !== 0
        || (collection.inheritedVariableIds !== undefined
          && (!Array.isArray(collection.inheritedVariableIds) || collection.inheritedVariableIds.length > 0))
        || !Array.isArray(collection.modes) || !collection.modes.length) {
        throw new Error(`Invalid, remote or extended ${name} collection: ${collection?.name}.`);
      }
      const modes = new Set();
      const modeIds = new Set();
      for (const mode of collection.modes) {
        if (!isObject(mode) || !nonempty(mode.name) || !nonempty(mode.modeId) || modes.has(mode.name) || modeIds.has(mode.modeId)) {
          throw new Error(`Invalid or duplicate mode in ${name} collection ${collection.name}.`);
        }
        modes.add(mode.name);
        modeIds.add(mode.modeId);
      }
      if (collection.defaultModeId !== undefined && !modeIds.has(collection.defaultModeId)) {
        throw new Error(`Invalid default mode in ${name} collection ${collection.name}.`);
      }
      collections.set(collection.name, { collection, modes, count: 0 });
    }
    const keys = new Set();
    const paths = new Set();
    let descriptionCount = 0;
    let aliases = 0;
    let resolvedWithinFile = 0;
    let resolvedCrossFile = 0;
    let unresolved = 0;
    for (const variable of document.variables) {
      const owner = isObject(variable) ? collections.get(variable.collection) : null;
      if (!isObject(variable) || !nonempty(variable.figmaKey) || !nonempty(variable.path) || keys.has(variable.figmaKey)
        || paths.has(variable.path) || !owner || variable.remote === true || !isObject(variable.values)
        || !Object.keys(variable.values).length) {
        throw new Error(`Invalid or duplicate ${name} variable: ${variable?.path}.`);
      }
      keys.add(variable.figmaKey);
      paths.add(variable.path);
      owner.count++;
      if (variable.description) {
        descriptionCount++;
      }
      for (const [mode, value] of Object.entries(variable.values)) {
        if (!owner.modes.has(mode) || !isObject(value)) {
          throw new Error(`Invalid mode ${mode} for ${name}:${variable.path}.`);
        }
        const validValue = (value.type === 'number' && typeof value.value === 'number' && Number.isFinite(value.value))
          || (value.type === 'boolean' && typeof value.value === 'boolean')
          || (value.type === 'string' && typeof value.value === 'string')
          || (value.type === 'color' && typeof value.hex === 'string' && /^#[0-9a-f]{6}$/i.test(value.hex)
            && typeof value.alpha === 'number' && Number.isFinite(value.alpha) && value.alpha >= 0 && value.alpha <= 1)
          || (value.type === 'alias' && nonempty(value.targetId));
        if (!validValue) {
          throw new Error(`Invalid value for ${name}:${variable.path} (${mode}).`);
        }
        if (value.type === 'alias') {
          aliases++;
          if (value.target == null) {
            unresolved++;
          } else {
            const target = value.target;
            const targetVariable = targetVariables.get(target.library)?.get(target.key);
            if (!targetVariable || targetVariable.path !== target.path || targetVariable.token !== target.token
              || targetVariable.collection !== target.collection || (value.targetKey && value.targetKey !== target.key)
              || target.crossFile !== (name !== target.library)) {
              throw new Error(`Invalid resolved alias target for ${name}:${variable.path} (${mode}).`);
            }
            if (target.crossFile) {
              resolvedCrossFile++;
            } else {
              resolvedWithinFile++;
            }
          }
        }
      }
    }
    for (const { collection, count } of collections.values()) {
      if (collection.variableCount !== count) {
        throw new Error(`Invalid variable count for ${name} collection ${collection.name}.`);
      }
    }
    if (meta.descriptionCount !== undefined && meta.descriptionCount !== descriptionCount) {
      throw new Error(`Invalid ${name} description count.`);
    }
    if (meta.aliasStats && (meta.aliasStats.total !== aliases || meta.aliasStats.resolvedWithinFile !== resolvedWithinFile
      || meta.aliasStats.resolvedCrossFile !== resolvedCrossFile || meta.aliasStats.unresolved !== unresolved)) {
      throw new Error(`Invalid ${name} alias counts.`);
    }
  }
}

/** Full validation for delivered assets; stale or removed endpoints require review. */
export function validateVariableRelations(inventory, mappingData, variableLibraries) {
  const index = buildVariableRelationIndex(inventory, mappingData, variableLibraries);
  for (const review of index.reviews) {
    if (review.freshness === 'stale') {
      throw new Error(`Stale variable relation ${review.figma ? `${review.figma.library}:${review.figma.key}` : '(no variable)'} → ${review.themePath ?? '(no theme)'}: ${review.staleReasons.join('; ')}.`);
    }
  }
  validateVariableDocuments(variableLibraries);
  return index;
}
