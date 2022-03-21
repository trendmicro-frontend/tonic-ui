import { Box } from '@tonic-ui/react';
import React, { forwardRef } from 'react';
import Weeks from './Weeks';
import Weekdays from './Weekdays';

const MonthView = forwardRef((
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
        locale={locale}
      />
      <Weeks
        activeDate={activeDate}
        calendarStartDay={calendarStartDay}
        locale={locale}
        setActiveDate={setActiveDate}
        selectedDate={selectedDate}
        onClickDay={onClickDay}
      />
    </Box>
  );
});

MonthView.displayName = 'MonthView';

export default MonthView;
