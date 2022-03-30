import { Box } from '@tonic-ui/react';
import getDate from 'date-fns/getDate';
import React, { forwardRef } from 'react';
import { dateFormatter } from '../../utils';
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
    setActiveDate,
  } = { ...calendarContext };

  const styleProps = useClickableCellStyle({
    isOutOfScope,
    isSelected,
    isToday,
  });
  const title = dateFormatter({ date, dateFormat });
  const label = getDate(date);
  const handleClick = (e) => {
    const formattedValue = dateFormatter({ date, dateFormat });
    onClickDay(formattedValue);
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
