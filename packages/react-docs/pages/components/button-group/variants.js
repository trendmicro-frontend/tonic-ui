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
  const emphasisDividerColor ={
    dark: 'red:80',
    light: 'red:80',
  }[colorMode];
  const primaryDividerColor ={
    dark: 'blue:80',
    light: 'blue:80',
  }[colorMode];
  const defaultDividerColor ={
    dark: 'gray:70',
    light: 'gray:30',
  }[colorMode];
  const ghostDividerColor ={
    dark: 'gray:60',
    light: 'gray:20',
  }[colorMode];

  return (
    <Stack direction="column" spacing="3x">
      <ButtonGroup variant="emphasis">
        <Button>One</Button>
        <Divider orientation="vertical" color={emphasisDividerColor} />
        <Button>Two</Button>
        <Divider orientation="vertical" color={emphasisDividerColor} />
        <Button>Three</Button>
      </ButtonGroup>
      <ButtonGroup variant="primary">
        <Button>One</Button>
        <Divider orientation="vertical" color={primaryDividerColor} />
        <Button>Two</Button>
        <Divider orientation="vertical" color={primaryDividerColor} />
        <Button>Three</Button>
      </ButtonGroup>
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
    </Stack>
  );
};

export default App;
