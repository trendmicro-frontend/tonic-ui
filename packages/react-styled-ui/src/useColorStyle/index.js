import { useContext } from 'react';
import { ColorStyleContext } from '../ColorStyleProvider';

const useColorStyle = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const { colorStyle, setColorStyle } = useContext(ColorStyleContext);
  if (colorStyle === undefined) {
    throw new Error('The `useColorStyle` hook must be called from a descendent of the `ColorStyleProvider`.');
  }

  return [colorStyle, setColorStyle];
};

export default useColorStyle;
