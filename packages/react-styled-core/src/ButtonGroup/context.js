import { createContext, useContext } from 'react';

const ButtonGroupContext = createContext();

const ButtonGroupProvider = ButtonGroupContext.Provider;

const useButtonGroup = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(ButtonGroupContext);
  return context;
};

export {
  ButtonGroupContext,
  ButtonGroupProvider,
  useButtonGroup,
};
