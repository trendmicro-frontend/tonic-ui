import { Box } from '@tonic-ui/react';
import { useConst, usePrevious } from '@tonic-ui/react-hooks';
import isSameMonth from 'date-fns/isSameMonth';
import isSameYear from 'date-fns/isSameYear';
import isValid from 'date-fns/isValid';
import memoize from 'micro-memoize';
import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import isNullOrUndefined from '../../utils/isNullOrUndefined';
import { CalendarProvider } from './context';
import MonthView from './MonthView';
import Navigation from './Navigation';
import { useCalendarStyle } from './styles';
import { validateDate } from './validation';

const getMemoizedState = memoize(state => ({ ...state }));

const mapValueToDate = (value) => {
  if (isNullOrUndefined(value)) {
    return null;
  }
  const date = new Date(value);
  return isValid(date) ? date : null;
};

const Calendar = forwardRef((
  {
    children, // not used
    date: dateProp,
    defaultDate: defaultDateProp,
    firstDayOfWeek = 0, // 0 = Sunday, 1 = Monday, ...
    onChange: onChangeProp,
    onError: onErrorProp,
    ...rest
  },
  ref,
) => {
  const initialDate = useConst(() => {
    const value = dateProp ?? defaultDateProp;
    return mapValueToDate(value);
  });
  const initialActiveDate = useConst(() => {
    const today = new Date();
    // Return initial date if it is valid, otherwise return today
    return isValid(initialDate) ? initialDate : today;
  });
  const [activeDate, setActiveDate] = useState(initialActiveDate);
  const [date, setDate] = useState(initialDate);
  const previousDate = usePrevious(date);
  const validationError = validateDate(date, {});
  const previousValidationError = usePrevious(validationError);

  useEffect(() => {
    if (validationError !== previousValidationError) {
      onErrorProp?.(validationError, date);
    }
  }, [date, onErrorProp, previousValidationError, validationError]);

  useEffect(() => {
    const isControlled = (dateProp !== undefined);
    if (isControlled) {
      const nextDate = dateProp;
      setDate(nextDate);
    }
  }, [dateProp]);

  useEffect(() => {
    const isDateChanged = !!date && (date !== previousDate);
    const nextActiveDate = new Date(date);
    const isSameYearAndMonth = isSameYear(activeDate, nextActiveDate) && isSameMonth(activeDate, nextActiveDate);
    const willChangeView = isValid(nextActiveDate) && !isSameYearAndMonth;
    if (isDateChanged && willChangeView) {
      setActiveDate(nextActiveDate);
    }
  }, [date, previousDate, activeDate]);

  const onChange = useCallback((nextDate) => {
    const isControlled = (dateProp !== undefined);
    if (!isControlled) {
      setDate(nextDate);
    }

    onChangeProp?.(nextDate);
  }, [dateProp, onChangeProp]);

  const context = getMemoizedState({
    activeDate,
    date,
    firstDayOfWeek,
    onChange,
    setActiveDate,
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