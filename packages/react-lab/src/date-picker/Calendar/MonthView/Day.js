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
    ...props
  },
  ref,
) => {
  const calendarContext = useCalendar();
  const {
    dateFormat,
    onClickDay,
    setState,
  } = { ...calendarContext };

  const styleProps = useClickableCellStyle({
    isOutOfScope,
    isSelected,
    isToday,
  });
  const formattedValue = format(date, dateFormat);
  const title = formattedValue;
  const label = getDate(date);
  const handleClick = (e) => {
    setState({ activeDate: date });
    onClickDay(formattedValue);
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
