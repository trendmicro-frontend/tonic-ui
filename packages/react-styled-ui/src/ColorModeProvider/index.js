import memoize from 'micro-memoize';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

const initialColorMode = 'light';
const getMemoizedState = memoize(state => ({ ...state }));
const ColorModeContext = React.createContext();

const ColorModeProvider = ({
  value = initialColorMode,
  children,
}) => {
  const [colorMode, setColorMode] = useState(value);

  useEffect(() => {
    setColorMode(value);
  }, [value]);

  const colorModeState = getMemoizedState({
    colorMode,
    setColorMode,
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
