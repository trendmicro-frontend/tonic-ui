import React from 'react';
import {
  Box,
} from '@tonic-ui/react';

const App = (props) => {
  return (
    <Box
      p="4x"
      {...props}
    >
      Edit <code>src/App.js</code> and save to reload.
    </Box>
  );
};

App.displayName = 'App';

export default App;
