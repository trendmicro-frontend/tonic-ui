import { useContext } from 'react';
import { ToastContext } from './context';

/**
 * A hook to access the toast context within a Toast component.
 * @deprecated Use `useToastManager` instead.
 * @returns {{ appearance: 'none' | 'success' | 'info' | 'warning' | 'error', icon: React.ReactNode | boolean | string, isClosable: boolean, onClose: (() => void) | undefined }} The toast context object.
 */
const useToast = () => {
  const context = useContext(ToastContext);
  return context;
};

export default useToast;
