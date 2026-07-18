import {
  Button,
  ButtonGroup,
  Divider,
  Stack,
  useColorMode,
} from '@tonic-ui/react';

const App = () => {
  const [colorMode] = useColorMode();
  const defaultDividerColor = {
    dark: 'gray:70',
    light: 'gray:30',
  }[colorMode];

  return (
    <Stack direction="column" spacing="3x">
      <ButtonGroup variant="default">
        <Button>One</Button>
        <Divider orientation="vertical" color={defaultDividerColor} />
        <Button>Two</Button>
        <Divider orientation="vertical" color={defaultDividerColor} />
        <Button>Three</Button>
      </ButtonGroup>
      <ButtonGroup
        variant="secondary"
        sx={{
          '> *:not(:first-of-type)': {
            marginLeft: -1
          }
        }}
      >
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
    </Stack>
  );
};

export default App;
