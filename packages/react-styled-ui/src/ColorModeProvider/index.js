import memoize from 'micro-memoize';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState, useContext } from 'react';
import { ThemeContext } from '../ThemeProvider';

const initialColorMode = 'light';
const getMemoizedState = memoize(state => ({ ...state }));
const ColorModeContext = React.createContext();

const ColorModeProvider = ({
  value = initialColorMode,
  children,
}) => {
  const themes = useContext(ThemeContext);
  const [colorMode, setColorMode] = useState(value);
  const [colorStyle, setColorStyle] = useState(themes[value]);
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

  useEffect(() => {
    setColorStyle(themes[colorMode]);
  }, [colorMode, themes]);

  const colorModeState = getMemoizedState({
    colorMode,
    colorStyle,
    setColorMode,
    toggleColorMode,
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
export { ColorModeContext };
