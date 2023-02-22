import { useContext } from 'react';
import { AlertContext } from './context';

const useAlert = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(AlertContext);
  return context;
};

export default useAlert;
