/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { InputControl } from '../../../../src';

const InputControlFixture = () => {
  const [value, setValue] = useState('');

  return (
    <InputControl
      aria-label="Required input"
      data-testid="input"
      required
      slotProps={{ input: { 'data-testid': 'input-control-input' } }}
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
  );
};

export default InputControlFixture;
