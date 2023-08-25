import { useMemo } from 'react';

/**
 * A custom Hook that merges React refs into a single memoized function.
 *
 * @param {...React.RefObject} refs
 */
const useMergeRefs = (...refs) => {
  return useMemo(() => {
    if (refs.every((ref) => (ref === null || ref === undefined))) {
      return null;
    }
    return (node) => {
      refs.forEach((ref) => {
        if (!ref) {
          return;
        }

        if (typeof ref === 'function') {
          ref(node);
          return;
        }

        try {
          ref.current = node;
        } catch (error) {
          throw new Error(`Cannot assign value '${node}' to ref '${ref}'`);
        }
      });
    };
  }, refs); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useMergeRefs;
