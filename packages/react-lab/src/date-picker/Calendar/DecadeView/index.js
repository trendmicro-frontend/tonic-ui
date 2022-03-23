import { Box } from '@tonic-ui/react';
import React, { forwardRef } from 'react';
import Years from './Years';

const DecadeView = forwardRef((
  {
    activeDate,
    calendarValue,
    setActiveDate,
    setView,
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
      <Years
        activeDate={activeDate}
        calendarValue={calendarValue}
        setActiveDate={setActiveDate}
        setView={setView}
      />
    </Box>
  );
});

DecadeView.displayName = 'DecadeView';

export default DecadeView;
