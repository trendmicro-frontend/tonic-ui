import { Badge, Grid, Skeleton } from '@tonic-ui/react';
import React from 'react';

const App = () => {
  const colors = [
    'red:60',
    'orange:50',
    'yellow:50',
    'green:60',
    'blue:60',
    'gray:60',
    'magenta:60',
    'purple:60',
    'teal:60',
    'cyan:60',
  ];

  return (
    <Grid
      mt="2x"
      columnGap="8x"
      rowGap="8x"
      templateColumns="repeat(auto-fill, minmax(40px, 1fr))"
    >
      {colors.map(color => (
        <Badge key={color} backgroundColor={color} badgeContent={5}>
          <Skeleton variant="rectangle" borderRadius="sm" width="8x" height="8x" />
        </Badge>
      ))}
    </Grid>
  );
};

export default App;
