import { Grid } from '@tonic-ui/react';
import { getYear } from 'date-fns';
import isSameYear from 'date-fns/isSameYear';
import React from 'react';
import Year from './Year';

const dateTransform = (year) => {
  const date = new Date();
  date.setFullYear(year, 0, 1);
  date.setHours(0, 0, 0, 0);
  return date;
};

const Years = ({
  activeDate,
  selectedDate,
  setActiveDate,
  setView,
  ...props
}) => {
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
        activeDate={date}
        isSelected={isSameYear(date, selectedDate)}
        isToday={isSameYear(date, today)}
        isOutOfScope={point < activeYear || point > (activeYear + 9)}
        setActiveDate={setActiveDate}
        setView={setView}
      />
    );
  }

  return (
    <Grid
      templateColumns="repeat(4, 80px)"
      templateRows="auto"
      {...props}
    >
      { tiles}
    </Grid>
  );
};

Years.displayName = 'Years';

export default Years;
