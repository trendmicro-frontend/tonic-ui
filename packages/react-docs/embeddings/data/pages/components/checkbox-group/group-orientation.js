import { Checkbox, CheckboxGroup, Stack } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <CheckboxGroup defaultValue={['apple']}>
    <Stack direction="row" spacing="3x">
      <Checkbox value="apple">Apple</Checkbox>
      <Checkbox value="orange">Orange</Checkbox>
      <Checkbox value="papaya">Papaya</Checkbox>
    </Stack>
  </CheckboxGroup>
);

export default App;
