import { useColorMode } from '@tonic-ui/react';

function UseColorModeExample() {
  const [colorMode, setColorMode] = useColorMode();

  // colorMode is 'dark' | 'light', can be used as index key
  const focusColor = {
    dark: 'blue:60',
    light: 'blue:60',
  }[colorMode];

  // setColorMode with value
  setColorMode('dark');
  setColorMode('light');

  // setColorMode with function - NO manual type annotations
  setColorMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));

  return null;
}
