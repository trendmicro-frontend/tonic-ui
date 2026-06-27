import {
  ThemeProvider as StyledEngineThemeProvider,
} from '@emotion/react';
import { useMemo } from 'react';
import { isNullish } from '@tonic-ui/utils';
import { DefaultPropsProvider } from '../default-props';
import { TONIC_THEME } from './constants';
import CSSVariables from './CSSVariables';
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
        {/*
          * Backward-compat: render CSSVariables unconditionally when the theme has
          * cssVariables (the old tonic-ui ThemeProvider always did this). When
          * useCSSVariables is true, TonicProvider renders CSSVariables instead so
          * we skip it here to avoid a double-render.
          */}
        {!useCSSVariables && <CSSVariables />}
        {children}
      </DefaultPropsProvider>
    </StyledEngineThemeProvider>
  );
};

ThemeProvider.displayName = 'ThemeProvider';

export default ThemeProvider;
