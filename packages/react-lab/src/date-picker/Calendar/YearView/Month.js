import {
  Box,
} from '@tonic-ui/react';
import React, { forwardRef } from 'react';
import { useClickableCellStyle } from '../../styles';

const Month = forwardRef((
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
