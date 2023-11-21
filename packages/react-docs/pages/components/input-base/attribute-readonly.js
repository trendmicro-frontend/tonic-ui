import { InputBase, Stack } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Stack directin="column" spacing="4x">
    <InputBase readOnly placeholder="Placeholder text" />
    <InputBase readOnly placeholder="Placeholder text" defaultValue="Read-only" />
  </Stack>
);

export default App;
