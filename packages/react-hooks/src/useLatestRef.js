import { useRef } from 'react';

/**
 * A custom Hook that returns a ref with the latest value.
 *
 * @param {any} value - The value to set the ref to.
 * @returns {React.RefObject} A ref object with the latest value.
 */
const useLatestRef = (value) => {
  const ref = useRef(value);
  ref.current = value;
  return ref;
};

export default useLatestRef;
