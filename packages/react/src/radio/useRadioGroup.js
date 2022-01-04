import { useContext } from 'react';
import { RadioGroupContext } from './context';

const useRadioGroup = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(RadioGroupContext);
  return context;
};

export default useRadioGroup;
