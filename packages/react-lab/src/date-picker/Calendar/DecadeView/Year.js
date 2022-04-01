import { Box } from '@tonic-ui/react';
import format from 'date-fns/format';
import React, { forwardRef } from 'react';
import { useClickableCellStyle } from '../styles';
import useCalendar from '../useCalendar';

const Year = forwardRef((
  {
    date,
    isSelected,
    isToday,
    isOutOfScope,
    ...props
  },
  ref,
) => {
  const calendarContext = useCalendar();
  const {
    setState,
  } = { ...calendarContext };

  const styleProps = useClickableCellStyle({
    isOutOfScope,
    isSelected,
    isToday,
  });
  const title = format(date, 'yyyy');
  const label = format(date, 'yyyy');
  const handleClick = (e) => {
    setState({
      activeDate: date,
      view: 'year',
    });
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
