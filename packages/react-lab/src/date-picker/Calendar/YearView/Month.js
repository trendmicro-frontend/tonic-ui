import { Box } from '@tonic-ui/react';
import format from 'date-fns/format';
import { ensureFunction } from 'ensure-type';
import React, { forwardRef } from 'react';
import { useClickableCellStyle } from '../styles';

const Month = forwardRef((
  {
    activeDate,
    isSelected,
    isToday,
    setActiveDate,
    setView,
    ...props
  },
  ref,
) => {
  setActiveDate = ensureFunction(setActiveDate);
  setView = ensureFunction(setView);

  const styleProps = useClickableCellStyle({
    isSelected,
    isToday,
  });
  const title = format(activeDate, 'LLLL yyyy');
  const label = format(activeDate, 'LLL');
  const handleClick = (e) => {
    setActiveDate(activeDate);
    setView('month');
  };

  return (
    <Box
      ref={ref}
      title={title}
      onClick={handleClick}
      {...styleProps}
      {...props}
    >
      {label}
    </Box>
  );
});

Month.displayName = 'Month';

export default Month;
