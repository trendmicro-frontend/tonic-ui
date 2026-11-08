import { useRouter } from 'next/router';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'tonic-ui-docs:search-query';

const SearchQueryContext = createContext(null);

/**
 * Holds the active search query for the current page.
 *
 * A search result hands its query over through `sessionStorage`, which the next
 * navigation consumes and clears, so the query is not left in the URL and does
 * not survive the page it belongs to.
 */
const SearchQueryProvider = ({ children }) => {
  const router = useRouter();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleRouteChangeComplete = () => {
      const storedQuery = window.sessionStorage.getItem(STORAGE_KEY);
      window.sessionStorage.removeItem(STORAGE_KEY);
      setQuery(storedQuery ?? '');
    };

    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router.events]);

  const setSearchQuery = useCallback((nextQuery) => {
    setQuery(nextQuery);

    if (nextQuery) {
      window.sessionStorage.setItem(STORAGE_KEY, nextQuery);
    } else {
      window.sessionStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const value = useMemo(() => ({
    query,
    setQuery: setSearchQuery,
  }), [query, setSearchQuery]);

  return (
    <SearchQueryContext.Provider value={value}>
      {children}
    </SearchQueryContext.Provider>
  );
};

const useSearchQuery = () => {
  const context = useContext(SearchQueryContext);

  if (!context) {
    throw new Error('useSearchQuery must be used within a SearchQueryProvider');
  }

  return context;
};

export { SearchQueryProvider, useSearchQuery };
