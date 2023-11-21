import { Badge, Grid, Skeleton, Text, useColorMode } from '@tonic-ui/react';
import React from 'react';

const OutlineBadge = (props) => {
  const [colorMode] = useColorMode();
  const backgroundColor = {
    dark: 'gray:100',
    light: 'white',
  }[colorMode];
  const borderColor = {
    dark: 'yellow:50',
    light: 'yellow:50',
  }[colorMode];
  const borderStyle = 'solid';
  const borderWidth = '2px';
  const color = {
    dark: 'white:primary',
    light: 'black:primary',
  }[colorMode];
  const height = '5x';
  const minWidth = '5x';

  return (
    <Badge
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderStyle={borderStyle}
      borderWidth={borderWidth}
      color={color}
      height={height}
      minWidth={minWidth}
      {...props}
    />
  );
};

const App = () => {
  return (
    <Grid
      mt="3x"
      columnGap="8x"
      justifyItems="center"
      rowGap="8x"
      templateColumns="repeat(3,1fr)"
      width="min-content"
    >
      <OutlineBadge badgeContent={0}>
        <Skeleton variant="rectangle" borderRadius="sm" width="8x" height="8x" />
      </OutlineBadge>
      <OutlineBadge badgeContent="99+">
        <Skeleton variant="rectangle" borderRadius="sm" width="8x" height="8x" />
      </OutlineBadge>
      <OutlineBadge
        badgeContent={<Text fontFamily="mono" fontSize="xs">!</Text>}
      >
        <Skeleton variant="rectangle" borderRadius="sm" width="8x" height="8x" />
      </OutlineBadge>
    </Grid>
  );
};

export default App;
