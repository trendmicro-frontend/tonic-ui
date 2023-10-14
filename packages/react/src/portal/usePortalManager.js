import { useContext, useRef } from 'react';
import { PortalManagerContext } from './context';

const usePortalManager = () => {
  const createPortalRef = useRef(null);
  const portalManagerRef = useRef(null);

  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(PortalManagerContext);

  if (!context) {
    throw new Error('The `usePortalManager` hook must be called from a descendent of the `PortalManager`.');
  }

  createPortalRef.current = context.add;

  if (!portalManagerRef.current) {
    portalManagerRef.current = function (...args) {
      return createPortalRef.current?.(...args);
    };
  }

  portalManagerRef.current = Object.assign(portalManagerRef.current, context);

  return portalManagerRef.current;
};

export default usePortalManager;
