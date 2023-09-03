import { useRef, useLayoutEffect } from 'react';

const useRunAfterUpdate = () => {
  const afterPaintRef = useRef(null);

  useLayoutEffect(() => {
    if (afterPaintRef.current) {
      afterPaintRef.current?.();
      afterPaintRef.current = null;
    }
  });

  return (callback) => {
    afterPaintRef.current = callback;
  };
};

export default useRunAfterUpdate;
