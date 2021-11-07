import { useContext } from 'react';
import { ModalContext } from './context';

const useModal = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(ModalContext);
  return context;
};

export default useModal;
