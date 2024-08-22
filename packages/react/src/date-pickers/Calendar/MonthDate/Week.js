import addDays from 'date-fns/addDays';
import React from 'react';
import Day from './Day';

const Week = ({
  startDateOfWeek,
}) => {
  return (
    [0, 1, 2, 3, 4, 5, 6].map((amountOfDays) => {
      const date = addDays(startDateOfWeek, amountOfDays);
      return (
        <Day
          key={date.getTime()}
          date={date}
        />
      );
    })
  );
};

Week.displayName = 'Week';

export default Week;
