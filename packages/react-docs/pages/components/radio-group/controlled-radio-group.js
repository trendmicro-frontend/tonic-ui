import { Radio, RadioGroup, Stack } from '@tonic-ui/react';
import React, { useState } from 'react';

const App = () => {
  const [value, setValue] = useState('1');

  return (
    <RadioGroup value={value} onChange={value => setValue(value)}>
      <Stack spacing="1x" shouldWrapChildren>
        <Radio value="1">First</Radio>
        <Radio value="2">Second</Radio>
        <Radio value="3">Third</Radio>
      </Stack>
    </RadioGroup>
  );
};

export default App;
