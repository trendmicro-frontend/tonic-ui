import { useEventCallback } from '@tonic-ui/react-hooks';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import isSameDay from 'date-fns/isSameDay';
import isSameMonth from 'date-fns/isSameMonth';
import React, { forwardRef } from 'react';
import { Box } from '../../../box';
import { useDayStyle } from '../styles';
import useCalendar from '../useCalendar';

const Day = forwardRef((
  {
    date,
    ...rest
  },
  ref,
) => {
  const calendarContext = useCalendar();
  const {
    activeDate,
    date: selectedDate,
    formatDate,
    maxDate,
    minDate,
    onChange,
    setActiveDate,
    shouldDisableDate,
  } = { ...calendarContext };
  const isSelectable = (() => {
    if (minDate && isBefore(date, minDate)) {
      return false;
    }
    if (maxDate && isAfter(date, maxDate)) {
      return false;
    }
    if (shouldDisableDate?.(date)) {
      return false;
    }
    return true;
  })();
  const isSelected = isSameDay(date, new Date(selectedDate));
  const isToday = isSameDay(date, new Date());
  const styleProps = useDayStyle({
    isSameMonth: isSameMonth(date, activeDate),
    isSelectable,
    isToday,
  });
  const handleClick = useEventCallback((e) => {
    setActiveDate(date);
    onChange(date);
  }, [date, setActiveDate, onChange]);

  return (
    <Box
      ref={ref}
      aria-selected={isSelected}
      onClick={isSelectable ? handleClick : undefined}
      {...styleProps}
      {...rest}
    >
      {formatDate(date, 'd')}
    </Box>
  );
});

Day.displayName = 'Day';

export default Day;
