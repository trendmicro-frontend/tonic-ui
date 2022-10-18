import { useContext } from 'react';
import { ToastContext } from './context';

const useToast = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('The `useToast` hook must be called from a descendent of the `ToastProvider`.');
  }

  const toast = function (...args) {
    return context.notify(...args);
  };
  Object.assign(toast, context);

  return toast;
};

export default useToast;
