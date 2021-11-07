import { useRef } from 'react';

/**
 * Creates a constant value over the lifecycle of a component.
 */
export default function useConstant(value) {
  const ref = useRef();
  if (ref.current === undefined) {
    ref.current = (typeof value === 'function') ? value() : value;
  }

  return ref.current;
}
