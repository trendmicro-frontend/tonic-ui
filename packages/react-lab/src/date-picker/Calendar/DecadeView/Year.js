import {
  Box,
} from '@tonic-ui/react';
import React, { forwardRef } from 'react';
import { useClickableCellStyle } from '../styles';

const Year = forwardRef((
  {
    date,
    isSelected,
    isToday,
    locale,
    onClick,
    ...rest
  },
  ref,
) => {
  const styleProps = useClickableCellStyle({
    isSelected,
    isToday,
  });
  const title = date.toLocaleDateString(locale, { year: 'numeric' });
  const label = date.toLocaleDateString(locale, { year: 'numeric' });
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

Year.displayName = 'Year';

export default Year;
