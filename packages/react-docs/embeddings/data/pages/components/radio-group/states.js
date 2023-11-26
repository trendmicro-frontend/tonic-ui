import { Radio, RadioGroup, Stack } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Stack direction="column" spacing="2x" shouldWrapChildren>
    <RadioGroup defaultValue="1">
      <Stack direction="row" spacing="3x">
        <Radio value="1">Radio 1</Radio>
        <Radio value="2">Radio 2</Radio>
        <Radio value="3">Radio 3</Radio>
      </Stack>
    </RadioGroup>
    <RadioGroup disabled defaultValue="1">
      <Stack direction="row" spacing="3x">
        <Radio value="1">Radio 1</Radio>
        <Radio value="2">Radio 2</Radio>
        <Radio value="3">Radio 3</Radio>
      </Stack>
    </RadioGroup>
  </Stack>
);

export default App;
