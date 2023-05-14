import { ensurePlainObject } from 'ensure-type';
import { useContext } from 'react';
import { ColorModeContext } from '../color-mode/context';
import { ColorStyleContext } from './context';

const useColorStyle = (options) => {
  const { colorMode: specifiedColorMode } = ensurePlainObject(options);
  const { colorMode: currentColorMode } = ensurePlainObject(useContext(ColorModeContext));
  const colorMode = specifiedColorMode ?? currentColorMode;

  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(ColorStyleContext);
  if (context === undefined) {
    throw new Error('The `useColorStyle` hook must be called from a descendent of the `ColorStyleProvider`.');
  }

  const { colorStyle, onChange } = ensurePlainObject(context);
  if (!Object.prototype.hasOwnProperty.call(colorStyle, colorMode)) {
    throw new Error('The `colorMode` must be one of:', Object.keys(colorStyle));
  }

  const getter = ensurePlainObject(colorStyle[colorMode]);
  const setter = (value) => {
    if (typeof value === 'function') {
      value = value(colorStyle);
    }

    const nextColorStyle = {
      ...colorStyle,
      [colorMode]: ensurePlainObject(value),
    };
    onChange(nextColorStyle);
  };

  return [getter, setter];
};

export default useColorStyle;
