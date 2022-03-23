import { ensureFunction } from 'ensure-type';
import { useContext, useEffect } from 'react';
import useAutoId from '../useAutoId';
import { AnimatePresenceContext } from './context';

const useAnimatePresence = () => {
  const id = useAutoId();

  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(AnimatePresenceContext);
  const { in: inProp, onExitComplete, register } = { ...context };
  const safeToRemove = () => ensureFunction(onExitComplete)(id);

  useEffect(() => {
    return ensureFunction(register)(id);
  }, [id, register]);

  if (context === undefined) {
    return [null, null];
  }

  return (!inProp && onExitComplete)
    ? [false, safeToRemove]
    : [true, null];
};

export default useAnimatePresence;
