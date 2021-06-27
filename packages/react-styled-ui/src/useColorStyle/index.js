import { ensurePlainObject } from 'ensure-type';
import { useContext } from 'react';
import { ColorStyleContext } from '../context';

const useColorStyle = (options) => {
  const { colorMode } = { ...options };

  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  let { colorStyle, setColorStyle } = useContext(ColorStyleContext);
  if (colorStyle === undefined) {
    throw new Error('The `useColorStyle` hook must be called from a descendent of the `ColorStyleProvider`.');
  }

  colorStyle = ensurePlainObject(colorStyle);
  if (!Object.prototype.hasOwnProperty.call(colorStyle, colorMode)) {
    throw new Error('The `colorMode` must be one of:', Object.keys(colorStyle));
  }

  const getter = ensurePlainObject(colorStyle[colorMode]);
  const setter = (value) => {
    setColorStyle(prevState => {
      prevState = ensurePlainObject(prevState);

      if (typeof value === 'function') {
        value = value(ensurePlainObject(prevState[colorMode]));
      }

      return {
        ...prevState,
        [colorMode]: ensurePlainObject(value),
      };
    });
  };

  return [getter, setter];
};

export default useColorStyle;
