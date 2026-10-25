/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { DatePicker, InputControl } from '../../../src';

const defaultDate = new Date(2024, 5, 15);

const DatePickerFixture = ({ params, record }) => {
  const [isOpen, setIsOpen] = useState(params.has('initiallyOpen'));

  return (
    <div>
      <DatePicker
        closeOnSelect={params.has('closeOnSelect')}
        defaultIsOpen={params.has('initiallyOpen')}
        defaultValue={defaultDate}
        portalled={params.has('portalled')}
        {...(params.has('controlled') ? { isOpen } : {})}
        onOpen={() => {
          record({ type: 'open' });
          if (!params.has('holdOpen')) {
            setIsOpen(true);
          }
        }}
        onClose={() => {
          record({ type: 'close' });
          if (!params.has('holdOpen')) {
            setIsOpen(false);
          }
        }}
        onChange={(date) => {
          record({
            type: 'change',
            value: [date.getFullYear(), date.getMonth(), date.getDate()],
          });
        }}
        renderInput={({ error, inputProps }) => (
          <InputControl
            {...inputProps}
            error={error}
            slotProps={{ input: { 'data-testid': 'trigger' } }}
          />
        )}
      />
      <button type="button" data-testid="controlled-toggle" onClick={() => setIsOpen(previous => !previous)}>
        Toggle isOpen
      </button>
    </div>
  );
};

export default DatePickerFixture;
