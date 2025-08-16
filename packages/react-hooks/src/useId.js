import React, { useState, useEffect } from 'react';
import useIsomorphicEffect from './useIsomorphicEffect';

// Check if React.useId is available (React 18+)
const ReactUseId = React.useId || null;

let serverHandoffComplete = false;
let id = 0;
const genId = () => ++id;

/**
 * A custom Hook that returns a unique ID string.
 *
 * Autogenerate IDs to facilitate WAI-ARIA and server rendering.
 * Uses React's built-in useId when available (React 18+), otherwise falls back to a custom
 * implementation that is SSR-safe.
 *
 * Note: The returned ID will initially be `undefined` and will update after a component mounts.
 * Users may need to supply their own ID if they need consistent values for SSR.
 *
 * @return The unique ID string, or undefined during SSR
 */
const useId = ReactUseId ?? (() => {
  /*
   * If this instance isn't part of the initial render, we don't have to do the
   * double render/patch-up dance. We can just generate the ID and return it.
   */
  const initialId = serverHandoffComplete ? genId() : null;
  const [generatedId, setGeneratedId] = useState(initialId);

  useIsomorphicEffect(() => {
    if (generatedId === null) {
      /*
       * Patch the ID after render. We do this in `useLayoutEffect` to avoid any
       * rendering flicker, though it'll make the first render slower (unlikely
       * to matter, but you're welcome to measure your app and let us know if
       * it's a problem).
       */
      setGeneratedId(genId());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (serverHandoffComplete === false) {
      /*
       * Flag all future uses of `useId` to skip the update dance. This is in
       * `useEffect` because it goes after `useLayoutEffect`, ensuring we don't
       * accidentally bail out of the patch-up dance prematurely.
       */
      serverHandoffComplete = true;
    }
  }, []);

  return generatedId != null ? String(generatedId) : undefined;
});

export default useId;
