import { Checkbox, CheckboxGroup, Stack } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Stack direction="column" spacing="2x" shouldWrapChildren>
    <CheckboxGroup defaultValue={['apple']}>
      <Stack direction="row" spacing="3x">
        <Checkbox value="apple">Apple</Checkbox>
        <Checkbox value="orange">Orange</Checkbox>
        <Checkbox value="papaya">Papaya</Checkbox>
      </Stack>
    </CheckboxGroup>
    <CheckboxGroup disabled defaultValue={['apple']}>
      <Stack direction="row" spacing="3x">
        <Checkbox value="apple">Apple</Checkbox>
        <Checkbox value="orange">Orange</Checkbox>
        <Checkbox value="papaya">Papaya</Checkbox>
      </Stack>
    </CheckboxGroup>
  </Stack>
);

export default App;
