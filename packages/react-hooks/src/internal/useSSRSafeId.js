import { isNullish } from '@tonic-ui/utils';
import { useState, useEffect } from 'react';
import useIsomorphicEffect from '../useIsomorphicEffect';
/**
 * This hook is for internal use only. Use `useId` from the main package instead.
 *
 * A custom hook that generates unique IDs for accessibility and server-side rendering.
 *
 * Behavior:
 * - Returns `undefined` on the server to avoid hydration mismatches.
 * - Provides a stable unique ID after the component mounts.
 * - For consistent SSR values, provide your own ID instead of relying on this hook.
 *
 * @returns {string | undefined} A unique ID string, or `undefined` during initial SSR.
 */
const useSSRSafeId = (() => {
  let isServerHandoffComplete = false;
  let globalIdCounter = 0;

  /**
   * Generates a unique ID using a global counter with base36 encoding.
   * Format: `:r[0-9a-z]+:` (e.g., `:r0:`, `:r1:`, …, `:ra:`, `:rb:`, …, `:r10:`).
   * @returns {string} A unique ID string.
   */
  const generateId = () => `:r${(globalIdCounter++).toString(36)}:`;

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

    return !isNullish(generatedId) ? generatedId : undefined;
  };
})();

export default useSSRSafeId;
