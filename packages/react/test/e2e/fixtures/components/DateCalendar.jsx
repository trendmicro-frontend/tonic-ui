import React from 'react';
import { DateCalendar } from '../../../../src';

const defaultDate = new Date(2024, 5, 15);
const isJuly = date => date.getMonth() === 6;

const DateCalendarFixture = () => (
  <DateCalendar
    data-testid="calendar"
    defaultValue={defaultDate}
    shouldDisableDate={isJuly}
  />
);

export default DateCalendarFixture;
