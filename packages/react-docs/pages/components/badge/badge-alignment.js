import { Badge, Grid } from '@tonic-ui/react';
import { AlertIcon } from '@tonic-ui/react-icons';
import React from 'react';

const App = () => (
  <Grid
    m="2x"
    columnGap="8x"
    rowGap="8x"
    templateColumns="1fr 1fr"
    width="min-content"
  >
    <Badge placement="top-left" badgeContent={1}>
      <AlertIcon />
    </Badge>
    <Badge placement="top-right" badgeContent={1}>
      <AlertIcon />
    </Badge>
    <Badge placement="bottom-left" badgeContent={1}>
      <AlertIcon />
    </Badge>
    <Badge placement="bottom-right" badgeContent={1}>
      <AlertIcon />
    </Badge>
  </Grid>
);

export default App;
