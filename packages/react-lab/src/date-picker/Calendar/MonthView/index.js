import { Box } from '@tonic-ui/react';
import React, { forwardRef } from 'react';
import Weeks from './Weeks';
import Weekdays from './Weekdays';

const MonthView = forwardRef((
  {
    activeDate,
    calendarStartDay,
    calendarValue,
    dateFormat,

    // handlers
    setActiveDate,
    onClickDay,

    ...props
  },
  ref
) => {
  return (
    <Box
      ref={ref}
      flex="auto"
      {...props}
    >
      <Weekdays
        activeDate={activeDate}
        calendarStartDay={calendarStartDay}
      />
      <Weeks
        activeDate={activeDate}
        calendarStartDay={calendarStartDay}
        calendarValue={calendarValue}
        dateFormat={dateFormat}
        setActiveDate={setActiveDate}
        onClickDay={onClickDay}
      />
    </Box>
  );
});

MonthView.displayName = 'MonthView';

export default MonthView;
