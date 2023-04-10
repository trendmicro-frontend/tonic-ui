import { useRef } from 'react';

/**
 * A custom Hook that returns a ref with the latest value.
 *
 * @param {any} value - The latest value.
 * @return {React.RefObject} Returns a ref object with the `current` property set to the latest value.
 */
const useLatestRef = (value) => {
  const ref = useRef(value);
  ref.current = value;
  return ref;
};

export default useLatestRef;
