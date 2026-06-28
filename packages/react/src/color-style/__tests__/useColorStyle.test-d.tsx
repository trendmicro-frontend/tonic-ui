import { useColorStyle } from '@tonic-ui/react';

function UseColorStyleExample() {
  // With options (required)
  const [currentStyle, setCurrentStyle] = useColorStyle({ colorMode: 'light' });

  // With dark mode
  const [darkStyle, setDarkStyle] = useColorStyle({ colorMode: 'dark' });

  // currentStyle should be an object
  const style: object = currentStyle;

  // setCurrentStyle with value
  setCurrentStyle({ background: 'white' });

  // setCurrentStyle with function - NO manual type annotations
  setCurrentStyle((prevStyle) => ({ ...prevStyle, background: 'black' }));

  return null;
}
