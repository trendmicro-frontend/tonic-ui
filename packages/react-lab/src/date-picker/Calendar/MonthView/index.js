import {
  Box,
} from '@tonic-ui/react';
import React, { forwardRef } from 'react';
import Weeks from './Weeks';
import Weekdays from './Weekdays';

const MonthView = forwardRef((
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
  ref
) => {
  return (
    <Box
      ref={ref}
      {...rest}
    >
      <Weekdays
        activeStartDate={activeStartDate}
        calendarStartDay={calendarStartDay}
        locale={locale}
      />
      <Weeks
        activeStartDate={activeStartDate}
        calendarStartDay={calendarStartDay}
        locale={locale}
        setActiveStartDate={setActiveStartDate}
        selectedDate={selectedDate}
        onClickDay={onClickDay}
      />
    </Box>
  );
});

MonthView.displayName = 'MonthView';

export default MonthView;
