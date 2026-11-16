/**
 * Tonic UI Token Export — Figma plugin main thread.
 *
 * Reads every local variable and collection in the open file on the main thread, then
 * hands the unchanged raw payload to the UI for download.
 *
 * Run once in the Foundations file and once in the Semantic file.
 *
 * Why the plugin and not the REST API: /variables/local needs file_variables:read,
 * which only exists on Figma Enterprise. The plugin API works on any plan, and it can
 * resolve a library alias target with getVariableByIdAsync() to recover its stable
 * `key` — which is what makes semantic → foundations links resolvable across files.
 */

const CHUNK = 40;

figma.showUI(__html__, { width: 460, height: 320, themeColors: true });

function post(type, extra) {
  figma.ui.postMessage(Object.assign({ type }, extra || {}));
}

/**
 * Resolve every alias target that is not a local variable — i.e. variables coming from a
 * linked library. For each we keep the stable `key` AND the human name, so a target that
 * lives in neither exported file can still be identified instead of showing as a bare
 * hash.
 */
async function collectAliasInfo(variables, infoById) {
  const aliasIds = new Set();

  for (const v of variables) {
    for (const value of Object.values(v.valuesByMode || {})) {
      if (value && value.type === 'VARIABLE_ALIAS' && !infoById.has(value.id)) {
        aliasIds.add(value.id);
      }
    }
  }

  const ids = [...aliasIds];
  if (ids.length === 0) return;

  for (let i = 0; i < ids.length; i += CHUNK) {
    const slice = ids.slice(i, i + CHUNK);
    const resolved = await Promise.all(
      slice.map(async (id) => {
        try {
          const variable = await figma.variables.getVariableByIdAsync(id);
          if (!variable) return [id, null];
          return [
            id,
            {
              key: variable.key || null,
              name: variable.name || null,
              remote: !!variable.remote,
            },
          ];
        } catch {
          return [id, null];
        }
      })
    );
    for (const [id, info] of resolved) {
      if (info) infoById.set(id, info);
    }
    post('progress', { done: Math.min(i + CHUNK, ids.length), total: ids.length });
  }
}

function serialiseValues(valuesByMode, infoById) {
  const out = {};
  for (const [modeId, value] of Object.entries(valuesByMode || {})) {
    if (value && value.type === 'VARIABLE_ALIAS') {
      const info = infoById.get(value.id) || {};
      out[modeId] = {
        type: 'VARIABLE_ALIAS',
        id: value.id,
        key: info.key || null,
        name: info.name || null,
      };
    } else {
      // Colours arrive as {r,g,b,a} floats in 0..1 — same shape the REST API returns,
      // so the shared normaliser handles both.
      out[modeId] = value;
    }
  }
  return out;
}

async function run() {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  for (const collection of collections) {
    if (collection.remote !== true &&
        (collection.isExtension === true || (collection.inheritedVariableIds || []).length > 0)) {
      throw new Error(`Extended collection "${collection.name}" is not supported.`);
    }
  }
  const variables = await figma.variables.getLocalVariablesAsync();

  // Local variables seed the map; the async pass fills in everything the file aliases
  // from a linked library.
  const infoById = new Map();
  for (const v of variables) {
    infoById.set(v.id, { key: v.key, name: v.name, remote: false });
  }

  post('progress', { phase: 'resolving aliases', done: 0, total: 1 });
  await collectAliasInfo(variables, infoById);

  const variableCollections = {};
  for (const c of collections) {
    variableCollections[c.id] = {
      id: c.id,
      name: c.name,
      key: c.key,
      defaultModeId: c.defaultModeId,
      modes: (c.modes || []).map((m) => ({
        modeId: m.modeId,
        name: m.name,
        parentModeId: m.parentModeId || null,
      })),
      variableIds: c.variableIds || [],
      hiddenFromPublishing: c.hiddenFromPublishing,
      isExtension: c.isExtension,
      inheritedVariableIds: c.inheritedVariableIds || [],
      remote: c.remote,
    };
  }

  const outVariables = {};
  for (const v of variables) {
    outVariables[v.id] = {
      id: v.id,
      name: v.name,
      key: v.key,
      variableCollectionId: v.variableCollectionId,
      resolvedType: v.resolvedType,
      description: v.description || '',
      descriptionByMode: v.descriptionByMode || null,
      scopes: v.scopes,
      hiddenFromPublishing: v.hiddenFromPublishing,
      codeSyntax: v.codeSyntax,
      remote: v.remote,
      valuesByMode: serialiseValues(v.valuesByMode, infoById),
    };
  }

  post('payload', {
    payload: {
      source: 'figma-plugin',
      pluginVersion: '1.1.0',
      fileKey: figma.fileKey || null,
      fileName: figma.root.name,
      exportedAt: new Date().toISOString(),
      meta: {
        variableCollections,
        variables: outVariables,
      },
    },
  });
}

figma.ui.onmessage = (msg) => {
  if (msg && msg.type === 'close') figma.closePlugin();
};

function reportError(err) {
  post('error', { message: String((err && err.stack) || err) });
}

run().catch(reportError);
