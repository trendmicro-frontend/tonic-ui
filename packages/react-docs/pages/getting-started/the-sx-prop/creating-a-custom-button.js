import { Button } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Button
    sx={{
      backgroundColor: 'red:60',
      color: 'white:primary',
      '&:focus:not(:active)': {
        backgroundColor: 'red:60',
      },
      '&:hover': {
        backgroundColor: 'red:50',
      },
      '&:active': {
        backgroundColor: 'red:70',
      },
    }}
  >
    Emphasis Button
  </Button>
);

export default App;
