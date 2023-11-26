import { Box, Stack } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Stack direction="row" spacing="12x">
    <Box width="324px" lineHeight="sm">
      <Box>Line height 1.25rem</Box>
      <Box>Ambitioni dedisse scripsisse iudicaretur. Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus.</Box>
    </Box>
    <Box width="324px" lineHeight="lg">
      <Box>Line height 1.5rem</Box>
      <Box>Ambitioni dedisse scripsisse iudicaretur. Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus.</Box>
    </Box>
    <Box width="324px" lineHeight="2xl">
      <Box>Line height 2rem</Box>
      <Box>Ambitioni dedisse scripsisse iudicaretur. Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus.</Box>
    </Box>
  </Stack>
);

export default App;
