import { InputBase, Stack } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Stack directin="column" spacing="4x">
    <InputBase disabled placeholder="Placeholder text" />
    <InputBase disabled placeholder="Placeholder text" defaultValue="Disabled" />
  </Stack>
);

export default App;
