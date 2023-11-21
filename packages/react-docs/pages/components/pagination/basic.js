import { Pagination, Stack } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Stack spacing="4x">
    <Pagination count={10} />
    <Pagination count={10} defaultPage={4} />
    <Pagination count={10} disabled />
  </Stack>
);

export default App;
