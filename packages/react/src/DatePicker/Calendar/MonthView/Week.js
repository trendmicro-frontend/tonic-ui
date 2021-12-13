import addDays from 'date-fns/addDays';
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
  selectedDate = dateFormatter({ date: selectedDate, locale });
  const today = dateFormatter({ date: new Date(), locale });

  return (
    [0, 1, 2, 3, 4, 5, 6].map((offset) => {
      const date = addDays(startDateOfWeek, offset);
      const formattedDate = dateFormatter({ date, locale });
      const isSelected = (formattedDate === selectedDate);
      const isToday = (formattedDate === today);

      return (
        <Day
          key={date.getTime()}
          date={date}
          locale={locale}
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
