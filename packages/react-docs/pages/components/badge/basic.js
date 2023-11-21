import { Badge, Grid, Icon, Skeleton, Text } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Grid
    mt="2x"
    columnGap="8x"
    justifyItems="center"
    rowGap="8x"
    templateColumns="repeat(5,1fr)"
    width="min-content"
  >
    <Badge>
      <Icon icon="alert" />
    </Badge>
    <Badge badgeContent={0}>
      <Icon icon="alert" />
    </Badge>
    <Badge badgeContent={5}>
      <Icon icon="alert" />
    </Badge>
    <Badge badgeContent="99+">
      <Icon icon="alert" />
    </Badge>
    <Badge
      badgeContent={<Text fontFamily="mono" fontSize="xs">!</Text>}
    >
      <Icon icon="alert" />
    </Badge>
    <Badge>
      <Skeleton variant="rectangle" borderRadius="sm" width="8x" height="8x" />
    </Badge>
    <Badge badgeContent={0}>
      <Skeleton variant="rectangle" borderRadius="sm" width="8x" height="8x" />
    </Badge>
    <Badge badgeContent={5}>
      <Skeleton variant="rectangle" borderRadius="sm" width="8x" height="8x" />
    </Badge>
    <Badge badgeContent="99+">
      <Skeleton variant="rectangle" borderRadius="sm" width="8x" height="8x" />
    </Badge>
    <Badge
      badgeContent={<Text fontFamily="mono" fontSize="xs">!</Text>}
    >
      <Skeleton variant="rectangle" borderRadius="sm" width="8x" height="8x" />
    </Badge>
  </Grid>
);

export default App;
