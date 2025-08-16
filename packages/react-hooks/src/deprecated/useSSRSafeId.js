import { useState, useEffect } from 'react';
import useIsomorphicEffect from '../useIsomorphicEffect';

/**
 * A custom Hook that returns a unique ID string.
 *
 * Autogenerates IDs to facilitate WAI-ARIA and server rendering.
 *
 * Note: The returned ID will initially be `undefined` and will update after a component mounts.
 * Users may need to supply their own ID if they need consistent values for SSR.
 *
 * @returns {string | undefined} The unique ID string, or undefined during SSR
 */
const useSSRSafeId = (() => {
  let isServerHandoffComplete = false;
  let globalIdCounter = 0;

  /**
   * Generates a new unique ID by incrementing the global counter
   * @returns {number} A unique numeric ID
   */
  const generateId = () => ++globalIdCounter;

  return () => {
    /*
     * If this instance isn't part of the initial render, we don't have to do the
     * double render/patch-up dance. We can just generate the ID and return it.
     */
    const initialId = isServerHandoffComplete ? generateId() : null;
    const [generatedId, setGeneratedId] = useState(initialId);

    useIsomorphicEffect(() => {
      if (generatedId === null) {
        /*
         * Patch the ID after render. We do this in `useLayoutEffect` to avoid any
         * rendering flicker, though it'll make the first render slower (unlikely
         * to matter, but you're welcome to measure your app and let us know if
         * it's a problem).
         */
        setGeneratedId(generateId());
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      /*
       * Flag all future uses of `useId` to skip the update dance. This is in
       * `useEffect` because it goes after `useLayoutEffect`, ensuring we don't
       * accidentally bail out of the patch-up dance prematurely.
       */
      if (!isServerHandoffComplete) {
        isServerHandoffComplete = true;
      }
    }, []);

    return generatedId != null ? String(generatedId) : undefined;
  };
})();

export default useSSRSafeId;
