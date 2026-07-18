import { Box, Skeleton } from '@tonic-ui/react';

const App = () => (
  <Box display="inline-block" backgroundColor="_overlay.thinest" p="6x">
    <Skeleton
      variant="rectangle"
      width={240}
      height={120}
      backgroundColor="_overlay.thinner"
      animation="pulse"
    />
  </Box>
);

export default App;
