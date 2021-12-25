import { useContext } from 'react';
import { InputGroupContext } from './context';

const useInputGroup = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(InputGroupContext);
  return context;
};

export default useInputGroup;
