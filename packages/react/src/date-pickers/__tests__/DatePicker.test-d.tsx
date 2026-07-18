import React, { createRef, useCallback, useState } from 'react';
import { Box, DatePicker, InputControl, Text } from '@tonic-ui/react';

// Basic usage
<DatePicker />;

// Ref
const datePickerRef = createRef<HTMLDivElement>();
<DatePicker ref={datePickerRef} />;

// With closeOnSelect
<DatePicker closeOnSelect />;
<DatePicker closeOnSelect={false} />;

// With defaultValue - Date
<DatePicker defaultValue={new Date()} />;

// With defaultValue - string
<DatePicker defaultValue="2024-01-01" />;

// With defaultIsOpen
<DatePicker defaultIsOpen />;
<DatePicker defaultIsOpen={false} />;

// With firstDayOfWeek
<DatePicker firstDayOfWeek={0} />;
<DatePicker firstDayOfWeek={1} />;

// With inputFormat
<DatePicker inputFormat="yyyy-MM-dd" />;
<DatePicker inputFormat="dd/MM/yyyy" />;

// With isOpen (controlled)
<DatePicker isOpen />;
<DatePicker isOpen={false} />;

// With offset
<DatePicker offset={[0, 0]} />;
<DatePicker offset={[10, 20]} />;

// With minDate / maxDate
<DatePicker minDate={new Date(2020, 0, 1)} maxDate={new Date(2030, 11, 31)} />;

// With placement
<DatePicker placement="bottom-start" />;
<DatePicker placement="bottom-end" />;
<DatePicker placement="bottom" />;
<DatePicker placement="top-start" />;
<DatePicker placement="top-end" />;
<DatePicker placement="top" />;

// With value - Date
<DatePicker value={new Date()} />;

// With value - string
<DatePicker value="2024-01-01" />;

// Style props
<DatePicker mt="2x" mb="2x" width="100%" />;

// Callback: onChange — inferred `date` is Date, call Date methods
<DatePicker
  onChange={(date) => {
    console.log(date.toISOString());
    console.log(date.getFullYear(), date.getMonth(), date.getDate());
  }}
/>;

// Callback: onError — inferred `error` is string, `date` is Date
<DatePicker
  onError={(error, date) => {
    console.log(error.toUpperCase(), date.toISOString());
  }}
/>;

// Callback: onClose / onOpen
<DatePicker onClose={() => console.log('closed')} />;
<DatePicker onOpen={() => console.log('opened')} />;

// Callback: formatDate — inferred `date` is Date, `formatStr` is string
<DatePicker
  formatDate={(date, formatStr, options) => {
    console.log(date.toLocaleDateString());
    console.log(formatStr.includes('yyyy'));
    console.log(options);
  }}
/>;

// Callback: shouldDisableDate — inferred `date` is Date, returns boolean
<DatePicker shouldDisableDate={(date) => date.getDay() === 0 || date.getDay() === 6} />;

// Callback: renderInput — spread inputProps onto InputControl
<DatePicker
  renderInput={({ error, inputProps }) => (
    <Box>
      <InputControl
        {...inputProps}
        placeholder="yyyy-MM-dd"
        error={!!error}
      />
      {error ? <Text mt="1x" color="red:50">{error}</Text> : null}
    </Box>
  )}
/>;

// Callback: renderInput — spread inputProps onto a plain <input>
<DatePicker
  renderInput={({ inputProps }) => (
    <input {...inputProps} placeholder="yyyy-MM-dd" />
  )}
/>;

// Controlled DatePicker with state management
function ControlledDatePickerExample() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DatePicker
      value={selectedDate}
      isOpen={isOpen}
      closeOnSelect
      inputFormat="yyyy-MM-dd"
      placement="bottom-start"
      offset={[0, 8]}
      minDate={new Date(2020, 0, 1)}
      maxDate={new Date(2030, 11, 31)}
      onChange={(date) => setSelectedDate(date)}
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
      onError={(err, date) => console.log(err.toUpperCase(), date.toISOString())}
      shouldDisableDate={(date) => date.getDay() === 0}
      renderInput={({ error, inputProps }) => (
        <InputControl {...inputProps} error={!!error} placeholder="yyyy-MM-dd" />
      )}
    />
  );
}
