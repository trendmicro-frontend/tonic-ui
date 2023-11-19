import { Stack, Textarea } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Stack directin="column" spacing="4x">
    <Textarea disabled placeholder="Placeholder text" />
    <Textarea disabled placeholder="Placeholder text" defaultValue="Disabled" />
  </Stack>
);

export default App;
