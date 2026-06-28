import React from 'react';
import { useOnceWhen } from '@tonic-ui/react-hooks';
import { isNullish, isPlainObject } from '@tonic-ui/utils';
import { ColorModeProvider } from '../color-mode';
import { ColorStyleProvider } from '../color-style';
import { CSSBaseline } from '../css-baseline';
import { CSSVariables } from '../css-variables';
import { EnvironmentProvider } from '../environment';
import { ThemeProvider } from '../theme';
import { TONIC_THEME } from '../theme/constants';

/**
 * @typedef {Object} ColorModeConfig
 * @property {'light' | 'dark'} [value] - Controlled color mode value.
 * @property {'light' | 'dark'} [defaultValue='light'] - Default color mode value for uncontrolled usage.
 */

/**
 * @typedef {Object} ColorStyleConfig
 * @property {ThemeScales} [value] - Controlled color style value.
 * @property {ThemeScales} [defaultValue] - Default color style value for uncontrolled usage.
 */

/**
 * @typedef {Object} EnvironmentConfig
 * @property {Node | (() => Node)} [value] - The root node (or a function returning one) used to resolve the environment's document and window.
 */

/**
 * @typedef {Object} TonicProviderProps
 * @property {React.ReactNode} [children] - The content to render within the provider.
 * @property {ColorModeConfig} [colorMode] - Color mode configuration object.
 * @property {ColorStyleConfig} [colorStyle] - Color style configuration object.
 * @property {EnvironmentConfig} [environment] - Environment configuration object.
 * @property {ThemeScales} [theme] - Custom theme object created with `createTheme()`.
 * @property {boolean} [useCSSBaseline=false] - If `true`, applies CSS reset and base styles globally.
 * @property {boolean} [useCSSVariables=false] - If `true`, enables CSS variable replacement for theme tokens.
 */

/**
 * @type {React.FC<TonicProviderProps>}
 */
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
