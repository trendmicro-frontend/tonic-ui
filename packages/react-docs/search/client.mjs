import {
  MIN_QUERY_LENGTH,
  SEARCH_INDEX_DIR,
  SEARCH_MANIFEST_FILE,
  SEARCH_RESULT_LIMIT,
  SEARCH_SUGGESTION_LIMIT,
  createMiniSearchOptions,
  getQueryTerms,
  normalizeForComparison,
} from './config.mjs';

let indexPromise = null;

/**
 * Resolve the static asset base path.
 * Next.js inlines `TONIC_UI_REACT_DOCS_BASE_PATH` at build time.
 *
 * @returns {string}
 */
const getBasePath = () => {
  const basePath = process.env.TONIC_UI_REACT_DOCS_BASE_PATH || '';
  return basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
};

const fetchJson = async (url, init) => {
  const response = await fetch(url, init);
  if (!response.ok) {
    throw new Error(`Failed to load ${url} (${response.status} ${response.statusText})`);
  }
  return response.json();
};

/**
 * Load and deserialize the prebuilt search index.
 *
 * The index is fetched lazily when the search dialog opens, cached for the
 * page session, and shared across concurrent callers.
 *
 * @param {{ forceReload?: boolean }} [options]
 * @returns {Promise<import('minisearch').default>}
 */
export const loadSearchIndex = ({ forceReload = false } = {}) => {
  if (forceReload) {
    indexPromise = null;
  }

  if (!indexPromise) {
    indexPromise = (async () => {
      const basePath = getBasePath();
      const manifest = await fetchJson(
        `${basePath}/${SEARCH_INDEX_DIR}/${SEARCH_MANIFEST_FILE}`,
        { cache: 'no-cache' },
      );

      const indexUrl = `${basePath}/${SEARCH_INDEX_DIR}/${manifest.file}`;
      const response = await fetch(indexUrl, { cache: 'force-cache' });
      if (!response.ok) {
        throw new Error(`Failed to load ${indexUrl} (${response.status} ${response.statusText})`);
      }
      const json = await response.text();

      // MiniSearch is loaded only when the search dialog is opened.
      const { default: MiniSearch } = await import('minisearch');
      return MiniSearch.loadJSON(json, createMiniSearchOptions());
    })().catch((error) => {
      indexPromise = null;
      throw error;
    });
  }

  return indexPromise;
};

/**
 * Apply deterministic ranking on top of the MiniSearch score.
 *
 * Priority:
 *   1. Exact title match (document/component name)
 *   2. Exact keyword match (API names such as `useColorMode`)
 *   3. Title prefix match
 *   4. Heading match
 *   5. Body content (MiniSearch score)
 *
 * @param {object[]} results
 * @param {string} query
 * @returns {object[]}
 */
const rankResults = (results, query) => {
  const normalizedQuery = normalizeForComparison(query);
  const queryTokens = normalizedQuery.split(' ').filter(Boolean);

  const ranked = results.map((result) => {
    const title = normalizeForComparison(result.title);
    const heading = normalizeForComparison(result.heading);
    const keywords = normalizeForComparison(result.keywords);
    let boost = 0;

    if (title === normalizedQuery) {
      boost += 3000;
      if (!heading) {
        // The page landing section is the canonical result for a title match.
        boost += 500;
      }
    }
    const keywordTokens = keywords.split(' ');
    if (keywordTokens.includes(normalizedQuery)) {
      boost += 1500;
    } else if (keywordTokens.some((token) => token.startsWith(normalizedQuery))) {
      boost += 900;
    }
    if (title.startsWith(normalizedQuery)) {
      boost += 1000 - Math.min(500, (title.length - normalizedQuery.length) * 60);
      if (title.length <= normalizedQuery.length + 3) {
        boost += 500;
      }
      if (!heading) {
        boost += 300;
      }
    }
    if (heading === normalizedQuery) {
      boost += 400;
    } else if (heading.startsWith(normalizedQuery)) {
      boost += 200;
    }
    if (queryTokens.length > 1 && queryTokens.every((token) => title.includes(token))) {
      boost += 300;
    }
    if (queryTokens.length > 1) {
      // Multi-word queries can fall back to any-word matching. Rank the
      // documents whose title matches one of those words.
      for (const token of queryTokens) {
        if (token.length < 2) {
          continue;
        }
        if (title === token) {
          boost += 800;
        } else if (title.startsWith(token)) {
          boost += 300;
        }
      }
    }

    return {
      ...result,
      score: result.score + boost,
    };
  });

  ranked.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return String(a.title).localeCompare(String(b.title));
  });

  // Chunked sections share a URL. Keep the highest-scoring chunk.
  const seenUrls = new Set();
  return ranked.filter((result) => {
    if (seenUrls.has(result.url)) {
      return false;
    }
    seenUrls.add(result.url);
    return true;
  });
};

