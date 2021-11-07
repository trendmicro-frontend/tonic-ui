import { useContext } from 'react';
import { ToastContext } from '../context';

const useToast = (options) => {
  const { context: Context = ToastContext } = { ...options };

  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(Context);

  if (!context) {
    throw new Error('The `useToast` hook must be called from a descendent of the `ToastManager`.');
  }

  const toast = function (...args) {
    return context.notify(...args);
  };
  Object.assign(toast, context);

  return toast;
};

export default useToast;
