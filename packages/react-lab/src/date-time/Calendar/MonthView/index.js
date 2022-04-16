import { Box } from '@tonic-ui/react';
import React, { forwardRef } from 'react';
import { useMonthViewStyle } from '../styles';
import Weeks from './Weeks';
import Weekdays from './Weekdays';

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
      <Weekdays />
      <Weeks />
    </Box>
  );
});

MonthView.displayName = 'MonthView';

export default MonthView;
