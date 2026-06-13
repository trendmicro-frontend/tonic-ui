import { addDays, addWeeks, isSameMonth, startOfMonth, startOfWeek } from 'date-fns';
import { forwardRef } from 'react';
import { Grid } from '../../../grid';
import useDateCalendar from '../useDateCalendar';
import Week from './Week';

const isWeekInMonth = (startDateOfWeek, activeDate) => {
  const endDateOfWeek = addDays(startDateOfWeek, 6);
  return isSameMonth(startDateOfWeek, activeDate) || isSameMonth(endDateOfWeek, activeDate);
};

const Weeks = forwardRef((
  props,
  ref,
) => {
  const dateCalendarContext = useDateCalendar();
  const {
    activeDate,
    firstDayOfWeek,
  } = { ...dateCalendarContext };
  const weeks = [];
  let startDateOfWeek = startOfWeek(startOfMonth(activeDate), {
    weekStartsOn: firstDayOfWeek,
  });

  do {
    const week = (
      <Week
        key={startDateOfWeek.getTime()}
        startDateOfWeek={startDateOfWeek}
      />
    );
    weeks.push(week);
    startDateOfWeek = addWeeks(startDateOfWeek, 1);
  } while (isWeekInMonth(startDateOfWeek, activeDate));

  return (
    <Grid
      ref={ref}
      templateColumns="repeat(7, 40px)"
      templateRows="auto"
      {...props}
    >
      {weeks}
    </Grid>
  );
});

Weeks.displayName = 'Weeks';

export default Weeks;
