import { useContext } from 'react';
import { DatePickerContext } from './context';

const useDatePicker = () => {
  const context = useContext(DatePickerContext);
  return context;
};

export default useDatePicker;
