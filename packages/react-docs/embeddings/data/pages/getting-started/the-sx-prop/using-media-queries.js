import { Box, Text } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Box
    fontSize="md"
    lineHeight="md"
    sx={{
      '@media screen and (min-width: 640px)': {
        fontSize: 'lg',
        lineHeight: 'lg',
      },
      '@media screen and (min-width: 1024px)': {
        fontSize: 'xl',
        lineHeight: 'xl',
      },
      '@media screen and (min-width: 1280px)': {
        fontSize: '2xl',
        lineHeight: '2xl',
      },
    }}
  >
    <Text>
      This text scales with the screen width
    </Text>
  </Box>
);

export default App;
