import isSameMonth from 'date-fns/isSameMonth';
import isSameYear from 'date-fns/isSameYear';
import { Box } from '@tonic-ui/react';
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
    locale = 'en',
    value, // string
    view = 'month', // one of 'month', 'year', 'decade'
    onChange: onClickDay,
    ...props
  },
  ref,
) => {
  const currentDate = isDate(value) ? toDate(value) : new Date();
  const selectedDate = isDate(value) ? toDate(value) : null;
  const [currentView, setView] = useState(view);
  const [activeDate, setActiveDate] = useState(currentDate);
  const styleProps = useCalendarStyle();

  useEffect(() => {
    // Dynamically change the calendar view
    if (selectedDate && (!isSameYear(selectedDate, activeDate) || !isSameMonth(selectedDate, activeDate))) {
      setActiveDate(selectedDate);
    }
  }, [selectedDate, activeDate]);

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
        locale={locale}
        setActiveDate={setActiveDate}
        setView={setView}
        view={currentView}
      />
      { currentView === 'month' && (
        <MonthView
          activeDate={activeDate}
          locale={locale}
          selectedDate={selectedDate}
          setActiveDate={setActiveDate}
          calendarStartDay={calendarStartDay}
          onClickDay={onClickDay}
        />
      )}
      { currentView === 'year' && (
        <YearView
          activeDate={activeDate}
          locale={locale}
          selectedDate={selectedDate}
          setActiveDate={setActiveDate}
          setView={setView}
        />
      )}
      { currentView === 'decade' && (
        <DecadeView
          activeDate={activeDate}
          locale={locale}
          selectedDate={selectedDate}
          setActiveDate={setActiveDate}
          setView={setView}
        />
      )}
    </Box>
  );
});

Calendar.displayName = 'Calendar';

export default Calendar;
