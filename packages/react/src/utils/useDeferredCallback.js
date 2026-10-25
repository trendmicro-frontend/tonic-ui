import { useEventCallback } from '@tonic-ui/react-hooks';
import { useCallback, useEffect, useRef } from 'react';

// A task, not a microtask: browsers can flush microtasks between native event
// listeners, before React's delegated target handler has received the click.
const useDeferredCallback = (callback) => {
  const invoke = useEventCallback(callback);
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return useCallback(() => {
    if (timerRef.current !== null) {
      return;
    }
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      invoke();
    }, 0);
  }, [invoke]);
};

export default useDeferredCallback;
