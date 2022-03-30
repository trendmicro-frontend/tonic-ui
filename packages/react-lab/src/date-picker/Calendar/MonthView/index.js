import { Box } from '@tonic-ui/react';
import React, { forwardRef } from 'react';
import Weeks from './Weeks';
import Weekdays from './Weekdays';

const MonthView = forwardRef((
  props,
  ref
) => {
  return (
    <Box
      ref={ref}
      flex="auto"
      {...props}
    >
      <Weekdays />
      <Weeks />
    </Box>
  );
});

MonthView.displayName = 'MonthView';

export default MonthView;
