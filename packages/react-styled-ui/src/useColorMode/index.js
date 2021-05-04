import { useContext } from 'react';
import { ColorModeContext } from '../ColorModeProvider';

const useColorMode = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const {
    colorMode,
    setColorMode,
  } = useContext(ColorModeContext);

  if (colorMode === undefined) {
    throw new Error('The `useColorMode` hook must be called from a descendent of the `ColorModeProvider`.');
  }

  const value = [colorMode, setColorMode];

  return value;
};

export default useColorMode;
