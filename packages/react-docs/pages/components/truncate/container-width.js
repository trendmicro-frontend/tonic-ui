import { Box, Truncate } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Box width={240}>
    <Truncate title="This is a very long text that will be truncated">
      This is a very long text that will be truncated
    </Truncate>
  </Box>
);

export default App;
