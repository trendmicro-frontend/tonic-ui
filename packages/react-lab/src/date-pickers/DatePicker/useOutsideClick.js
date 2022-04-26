import { useEffect, useRef } from 'react';

const useOutsideClick = (handler, ref = null) => {
  const wrapperRef = useRef(null);

  ref = ref ?? wrapperRef;

  useEffect(() => {
    const listener = (event) => {
      const el = ref?.current;
      // Do nothing if clicking ref's element or descendent elements
      if (!el || el.contains(event.target)) {
        return;
      }

      if (typeof handler === 'function') {
        handler(event);
      }
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener, { passive: true });

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [handler, ref]);

  return ref;
};

export default useOutsideClick;
