import { Box } from '@tonic-ui/react';
import { ensureFunction } from 'ensure-type';
import getDate from 'date-fns/getDate';
import React, { forwardRef } from 'react';
import { useClickableCellStyle } from '../styles';
import { dateFormatter } from '../../utils';

const Day = forwardRef((
  {
    date,
    dateFormat,
    isOutOfScope,
    isSelected,
    isToday,
    setActiveDate,
    onClick,
    ...props
  },
  ref,
) => {
  onClick = ensureFunction(onClick);

  const styleProps = useClickableCellStyle({
    isOutOfScope,
    isSelected,
    isToday,
  });
  const title = dateFormatter({ date, dateFormat });
  const label = getDate(date);
  const handleClick = (e) => {
    const formattedValue = dateFormatter({ date, dateFormat });
    onClick(formattedValue);
    setActiveDate(date);
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

Day.displayName = 'Day';

export default Day;
