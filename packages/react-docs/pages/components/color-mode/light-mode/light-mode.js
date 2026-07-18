import {
  Box,
  LightMode,
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
        The color mode is set to {colorMode}
      </Text>
    </Box>
  );
};

const App = () => (
  <LightMode>
    <Component />
  </LightMode>
);

export default App;
