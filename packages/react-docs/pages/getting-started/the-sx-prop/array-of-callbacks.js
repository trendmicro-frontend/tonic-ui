import { Box } from '@tonic-ui/react';

const App = () => (
  <Box
    sx={[
      {
        color: 'text.normal.primary',
      },
      (theme) => ({
        '&:hover': {
          color: 'text.normal.secondary',
        },
      }),
    ]}
  >
    Hover Me
  </Box>
);

export default App;
