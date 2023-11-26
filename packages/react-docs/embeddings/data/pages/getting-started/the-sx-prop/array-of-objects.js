import { Box } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Box
    sx={[
      {
        '&:hover': {
          backgroundColor: 'gray:80',
          color: 'white:primary',
        },
      },
      true && {
        '&:hover': {
          backgroundColor: 'gray:50',
          color: 'white:primary',
        },
      },
      true && {
        '&:hover': {
          backgroundColor: 'yellow:50',
          color: 'black:primary',
        },
      },
    ]}
  >
    Hover Me
  </Box>
);

export default App;
