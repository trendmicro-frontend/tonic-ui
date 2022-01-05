import { useConst } from '@tonic-ui/react-hooks';
import { ensureFunction } from 'ensure-type';
import React, { forwardRef, useEffect, useMemo } from 'react';
import { PresenceContext } from './context';

const Presence = forwardRef(({
  children,
  isPresent,
  onExitComplete,
}, ref) => {
  const childCompleteMap = useConst(() => new Map());
  const context = useMemo(() => ({
    isPresent,
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
  }), [isPresent, onExitComplete, childCompleteMap]);

  // Remove the component immediately if there's no components to fire exit transitions.
  useEffect(() => {
    if (!isPresent && childCompleteMap.size === 0) {
      onExitComplete();
    }
  }, [isPresent, onExitComplete, childCompleteMap]);

  return (
    <PresenceContext.Provider value={context}>
      {children}
    </PresenceContext.Provider>
  );
});

export default Presence;
