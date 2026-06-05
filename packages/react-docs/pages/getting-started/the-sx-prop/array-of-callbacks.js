import { Box } from '@tonic-ui/react';

const App = () => (
  <Box
    sx={[
      {
        color: 'white:primary',
      },
      (theme) => ({
        '&:hover': {
          color: theme.colors['white:secondary'],
        },
      }),
    ]}
  >
    Hover Me
  </Box>
);

export default App;
