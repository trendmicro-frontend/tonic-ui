import { useCallback, useRef } from 'react';
import useIsomorphicEffect from './useIsomorphicEffect';

/**
 * A custom Hook to do escape hatch optimization for event callbacks.
 * @param {function} fn - The function to be called.
 * @param {Array} dependencies - The dependencies of the function.
 * @returns {function} The returned function.
 * @see https://reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback
 * @see https://github.com/facebook/react/issues/14099
 */
const useEventCallback = (fn, dependencies) => {
  const ref = useRef(() => {
    throw new Error('Cannot call an event handler while rendering.');
  });

  /**
   * The useLayoutEffect function is triggered synchronously before the DOM mutations are painted.
   * However, the useEffect function is called after the DOM mutations are painted.
   */
  useIsomorphicEffect(() => {
    ref.current = fn;
  }, [fn, ...(dependencies ?? [])]);

  return useCallback((...args) => {
    const callback = ref.current;
    return callback(...args);
  }, [ref]);
};

export default useEventCallback;
