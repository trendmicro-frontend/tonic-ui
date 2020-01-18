import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import React from 'react';
import theme from '../theme';

const ThemeProvider = ({
  theme,
  children,
}) => (
  <EmotionThemeProvider theme={theme}>
    {children}
  </EmotionThemeProvider>
);

ThemeProvider.defaultProps = {
  theme,
};

export default ThemeProvider;
