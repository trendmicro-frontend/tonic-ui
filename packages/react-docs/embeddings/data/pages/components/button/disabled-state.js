import {
  Button,
  useColorMode,
  useColorStyle,
} from '@tonic-ui/react';
import React from 'react';

const App = () => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const disabledBackgroundColor = {
    dark: 'gray:60',
    light: 'gray:20',
  }[colorMode];
  const disabledColor = colorStyle.color.emphasis;
  const disabledOpacity = {
    dark: '0.28',
    light: '0.3',
  }[colorMode];

  return (
    <Button
      disabled
      // Customize the visual appearance of the selected state
      _disabled={{
        backgroundColor: disabledBackgroundColor,
        color: disabledColor,
        cursor: 'not-allowed',
        opacity: disabledOpacity,
      }}
    >
      Custom Button
    </Button>
  );
};

export default App;
