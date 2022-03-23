import { Box } from '@tonic-ui/react';
import { usePrevious } from '@tonic-ui/react-hooks';
import isSameMonth from 'date-fns/isSameMonth';
import isSameYear from 'date-fns/isSameYear';
import React, { forwardRef, useEffect, useState } from 'react';
import DecadeView from './DecadeView';
import MonthView from './MonthView';
import YearView from './YearView';
import Navigation from './Navigation';
import { useCalendarStyle } from './styles';
import {
  isDate,
  toDate,
} from '../utils';

const Calendar = forwardRef((
  {
    calendarStartDay = 0, // 0 = Sunday, 1 = Monday, ...
    children,
    dateFormat = 'yyyy-MM-dd',
    value = new Date(),
    view = 'month', // one of 'month', 'year', 'decade'
    onChange: onClickDay,
    ...props
  },
  ref,
) => {
  const currentDate = isDate(value) ? toDate(value) : new Date();
  const inputDate = isDate(value) ? toDate(value) : null;
  const [currentView, setView] = useState(view);
  const [activeDate, setActiveDate] = useState(currentDate);
  const [calendarValue, setCalendarValue] = useState(inputDate);
  const styleProps = useCalendarStyle();
  const previouslyValue = usePrevious(value);

  useEffect(() => {
    // Dynamically change the calendar view
    const isValueChange = !!inputDate && value !== previouslyValue;
    const needToChangeView = !isSameYear(inputDate, activeDate) || !isSameMonth(inputDate, activeDate);
    if (isValueChange && needToChangeView) {
      setActiveDate(inputDate);
    }
    if (isValueChange) {
      setCalendarValue(inputDate);
    }
  }, [value, previouslyValue, inputDate, activeDate]);

  if (children) {
    return (
      <Box
        ref={ref}
        {...styleProps}
        {...props}
      >
        {children}
      </Box>
    );
  }

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...props}
    >
      <Navigation
        activeDate={activeDate}
        setActiveDate={setActiveDate}
        setView={setView}
        view={currentView}
      />
      { currentView === 'month' && (
        <MonthView
          activeDate={activeDate}
          calendarValue={calendarValue}
          dateFormat={dateFormat}
          setActiveDate={setActiveDate}
          setCalendarValue={setCalendarValue}
          calendarStartDay={calendarStartDay}
          onClickDay={onClickDay}
        />
      )}
      { currentView === 'year' && (
        <YearView
          activeDate={activeDate}
          calendarValue={calendarValue}
          setActiveDate={setActiveDate}
          setView={setView}
        />
      )}
      { currentView === 'decade' && (
        <DecadeView
          activeDate={activeDate}
          calendarValue={calendarValue}
          setActiveDate={setActiveDate}
          setView={setView}
        />
      )}
    </Box>
  );
});

Calendar.displayName = 'Calendar';

export default Calendar;
