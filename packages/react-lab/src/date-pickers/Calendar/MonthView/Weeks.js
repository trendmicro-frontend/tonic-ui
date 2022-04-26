import { Grid } from '@tonic-ui/react';
import addDays from 'date-fns/addDays';
import addWeeks from 'date-fns/addWeeks';
import isSameMonth from 'date-fns/isSameMonth';
import startOfMonth from 'date-fns/startOfMonth';
import startOfWeek from 'date-fns/startOfWeek';
import React, { forwardRef } from 'react';
import useCalendar from '../useCalendar';
import Week from './Week';

const isWeekInMonth = (startDateOfWeek, activeDate) => {
  const endDateOfWeek = addDays(startDateOfWeek, 6);
  return isSameMonth(startDateOfWeek, activeDate) || isSameMonth(endDateOfWeek, activeDate);
};

const Weeks = forwardRef((
  props,
  ref,
) => {
  const calendarContext = useCalendar();
  const {
    activeDate,
    firstDayOfWeek,
  } = { ...calendarContext };
  const weeks = [];
  let startDateOfWeek = startOfWeek(startOfMonth(activeDate), {
    weekStartsOn: firstDayOfWeek,
  });

  do {
    const week = (
      <Week
        key={startDateOfWeek.getTime()}
        startDateOfWeek={startDateOfWeek}
      />
    );
    weeks.push(week);
    startDateOfWeek = addWeeks(startDateOfWeek, 1);
  } while (isWeekInMonth(startDateOfWeek, activeDate));

  return (
    <Grid
      ref={ref}
      templateColumns="repeat(7, 40px)"
      templateRows="auto"
      {...props}
    >
      {weeks}
    </Grid>
  );
});

Weeks.displayName = 'Weeks';

export default Weeks;
