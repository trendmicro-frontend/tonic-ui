import React, { forwardRef, useState } from 'react';
import Box from '../../Box';
import DecadeView from './DecadeView';
import MonthView from './MonthView';
import YearView from './YearView';
import Navigation from './Navigation';
import {
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
  const activeStartDate = value ? toDate(value) : new Date();
  const [currentView, setView] = useState(view);
  const [currentDate, setActiveStartDate] = useState(activeStartDate);

  if (children) {
    return (
      <Box
        ref={ref}
        display="inline-flex"
        flexDirection="column"
        {...rest}
      >
        {children}
      </Box>
    );
  }

  return (
    <Box
      ref={ref}
      display="inline-flex"
      flexDirection="column"
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
          onClickDay={onClickDay}
        />
      )}
      { currentView === 'year' && (
        <YearView
          activeStartDate={currentDate}
          locale={locale}
          setActiveStartDate={setActiveStartDate}
          setView={setView}
        />
      )}
      { currentView === 'decade' && (
        <DecadeView
          activeStartDate={currentDate}
          locale={locale}
          setActiveStartDate={setActiveStartDate}
          setView={setView}
        />
      )}
    </Box>
  );
});

Calendar.displayName = 'Calendar';

export default Calendar;
