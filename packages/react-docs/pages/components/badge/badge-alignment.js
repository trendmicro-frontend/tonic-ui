import { Badge, Grid, Icon } from '@tonic-ui/react';
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
      <Icon icon="alert" />
    </Badge>
    <Badge placement="top-right" badgeContent={1}>
      <Icon icon="alert" />
    </Badge>
    <Badge placement="bottom-left" badgeContent={1}>
      <Icon icon="alert" />
    </Badge>
    <Badge placement="bottom-right" badgeContent={1}>
      <Icon icon="alert" />
    </Badge>
  </Grid>
);

export default App;
