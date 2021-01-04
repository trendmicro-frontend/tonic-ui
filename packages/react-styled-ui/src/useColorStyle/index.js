import { ensurePlainObject } from 'ensure-type';
import _get from 'lodash/get';
import _includes from 'lodash/includes';
import { useContext } from 'react';
import { ColorStyleContext } from '../ColorStyleProvider';

const colorModes = ['dark', 'light'];

const useColorStyle = (options) => {
  const { colorMode } = { ...options };

  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const { colorStyle, setColorStyle } = useContext(ColorStyleContext);
  if (colorStyle === undefined) {
    throw new Error('The `useColorStyle` hook must be called from a descendent of the `ColorStyleProvider`.');
  }

  if (!_includes(colorModes, colorMode)) {
    throw new Error('The `colorMode` must be one of:', colorModes.join(', '));
  }

  const getter = (() => {
    const colorStyleGetter = ensurePlainObject(_get(colorStyle, [colorMode]));
    Object.defineProperty(colorStyleGetter, 'get', {
      value: function get(key, defaultValue) {
        return _get(this, key, defaultValue);
      },
      writable: false,
      enumerable: false,
      configurable: false,
    });

    return colorStyleGetter;
  })();
  const setter = setColorStyle;

  return [getter, setter];
};

export default useColorStyle;
