import { useEffect, useRef } from 'react';

/**
 * A custom Hook similar to `useEffectOnce`, but only runs once when a condition is met.
 *
 * @param {function} effect - The effect to run.
 * @param {boolean} when - The condition to run the effect.
 */
const useEffectOnceWhen = (effect, when) => {
  const runOnceRef = useRef(false);
  const effectRef = useRef(effect);

  effectRef.current = effect;

  useEffect(() => {
    if (!when || runOnceRef.current) {
      return;
    }
    if (typeof effectRef.current === 'function') {
      effectRef.current();
    }
    runOnceRef.current = true;
  }, [when]);
};

export default useEffectOnceWhen;
