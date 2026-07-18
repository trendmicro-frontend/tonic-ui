import React, { createRef, useState } from 'react';
import { DateCalendar } from '@tonic-ui/react';

// Basic usage
<DateCalendar />;

// Ref
const dateCalendarRef = createRef<HTMLDivElement>();
<DateCalendar ref={dateCalendarRef} />;

// With defaultValue
<DateCalendar defaultValue={new Date()} />;

// With firstDayOfWeek
<DateCalendar firstDayOfWeek={0} />;
<DateCalendar firstDayOfWeek={1} />;

// With minDate / maxDate
<DateCalendar minDate={new Date(2020, 0, 1)} maxDate={new Date(2030, 11, 31)} />;

// With value
<DateCalendar value={new Date()} />;

// Style props
<DateCalendar mt="2x" mb="2x" width="100%" />;

// Callback: onChange — inferred `date` is Date, call Date methods
<DateCalendar
  onChange={(date) => {
    console.log(date.toISOString());
    console.log(date.getFullYear(), date.getMonth(), date.getDate());
  }}
/>;

// Callback: onError — inferred `error` is string, `date` is Date
<DateCalendar
  onError={(error, date) => {
    console.log(error.toUpperCase(), date.toISOString());
  }}
/>;

// Callback: formatDate — inferred `date` is Date, `formatStr` is string
<DateCalendar
  formatDate={(date, formatStr, options) => {
    console.log(date.toLocaleDateString());
    console.log(formatStr.includes('yyyy'));
    console.log(options);
  }}
/>;

// Callback: shouldDisableDate — inferred `date` is Date, returns boolean
<DateCalendar shouldDisableDate={(date) => date.getDay() === 0 || date.getDay() === 6} />;

// Controlled DateCalendar with state management
function ControlledDateCalendarExample() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <DateCalendar
      value={selectedDate}
      firstDayOfWeek={1}
      minDate={new Date(2020, 0, 1)}
      maxDate={new Date(2030, 11, 31)}
      onChange={(date) => setSelectedDate(date)}
      onError={(error, date) => {
        console.log(error.toUpperCase(), date.toISOString());
      }}
      shouldDisableDate={(date) => date.getDay() === 0}
      formatDate={(date, formatStr) => {
        console.log(date.toLocaleDateString(), formatStr.length);
      }}
    />
  );
}
