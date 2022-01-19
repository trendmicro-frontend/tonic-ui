import {
  Grid,
} from '@tonic-ui/react';
import getYear from 'date-fns/getYear';
import React, { forwardRef } from 'react';
import Month from './Month';

const Months = forwardRef((
  {
    activeStartDate,
    locale,
    selectedDate,
    onClickMonth,
    ...reset
  },
  ref,
) => {
  const today = (new Date()).toLocaleDateString(locale, { month: 'long', year: 'numeric' });
  const selectedMonth = selectedDate ? selectedDate.toLocaleDateString(locale, { month: 'long', year: 'numeric' }) : null;

  const start = 0;
  const end = 11;
  const year = getYear(activeStartDate);

  const tiles = [];
  const dateTransform = (monthIndex) => {
    const date = new Date();
    date.setFullYear(year, monthIndex, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  };
  for (let point = start; point <= end; point += 1) {
    const date = dateTransform(point);
    const month = date.toLocaleDateString(locale, { month: 'long', year: 'numeric' });

    tiles.push(
      <Month
        key={date.getTime()}
        date={date}
        isSelected={month === selectedMonth}
        isToday={month === today}
        locale={locale}
        onClick={onClickMonth}
      />
    );
  }

  return (
    <Grid
      ref={ref}
      templateColumns="repeat(3, 1fr)"
      templateRows="auto"
      {...reset}
    >
      { tiles}
    </Grid>
  );
});

Months.displayName = 'Months';

export default Months;
