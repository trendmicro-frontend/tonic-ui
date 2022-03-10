import { useRef } from 'react';

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
