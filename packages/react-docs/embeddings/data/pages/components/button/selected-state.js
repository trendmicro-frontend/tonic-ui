import {
  Button,
  useColorMode,
  useColorStyle,
} from '@tonic-ui/react';
import React from 'react';

const App = () => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const selectedBackgroundColor = {
    dark: 'gray:70',
    light: 'gray:30',
  }[colorMode];
  const selectedColor = colorStyle.color.emphasis;

  return (
    <Button
      selected
      // Customize the visual appearance of the selected state
      _selected={{
        backgroundColor: selectedBackgroundColor,
        color: selectedColor,
        pointerEvents: 'none',
      }}
    >
      Custom Button
    </Button>
  );
};

export default App;
