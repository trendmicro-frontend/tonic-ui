import { Grid } from '@tonic-ui/react';
import { ensureFunction } from 'ensure-type';
import addDays from 'date-fns/addDays';
import addWeeks from 'date-fns/addWeeks';
import isSameMonth from 'date-fns/isSameMonth';
import startOfMonth from 'date-fns/startOfMonth';
import startOfWeek from 'date-fns/startOfWeek';
import React, { forwardRef } from 'react';
import Week from './Week';

const isWeekInMonth = (startDateOfWeek, activeDate) => {
  const endDateOfWeek = addDays(startDateOfWeek, 6);
  return isSameMonth(startDateOfWeek, activeDate) || isSameMonth(endDateOfWeek, activeDate);
};

const Weeks = forwardRef((
  {
    activeDate,
    calendarStartDay,
    locale,
    selectedDate,

    // handlers
    setActiveDate,
    onClickDay,

    ...props
  },
  ref,
) => {
  setActiveDate = ensureFunction(setActiveDate);
  onClickDay = ensureFunction(onClickDay);

  const weeks = [];
  let startDateOfWeek = startOfWeek(
    startOfMonth(activeDate),
    {
      weekStartsOn: calendarStartDay,
    }
  );

  while (true) {
    weeks.push(
      <Week
        key={startDateOfWeek.getTime()}
        activeDate={activeDate}
        locale={locale}
        onClickDay={onClickDay}
        selectedDate={selectedDate}
        setActiveDate={setActiveDate}
        startDateOfWeek={startDateOfWeek}
      />
    );

    startDateOfWeek = addWeeks(startDateOfWeek, 1);

    if (!isWeekInMonth(startDateOfWeek, activeDate)) {
      break;
    }
  }

  return (
    <Grid
      ref={ref}
      templateColumns="repeat(7, 40px)"
      templateRows="auto"
      {...props}
    >
      { weeks }
    </Grid>
  );
});

Weeks.displayName = 'Weeks';

export default Weeks;
