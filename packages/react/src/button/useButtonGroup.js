import { useContext } from 'react';
import { ButtonGroupContext } from './context';

const useButtonGroup = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(ButtonGroupContext);
  return context;
};

export default useButtonGroup;
