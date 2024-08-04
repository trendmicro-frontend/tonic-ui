import { useConst, usePrevious } from '@tonic-ui/react-hooks';
import { isNullOrUndefined } from '@tonic-ui/utils';
import endOfDay from 'date-fns/endOfDay';
import format from 'date-fns/format';
import isDate from 'date-fns/isDate';
import isSameMonth from 'date-fns/isSameMonth';
import isSameYear from 'date-fns/isSameYear';
import isValid from 'date-fns/isValid';
import startOfDay from 'date-fns/startOfDay';
import memoize from 'micro-memoize';
import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import { Box } from '../../box';
import { validateDate } from '../validation';
import { CalendarProvider } from './context';
import MonthView from './MonthView';
import Navigation from './Navigation';
import { useCalendarStyle } from './styles';

const getMemoizedState = memoize(state => ({ ...state }));

const mapValueToDate = (value) => {
  if (isNullOrUndefined(value)) {
    return null;
  }
  const date = new Date(value);
  return (isDate(date) && isValid(date)) ? date : null;
};

const mapValueToStartOfDay = (value) => {
  const date = mapValueToDate(value);
  return (isDate(date) && isValid(date)) ? startOfDay(date) : null;
};

const mapValueToEndOfDay = (value) => {
  const date = mapValueToDate(value);
  return (isDate(date) && isValid(date)) ? endOfDay(date) : null;
};

const Calendar = forwardRef((
  {
    children, // not used
    date: dateProp,
    defaultDate: defaultDateProp,
    firstDayOfWeek = 0, // 0 = Sunday, 1 = Monday, ...
    formatDate: formatDateProp,
    maxDate: maxDateProp,
    minDate: minDateProp,
    onChange: onChangeProp,
    onError: onErrorProp,
    shouldDisableDate,
    ...rest
  },
  ref,
) => {
  const initialDate = useConst(() => {
    const value = dateProp ?? defaultDateProp;
    return mapValueToDate(value);
  });
  const initialActiveDate = useConst(() => {
    const today = mapValueToStartOfDay(new Date());
    // Return initial date if it is valid, otherwise return today
    return isValid(initialDate) ? initialDate : today;
  });
  const [activeDate, setActiveDate] = useState(initialActiveDate);
  const [date, setDate] = useState(initialDate);
  const previousDate = usePrevious(date);
  const formatDate = useCallback((_date, _format, _options) => {
    if (!_date) {
      return null;
    }
    if (typeof formatDateProp === 'function') {
      return formatDateProp(_date, _format, _options);
    }
    return format(_date, _format, _options);
  }, [formatDateProp]);
  const maxDate = mapValueToEndOfDay(maxDateProp);
  const minDate = mapValueToStartOfDay(minDateProp);
  const validationError = validateDate(date, { maxDate, minDate, shouldDisableDate });
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
    formatDate,
    maxDate,
    minDate,
    onChange,
    setActiveDate,
    shouldDisableDate,
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
