import { Pagination, Stack } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Stack spacing="4x">
    <Pagination
      count={10}
    />
    <Pagination
      count={10}
      defaultPage={5}
      boundaryCount={0}
      slot={{ first: true, last: true }}
    />
    <Pagination
      count={10}
      slot={{ previous: false, next: false }}
    />
  </Stack>
);

export default App;
