import addDays from 'date-fns/addDays';
import isSameDay from 'date-fns/isSameDay';
import isSameMonth from 'date-fns/isSameMonth';
import React from 'react';
import Day from './Day';

const Week = ({
  activeDate,
  calendarValue,
  dateFormat,
  setActiveDate,
  startDateOfWeek,
  onClickDay,
}) => {
  const today = new Date();

  return (
    [0, 1, 2, 3, 4, 5, 6].map((offset) => {
      const date = addDays(startDateOfWeek, offset);
      const isSelected = isSameDay(date, calendarValue);
      const isToday = isSameDay(date, today);
      const isOutOfScope = !isSameMonth(date, activeDate);
      return (
        <Day
          key={date.getTime()}
          date={date}
          dateFormat={dateFormat}
          isOutOfScope={isOutOfScope}
          isSelected={isSelected}
          isToday={isToday}
          setActiveDate={setActiveDate}
          onClick={onClickDay}
        />
      );
    })
  );
};

Week.displayName = 'Week';

export default Week;
