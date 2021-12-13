import React, { forwardRef } from 'react';
import Box from '../../../Box';
import { useClickableCellStyle } from '../../styles';

const Month = forwardRef((
  {
    date,
    isSelected,
    isToday,
    locale,
    selectedDate,
    onClick,
    ...rest
  },
  ref,
) => {
  const styleProps = useClickableCellStyle({
    isSelected,
    isToday,
  });
  const title = date.toLocaleDateString(locale, { month: 'long', year: 'numeric' });
  const label = date.toLocaleDateString(locale, { month: 'long' });
  const handleClick = (e) => {
    if (typeof onClick !== 'function') {
      return;
    }
    onClick(date);
  };

  return (
    <Box
      ref={ref}
      title={title}
      onClick={handleClick}
      {...styleProps}
      {...rest}
    >
      {label}
    </Box>
  );
});

Month.displayName = 'Month';

export default Month;
