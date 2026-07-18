import {
  Flex,
  Spinner,
  useColorMode,
} from '@tonic-ui/react';

const App = () => {
  const [colorMode] = useColorMode();
  const customTrackColor = {
    dark: 'teal.800',
    light: 'teal.200',
  }[colorMode];

  return (
    <Flex alignItems="center" columnGap="6x">
      <Spinner color="teal.400" />
      <Spinner
        color="teal.400"
        sx={{
          'svg circle:first-of-type': {
            color: customTrackColor,
          },
        }}
      />
      <Spinner
        color="teal.400"
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
