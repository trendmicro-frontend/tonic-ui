import { useContext, useRef } from 'react';
import { ToastManagerContext } from './context';

const useToastManager = () => {
  const createToastRef = useRef(null);
  const toastManagerRef = useRef(null);

  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(ToastManagerContext);

  if (!context) {
    throw new Error('The `useToastManager` hook must be called from a descendent of the `ToastManager`.');
  }

  createToastRef.current = context.notify;

  if (!toastManagerRef.current) {
    toastManagerRef.current = function (...args) {
      return createToastRef.current?.(...args);
    };
  }

  Object.assign(toastManagerRef.current, context);

  return toastManagerRef.current;
};

export default useToastManager;
