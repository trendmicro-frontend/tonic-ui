import { useEffect, useState } from 'react';

const noop = () => {};

const useMediaQuery = (query) => {
  const [match, setMatch] = useState(null);

  useEffect(() => {
    const mediaQuery = window?.matchMedia(query);
    if (!mediaQuery) {
      return noop;
    }

    const handler = () => {
      setMatch(!!(mediaQuery.matches));
    };
    handler();
    mediaQuery.addEventListener('change', handler);
    return () => {
      mediaQuery.removeEventListener('change', handler);
    };
  }, [query]);

  return match;
};

export default useMediaQuery;
