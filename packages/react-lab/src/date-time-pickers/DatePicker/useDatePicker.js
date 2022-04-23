import { useContext } from 'react';
import { DatePickerContext } from './context';

const useDatePicker = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(DatePickerContext);
  return context;
};

export default useDatePicker;
