import { Badge, Grid, Skeleton } from '@tonic-ui/react';

const App = () => {
  const colors = {
    'error.icon': 'text._fixed.dark.accent',
    'warning.icon': 'text._fixed.light.accent',
    'minorWarning.icon': 'text._fixed.light.accent',
    'success.icon': 'text._fixed.light.accent',
    'info.icon': 'text.accent',
    'neutral.icon': 'text._fixed.light.accent',
  }

  return (
    <Grid
      mt="2x"
      columnGap="8x"
      rowGap="8x"
      templateColumns="repeat(auto-fill, minmax(40px, 1fr))"
    >
      {Object.entries(colors).map(([backgroundColor, color]) => (
        <Badge key={backgroundColor} color={color} backgroundColor={backgroundColor} badgeContent={5}>
          <Skeleton variant="rectangle" borderRadius="sm" width="8x" height="8x" />
        </Badge>
      ))}
    </Grid>
  );
};

export default App;
