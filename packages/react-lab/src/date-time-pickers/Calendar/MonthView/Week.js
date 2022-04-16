import addDays from 'date-fns/addDays';
import isSameDay from 'date-fns/isSameDay';
import isSameMonth from 'date-fns/isSameMonth';
import React from 'react';
import Day from './Day';
import useCalendar from '../useCalendar';

const Week = ({
  startDateOfWeek,
}) => {
  const calendarContext = useCalendar();
  const {
    activeDate,
    value
  } = { ...calendarContext };

  return (
    [0, 1, 2, 3, 4, 5, 6].map((offset) => {
      const date = addDays(startDateOfWeek, offset);
      const isSelected = isSameDay(date, new Date(value));
      const isToday = isSameDay(date, new Date());
      const isOutOfScope = !isSameMonth(date, activeDate);

      return (
        <Day
          key={date.getTime()}
          date={date}
          isOutOfScope={isOutOfScope}
          isSelected={isSelected}
          isToday={isToday}
        />
      );
    })
  );
};

Week.displayName = 'Week';

export default Week;
