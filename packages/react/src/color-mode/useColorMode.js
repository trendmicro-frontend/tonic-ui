import { ensurePlainObject } from 'ensure-type';
import { useCallback, useContext } from 'react';
import { ColorModeContext } from './context';

const useColorMode = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(ColorModeContext);
  if (context === undefined) {
    throw new Error('The `useColorMode` hook must be called from a descendent of the `ColorModeProvider`.');
  }

  const { colorMode, onChange } = ensurePlainObject(context);

  const getter = colorMode;
  const setter = useCallback((value) => {
    if (typeof value === 'function') {
      value = value(colorMode);
    }

    const nextColorMode = value;
    onChange(nextColorMode);
  }, [colorMode, onChange]);

  return [getter, setter];
};

export default useColorMode;
