import {
  Button,
  ButtonGroup,
  Divider,
  Stack,
  useColorMode,
} from '@tonic-ui/react';
import React from 'react';

const App = () => {
  const [colorMode] = useColorMode();
  const defaultDividerColor ={
    dark: 'gray:70',
    light: 'gray:30',
  }[colorMode];
  const ghostDividerColor ={
    dark: 'gray:60',
    light: 'gray:20',
  }[colorMode];
  return (
    <Stack direction="row" spacing="4x">
      <Stack spacing="4x" alignItems="center">
        <ButtonGroup>
          <Button>One</Button>
          <Divider orientation="vertical" color={defaultDividerColor} />
          <Button>Two</Button>
          <Divider orientation="vertical" color={defaultDividerColor} />
          <Button>Three</Button>
        </ButtonGroup>
        <ButtonGroup orientation="vertical">
          <Button>One</Button>
          <Divider color={defaultDividerColor} />
          <Button>Two</Button>
          <Divider color={defaultDividerColor} />
          <Button>Three</Button>
        </ButtonGroup>
      </Stack>
      <Stack spacing="4x" alignItems="center">
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
        <ButtonGroup
          orientation="vertical"
          variant="secondary"
          sx={{
            '> *:not(:first-of-type)': {
              marginTop: -1
            }
          }}
        >
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
      </Stack>
      <Stack spacing="4x" alignItems="center">
        <ButtonGroup
          variant="ghost"
          sx={{
            '> *:not(:first-of-type)': {
              marginLeft: -1
            }
          }}
        >
          <Button>One</Button>
          <Divider orientation="vertical" color={ghostDividerColor} />
          <Button>Two</Button>
          <Divider orientation="vertical" color={ghostDividerColor} />
          <Button>Three</Button>
        </ButtonGroup>
        <ButtonGroup
          orientation="vertical"
          variant="ghost"
          sx={{
            '> *:not(:first-of-type)': {
              marginTop: -1
            }
          }}
        >
          <Button>One</Button>
          <Divider color={ghostDividerColor} />
          <Button>Two</Button>
          <Divider color={ghostDividerColor} />
          <Button>Three</Button>
        </ButtonGroup>
      </Stack>
    </Stack>
  );
};

export default App;
