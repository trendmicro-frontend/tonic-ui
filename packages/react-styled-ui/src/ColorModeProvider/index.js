import memoize from 'micro-memoize';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { ColorModeContext } from '../context';

const initialColorMode = 'light';
const getMemoizedState = memoize(state => ({ ...state }));

const ColorModeProvider = ({
  value = initialColorMode,
  children,
}) => {
  const [colorMode, setColorMode] = useState(value);
  // TODO: toggleColorMode is deprecated and will be removed in the v1 release
  const toggleColorMode = useCallback(() => {
    setColorMode(prevColorMode => {
      const nextColorMode = {
        'light': 'dark', // light -> dark
        'dark': 'light', // dark -> light
      }[prevColorMode] || initialColorMode;
      return nextColorMode;
    });
  }, []);

  useEffect(() => {
    setColorMode(value);
  }, [value]);

  const colorModeState = getMemoizedState({
    colorMode,
    setColorMode,
    toggleColorMode, // TODO: toggleColorMode is deprecated and will be removed in the v1 release
  });

  return (
    <ColorModeContext.Provider value={colorModeState}>
      {children}
    </ColorModeContext.Provider>
  );
};

ColorModeProvider.propTypes = {
  value: PropTypes.oneOf(['light', 'dark']),
};

ColorModeProvider.displayName = 'ColorModeProvider';

export default ColorModeProvider;
