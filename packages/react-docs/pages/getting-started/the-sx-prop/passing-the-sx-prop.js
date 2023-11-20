import { Box } from '@tonic-ui/react';
import React from 'react';

const ListItem = ({ sx, ...rest }) => (
  <Box
    sx={[
      {
        color: 'white:primary',
      },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
    {...rest}
  />
);

const App = () => (
  <ListItem
    sx={{
      color: 'white:secondary',
      fontWeight: 'semibold',
    }}
  >
    Header
  </ListItem>
);

export default App;
