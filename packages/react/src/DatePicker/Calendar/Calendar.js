import React, { forwardRef, useState } from 'react';
import Flex from '../../Flex';
import DecadeView from './DecadeView';
import MonthView from './MonthView';
import YearView from './YearView';
import Navigation from './Navigation';
import {
  toDate,
} from '../shared/utils';

const Calendar = forwardRef((
  {
    value, // string
    calendarStartDay = 0, // 0 = Sunday, 1 = Monday, ...
    locale = 'en-CA',
    view = 'month', // one of 'month', 'year', 'decade'
    onChange: onClickDay,
    ...rest
  },
  ref,
) => {
  const activeStartDate = value ? toDate(value) : new Date();
  const [currentView, setView] = useState(view);
  const [currentDate, setActiveStartDate] = useState(activeStartDate);

  return (
    <Flex
      ref={ref}
      display="inline-flex"
      direction="column"
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
    </Flex>
  );
});

Calendar.displayName = 'Calendar';

export default Calendar;
