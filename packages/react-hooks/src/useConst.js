import { useRef } from 'react';

/**
 * Creates a constant value over the lifecycle of a component.
 */
const useConst = (init) => {
  const ref = useRef(null);

  if (ref.current === null) {
    ref.current = (typeof init === 'function') ? init() : init;
  }

  return ref.current;
};

export default useConst;
