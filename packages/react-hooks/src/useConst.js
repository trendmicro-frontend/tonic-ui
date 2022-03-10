import { useRef } from 'react';

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
