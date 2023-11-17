import { Divider, Stack } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Stack direction="row" spacing="4x" height="12x">
    <Divider variant="solid" orientation="vertical" />
    <Divider variant="dashed" orientation="vertical" />
    <Divider variant="dotted" orientation="vertical" />
  </Stack>
);

export default App;
