import React, { createRef } from 'react';
import { Calendar } from '@tonic-ui/react';

// Basic usage (deprecated, use DateCalendar)
<Calendar />;

// With date (value) - NO manual type annotations
<Calendar date={new Date()} onChange={(date) => console.log(date)} />;

// With defaultDate
<Calendar defaultDate={new Date()} />;

// Ref
const calendarRef = createRef<HTMLDivElement>();
<Calendar ref={calendarRef} />;
