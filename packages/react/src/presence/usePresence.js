import { ensureFunction } from 'ensure-type';
import { useContext, useEffect } from 'react';
import useAutoId from '../utils/useAutoId';
import { PresenceContext } from './context';

const usePresence = () => {
  const id = useAutoId();

  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(PresenceContext);
  if (context === undefined) {
    throw new Error('The `usePresence` hook must be called from a descendent of the `PresenceProvider`.');
  }

  const { isPresent, onExitComplete, register } = context;
  const safeToRemove = () => ensureFunction(onExitComplete)(id);

  useEffect(() => {
    return ensureFunction(register)(id);
  }, [id, register]);

  return (!isPresent && onExitComplete)
    ? [false, safeToRemove]
    : [true, null];
};

export default usePresence;
