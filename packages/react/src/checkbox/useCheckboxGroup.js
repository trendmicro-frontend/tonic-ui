import { useContext } from 'react';
import { CheckboxGroupContext } from './context';

const useCheckboxGroup = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(CheckboxGroupContext);
  return context;
};

export default useCheckboxGroup;
