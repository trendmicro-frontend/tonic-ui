import React, { forwardRef } from 'react';
import Box from '../../../Box';
import Months from './Months';

const YearView = forwardRef((
  {
    activeStartDate,
    locale,

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
        onClickMonth={handleClickMonth}
      />
    </Box>
  );
});

YearView.displayName = 'YearView';

export default YearView;
