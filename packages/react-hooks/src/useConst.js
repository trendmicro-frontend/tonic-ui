import { useRef } from 'react';

const useConst = (init) => {
  const ref = useRef(null);

  if (ref.current === null) {
    ref.current = (typeof init === 'function') ? init() : init;
  }

  return ref.current;
};

export default useConst;
