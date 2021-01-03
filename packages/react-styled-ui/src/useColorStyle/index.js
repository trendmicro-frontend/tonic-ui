import { ensurePlainObject } from 'ensure-type';
import _get from 'lodash/get';
import _includes from 'lodash/includes';
import { useContext } from 'react';
import { ColorStyleContext } from '../ColorStyleProvider';

const useColorStyle = (options) => {
  let {
    colorMode = 'global',
  } = { ...options };

  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const { colorStyle, setColorStyle } = useContext(ColorStyleContext);
  if (colorStyle === undefined) {
    throw new Error('The `useColorStyle` hook must be called from a descendent of the `ColorStyleProvider`.');
  }

  if (!_includes(['dark', 'light', 'global'], colorMode)) {
    throw new Error('The `colorMode` must be one of "dark", "light", or "global"');
  }

  const getter = (() => {
    let colorStyleGetter = { ...colorStyle };
    colorStyleGetter = ensurePlainObject(colorStyleGetter[colorMode] ?? colorStyleGetter.global);
    Object.defineProperty(colorStyleGetter, 'get', {
      value: function get(key, defaultValue) {
        if (colorMode !== 'global') {
          return Array.isArray(key)
            ? _get(this, key, _get(colorStyleGetter, ['global'].concat(key), defaultValue))
            : _get(this, key, _get(colorStyleGetter, `global.${key}`, defaultValue));
        }
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
