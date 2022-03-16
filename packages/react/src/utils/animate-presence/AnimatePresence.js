import { useConst } from '@tonic-ui/react-hooks';
import { ensureFunction } from 'ensure-type';
import React, { forwardRef, useEffect, useMemo } from 'react';
import { AnimatePresenceContext } from './context';

const AnimatePresence = forwardRef(({
  children,
  in: inProp,
  onExitComplete,
}, ref) => {
  const childCompleteMap = useConst(() => new Map());
  const context = useMemo(() => ({
    in: inProp,
    onExitComplete: (childId) => {
      childCompleteMap.set(childId, true /* isComplete */);

      let allComplete = true;
      for (const [, isComplete] of childCompleteMap) {
        if (!isComplete) {
          allComplete = false;
          break;
        }
      }

      if (allComplete) {
        ensureFunction(onExitComplete)();
      }
    },
    register: (childId) => {
      childCompleteMap.set(childId, false /* isComplete */);
      return () => {
        childCompleteMap.delete(childId);
      };
    },
  }), [inProp, onExitComplete, childCompleteMap]);

  // Remove the component immediately if there's no components to fire exit transitions.
  useEffect(() => {
    if (!inProp && childCompleteMap.size === 0) {
      onExitComplete();
    }
  }, [inProp, onExitComplete, childCompleteMap]);

  return (
    <AnimatePresenceContext.Provider value={context}>
      {children}
    </AnimatePresenceContext.Provider>
  );
});

export default AnimatePresence;
