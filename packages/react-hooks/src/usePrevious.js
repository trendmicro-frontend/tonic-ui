import { useEffect, useRef } from 'react';

/**
 * A custom Hook that stores the previous state or props.
 *
 * @param {any} value - A new value to update the previous value with.
 * @returns {any} The previous value.
 */
const usePrevious = (value) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

export default usePrevious;
