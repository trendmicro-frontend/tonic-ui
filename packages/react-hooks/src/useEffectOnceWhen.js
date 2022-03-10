import { useEffect, useRef } from 'react';

const useEffectOnceWhen = (callback, when) => {
  const runOnceRef = useRef(false);
  const callbackRef = useRef(callback);

  callbackRef.current = callback;

  useEffect(() => {
    if (!when || runOnceRef.current) {
      return;
    }
    if (typeof callbackRef.current === 'function') {
      callbackRef.current();
    }
    runOnceRef.current = true;
  }, [when]);
};

export default useEffectOnceWhen;
