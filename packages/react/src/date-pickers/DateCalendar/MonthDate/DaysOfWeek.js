import { addDays, startOfWeek } from 'date-fns';
import { forwardRef } from 'react';
import { Box } from '../../../box';
import { Grid } from '../../../grid';
import useDateCalendar from '../useDateCalendar';
import { useDaysOfWeekStyle } from '../styles';

const DaysOfWeek = forwardRef((props, ref) => {
  const dateCalendarContext = useDateCalendar();
  const {
    activeDate,
    firstDayOfWeek,
    formatDate,
  } = { ...dateCalendarContext };
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
