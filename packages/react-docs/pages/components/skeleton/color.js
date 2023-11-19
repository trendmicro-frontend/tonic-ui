import { Box, Skeleton } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Box display="inline-block" backgroundColor="gray:100" p="6x">
    <Skeleton
      variant="rectangle"
      width={240}
      height={120}
      backgroundColor="gray:90"
      animation="pulse"
    />
  </Box>
);

export default App;
