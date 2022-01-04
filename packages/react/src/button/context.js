import { createContext, useContext } from 'react';

const ButtonGroupContext = createContext();

const useButtonGroup = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(ButtonGroupContext);
  return context;
};

export {
  ButtonGroupContext,
  useButtonGroup,
};
