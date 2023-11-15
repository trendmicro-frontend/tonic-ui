import { Box, Button, Grid, Tooltip } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Box display="inline-block">
    <Grid
      templateColumns="repeat(3, minmax(80px,1fr))"
      templateRows="repeat(4, 80px)"
      gap="8x"
    >
      {['top-start', 'top', 'top-end',
        'right-start', 'right', 'right-end',
        'bottom-start', 'bottom', 'bottom-end',
        'left-start', 'left', 'left-end'
      ].map(placement => (
        <Tooltip
          key={placement}
          label="Tooltip"
          placement={placement}
        >
          <Button width="100%">
            {placement}
          </Button>
        </Tooltip>
      ))}
    </Grid>
  </Box>
);

export default App;
