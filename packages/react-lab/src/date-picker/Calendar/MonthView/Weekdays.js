import { Box, Grid } from '@tonic-ui/react';
import addDays from 'date-fns/addDays';
import format from 'date-fns/format';
import startOfWeek from 'date-fns/startOfWeek';
import React, { forwardRef } from 'react';
import useCalendar from '../useCalendar';
import { useCellStyle } from '../styles';

const Weekdays = forwardRef((
  props,
  ref,
) => {
  const calendarContext = useCalendar();
  const {
    activeDate,
    weekStartDay,
  } = { ...calendarContext };

  const startDateOfWeek = startOfWeek(
    activeDate,
    {
      weekStartsOn: weekStartDay,
    }
  );
  const styleProps = useCellStyle({});

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
          const title = format(day, 'EEEE');
          const label = format(day, 'EEEEEE');
          return (
            <Box
              key={offset}
              title={title}
              {...styleProps}
            >
              { label }
            </Box>
          );
        })
      }
    </Grid>
  );
});

Weekdays.displayName = 'Weekdays';

export default Weekdays;
