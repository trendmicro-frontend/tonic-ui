import {
  Box,
} from '@tonic-ui/react';
import React, { forwardRef } from 'react';
import Months from './Months';

const YearView = forwardRef((
  {
    activeStartDate,
    locale,
    selectedDate,

    // handlers
    setActiveStartDate,
    setView,

    ...rest
  },
  ref
) => {
  const handleClickMonth = (date) => {
    setActiveStartDate(date);
    setView('month');
  };

  return (
    <Box
      ref={ref}
      {...rest}
    >
      <Months
        activeStartDate={activeStartDate}
        locale={locale}
        selectedDate={selectedDate}
        onClickMonth={handleClickMonth}
      />
    </Box>
  );
});

YearView.displayName = 'YearView';

export default YearView;
