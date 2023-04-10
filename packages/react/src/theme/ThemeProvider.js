import {
  ThemeProvider as EmotionThemeProvider,
} from '@emotion/react';
import React, { useMemo } from 'react';
import defaultTheme from '../shared/theme';
import CSSVariables from './CSSVariables';
import createCSSVariables from './utils/createCSSVariables';

const ThemeProvider = ({
  children,
  theme: themeProp,
}) => {
  const theme = themeProp ?? defaultTheme;
  const computedTheme = useMemo(() => {
    const prefix = theme?.config?.prefix ?? 'tonic';
    const cssVariables = createCSSVariables(theme, { prefix });

    return {
      ...theme,
      config: {
        ...theme?.config,
        prefix,
      },
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
