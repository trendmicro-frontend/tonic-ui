import { Button } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Button
    sx={{
      backgroundColor: 'red:60',
      color: 'white:primary',
      _focus: {
        ':not(:active)': { // or '&:focus:not(:active)'
          backgroundColor: 'red:60',
        },
      },
      _hover: { // or '&:hover'
        backgroundColor: 'red:50',
      },
      _active: { // or '&:active'
        backgroundColor: 'red:70',
      },
    }}
  >
    Button
  </Button>
);

export default App;
