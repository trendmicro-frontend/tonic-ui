import { useEffect, useState } from 'react';

/**
 * A custom Hook that returns a boolean indicating if the component is hydrated.
 *
 * @returns {boolean} A boolean indicating if the component is hydrated.
 *
 * • When doing Server-Side Rendering (SSR), the result will always be false.
 * • When doing Client-Side Rendering (CSR), the result will always be false on the first render, and true on subsequent renders.
 */
const useHydrated = () => {
  const [isHydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return isHydrated;
};

export default useHydrated;
