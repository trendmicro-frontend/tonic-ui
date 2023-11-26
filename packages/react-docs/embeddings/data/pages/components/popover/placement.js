import { Box, Button, Grid, Popover, PopoverContent, PopoverTrigger } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Box display="inline-block">
    <Grid
      templateColumns="repeat(3, minmax(84px,1fr))"
      templateRows="repeat(4, 84px)"
      gap="8x"
    >
      {['top-start', 'top', 'top-end',
        'right-start', 'right', 'right-end',
        'bottom-start', 'bottom', 'bottom-end',
        'left-start', 'left', 'left-end'
      ].map(placement => (
        <Popover
          key={placement}
          placement={placement}
          trigger="hover"
        >
          <PopoverTrigger>
            <Button width="100%">
              {placement}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            Popover
          </PopoverContent>
        </Popover>
      ))}
    </Grid>
  </Box>
);

export default App;
