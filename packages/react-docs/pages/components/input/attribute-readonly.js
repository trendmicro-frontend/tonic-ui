import { Input, Stack } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Stack directin="column" spacing="4x">
    <Input readOnly placeholder="Placeholder text" />
    <Input readOnly placeholder="Placeholder text" defaultValue="Read-only" />
  </Stack>
);

export default App;
