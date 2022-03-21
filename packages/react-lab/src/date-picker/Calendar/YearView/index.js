import { Box } from '@tonic-ui/react';
import React, { forwardRef } from 'react';
import Months from './Months';

const YearView = forwardRef((
  {
    activeDate,
    locale,
    selectedDate,
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
      <Months
        activeDate={activeDate}
        locale={locale}
        selectedDate={selectedDate}
        setActiveDate={setActiveDate}
        setView={setView}
      />
    </Box>
  );
});

YearView.displayName = 'YearView';

export default YearView;
