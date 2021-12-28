import { useEffect, useRef } from 'react';

const useEffectOnce = (callback, when) => {
  const runOnceRef = useRef(false);
  const callbackRef = useRef(callback);

  callbackRef.current = callback;

  useEffect(() => {
    if (!when || runOnceRef.current) {
      return;
    }

    (typeof callbackRef.current === 'function') && callbackRef.current();
    runOnceRef.current = true;
  }, [when]);
};

export default useEffectOnce;
