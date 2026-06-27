import { addDays } from 'date-fns';
import React from 'react';
import Day from './Day';

/**
 * @typedef {Object} WeekProps
 * @property {Date} startDateOfWeek - The start date of the week.
 */

/**
 * @type {React.FC<WeekProps>}
 */
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
