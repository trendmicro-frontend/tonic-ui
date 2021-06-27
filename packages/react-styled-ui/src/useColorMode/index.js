import { useContext } from 'react';
import { ColorModeContext } from '../context';

const useColorMode = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const {
    colorMode,
    setColorMode,
    toggleColorMode, // TODO: toggleColorMode is deprecated and will be removed in the v1 release
  } = useContext(ColorModeContext);

  if (colorMode === undefined) {
    throw new Error('The `useColorMode` hook must be called from a descendent of the `ColorModeProvider`.');
  }

  const value = [colorMode, setColorMode];

  // TODO: returning object is deprecated and will be removed in the v1 release
  value.colorMode = colorMode;
  value.setColorMode = setColorMode;
  value.toggleColorMode = toggleColorMode;

  return value;
};

export default useColorMode;
