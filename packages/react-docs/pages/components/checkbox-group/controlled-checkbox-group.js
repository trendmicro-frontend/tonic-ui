import { Checkbox, CheckboxGroup, Stack } from '@tonic-ui/react';
import React, { useState } from 'react';

const App = () => {
  const [value, setValue] = useState(['apple']);

  return (
    <CheckboxGroup value={value} onChange={value => setValue(value)}>
      <Stack direction="column" spacing="1x" shouldWrapChildren>
        <Checkbox value="apple">Apple</Checkbox>
        <Checkbox value="orange">Orange</Checkbox>
        <Checkbox value="papaya">Papaya</Checkbox>
      </Stack>
    </CheckboxGroup>
  );
};

export default App;
