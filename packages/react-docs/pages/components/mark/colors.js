import { Mark, Stack, Text } from '@tonic-ui/react';

const App = () => (
  <Stack direction="column" spacing="4x">
    <Text>
      Text selection: <Mark backgroundColor="Highlight" color="HighlightText">mark text</Mark>
    </Text>
    <Text>
      Gradient background: <Mark backgroundImage="linear-gradient(to right, #ff6b6b, #4ecdc4)" color="white">mark text</Mark>
    </Text>
    <Text>
      Default mark text color: <Mark backgroundColor="mark" color="marktext">mark text</Mark>
    </Text>
  </Stack>
);

export default App;
