import Toast from './Toast';
import ToastCloseButton from './ToastCloseButton';
import ToastContainer from './ToastContainer';
import ToastController from './ToastController';
import ToastIcon from './ToastIcon';
import ToastManager from './ToastManager';
import ToastMessage from './ToastMessage';
import ToastTransition from './ToastTransition';
import useToastManager from './useToastManager';

export {
  Toast,
  ToastCloseButton,
  ToastContainer,
  ToastController,
  ToastIcon,
  ToastManager,
  ToastMessage,
  ToastTransition,
  useToastManager,
};

export const ToastProvider = ToastManager; // alias of ToastManager
export const useToast = useToastManager; // alias of useToastManager
