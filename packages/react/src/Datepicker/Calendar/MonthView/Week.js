import addDays from 'date-fns/addDays';
import startOfWeek from 'date-fns/startOfWeek';
import React from 'react';
import Day from './Day';

const Week = ({
  activeStartDate,
  calendarStartDay,
  locale,
  onClickDay,
}) => {
  const startDateOfWeek = startOfWeek(
    activeStartDate,
    { weekStartsOn: calendarStartDay }
  );

  return (
    [0, 1, 2, 3, 4, 5, 6].map((offset) => {
      const date = addDays(startDateOfWeek, offset);
      return (
        <Day
          key={date.getTime()}
          date={date}
          locale={locale}
          onClick={onClickDay}
        />
      );
    })
  );
};

Week.displayName = 'Week';

export default Week;
