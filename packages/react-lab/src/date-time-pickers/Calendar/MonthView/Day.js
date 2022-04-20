import { Box } from '@tonic-ui/react';
import format from 'date-fns/format';
import getDate from 'date-fns/getDate';
import React, { forwardRef } from 'react';
import { useClickableCellStyle } from '../styles';
import useCalendar from '../useCalendar';

const Day = forwardRef((
  {
    date,
    isOutOfScope,
    isSelected,
    isToday,
    ...rest
  },
  ref,
) => {
  const calendarContext = useCalendar();
  const {
    dateFormat,
    onChange,
    setActiveDate,
  } = { ...calendarContext };

  const styleProps = useClickableCellStyle({
    isOutOfScope,
    isSelected,
    isToday,
  });
  const label = getDate(date);
  const handleClick = (e) => {
    setActiveDate(date);
    onChange(date);
  };

  return (
    <Box
      ref={ref}
      title={format(date, dateFormat)}
      aria-selected={isSelected}
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
