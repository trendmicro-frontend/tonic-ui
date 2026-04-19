import {
  Flex,
  Spinner,
  useColorMode,
} from '@tonic-ui/react';
const App = () => {
  const [colorMode] = useColorMode();
  const customTrackColor = {
    dark: 'teal:60',
    light: 'teal:20',
  }[colorMode];

  return (
    <Flex alignItems="center" columnGap="6x">
      <Spinner color="teal:40" />
      <Spinner
        color="teal:40"
        sx={{
          'svg circle:first-of-type': {
            color: customTrackColor,
          },
        }}
      />
      <Spinner
        color="teal:40"
        sx={{
          'svg circle:first-of-type': {
            color: 'transparent',
          },
        }}
      />
    </Flex>
  );
};

export default App;
