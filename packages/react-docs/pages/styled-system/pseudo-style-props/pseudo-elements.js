import { Box  } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Box
    __firstLine={{ // same as '::first-line'
      color: 'blue:50',
      textTransform: 'uppercase',
    }}
  >
    This is line 1
    <br/>
    This is line 2
    <br/>
    This is line 3
  </Box>
);

export default App;
