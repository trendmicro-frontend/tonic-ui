import { Box } from '@tonic-ui/react';
const App = () => (
  <Box
    sx={[
      {
        '&:hover': {
          backgroundColor: 'gray:80',
          color: 'white:primary',
        },
      },
      {
        '&:hover': {
          backgroundColor: 'gray:50',
          color: 'white:primary',
        },
      },
      {
        '&:hover': {
          backgroundColor: 'yellow:50',
          color: 'black:primary',
        },
      },
    ]}
  >
    Hover Me
  </Box>
);

export default App;
