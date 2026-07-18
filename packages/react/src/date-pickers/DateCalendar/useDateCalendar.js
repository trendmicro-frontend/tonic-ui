import { useContext } from 'react';
import { DateCalendarContext } from './context';

const useDateCalendar = () => {
  const context = useContext(DateCalendarContext);
  return context;
};

export default useDateCalendar;
