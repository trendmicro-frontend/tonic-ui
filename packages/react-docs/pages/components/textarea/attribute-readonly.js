import { Stack, Textarea } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Stack directin="column" spacing="4x">
    <Textarea readOnly placeholder="Placeholder text" />
    <Textarea readOnly placeholder="Placeholder text" defaultValue="Read-only" />
  </Stack>
);

export default App;
