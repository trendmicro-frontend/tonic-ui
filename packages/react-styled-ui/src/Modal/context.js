import { createContext, useContext } from 'react';

const ModalContext = createContext();

const useModal = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(ModalContext);
  return context;
};

export {
  ModalContext,
  useModal,
};
