import {
  ThemeProvider as EmotionThemeProvider,
} from '@emotion/react';
import React, { useMemo } from 'react';
import defaultTheme from '../shared/theme';
import CSSVariables from './CSSVariables';
import createCSSVariables from './utils/createCSSVariables';

const ThemeProvider = ({
  children,
  theme = defaultTheme,
}) => {
  const computedTheme = useMemo(() => {
    const cssVariables = createCSSVariables(theme, { prefix: 'tonic' });
    return {
      ...theme,
      __cssVariables: cssVariables,
    };
  }, [theme]);

  return (
    <EmotionThemeProvider theme={computedTheme}>
      <CSSVariables />
      {children}
    </EmotionThemeProvider>
  );
};

ThemeProvider.displayName = 'ThemeProvider';

export default ThemeProvider;
