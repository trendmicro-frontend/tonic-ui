import { compilePathPattern, matchesPathPattern, parseThemePath } from './path-pattern.mjs';
import { buildVariableRelationIndex } from './variable-relations.mjs';

const emptyRelations = { schemaVersion: 1, variableRelationsCoverage: 'partial', variableRelations: [] };
const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
const variableKey = (library, key) => JSON.stringify([library, key]);

function compareCodePoints(left, right) {
  let a = 0;
  let b = 0;
  while (a < left.length && b < right.length) {
    const first = left.codePointAt(a);
    const second = right.codePointAt(b);
    if (first !== second) {
      return first - second;
    }
    a += first > 0xffff ? 2 : 1;
    b += second > 0xffff ? 2 : 1;
  }
  return (a < left.length ? 1 : 0) - (b < right.length ? 1 : 0);
}

const compareTheme = (left, right) => compareCodePoints(left.path, right.path);
const compareVariable = (left, right) => compareCodePoints(left.library, right.library)
  || compareCodePoints(left.path, right.path) || compareCodePoints(left.figmaKey, right.figmaKey);
const compareVariableEntries = (left, right) => compareCodePoints(left.library, right.library)
  || compareCodePoints(left.variable.path, right.variable.path)
  || compareCodePoints(left.variable.figmaKey, right.variable.figmaKey);
function validateSelector(selector) {
  if (typeof selector !== 'string' || !selector.trim()) {
    throw new Error('Selector must be a nonempty string.');
  }
}

export function createTokenMatcher(options) {
  if (!isObject(options) || !isObject(options.inventory) || options.inventory.schemaVersion !== 1
    || !Array.isArray(options.inventory.tokens) || !isObject(options.inventory.meta)
    || (Object.hasOwn(options, 'figmaVariables') && !Array.isArray(options.figmaVariables))) {
    throw new Error('Invalid token matcher data.');
  }

  const { inventory } = options;
  const figmaVariables = Object.hasOwn(options, 'figmaVariables') ? options.figmaVariables : [];
  const relations = Object.hasOwn(options, 'relations') ? options.relations : emptyRelations;
  const index = buildVariableRelationIndex(inventory, relations, figmaVariables);
  const themeEntries = [];
  const shortNames = new Map();
  for (const record of inventory.tokens) {
    const segments = parseThemePath(record.path);
    themeEntries.push({ record, segments, shortSegments: segments.slice(1) });
    if (typeof record.token === 'string') {
      const matches = shortNames.get(record.token) ?? [];
      matches.push(record);
      shortNames.set(record.token, matches);
    }
  }
  const variableEntries = [];
  for (const [library, document] of index.libraries) {
    for (const variable of document.variables) {
      variableEntries.push({ library, variable, segments: variable.path.split('/') });
    }
  }
  const meta = {
    themeVersion: inventory.meta.themeVersion,
    sourceRevision: inventory.meta.sourceRevision,
    units: inventory.meta.units,
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
  };

  function correspondence(reviews, negativeStatus) {
    return {
      status: reviews.some((review) => review.freshness === 'stale') ? 'stale'
        : reviews.some((review) => review.status === 'mapped') ? 'mapped'
          : reviews.some((review) => review.status === negativeStatus) ? negativeStatus : 'unreviewed',
      coverage: index.coverage,
      relations: reviews,
    };
  }

  function themeResult(record) {
    const reviews = index.byTheme.get(record.path) ?? [];
    const linked = new Map();
    for (const review of reviews) {
      if (review.status !== 'mapped' || review.freshness !== 'current') {
        continue;
      }
      const { library, key } = review.figma;
      const variable = index.variablesByKey.get(variableKey(library, key));
      if (variable) {
        linked.set(variableKey(library, key), { ...variable, library });
      }
    }
    return {
      ...record,
      correspondence: correspondence(reviews, 'theme-only'),
      figmaVariables: [...linked.values()].sort(compareVariable),
    };
  }

  function variableResult(library, variable) {
    const reviews = index.byVariable.get(variableKey(library, variable.figmaKey)) ?? [];
    const linked = new Map();
    for (const review of reviews) {
      if (review.status !== 'mapped' || review.freshness !== 'current') {
        continue;
      }
      const token = index.tokens.get(review.themePath);
      if (token) {
        linked.set(token.path, token);
      }
    }
    return {
      source: 'figma-variable',
      variable: { ...variable, library },
      correspondence: correspondence(reviews, 'figma-only'),
      themeTokens: [...linked.values()].sort(compareTheme),
    };
  }

  function matchThemeTokens(selector) {
    validateSelector(selector);
    const pattern = compilePathPattern(selector, '.');
    let matches;
    if (!pattern.hasWildcard) {
      const exact = index.tokens.get(selector);
      matches = exact ? [exact] : shortNames.get(selector);
    }
    if (!matches) {
      matches = themeEntries.filter(({ segments, shortSegments }) => matchesPathPattern(pattern, segments)
        || (pattern.hasWildcard && matchesPathPattern(pattern, shortSegments))).map(({ record }) => record);
    }
    return { meta, results: [...matches].sort(compareTheme).map(themeResult) };
  }

  function matchFigmaVariables(selector) {
    validateSelector(selector);
    let library;
    let name = selector;
    const separator = selector.indexOf(':');
    const firstSlash = selector.indexOf('/');
    if (separator !== -1 && (firstSlash === -1 || separator < firstSlash)) {
      library = selector.slice(0, separator);
      name = selector.slice(separator + 1);
      if (library !== 'foundations' && library !== 'semantic') {
        throw new Error(`Unknown Figma variable library: ${library}.`);
      }
    }
    const pattern = compilePathPattern(name, '/');
    const matches = new Map();
    if (pattern.hasWildcard) {
      for (const entry of variableEntries) {
        if ((!library || entry.library === library) && matchesPathPattern(pattern, entry.segments)) {
          matches.set(variableKey(entry.library, entry.variable.figmaKey), entry);
        }
      }
    } else {
      for (const nameOfLibrary of library ? [library] : index.libraries.keys()) {
        const byPath = index.variablesByPath.get(variableKey(nameOfLibrary, name));
        const byKey = index.variablesByKey.get(variableKey(nameOfLibrary, name));
        for (const variable of [byPath, byKey]) {
          if (variable) {
            matches.set(variableKey(nameOfLibrary, variable.figmaKey), { library: nameOfLibrary, variable });
          }
        }
      }
    }
    return {
      meta,
      results: [...matches.values()].sort(compareVariableEntries).map(({ library: nameOfLibrary, variable }) => variableResult(nameOfLibrary, variable)),
    };
  }

  return { matchThemeTokens, matchFigmaVariables };
}
