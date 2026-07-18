import { Box } from '@tonic-ui/react';

const ListItem = ({ sx, ...rest }) => (
  <Box
    sx={[
      {
        color: 'text.normal.primary',
      },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
    {...rest}
  />
);

const App = () => (
  <ListItem
    sx={{
      color: 'text.normal.secondary',
      fontWeight: 'semibold',
    }}
  >
    Header
  </ListItem>
);

export default App;
