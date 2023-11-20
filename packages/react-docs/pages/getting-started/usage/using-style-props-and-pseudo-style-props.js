import { Box } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Box
    as="button"

    // style props
    backgroundColor="blue:60"
    border="none"
    borderRadius="sm"
    color="white:primary"
    cursor="pointer"
    display="inline-flex"
    px="3x"
    py="2x"

    // pseudo style props
    _focus={{
      ':not(:active)': {
        backgroundColor: 'blue:60',
      },
    }}
    _hover={{
      backgroundColor: 'blue:50',
    }}
    _active={{
      backgroundColor: 'blue:70',
    }}
  >
    Primary Button
  </Box>
);

export default App;
