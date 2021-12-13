import { getYear } from 'date-fns';
import React from 'react';
import Grid from '../../../Grid';
import Year from './Year';

const Years = ({
  date,
  locale,
  onClickYear,
  ...rest
}) => {
  const start = getYear(date);
  const end = start + 9;
  const dateTransform = (year) => {
    const date = new Date();
    date.setFullYear(year, 0, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  };
  const tiles = [];
  for (let point = start; point <= end; point += 1) {
    const date = dateTransform(point);
    tiles.push(
      <Year
        key={date.getTime()}
        date={date}
        locale={locale}
        onClick={onClickYear}
      />
    );
  }

  return (
    <Grid
      templateColumns="repeat(3, 80px)"
      templateRows="auto"
      {...rest}
    >
      { tiles}
    </Grid>
  );
};

Years.displayName = 'Years';

export default Years;
