import { useContext } from 'react';
import { CalendarContext } from './context';

const useCalendar = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(CalendarContext);
  return context;
};

export default useCalendar;
