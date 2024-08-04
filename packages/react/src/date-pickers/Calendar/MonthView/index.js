import React, { forwardRef } from 'react';
import { Box } from '../../../box';
import { useMonthViewStyle } from '../styles';
import DaysOfWeek from './DaysOfWeek';
import Weeks from './Weeks';

const MonthView = forwardRef((
  props,
  ref
) => {
  const styleProps = useMonthViewStyle();
  return (
    <Box
      ref={ref}
      {...styleProps}
      {...props}
    >
      <DaysOfWeek />
      <Weeks />
    </Box>
  );
});

MonthView.displayName = 'MonthView';

export default MonthView;
