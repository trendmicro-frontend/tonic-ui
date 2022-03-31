import { Grid } from '@tonic-ui/react';
import getYear from 'date-fns/getYear';
import isSameMonth from 'date-fns/isSameMonth';
import React, { forwardRef } from 'react';
import useCalendar from '../useCalendar';
import Month from './Month';

const dateTransform = (year, monthIndex) => {
  const date = new Date();
  date.setFullYear(year, monthIndex, 1);
  date.setHours(0, 0, 0, 0);
  return date;
};

const Months = forwardRef((
  props,
  ref,
) => {
  const calendarContext = useCalendar();
  const {
    activeDate,
    inputDate,
  } = { ...calendarContext };
  const today = new Date();
  const start = 0;
  const end = 11;
  const year = getYear(activeDate);
  const tiles = [];
  for (let point = start; point <= end; point += 1) {
    const startDateOfMonth = dateTransform(year, point);
    tiles.push(
      <Month
        key={startDateOfMonth.getTime()}
        date={startDateOfMonth}
        isSelected={isSameMonth(startDateOfMonth, inputDate)}
        isToday={isSameMonth(startDateOfMonth, today)}
      />
    );
  }

  return (
    <Grid
      ref={ref}
      alignItems="center"
      templateColumns="repeat(4, 1fr)"
      templateRows="repeat(3, 80px)"
      {...props}
    >
      { tiles}
    </Grid>
  );
});

Months.displayName = 'Months';

export default Months;
