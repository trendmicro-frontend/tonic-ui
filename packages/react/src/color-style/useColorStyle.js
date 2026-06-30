import { ColorModeContext } from '@tonic-ui/react-base/internal';
import { ensurePlainObject } from 'ensure-type';
import { useCallback, useContext } from 'react';
import { ColorStyleContext } from './context';

/**
 * @param {{ colorMode?: string }} [options] - Options for the hook.
 * @returns {[{ [key: string]: string }, (value: { [key: string]: string } | ((prevStyle: { [colorMode: string]: { [key: string]: string } }) => { [key: string]: string })) => void]} A tuple of [colorStyle, setColorStyle].
 */
const useColorStyle = (options) => {
  const { colorMode: specifiedColorMode } = ensurePlainObject(options);
  const { colorMode: currentColorMode } = ensurePlainObject(useContext(ColorModeContext));
  const colorMode = specifiedColorMode ?? currentColorMode;

  const context = useContext(ColorStyleContext);
  if (context === undefined) {
    throw new Error('The `useColorStyle` hook must be called from a descendent of the `ColorStyleProvider`.');
  }

  const { colorStyle, onChange } = ensurePlainObject(context);
  if (!Object.prototype.hasOwnProperty.call(colorStyle, colorMode)) {
    throw new Error('The `colorMode` must be one of:', Object.keys(colorStyle));
  }

  const getter = ensurePlainObject(colorStyle[colorMode]);
  const setter = useCallback((value) => {
    if (typeof value === 'function') {
      value = value(colorStyle);
    }

    const nextColorStyle = {
      ...colorStyle,
      [colorMode]: ensurePlainObject(value),
    };
    onChange(nextColorStyle);
  }, [colorMode, colorStyle, onChange]);

  return [getter, setter];
};

export default useColorStyle;
