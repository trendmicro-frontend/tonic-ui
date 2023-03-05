import { noop } from '@tonic-ui/utils';
import _throttle from 'lodash/throttle';
import { useEffect, useMemo } from 'react';

const useThrottledCallbackOnScroll = (callback, delay) => {
  const throttledCallback = useMemo(
    () => (callback ? _throttle(callback, delay) : noop),
    [callback, delay],
  );

  useEffect(() => {
    if (throttledCallback === noop) {
      return undefined;
    }

    window.addEventListener('scroll', throttledCallback);
    return () => {
      window.removeEventListener('scroll', throttledCallback);
      throttledCallback.cancel();
    };
  }, [throttledCallback]);
};

export default useThrottledCallbackOnScroll;
