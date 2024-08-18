import addDays from 'date-fns/addDays';
import startOfWeek from 'date-fns/startOfWeek';
import React, { forwardRef } from 'react';
import { Box } from '../../../box';
import { Grid } from '../../../grid';
import useCalendar from '../useCalendar';
import { useDaysOfWeekStyle } from '../styles';

const DaysOfWeek = forwardRef((props, ref) => {
  const calendarContext = useCalendar();
  const {
    activeDate,
    firstDayOfWeek,
    formatDate,
  } = { ...calendarContext };
  const startDateOfWeek = startOfWeek(activeDate, {
    weekStartsOn: firstDayOfWeek,
  });
  const styleProps = useDaysOfWeekStyle();

  return (
    <Grid
      ref={ref}
      templateColumns="repeat(7, 40px)"
      templateRows="auto"
      {...props}
    >
      {
        [0, 1, 2, 3, 4, 5, 6].map((offset) => {
          const day = addDays(startDateOfWeek, offset);
          return (
            <Box
              key={offset}
              title={formatDate(day, 'EEEE')}
              {...styleProps}
            >
              {formatDate(day, 'EEEEEE')}
            </Box>
          );
        })
      }
    </Grid>
  );
});

DaysOfWeek.displayName = 'DaysOfWeek';

export default DaysOfWeek;
