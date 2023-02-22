import { useContext, useMemo } from 'react';
import { ToastManagerContext } from './context';

const useToastManager = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(ToastManagerContext);

  if (!context) {
    throw new Error('The `useToastManager` hook must be called from a descendent of the `ToastManager`.');
  }

  const toast = useMemo(() => {
    const fn = function (...args) {
      return context.notify(...args);
    };
    return Object.assign(fn, context);
  }, [context]);

  return toast;
};

export default useToastManager;
