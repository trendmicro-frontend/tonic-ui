import { Box } from '@tonic-ui/react';
import { usePrevious } from '@tonic-ui/react-hooks';
import isSameMonth from 'date-fns/isSameMonth';
import isSameYear from 'date-fns/isSameYear';
import isValidDate from 'date-fns/isValid';
import memoize from 'micro-memoize';
import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import { CalendarProvider } from './context';
import MonthView from './MonthView';
import Navigation from './Navigation';
import { useCalendarStyle } from './styles';

const getMemoizedState = memoize(state => ({ ...state }));

const defaultDateFormat = 'yyyy-MM-dd';

const Calendar = forwardRef((
  {
    children,
    dateFormat = defaultDateFormat,
    defaultValue,
    onChange: onChangeProp,
    value: valueProp,
    weekStartDay = 0, // 0 = Sunday, 1 = Monday, ...
    ...rest
  },
  ref,
) => {
  const inputDate = new Date(value);
  const [activeDate, setActiveDate] = useState(isValidDate(inputDate) ? inputDate : new Date());
  const [value, setValue] = useState(valueProp ?? defaultValue);
  const prevValue = usePrevious(value);

  useEffect(() => {
    if (valueProp !== undefined) {
      setValue(valueProp);
    }
  }, [valueProp]);

  useEffect(() => {
    // Dynamically change the calendar view
    const isValueChanged = !!value && (value !== prevValue);
    const currentActiveDate = activeDate;
    const newActiveDate = new Date(value);
    const needToChangeView = isValidDate(newActiveDate) && (!isSameYear(newActiveDate, currentActiveDate) || !isSameMonth(newActiveDate, currentActiveDate));
    if (isValueChanged && needToChangeView) {
      setActiveDate(newActiveDate);
    }
  }, [value, prevValue, activeDate]);

  const onChange = useCallback((nextValue) => {
    if (valueProp !== undefined) {
      setValue(valueProp);
    } else {
      setValue(nextValue);
    }

    if (typeof onChangeProp === 'function') {
      onChangeProp(nextValue);
    }
  }, [valueProp, onChangeProp]);

  const context = getMemoizedState({
    activeDate,
    dateFormat,
    onChange,
    setActiveDate,
    value,
    weekStartDay,
  });
  const styleProps = useCalendarStyle();

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
