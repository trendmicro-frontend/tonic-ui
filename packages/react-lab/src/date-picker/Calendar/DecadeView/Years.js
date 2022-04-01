import { Grid } from '@tonic-ui/react';
import getYear from 'date-fns/getYear';
import isSameYear from 'date-fns/isSameYear';
import React, { forwardRef } from 'react';
import useCalendar from '../useCalendar';
import Year from './Year';

const dateTransform = (year) => {
  const date = new Date();
  date.setFullYear(year, 0, 1);
  date.setHours(0, 0, 0, 0);
  return date;
};

const Years = forwardRef((
  props,
  ref
) => {
  const calendarContext = useCalendar();
  const {
    activeDate,
    value,
  } = { ...calendarContext };
  const inputDate = new Date(value);
  const today = new Date();
  const activeYear = getYear(activeDate);
  const start = activeYear - 1;
  const end = start + 11;
  const tiles = [];
  for (let point = start; point <= end; point += 1) {
    const date = dateTransform(point);
    tiles.push(
      <Year
        key={date.getTime()}
        date={date}
        isSelected={isSameYear(date, inputDate)}
        isToday={isSameYear(date, today)}
        isOutOfScope={point < activeYear || point > (activeYear + 9)}
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

Years.displayName = 'Years';

export default Years;
