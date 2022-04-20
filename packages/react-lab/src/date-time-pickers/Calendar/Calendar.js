import { Box } from '@tonic-ui/react';
import { useConst, usePrevious } from '@tonic-ui/react-hooks';
import isSameMonth from 'date-fns/isSameMonth';
import isSameYear from 'date-fns/isSameYear';
import isValid from 'date-fns/isValid';
import parse from 'date-fns/parse';
import memoize from 'micro-memoize';
import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import { CalendarProvider } from './context';
import MonthView from './MonthView';
import Navigation from './Navigation';
import { useCalendarStyle } from './styles';

const getMemoizedState = memoize(state => ({ ...state }));

const defaultDateFormat = 'yyyy-MM-dd';

/**
 * Convert a value to a Date object in accordance with the format string.
 */
const mapValueToDate = (value, formatString, referenceDate = new Date()) => {
  return (typeof value === 'string')
    ? parse(value, formatString, referenceDate)
    : new Date(value);
};

const Calendar = forwardRef((
  {
    children, // not used
    dateFormat = defaultDateFormat,
    defaultValue: defaultValueProp,
    firstDayOfWeek = 0, // 0 = Sunday, 1 = Monday, ...
    onChange: onChangeProp,
    value: valueProp,
    ...rest
  },
  ref,
) => {
  const initialValue = useConst(() => {
    return mapValueToDate(valueProp ?? defaultValueProp, dateFormat);
  });
  const initialActiveDate = useConst(() => {
    const today = new Date();
    // Return initial value if it is valid, otherwise return current date
    return isValid(initialValue) ? initialValue : today;
  });
  const [value, setValue] = useState(initialValue);
  const prevValue = usePrevious(value);
  const [activeDate, setActiveDate] = useState(initialActiveDate);

  useEffect(() => {
    const isControlled = (valueProp !== undefined);
    if (isControlled) {
      const nextValue = mapValueToDate(valueProp, dateFormat);
      setValue(nextValue);
    }
  }, [dateFormat, valueProp]);

  useEffect(() => {
    const isValueChanged = !!value && (value !== prevValue);
    const nextActiveDate = new Date(value);
    const isSameYearAndMonth = isSameYear(activeDate, nextActiveDate) && isSameMonth(activeDate, nextActiveDate);
    const willChangeView = isValid(nextActiveDate) && !isSameYearAndMonth;
    if (isValueChanged && willChangeView) {
      setActiveDate(nextActiveDate);
    }
  }, [value, prevValue, activeDate]);

  const onChange = useCallback((nextValue) => {
    const isControlled = (valueProp !== undefined);
    if (!isControlled) {
      setValue(nextValue);
    }

    if (typeof onChangeProp === 'function') {
      onChangeProp(nextValue);
    }
  }, [valueProp, onChangeProp]);

  const context = getMemoizedState({
    activeDate,
    dateFormat,
    firstDayOfWeek,
    onChange,
    setActiveDate,
    value,
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
