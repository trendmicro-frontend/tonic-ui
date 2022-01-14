import {
  Box,
  Grid,
} from '@tonic-ui/react';
import addDays from 'date-fns/addDays';
import startOfWeek from 'date-fns/startOfWeek';
import React, { forwardRef } from 'react';
import { useCellStyle } from '../../styles';

const Weekdays = forwardRef((
  {
    activeStartDate,
    calendarStartDay,
    locale,
    ...rest
  },
  ref,
) => {
  const startDateOfWeek = startOfWeek(
    activeStartDate,
    {
      weekStartsOn: calendarStartDay,
    }
  );
  const styleProps = useCellStyle({});

  return (
    <Grid
      ref={ref}
      templateColumns="repeat(7, 40px)"
      templateRows="auto"
      {...rest}
    >
      {
        [0, 1, 2, 3, 4, 5, 6].map((offset) => {
          const day = addDays(startDateOfWeek, offset);
          const title = day.toLocaleDateString(locale, { weekday: 'long' });
          const label = day.toLocaleDateString(locale, { weekday: 'short' });
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
