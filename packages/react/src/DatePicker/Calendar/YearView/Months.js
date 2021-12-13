import getYear from 'date-fns/getYear';
import React, { forwardRef } from 'react';
import Grid from '../../../Grid';
import Month from './Month';

const Months = forwardRef((
  {
    activeStartDate,
    locale,
    onClickMonth,
    ...reset
  },
  ref,
) => {
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

    tiles.push(
      <Month
        key={date.getTime()}
        date={date}
        locale={locale}
        onClick={onClickMonth}
      />
    );
  }

  return (
    <Grid
      ref={ref}
      templateColumns="repeat(3, 80px)"
      templateRows="auto"
      {...reset}
    >
      { tiles}
    </Grid>
  );
});

Months.displayName = 'Months';

export default Months;
