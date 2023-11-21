import { Input, Stack } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Stack directin="column" spacing="4x">
    <Input disabled placeholder="Placeholder text" />
    <Input disabled placeholder="Placeholder text" defaultValue="Disabled" />
  </Stack>
);

export default App;
