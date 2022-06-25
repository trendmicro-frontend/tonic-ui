import { useEffect } from 'react';

/**
 * A modified version of the `useEffect` Hook that runs an effect only once.
 *
 * @param {function} effect - The effect to run.
 */
const useEffectOnce = (effect) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, []);
};

export default useEffectOnce;
