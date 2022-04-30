import { useRef } from 'react';

/**
 * A custom Hook that runs a callback at most once when a condition becomes true.
 *
 * @param {function} callback - The callback to run.
 * @param {boolean} when - The condition to check.
 */
const useOnceWhen = (callback, when = false) => {
  const ref = useRef(false);
  if (when && !ref.current) {
    if (typeof callback === 'function') {
      callback();
    }
    ref.current = true;
  }
};

export default useOnceWhen;
