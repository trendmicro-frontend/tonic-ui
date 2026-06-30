import { useRef, useLayoutEffect } from 'react';

/**
 * A React hook that allows you to schedule a one-time callback to run immediately after
 * the DOM has been updated but before the browser paints. This is useful for synchronous
 * layout work (e.g., measuring element size/position) without causing visual flicker.
 *
 * @returns {(callback: () => void) => void} runAfterUpdate
 *   A function that takes a callback. When you call `runAfterUpdate(callback)`, your
 *   callback will be stored and then invoked exactly once in the next layout phase
 *   (inside a useLayoutEffect) after the DOM mutation completes. After invocation, the
 *   callback reference is cleared automatically.
 *
 * @example
 * function MyComponent({ value }) {
 *   const runAfterUpdate = useRunAfterUpdate();
 *   const boxRef = useRef(null);
 *
 *   useEffect(() => {
 *     // Schedule a measurement after `value` changes and the DOM updates:
 *     runAfterUpdate(() => {
 *       const rect = boxRef.current.getBoundingClientRect();
 *       console.log('New width:', rect.width);
 *     });
 *   }, [value]);
 *
 *   return <div ref={boxRef}>{value}</div>;
 * }
 */
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
