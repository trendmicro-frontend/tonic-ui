import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import React from 'react';
import theme from '../theme';

const ThemeProvider = ({
  theme: customTheme = theme,
  children,
}) => (
  <EmotionThemeProvider theme={customTheme}>
    {children}
  </EmotionThemeProvider>
);

export default ThemeProvider;
