import {
  Button,
  ButtonGroup,
  Divider,
  useColorMode,
} from '@tonic-ui/react';
import React from 'react';

const App = () => {
  const [colorMode] = useColorMode();
  const dividerColor ={
    dark: 'gray:70',
    light: 'gray:30',
  }[colorMode];

  return (
    <ButtonGroup>
      <Button>One</Button>
      <Divider orientation="vertical" color={dividerColor} />
      <Button>Two</Button>
      <Divider orientation="vertical" color={dividerColor} />
      <Button>Three</Button>
    </ButtonGroup>
  );
};

export default App;
