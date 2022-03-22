import { Box } from '@tonic-ui/react';
import format from 'date-fns/format';
import { ensureFunction } from 'ensure-type';
import React, { forwardRef } from 'react';
import { useClickableCellStyle } from '../styles';

const Year = forwardRef((
  {
    activeDate,
    isSelected,
    isToday,
    isOutOfScope,
    setActiveDate,
    setView,
    ...props
  },
  ref,
) => {
  setActiveDate = ensureFunction(setActiveDate);
  setView = ensureFunction(setView);

  const styleProps = useClickableCellStyle({
    isOutOfScope,
    isSelected,
    isToday,
  });
  const title = format(activeDate, 'yyyy');
  const label = format(activeDate, 'yyyy');
  const handleClick = (e) => {
    setActiveDate(activeDate);
    setView('year');
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

Year.displayName = 'Year';

export default Year;
