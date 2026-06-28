import { createContext, useContext } from 'react';

const ButtonGroupContext = createContext();

const useButtonGroup = () => {
  const context = useContext(ButtonGroupContext);
  return context;
};

export {
  ButtonGroupContext,
  useButtonGroup,
};
