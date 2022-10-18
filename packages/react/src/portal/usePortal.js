import { useContext } from 'react';
import { PortalContext } from './context';

const usePortal = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(PortalContext);

  return context;
};

export default usePortal;
