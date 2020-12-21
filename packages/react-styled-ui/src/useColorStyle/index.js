import { useContext } from 'react';
import { ColorModeContext } from '../ColorModeProvider';

const useColorStyle = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const { colorStyle } = useContext(ColorModeContext);

  if (colorStyle === undefined) {
    throw new Error('The `useColorStyle` hook must be called from a descendent of the `ColorModeProvider`.');
  }

  return [colorStyle];
};

export default useColorStyle;
