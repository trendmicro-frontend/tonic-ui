import { Box } from '@tonic-ui/react';
import { usePrevious } from '@tonic-ui/react-hooks';
import { ensureFunction } from 'ensure-type';
import isSameMonth from 'date-fns/isSameMonth';
import isSameYear from 'date-fns/isSameYear';
import isValidDate from 'date-fns/isValid';
import memoize from 'micro-memoize';
import React, { forwardRef, useEffect, useState } from 'react';
import { CalendarProvider } from './context';
import MonthView from './MonthView';
import Navigation from './Navigation';
import { useCalendarStyle } from './styles';

const getMemoizedState = memoize(state => ({ ...state }));

const Calendar = forwardRef((
  {
    calendarStartDay = 0, // 0 = Sunday, 1 = Monday, ...
    children,
    dateFormat = 'yyyy-MM-dd',
    defaultValue,
    value: valueProp,
    onChange,
    ...rest
  },
  ref,
) => {
  onChange = ensureFunction(onChange);

  const [value, setValue] = useState(valueProp ?? defaultValue);
  const inputDate = new Date(value);
  const [activeDate, setActiveDate] = useState(isValidDate(inputDate) ? inputDate : new Date());
  const previouslyValue = usePrevious(value);
  const styleProps = useCalendarStyle();
  const handleChange = (value) => {
    if (valueProp !== undefined) {
      setValue(valueProp);
    } else {
      setValue(value);
    }
    onChange(value);
  };

  useEffect(() => {
    if (valueProp !== undefined) {
      setValue(valueProp);
    }
  }, [valueProp]);

  useEffect(() => {
    // Dynamically change the calendar view
    const isValueChange = !!value && value !== previouslyValue;
    const currentActiveDate = activeDate;
    const newActiveDate = new Date(value);
    const needToChangeView = isValidDate(newActiveDate) && (!isSameYear(newActiveDate, currentActiveDate) || !isSameMonth(newActiveDate, currentActiveDate));
    if (isValueChange && needToChangeView) {
      setActiveDate(newActiveDate);
    }
  }, [value, previouslyValue, activeDate]);

  const context = getMemoizedState({
    activeDate: activeDate,
    calendarStartDay,
    dateFormat,
    onChange: handleChange,
    setActiveDate,
    value,
  });

  return (
    <CalendarProvider value={context}>
      <Box
        ref={ref}
        {...styleProps}
        {...rest}
      >
        <Navigation />
        <MonthView />
      </Box>
    </CalendarProvider>
  );
});

Calendar.displayName = 'Calendar';

export default Calendar;
