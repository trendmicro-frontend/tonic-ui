import { useRef } from 'react';

/**
 * A custom Hook that creates a constant value over the lifecycle of a component.
 *
 * @param {(function|any)} value - The value to create a constant over.
 * @return {any} The constant value.
 */
const useConst = (init) => {
  const ref = useRef();

  if (ref.current === undefined) {
    // Wrap the value in an object so that we can tell if it's initialized even if the initializer is undefined or returns undefined
    ref.current = {
      value: (typeof init === 'function') ? init() : init,
    };
  }

  return ref?.current?.value;
};

export default useConst;
