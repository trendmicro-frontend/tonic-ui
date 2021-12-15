import addDays from 'date-fns/addDays';
import isSameMonth from 'date-fns/isSameMonth';
import startOfWeek from 'date-fns/startOfWeek';
import React from 'react';
import { dateFormatter } from '../../utils';
import Day from './Day';

const Week = ({
  activeStartDate,
  calendarStartDay,
  locale,
  selectedDate,
  onClickDay,
}) => {
  const startDateOfWeek = startOfWeek(
    activeStartDate,
    { weekStartsOn: calendarStartDay }
  );
  const today = new Date();
  const isDayInMonth = (date) => {
    const activeDate = selectedDate ?? today;
    return isSameMonth(date, activeDate);
  };

  const formattedSelectedDate = dateFormatter({ date: selectedDate, locale });
  const formattedToday = dateFormatter({ date: new Date(), locale });

  return (
    [0, 1, 2, 3, 4, 5, 6].map((offset) => {
      const date = addDays(startDateOfWeek, offset);
      const formattedDate = dateFormatter({ date, locale });
      const isSelected = (formattedDate === formattedSelectedDate);
      const isToday = (formattedDate === formattedToday);
      const isOutOfScope = !isDayInMonth(date);

      return (
        <Day
          key={date.getTime()}
          date={date}
          locale={locale}
          isOutOfScope={isOutOfScope}
          isSelected={isSelected}
          isToday={isToday}
          onClick={onClickDay}
        />
      );
    })
  );
};

Week.displayName = 'Week';

export default Week;
