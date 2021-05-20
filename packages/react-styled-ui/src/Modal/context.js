import { createContext } from 'react';

const ModalContext = createContext();

const ModalProvider = ModalContext.Provider;

export {
  ModalContext,
  ModalProvider,
};
