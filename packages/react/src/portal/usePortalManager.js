import { useContext, useRef } from 'react';
import { PortalManagerContext } from './context';

/**
 * @typedef {Object} PortalManagerContextValue
 * @property {(render: (remove: () => void) => React.ReactNode, options?: { id?: string; appendToParentPortal?: boolean; containerRef?: React.RefObject<HTMLElement> }) => string} add - Add a portal and return its id.
 * @property {(id: string) => void} remove - Remove a portal by its id.
 */

/**
 * A hook to access the portal manager context.
 * @returns {PortalManagerContextValue & ((render: (remove: () => void) => React.ReactNode, options?: { id?: string; appendToParentPortal?: boolean; containerRef?: React.RefObject<HTMLElement> }) => string)} The portal manager object. Can also be called as a function to add a portal.
 */
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

  Object.assign(portalManagerRef.current, context);

  return portalManagerRef.current;
};

export default usePortalManager;
