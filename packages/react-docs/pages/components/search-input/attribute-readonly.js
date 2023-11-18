import { SearchInput, Stack } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Stack directin="column" spacing="4x">
    <SearchInput readOnly placeholder="Placeholder text" />
    <SearchInput readOnly placeholder="Placeholder text" defaultValue="Read-only input" />
  </Stack>
);

export default App;
