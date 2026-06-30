import { Box, Text } from '@tonic-ui/react';

const App = () => (
  <Box
    sx={{
      '--my-color-dodger-blue': '#1E90FF'
    }}
  >
    <Text
      backgroundColor="var(--my-color-dodger-blue)"
      color="text.normal.primary"
    >
      This text has a background of Dodger Blue
    </Text>
  </Box>
);

export default App;
