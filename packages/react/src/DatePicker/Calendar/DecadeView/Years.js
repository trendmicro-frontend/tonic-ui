import { getYear } from 'date-fns';
import React from 'react';
import Grid from '../../../Grid';
import Year from './Year';

const Years = ({
  date,
  locale,
  selectedDate,
  onClickYear,
  ...rest
}) => {
  const today = (new Date()).toLocaleDateString(locale, { year: 'numeric' });
  const selectedYear = selectedDate ? selectedDate.toLocaleDateString(locale, { year: 'numeric' }) : null;

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
    const year = date.toLocaleDateString(locale, { year: 'numeric' });

    tiles.push(
      <Year
        key={date.getTime()}
        date={date}
        isSelected={year === selectedYear}
        isToday={year === today}
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
