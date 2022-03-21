import { Box } from '@tonic-ui/react';
import { ensureFunction } from 'ensure-type';
import React, { forwardRef } from 'react';
import { useClickableCellStyle } from '../styles';

const Month = forwardRef((
  {
    activeDate,
    isSelected,
    isToday,
    locale,
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
  const title = activeDate.toLocaleDateString(locale, { month: 'long', year: 'numeric' });
  const label = activeDate.toLocaleDateString(locale, { month: 'short' });
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
