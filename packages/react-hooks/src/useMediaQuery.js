import { useEffect, useState } from 'react';

// TODO: move to '@tonic-ui/utils'
const noop = () => {};

const getInitialState = (query, defaultValue) => {
  if (defaultValue !== undefined) {
    return defaultValue;
  }

  if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
    return window.matchMedia(query)?.matches;
  }

  if (process.env.NODE_ENV !== 'production') {
    console.warn('[useMediaQuery] The default value should be defined for server-side rendering.');
  }

  return false;
};

/**
 * A cusom Hook that listens for matches to a CSS media query. It allows the rendering of components based on whether the media query matches or not.
 *
 * @param {string} query - The media query to match against.
 * @param {boolean} defaultValue - The default value to return if the media query is not matched.
 * @return {boolean} Returns a boolean value indicating whether the media query matches or not.
 */
const useMediaQuery = (query, defaultValue) => {
  const [matches, setMatches] = useState(getInitialState(query, defaultValue));

  useEffect(() => {
    let mounted = true;
    const mql = window?.matchMedia?.(query);
    const onChange = () => {
      if (!mounted) {
        return;
      }
      setMatches(!!mql.matches);
    };

    if (!mql) {
      return noop;
    }

    mql.addEventListener('change', onChange);
    setMatches(!!mql.matches);

    return () => {
      mounted = false;
      mql.removeEventListener('change', onChange);
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;
