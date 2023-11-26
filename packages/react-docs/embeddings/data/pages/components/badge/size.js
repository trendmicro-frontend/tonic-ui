import { Badge, Skeleton, Stack } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Stack mt="3x" direction="row" spacing="8x" shouldWrapChildren>
    <Badge badgeContent={5} height="4x" minWidth="4x" fontSize="xs">
      <Skeleton variant="rectangle" borderRadius="sm" width="8x" height="8x" />
    </Badge>
    <Badge badgeContent={5} height="5x" minWidth="5x" fontSize="sm">
      <Skeleton variant="rectangle" borderRadius="sm" width="8x" height="8x" />
    </Badge>
    <Badge badgeContent={5} height="6x" minWidth="6x" fontSize="md">
      <Skeleton variant="rectangle" borderRadius="sm" width="8x" height="8x" />
    </Badge>
  </Stack>
);

export default App;
