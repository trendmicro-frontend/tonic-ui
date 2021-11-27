import { ensurePlainObject } from 'ensure-type';
import { useEffect, useRef, useState } from 'react';
import debounce from './debounce';

const useResizeObserver = (ref, options) => {
  const observerRef = useRef(null);
  const [rect, setRect] = useState({});
  const {
    debounceTimeout = 200,
  } = ensurePlainObject(options);

  // Create resize observer on mount
  useEffect(() => {
    const isSupported = (typeof window !== 'undefined' && !!window.ResizeObserver);

    if (!isSupported) {
      console.error('ResizeObserver is not supported in this browser.');
      return () => {
      };
    }

    const fn = debounce((entries) => {
      const { bottom, height, left, right, top, width } = entries[0].contentRect;
      setRect({ bottom, height, left, right, top, width });
    }, debounceTimeout);

    observerRef.current = new ResizeObserver(fn);

    return () => {
      fn.cancel();
      observerRef.current.disconnect();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Observe element
  useEffect(() => {
    const observer = observerRef.current;
    const el = ref?.current;

    if (!observer || !el) {
      return () => {
      };
    }

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  });

  return rect;
};

export default useResizeObserver;
