import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import React, { useEffect, useState } from 'react';
import { theme } from '../theme';
import colorPalettes from '../theme/colorPalettes';
import createPalette from '../utils/createPalette';

const ThemeContext = React.createContext({});

const ThemeProvider = ({
  theme: customTheme = theme,
  palette = colorPalettes,
  children,
}) => {
  const [colorPalette, setColorPalette] = useState(createPalette(palette, theme));
  useEffect(() => {
    setColorPalette(createPalette(palette, theme));
  }, [palette]);

  return (
    <EmotionThemeProvider theme={customTheme}>
      <ThemeContext.Provider value={colorPalette}>
        {children}
      </ThemeContext.Provider>
    </EmotionThemeProvider>
  );
};

ThemeProvider.displayName = 'ThemeProvider';

export default ThemeProvider;
export { ThemeContext };
