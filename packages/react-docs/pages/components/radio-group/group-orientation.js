import { Radio, RadioGroup, Stack } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <RadioGroup defaultValue="1">
    <Stack direction="row" spacing="3x">
      <Radio value="1">Radio 1</Radio>
      <Radio value="2">Radio 2</Radio>
      <Radio value="3">Radio 3</Radio>
    </Stack>
  </RadioGroup>
);

export default App;
