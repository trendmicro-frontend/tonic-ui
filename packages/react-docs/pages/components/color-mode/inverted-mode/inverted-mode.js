import {
  Box,
  InvertedMode,
  Text,
  useColorMode,
} from '@tonic-ui/react';

const Component = () => {
  const [colorMode] = useColorMode();
  return (
    <Box
      backgroundColor="background.low"
      color="text.primary"
    >
      <Text px="4x" py="3x">
        The current color mode is inverted to {colorMode} mode
      </Text>
    </Box>
  );
};

const App = () => (
  <InvertedMode>
    <Component />
  </InvertedMode>
);

export default App;
