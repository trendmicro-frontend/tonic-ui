import addDays from 'date-fns/addDays';
import addWeeks from 'date-fns/addWeeks';
import isSameMonth from 'date-fns/isSameMonth';
import startOfMonth from 'date-fns/startOfMonth';
import startOfWeek from 'date-fns/startOfWeek';
import React, { forwardRef } from 'react';
import Grid from '../../../Grid';
import { dateFormatter } from '../../utils';
import Week from './Week';

const Weeks = forwardRef((
  {
    activeStartDate,
    calendarStartDay,
    locale,
    selectedDate,

    // handlers
    setActiveStartDate,
    onClickDay,

    ...rest
  },
  ref,
) => {
  const weeks = [];
  let currentWeekStartDate = startOfWeek(
    startOfMonth(activeStartDate),
    {
      weekStartsOn: calendarStartDay,
    }
  );

  const isWeekInMonth = (startDateOfWeek) => {
    const endDateOfWeek = addDays(startDateOfWeek, 6);
    return isSameMonth(startDateOfWeek, activeStartDate) || isSameMonth(endDateOfWeek, activeStartDate);
  };

  const handleClickDay = (date) => {
    const formattedValue = dateFormatter({ date, locale });
    onClickDay(formattedValue);
    setActiveStartDate(date);
  };

  while (true) {
    weeks.push(
      <Week
        key={currentWeekStartDate.getTime()}
        activeStartDate={currentWeekStartDate}
        calendarStartDay={calendarStartDay}
        locale={locale}
        selectedDate={selectedDate}
        onClickDay={handleClickDay}
      />
    );

    currentWeekStartDate = addWeeks(currentWeekStartDate, 1);

    if (!isWeekInMonth(currentWeekStartDate)) {
      break;
    }
  }

  return (
    <Grid
      ref={ref}
      templateColumns="repeat(7, 40px)"
      templateRows="auto"
      {...rest}
    >
      { weeks }
    </Grid>
  );
});

Weeks.displayName = 'Weeks';

export default Weeks;
