import { useContext } from 'react';
import { DateCalendarContext } from './context';

const useDateCalendar = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(DateCalendarContext);
  return context;
};

export default useDateCalendar;
