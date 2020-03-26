import { createContext, useContext } from 'react';

const RadioGroupContext = createContext({
  disabled: false,
  name: undefined,
  size: undefined,
  value: undefined,
  variantColor: undefined,
  onChange: (e) => {},
});

const RadioGroupProvider = RadioGroupContext.Provider;

const useRadioGroup = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(RadioGroupContext);
  return context;
};

export {
  RadioGroupContext,
  RadioGroupProvider,
  useRadioGroup,
};