/**
 * Build a result snippet around the first matched term.
 *
 * Only `SEARCH_SNIPPET_LENGTH` characters are stored per result, so the window
 * starts at the first term and falls back to the beginning of the text.
 *
 * @param {{ text?: string }} result
 * @param {string[]} terms
 * @returns {string}
 */
export const getSnippet = (result, terms) => {
  const text = String(result?.text ?? '');
  if (!text) {
    return '';
  }

  const lowerText = text.toLowerCase();
  let index = -1;
  for (const term of terms) {
    const found = lowerText.indexOf(String(term).toLowerCase());
    if (found !== -1 && (index === -1 || found < index)) {
      index = found;
    }
  }

  if (index <= 40) {
    return text;
  }

  return `…${text.slice(index - 40)}`;
};

/**
 * Search indexed documents.
 *
 * @param {import('minisearch').default} miniSearch
 * @param {string} query
 * @returns {object[]}
 */
export const searchDocuments = (miniSearch, query) => {
  const trimmedQuery = query.trim();
  if (trimmedQuery.length < MIN_QUERY_LENGTH) {
    return [];
  }

  let results = miniSearch.search(trimmedQuery);

  // Require every word first; fall back to any word so that a partial query
  // still returns something usable instead of an empty state.
  if (results.length === 0) {
    results = miniSearch.search(trimmedQuery, { combineWith: 'OR' });
  }

  return rankResults(results, trimmedQuery)
    .slice(0, SEARCH_RESULT_LIMIT);
};

/**
 * Get auto-suggestions for the current query.
 *
 * Document titles are preferred because they preserve the canonical casing
 * (`useColorMode`, `Button`). When no title matches, indexed term completions
 * are used as a fallback (for example `closeB` -> `closebehavior`).
 *
 * @param {import('minisearch').default} miniSearch
 * @param {string} query
 * @returns {string[]}
 */
export const getSuggestions = (miniSearch, query) => {
  const trimmedQuery = query.trim();
  if (trimmedQuery.length < MIN_QUERY_LENGTH) {
    return [];
  }

  const prefix = normalizeForComparison(trimmedQuery).replace(/\s+/g, '');
  if (!prefix) {
    return [];
  }

  const suggestions = [];
  const seen = new Set();
  const push = (value) => {
    const key = normalizeForComparison(value).replace(/\s+/g, '');
    if (!key || key === prefix || seen.has(key)) {
      return;
    }
    seen.add(key);
    suggestions.push(value);
  };

  miniSearch.search(trimmedQuery)
    .slice(0, 200)
    .map((result) => result.title)
    .filter((title) => normalizeForComparison(title).replace(/\s+/g, '').startsWith(prefix))
    .sort((a, b) => a.length - b.length || a.localeCompare(b))
    .forEach(push);

  if (suggestions.length < SEARCH_SUGGESTION_LIMIT) {
    const terms = new Set();
    for (const entry of miniSearch.autoSuggest(trimmedQuery, { fuzzy: false, prefix: true })) {
      for (const term of entry.terms) {
        if (term.replace(/\s+/g, '').startsWith(prefix)) {
          terms.add(term);
        }
      }
    }
    Array.from(terms)
      .sort((a, b) => a.length - b.length || a.localeCompare(b))
      .forEach(push);
  }

  return suggestions.slice(0, SEARCH_SUGGESTION_LIMIT);
};

export { getQueryTerms };
