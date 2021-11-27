import {
  ensurePlainObject,
} from 'ensure-type';
import { useEffect, useState } from 'react';
import debounce from './debounce';

/**
 * The useResizeObserver Hook uses the ResizeObserver API to measure the size of a DOM element.
 *
 * @param {Ref} ref The ref to the element to observe.
 * @param {options} [options] The options for the observer.
 * @param {options.debounceWait = 100] [options.debounceWait = 100] The debounce wait time.
 * @returns {object} The content rect for the observed element. Returns null if the element is not observed.
 */
const useResizeObserver = (ref, options) => {
  const el = ref.current;
  const [contentRect, setContentRect] = useState(null);
  const {
    debounceWait = 100,
  } = ensurePlainObject(options);

  // Create resize observer on mount
  useEffect(() => {
    const isSupported = (typeof window !== 'undefined' && !!window.ResizeObserver);
    if (!isSupported) {
      console.error('ResizeObserver is not supported in this browser.');
      return;
    }

    if (!el) {
      return;
    }

    const fn = debounce((entries) => {
      const {
        bottom,
        height,
        left,
        right,
        top,
        width,
        x,
        y,
      } = ensurePlainObject(entries[0]?.contentRect);
      setContentRect({ bottom, height, left, right, top, width, x, y });
    }, debounceWait);

    const observer = new ResizeObserver(fn);
    observer.observe(el);

    return () => { // eslint-disable-line consistent-return
      fn.cancel();
      observer.disconnect();
    };
  }, [el, debounceWait]);

  return contentRect;
};

export default useResizeObserver;
