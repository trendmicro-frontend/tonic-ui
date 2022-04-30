import { useEffect, useRef } from 'react';

/**
 * A custom Hook that fires a callback only once when a condition is met.
 *
 * @param {function} callback - The callback to fire.
 * @param {boolean} when - The condition to check.
 */
const useEffectOnceWhen = (callback, when) => {
  const runOnceRef = useRef(false);
  const callbackRef = useRef(callback);

  callbackRef.current = callback;

  useEffect(() => {
    if (!when || runOnceRef.current) {
      return;
    }
    if (typeof callbackRef.current === 'function') {
      callbackRef.current();
    }
    runOnceRef.current = true;
  }, [when]);
};

export default useEffectOnceWhen;
