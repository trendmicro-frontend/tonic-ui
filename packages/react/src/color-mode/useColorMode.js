import { ColorModeContext } from '@tonic-ui/react-base/internal';
import { ensurePlainObject } from 'ensure-type';
import { useCallback, useContext } from 'react';

/**
 * @returns {['dark' | 'light', (value: 'dark' | 'light' | ((prevMode: 'dark' | 'light') => 'dark' | 'light')) => void]} A tuple of [colorMode, setColorMode].
 */
const useColorMode = () => {
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
