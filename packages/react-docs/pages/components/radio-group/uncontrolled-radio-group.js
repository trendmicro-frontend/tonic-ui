import { Radio, RadioGroup, Stack } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <RadioGroup defaultValue="1">
    <Stack spacing="1x" shouldWrapChildren>
      <Radio value="1">First</Radio>
      <Radio value="2">Second</Radio>
      <Radio value="3">Third</Radio>
    </Stack>
  </RadioGroup>
);

export default App;
