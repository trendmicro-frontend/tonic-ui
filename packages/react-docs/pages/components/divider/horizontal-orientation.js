import { Divider, Stack } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Stack direction="column" spacing="4x">
    <Divider variand="solid" orientation="horizontal" />
    <Divider variant="dashed" orientation="horizontal" />
    <Divider variant="dotted" orientation="horizontal" />
  </Stack>
);

export default App;
