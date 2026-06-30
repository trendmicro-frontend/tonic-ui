import { Box } from '@tonic-ui/react';

const App = () => (
  <Box
    sx={[
      {
        color: 'text.normal.primary',
      },
      {
        '&:hover': {
          backgroundColor: 'gray.800',
          color: 'text.normal.primary',
        },
      },
      {
        '&:hover': {
          backgroundColor: 'gray.500',
          color: 'text.normal.primary',
        },
      },
      {
        '&:hover': {
          backgroundColor: 'yellow.500',
          color: 'text.normal.inverse',
        },
      },
    ]}
  >
    Hover Me
  </Box>
);

export default App;
