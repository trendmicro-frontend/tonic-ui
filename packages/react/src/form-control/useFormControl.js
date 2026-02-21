import { useContext } from 'react';
import { FormControlContext } from './context';

const useFormControl = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(FormControlContext);
  return context;
};

export default useFormControl;
