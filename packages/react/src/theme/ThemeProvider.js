import {
  ThemeProvider as StyledEngineThemeProvider,
} from '@emotion/react';
import React from 'react';
import { DefaultPropsProvider } from '../default-props';
import CSSVariables from './CSSVariables';
import defaultTheme from './theme';

const ThemeProvider = ({
  children,
  theme: themeProp,
}) => {
  const theme = themeProp ?? defaultTheme;

  return (
    <StyledEngineThemeProvider theme={theme}>
      <DefaultPropsProvider value={theme?.components}>
        <CSSVariables />
        {children}
      </DefaultPropsProvider>
    </StyledEngineThemeProvider>
  );
};

ThemeProvider.displayName = 'ThemeProvider';

export default ThemeProvider;
