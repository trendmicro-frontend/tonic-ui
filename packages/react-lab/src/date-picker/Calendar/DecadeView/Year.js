import { Box } from '@tonic-ui/react';
import { ensureFunction } from 'ensure-type';
import React, { forwardRef } from 'react';
import { useClickableCellStyle } from '../styles';

const Year = forwardRef((
  {
    activeDate,
    isSelected,
    isToday,
    isOutOfScope,
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
    isOutOfScope,
    isSelected,
    isToday,
  });
  const title = activeDate.toLocaleDateString(locale, { year: 'numeric' });
  const label = activeDate.toLocaleDateString(locale, { year: 'numeric' });
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
