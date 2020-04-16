import { createContext, useContext } from 'react';

const InputGroupContext = createContext();

const InputGroupProvider = InputGroupContext.Provider;

const useInputGroup = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(InputGroupContext);
  return context;
};

export {
  InputGroupContext,
  InputGroupProvider,
  useInputGroup,
};
