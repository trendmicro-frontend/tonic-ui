import { createContext, useContext } from 'react';

const CheckboxGroupContext = createContext({
  disabled: false,
  size: undefined,
  value: undefined,
  variantColor: undefined,
  onChange: (e) => {},
});

const CheckboxGroupProvider = CheckboxGroupContext.Provider;

const useCheckboxGroup = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(CheckboxGroupContext);
  return context;
};

export {
  CheckboxGroupContext,
  CheckboxGroupProvider,
  useCheckboxGroup,
};
