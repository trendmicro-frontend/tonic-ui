import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import React from 'react';
import theme from '../theme';

const ThemeProvider = ({
  theme: customTheme = theme,
  children,
}) => {
  return (
    <EmotionThemeProvider theme={customTheme}>
      {children}
    </EmotionThemeProvider>
  );
};

ThemeProvider.displayName = 'ThemeProvider';

export default ThemeProvider;
