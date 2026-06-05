import { Mark, Stack, Text } from '@tonic-ui/react';

const App = () => (
  <Stack direction="column" spacing="4x">
    <Text>
      This is the <Mark variant="highlight">highlight</Mark> variant.
    </Text>
    <Text>
      This is the <Mark variant="emphasis">emphasis</Mark> variant.
    </Text>
    <Text>
      This is the <Mark variant="none">none</Mark> variant.
    </Text>
  </Stack>
);

export default App;
