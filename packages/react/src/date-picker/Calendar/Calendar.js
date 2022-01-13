import React, { forwardRef, useState } from 'react';
import { Box } from '../../box';
import DecadeView from './DecadeView';
import MonthView from './MonthView';
import YearView from './YearView';
import Navigation from './Navigation';
import { useCalendarStyle } from '../styles';
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
    ...rest
  },
  ref,
) => {
  const activeStartDate = isDate(value) ? toDate(value) : new Date();
  const selectedDate = isDate(value) ? toDate(value) : null;
  const [currentView, setView] = useState(view);
  const [currentDate, setActiveStartDate] = useState(activeStartDate);
  const styleProps = useCalendarStyle();

  if (children) {
    return (
      <Box
        ref={ref}
        {...styleProps}
        {...rest}
      >
        {children}
      </Box>
    );
  }

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...rest}
    >
      <Navigation
        activeStartDate={currentDate}
        locale={locale}
        view={currentView}
        setView={setView}
        setActiveStartDate={setActiveStartDate}
      />
      { currentView === 'month' && (
        <MonthView
          activeStartDate={currentDate}
          calendarStartDay={calendarStartDay}
          locale={locale}
          setActiveStartDate={setActiveStartDate}
          selectedDate={selectedDate}
          onClickDay={onClickDay}
        />
      )}
      { currentView === 'year' && (
        <YearView
          activeStartDate={currentDate}
          locale={locale}
          setActiveStartDate={setActiveStartDate}
          selectedDate={selectedDate}
          setView={setView}
        />
      )}
      { currentView === 'decade' && (
        <DecadeView
          activeStartDate={currentDate}
          locale={locale}
          setActiveStartDate={setActiveStartDate}
          selectedDate={selectedDate}
          setView={setView}
        />
      )}
    </Box>
  );
});

Calendar.displayName = 'Calendar';

export default Calendar;
