import { Box } from '@tonic-ui/react';
import { usePrevious } from '@tonic-ui/react-hooks';
import isSameMonth from 'date-fns/isSameMonth';
import isSameYear from 'date-fns/isSameYear';
import { ensureFunction } from 'ensure-type';
import memoize from 'micro-memoize';
import React, { forwardRef, useEffect, useState } from 'react';
import { isDate, toDate } from '../utils';
import { CalendarProvider } from './context';
import DecadeView from './DecadeView';
import MonthView from './MonthView';
import YearView from './YearView';
import Navigation from './Navigation';
import { useCalendarStyle } from './styles';

const defaultView = 'month'; // one of 'month', 'year', 'decade'
const getMemoizedState = memoize(state => ({ ...state }));

const Calendar = forwardRef((
  {
    calendarStartDay = 0, // 0 = Sunday, 1 = Monday, ...
    children,
    dateFormat = 'yyyy-MM-dd',
    defaultValue: defaultValueProp,
    value: valueProp,
    onChange: onClickDay,
    ...rest
  },
  ref,
) => {
  onClickDay = ensureFunction(onClickDay);

  const [value, setValue] = useState(valueProp ?? defaultValueProp);
  const inputDate = isDate(value) ? toDate(value) : null;
  const [activeDate, setActiveDate] = useState(inputDate ?? new Date());
  const [view, setView] = useState(defaultView);
  const previouslyValue = usePrevious(value);
  const styleProps = useCalendarStyle();

  useEffect(() => {
    const isControlled = (valueProp !== undefined);
    if (isControlled) {
      setValue(valueProp);
    }
  }, [valueProp]);

  useEffect(() => {
    // Dynamically change the calendar view
    const isValueChange = !!value && value !== previouslyValue;
    const newActiveDate = toDate(value);
    const needToChangeView = isDate(value) && (!isSameYear(newActiveDate, activeDate) || !isSameMonth(newActiveDate, activeDate));
    if (isValueChange && needToChangeView) {
      setActiveDate(newActiveDate);
    }
  }, [value, previouslyValue, activeDate, setActiveDate]);

  const context = getMemoizedState({
    activeDate,
    setActiveDate,
    view,
    setView,
    calendarStartDay,
    inputDate,
    dateFormat,
    onClickDay,
  });

  if (typeof children === 'function') {
    return children({
      getCalendarProps: styleProps,
      ...context
    });
  }

  return (
    <CalendarProvider value={context}>
      <Box
        ref={ref}
        {...styleProps}
        {...rest}
      >
        <Navigation />
        { view === 'month' && (
          <MonthView />
        )}
        { view === 'year' && (
          <YearView />
        )}
        { view === 'decade' && (
          <DecadeView />
        )}
      </Box>
    </CalendarProvider>
  );
});

Calendar.displayName = 'Calendar';

export default Calendar;
