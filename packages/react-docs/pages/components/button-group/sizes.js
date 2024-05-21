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
      <Stack spacing="4x" alignItems="flex-start">
        <ButtonGroup size="sm">
          <Button>Left</Button>
          <Divider orientation="vertical" color={defaultDividerColor} />
          <Button>Middle</Button>
          <Divider orientation="vertical" color={defaultDividerColor} />
          <Button>Right</Button>
        </ButtonGroup>
        <ButtonGroup size="md">
          <Button>Left</Button>
          <Divider orientation="vertical" color={defaultDividerColor} />
          <Button>Middle</Button>
          <Divider orientation="vertical" color={defaultDividerColor} />
          <Button>Right</Button>
        </ButtonGroup>
        <ButtonGroup size="lg">
          <Button>Left</Button>
          <Divider orientation="vertical" color={defaultDividerColor} />
          <Button>Middle</Button>
          <Divider orientation="vertical" color={defaultDividerColor} />
          <Button>Right</Button>
        </ButtonGroup>
      </Stack>
      <Stack spacing="4x" alignItems="flex-start">
        <ButtonGroup
          size="sm"
          variant="secondary"
          sx={{
            '> *:not(:first-of-type)': {
              marginLeft: -1
            }
          }}
        >
          <Button>Left</Button>
          <Button>Middle</Button>
          <Button>Right</Button>
        </ButtonGroup>
        <ButtonGroup
          size="md"
          variant="secondary"
          sx={{
            '> *:not(:first-of-type)': {
              marginLeft: -1
            }
          }}
        >
          <Button>Left</Button>
          <Button>Middle</Button>
          <Button>Right</Button>
        </ButtonGroup>
        <ButtonGroup
          size="lg"
          variant="secondary"
          sx={{
            '> *:not(:first-of-type)': {
              marginLeft: -1
            }
          }}
        >
          <Button>Left</Button>
          <Button>Middle</Button>
          <Button>Right</Button>
        </ButtonGroup>
      </Stack>
      <Stack spacing="4x" alignItems="flex-start">
        <ButtonGroup
          size="sm"
          variant="ghost"
          sx={{
            '> *:not(:first-of-type)': {
              marginLeft: -1
            }
          }}
        >
          <Button>Left</Button>
          <Divider orientation="vertical" color={ghostDividerColor} />
          <Button>Middle</Button>
          <Divider orientation="vertical" color={ghostDividerColor} />
          <Button>Right</Button>
        </ButtonGroup>
        <ButtonGroup
          size="md"
          variant="ghost"
          sx={{
            '> *:not(:first-of-type)': {
              marginLeft: -1
            }
          }}
        >
          <Button>Left</Button>
          <Divider orientation="vertical" color={ghostDividerColor} />
          <Button>Middle</Button>
          <Divider orientation="vertical" color={ghostDividerColor} />
          <Button>Right</Button>
        </ButtonGroup>
        <ButtonGroup
          size="lg"
          variant="ghost"
          sx={{
            '> *:not(:first-of-type)': {
              marginLeft: -1
            }
          }}
        >
          <Button>Left</Button>
          <Divider orientation="vertical" color={ghostDividerColor} />
          <Button>Middle</Button>
          <Divider orientation="vertical" color={ghostDividerColor} />
          <Button>Right</Button>
        </ButtonGroup>
      </Stack>
    </Stack>
  );
};

export default App;
