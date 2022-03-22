import { Grid } from '@tonic-ui/react';
import getYear from 'date-fns/getYear';
import isSameMonth from 'date-fns/isSameMonth';
import React, { forwardRef } from 'react';
import Month from './Month';

const dateTransform = (year, monthIndex) => {
  const date = new Date();
  date.setFullYear(year, monthIndex, 1);
  date.setHours(0, 0, 0, 0);
  return date;
};

const Months = forwardRef((
  {
    activeDate,
    selectedDate,
    setActiveDate,
    setView,
    ...props
  },
  ref,
) => {
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
        activeDate={startDateOfMonth}
        isSelected={isSameMonth(startDateOfMonth, selectedDate)}
        isToday={isSameMonth(startDateOfMonth, today)}
        setActiveDate={setActiveDate}
        setView={setView}
      />
    );
  }

  return (
    <Grid
      ref={ref}
      templateColumns="repeat(4, 1fr)"
      templateRows="auto"
      {...props}
    >
      { tiles}
    </Grid>
  );
});

Months.displayName = 'Months';

export default Months;
