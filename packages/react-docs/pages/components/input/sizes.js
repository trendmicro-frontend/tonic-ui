import { Box, Input, Stack, TextLabel } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Stack direction="column" spacing="4x">
    <Box>
      <TextLabel mb="1x" size="sm">Label:</TextLabel>
      <Input size="sm" placeholder="Small size (24px)" />
    </Box>
    <Box>
      <TextLabel mb="1x" size="md">Label:</TextLabel>
      <Input size="md" placeholder="Default size (32px)" />
    </Box>
    <Box>
      <TextLabel mb="1x" size="lg">Label:</TextLabel>
      <Input size="lg" placeholder="Large size (40px)" />
    </Box>
  </Stack>
);

export default App;
