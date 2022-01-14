import {
  Box,
} from '@tonic-ui/react';
import getDate from 'date-fns/getDate';
import React, { forwardRef } from 'react';
import { useClickableCellStyle } from '../../styles';
import { dateFormatter } from '../../utils';

const Day = forwardRef((
  {
    date,
    isOutOfScope,
    isSelected,
    isToday,
    locale,
    onClick,
    ...rest
  },
  ref,
) => {
  const styleProps = useClickableCellStyle({
    isOutOfScope,
    isSelected,
    isToday,
  });
  const title = dateFormatter({ date, locale });
  const label = getDate(date);
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

Day.displayName = 'Day';

export default Day;
