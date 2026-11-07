import { useCallback, useEffect, useMemo, useState } from 'react';
import { MIN_QUERY_LENGTH } from '../search/config.mjs';
import {
  getSuggestions,
  loadSearchIndex,
  searchDocuments,
} from '../search/client.mjs';

const initialState = {
  status: 'loading',
  index: null,
  error: null,
};

/**
 * Load the static search index and run queries against it.
 *
 * The index is loaded when the component mounts (the search dialog is only
 * mounted when opened) and kept in memory for the rest of the page session.
 *
 * @returns {{
 *   query: string,
 *   setQuery: (value: string) => void,
 *   clear: () => void,
 *   status: 'loading' | 'ready' | 'error',
 *   error: Error | null,
 *   results: object[],
 *   suggestions: string[],
 *   retry: () => void,
 * }}
 */
const useSearch = () => {
  const [query, setQuery] = useState('');
  const [state, setState] = useState(initialState);
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [searchError, setSearchError] = useState(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;

    setState((previous) => ({
      ...previous,
      status: 'loading',
      error: null,
    }));

    loadSearchIndex({ forceReload: attempt > 0 })
      .then((index) => {
        if (!cancelled) {
          setState({ status: 'ready', index, error: null });
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setState({ status: 'error', index: null, error });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [attempt]);

  useEffect(() => {
    if (state.status !== 'ready' || !state.index) {
      setResults([]);
      setSuggestions([]);
      setSearchError(null);
      return;
    }

    if (query.trim().length < MIN_QUERY_LENGTH) {
      setResults([]);
      setSuggestions([]);
      setSearchError(null);
      return;
    }

    try {
      setResults(searchDocuments(state.index, query));
      setSuggestions(getSuggestions(state.index, query));
      setSearchError(null);
    } catch (error) {
      setResults([]);
      setSuggestions([]);
      setSearchError(error);
    }
  }, [state, query]);

  const retry = useCallback(() => {
    setAttempt((value) => value + 1);
  }, []);

  const clear = useCallback(() => {
    setQuery('');
  }, []);

  const error = useMemo(() => state.error ?? searchError, [state.error, searchError]);

  return {
    query,
    setQuery,
    clear,
    status: state.status,
    error,
    results,
    suggestions,
    retry,
  };
};

export default useSearch;
