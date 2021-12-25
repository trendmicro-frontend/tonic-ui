import { useConst } from '@tonic-ui/react-hooks';
import { useContext, useEffect } from 'react';
import { createUniqueId } from '../utils/uniqueid';
import { PresenceContext } from './context';

const uniqueId = createUniqueId();

const ensureFunction = x => {
  return (typeof x === 'function')
    ? x
    : () => {};
};

const usePresence = () => {
  const id = useConst(() => uniqueId());

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
