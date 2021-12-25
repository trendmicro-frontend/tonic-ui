import { useRef } from 'react';

/**
 * `useConst` is a custom Hook that creates a constant value over the lifecycle of a component.
 * @param {any} value The value to create a constant for. If value is a function, it will be called to get the constant value.
 * @returns {any} The constant value.
 */
const useConst = (init) => {
  const ref = useRef(null);

  if (ref.current === null) {
    ref.current = (typeof init === 'function') ? init() : init;
  }

  return ref.current;
};

export default useConst;
