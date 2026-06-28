import {
  ThemeProvider as StyledEngineThemeProvider,
} from '@emotion/react';
import React, { useMemo } from 'react';
import { isNullish } from '@tonic-ui/utils';
import { DefaultPropsProvider } from '../default-props';
import { TONIC_THEME } from './constants';
import createTheme from './createTheme';
import defaultTheme from './theme';

const ThemeProvider = ({
  children,
  theme: themeProp,
  useCSSVariables = false,
}) => {
  const theme = useMemo(() => {
    let baseTheme = defaultTheme;
    if (!isNullish(themeProp)) {
      baseTheme = (themeProp[TONIC_THEME] === true) ? themeProp : createTheme(themeProp);
    }
    return { ...baseTheme, useCSSVariables };
  }, [themeProp, useCSSVariables]);

  return (
    <StyledEngineThemeProvider theme={theme}>
      <DefaultPropsProvider value={theme?.components}>
        {children}
      </DefaultPropsProvider>
    </StyledEngineThemeProvider>
  );
};

ThemeProvider.displayName = 'ThemeProvider';

export default ThemeProvider;
