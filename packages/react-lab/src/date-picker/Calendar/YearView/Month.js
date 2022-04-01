import { Box } from '@tonic-ui/react';
import format from 'date-fns/format';
import React, { forwardRef } from 'react';
import { useClickableCellStyle } from '../styles';
import useCalendar from '../useCalendar';

const Month = forwardRef((
  {
    date,
    isSelected,
    isToday,
    ...props
  },
  ref,
) => {
  const calendarContext = useCalendar();
  const {
    setState,
  } = { ...calendarContext };

  const styleProps = useClickableCellStyle({
    isSelected,
    isToday,
  });
  const title = format(date, 'LLLL yyyy');
  const label = format(date, 'LLL');
  const handleClick = (e) => {
    setState({
      activeDate: date,
      view: 'month',
    });
  };

  return (
    <Box
      ref={ref}
      title={title}
      aria-selected={isSelected}
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
