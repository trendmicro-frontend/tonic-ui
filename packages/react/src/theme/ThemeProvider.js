import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import React from 'react';
import defaultTheme from '../shared/theme';

const ThemeProvider = ({
  theme = defaultTheme,
  children,
}) => {
  return (
    <EmotionThemeProvider theme={theme}>
      {children}
    </EmotionThemeProvider>
  );
};

ThemeProvider.displayName = 'ThemeProvider';

export default ThemeProvider;
