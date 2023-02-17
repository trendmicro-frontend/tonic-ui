import { useContext } from 'react';
import { ToastContext } from './context';

const useToast = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(ToastContext);
  return context;
};

export default useToast;
