import { Skeleton, Stack } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Stack direction="column" spacing="4x" width={240}>
    <Skeleton variant="text" />
    <Skeleton variant="circle" width={40} height={40} />
    <Skeleton variant="rectangle" width={240} height={80} />
    <Skeleton variant="rectangle" width={240} height={80} borderRadius="sm" />
  </Stack>
);

export default App;
