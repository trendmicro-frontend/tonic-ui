/**
 * Shared search configuration for build-time indexing and browser-side search.
 *
 * This module is imported by both the Node.js indexing script and the Next.js
 * client bundle, so it must not depend on Node.js or browser globals.
 */

export const SEARCH_INDEX_DIR = 'search';
export const SEARCH_INDEX_BASENAME = 'index';
export const SEARCH_MANIFEST_FILE = 'manifest.json';

/** Maximum number of ranked results returned to the UI. */
export const SEARCH_RESULT_LIMIT = 50;

/** Number of results displayed per page in the search dialog. */
export const SEARCH_RESULTS_PER_PAGE = 20;

/** Number of auto-suggestions displayed above the results. */
export const SEARCH_SUGGESTION_LIMIT = 6;

/** Fields indexed by MiniSearch. */
export const SEARCH_FIELDS = [
  'title',
  'heading',
  'keywords',
  'content',
];

/**
 * Fields stored in the serialized index and returned with each result.
 * `content` is intentionally excluded to keep the index payload small; the
 * search UI shows document titles and section headings, not snippets.
 */
export const SEARCH_STORE_FIELDS = [
  'title',
  'heading',
  'keywords',
  'category',
  'url',
  'path',
  'text',
];

/**
 * Characters stored per result for the result snippet. The full `content` is
 * indexed but not stored, to keep the index payload small.
 */
export const SEARCH_SNIPPET_LENGTH = 320;

/** Field boosts used while searching. */
export const SEARCH_FIELD_BOOST = {
  title: 8,
  keywords: 6,
  heading: 4,
};

/** Minimum query length; single characters match nearly every page. */
export const MIN_QUERY_LENGTH = 2;

const SPACE_OR_PUNCTUATION = /[\s\p{P}\p{S}]+/u;
const CAMEL_CASE_BOUNDARY = /(?<=[a-z0-9])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])/;

/**
 * Split text into index tokens.
 *
 * Technical terms are indexed twice: once as the lowercased identifier
 * (`useColorMode`) and once as its component words (`use`, `color`, `mode`).
 * This makes both `useColorMode` and `use color mode` match the same document.
 *
 * @param {string} text
 * @returns {string[]}
 */
export const tokenize = (text) => {
  const tokens = [];

  for (const chunk of String(text ?? '').split(SPACE_OR_PUNCTUATION)) {
    if (!chunk) {
      continue;
    }

    tokens.push(chunk.toLowerCase());

    const parts = chunk.split(CAMEL_CASE_BOUNDARY).filter(Boolean);
    if (parts.length > 1) {
      for (const part of parts) {
        // Single-character fragments such as the trailing `B` in `closeB`
        // add query noise without helping retrieval.
        if (part.length > 1) {
          tokens.push(part.toLowerCase());
        }
      }
    }
  }

  return tokens;
};

/**
 * Split a search query into terms.
 *
 * Unlike the index tokenizer, camelCase is kept intact so that the whole
 * identifier can be fuzzy-matched: `useColrMode` stays one term and corrects to
 * `useColorMode` instead of splitting into the 4-character fragment `colr`,
 * which is below the fuzzy threshold.
 *
 * @param {string} text
 * @returns {string[]}
 */
export const tokenizeQuery = (text) => {
  return String(text ?? '')
    .split(SPACE_OR_PUNCTUATION)
    .filter(Boolean)
    .map((chunk) => chunk.toLowerCase());
};

/**
 * Fuzzy matching is only useful for terms long enough to tolerate edits.
 * Below five characters a single edit turns short words into unrelated ones
 * (`dnd` -> `and`, `form` -> `farm`), so those terms use exact and prefix
 * matching only.
 *
 * @param {string} term
 * @returns {number | false}
 */
export const getFuzzyFactor = (term) => {
  return term.length >= 5 ? 0.2 : false;
};

/**
 * MiniSearch options shared by index creation and index loading.
 * The tokenizer is code, not data, so the same options must be supplied when
 * restoring a serialized index.
 *
 * @returns {import('minisearch').Options}
 */
export const createMiniSearchOptions = () => ({
  fields: SEARCH_FIELDS,
  storeFields: SEARCH_STORE_FIELDS,
  idField: 'id',
  tokenize,
  processTerm: (term) => term.toLowerCase(),
  searchOptions: {
    boost: SEARCH_FIELD_BOOST,
    combineWith: 'AND',
    prefix: true,
    fuzzy: getFuzzyFactor,
    tokenize: tokenizeQuery,
  },
});

/**
 * Extract the terms highlighted in the UI from a raw query.
 *
 * @param {string} query
 * @returns {string[]}
 */
export const getQueryTerms = (query) => {
  return Array.from(new Set(tokenizeQuery(query)));
};

/**
 * Normalize a string for exact-match ranking comparisons.
 *
 * @param {string} value
 * @returns {string}
 */
export const normalizeForComparison = (value) => {
  return String(value ?? '')
    .toLowerCase()
    .replace(/[\s\p{P}\p{S}]+/gu, ' ')
    .trim();
};
