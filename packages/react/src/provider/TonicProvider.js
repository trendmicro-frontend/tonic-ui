import React from 'react';
import { useOnceWhen } from '@tonic-ui/react-hooks';
import { isNullish, isPlainObject } from '@tonic-ui/utils';
import { ColorModeProvider } from '../color-mode';
import { ColorStyleProvider } from '../color-style';
import { CSSBaseline } from '../css-baseline';
import { CSSVariables } from '../theme';
import { EnvironmentProvider } from '../environment';
import { ThemeProvider } from '../theme';
import { TONIC_THEME } from '../theme/constants';

const TonicProvider = ({
  children,
  colorMode: colorModeProps = {},
  colorStyle: colorStyleProps = {},
  environment: environmentProps = {},
  theme,
  useCSSBaseline = false,
  useCSSVariables = false,
  ...rest
}) => {
  useOnceWhen(() => {
    console.error(
      'TonicProvider: "useCssBaseline" is not a valid prop. Did you mean "useCSSBaseline"?'
    );
  }, process.env.NODE_ENV !== 'production' && ('useCssBaseline' in rest));

  useOnceWhen(() => {
    console.error(
      'TonicProvider: "useCssVariables" is not a valid prop. Did you mean "useCSSVariables"?'
    );
  }, process.env.NODE_ENV !== 'production' && ('useCssVariables' in rest));

  useOnceWhen(() => {
    console.error(
      'TonicProvider: "colorMode" prop must be an object if provided.'
    );
  }, !isPlainObject(colorModeProps));

  useOnceWhen(() => {
    console.error(
      'TonicProvider: "colorStyle" prop must be an object if provided.'
    );
  }, !isPlainObject(colorStyleProps));

  useOnceWhen(() => {
    console.error(
      'TonicProvider: "environment" prop must be an object if provided.'
    );
  }, !isPlainObject(environmentProps));

  useOnceWhen(() => {
    console.error(
      'TonicProvider: "theme" prop should be created using createTheme() for optimal performance. Pass a stable reference to avoid re-running createTheme() on every render.'
    );
  }, process.env.NODE_ENV !== 'production' && !isNullish(theme) && theme[TONIC_THEME] !== true);

  return (
    // useCSSVariables serves two purposes:
    // 1. Pass to ThemeProvider to inject into the theme — styled-system reads theme.useCSSVariables
    //    to decide whether to output var(--tonic-...) references instead of raw token values.
    // 2. Render <CSSVariables />, which injects the CSS variable definitions into the DOM.
    <EnvironmentProvider {...environmentProps}>
      <ThemeProvider theme={theme} useCSSVariables={useCSSVariables}>
        {!!useCSSBaseline && <CSSBaseline />}
        {!!useCSSVariables && <CSSVariables />}
        <ColorModeProvider {...colorModeProps}>
          <ColorStyleProvider {...colorStyleProps}>
            {children}
          </ColorStyleProvider>
        </ColorModeProvider>
      </ThemeProvider>
    </EnvironmentProvider>
  );
};

export default TonicProvider;
