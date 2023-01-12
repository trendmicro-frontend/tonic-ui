import { useContext, useMemo } from 'react';
import { PortalManagerContext } from './context';

const usePortalManager = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(PortalManagerContext);

  if (!context) {
    throw new Error('The `usePortalManager` hook must be called from a descendent of the `PortalManager`.');
  }

  const portal = useMemo(() => {
    const fn = function (...args) {
      return context.add(...args);
    };
    return Object.assign(fn, context);
  }, [context]);

  return portal;
};

export default usePortalManager;
