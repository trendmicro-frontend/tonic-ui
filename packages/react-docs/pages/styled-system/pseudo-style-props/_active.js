import { Box } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Box
    as="button"
    bg="blue:40"
    color="white:primary"
    py="2x"
    px="3x"
    border={0}
    borderRadius="sm"
    cursor="pointer"
    _hover={{
      bg: 'blue:50',
      color: 'white:primary',
    }}
    _active={{
      bg: 'blue:60',
      color: 'white:primary',
    }}
  >
    Click Me
  </Box>
);

export default App;
