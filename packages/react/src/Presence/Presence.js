import React, { forwardRef, useEffect, useMemo } from 'react';
import { createUniqueId } from '../utils/uniqueid';
import useConstant from '../utils/useConstant';
import { PresenceContext } from './context';

const uniqueId = createUniqueId();

const ensureFunction = x => {
  return (typeof x === 'function')
    ? x
    : () => {};
};

const Presence = forwardRef(({
  children,
  isPresent,
  onExitComplete,
}, ref) => {
  const childCompleteMap = useConstant(() => new Map());
  const id = useConstant(() => uniqueId());

  const context = useMemo(() => ({
    id,
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
  }), [isPresent, onExitComplete, childCompleteMap, id]);

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
