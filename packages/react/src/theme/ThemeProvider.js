import {
  ThemeProvider as StyledEngineThemeProvider,
} from '@emotion/react';
import originalTheme from '@tonic-ui/theme';
import { ensurePlainObject, ensureString } from 'ensure-type';
import React, { useMemo } from 'react';
import { DefaultPropsProvider } from '../default-props';
import CSSVariables from './CSSVariables';
import defaultTheme from './theme';
import flatten from './utils/flatten';
import toCSSVariable from './utils/toCSSVariable';

const originalThemeScales = Object.keys(originalTheme);

/**
 * Generate CSS variable map for a given theme object.
 *
 * @param {object} theme - The object containing the theme values.
 * @param {object} [options] - The options object.
 * @param {string} [options.prefix] - A prefix to prepend to each generated CSS variable.
 *
 * @example
 * ```js
 * const theme = {
 *   colors: {
 *     'blue:50': '#578aef',
 *   },
 * };
 * createCSSVariableMap(theme, { prefix: 'tonic' });
 * // => {
 * //   '--tonic-colors-blue-50': '#578aef'
 * // }
 * ```
 */
const createCSSVariableMap = (theme, options) => {
  const prefix = ensureString(options?.prefix);
  const tokens = flatten(theme);
  const cssVariableMap = {};

  for (const [name, value] of Object.entries(tokens)) {
    // name='colors.blue:50', prefix='tonic'
    // => '--tonic-colors-blue-50'
    const variable = toCSSVariable(name, { prefix });
    cssVariableMap[variable] = value;
  }

  return cssVariableMap;
};

const ThemeProvider = ({
  children,
  theme: themeProp,
}) => {
  const theme = themeProp ?? defaultTheme;
  const computedTheme = useMemo(() => {
    const themeConfig = {
      ...defaultTheme.config,
      ...theme?.config,
    };

    // Filter only the theme scales that are supported by the original theme
    const normalizedTheme = Object.fromEntries(
      Object.entries(ensurePlainObject(theme)).filter(
        ([key]) => originalThemeScales.includes(key)
      )
    );

    // Create CSS variable map for the theme
    const cssVariableMap = createCSSVariableMap(normalizedTheme, { prefix: themeConfig.prefix });

    return {
      ...theme,
      config: themeConfig,
      __cssVariableMap: cssVariableMap,
    };
  }, [theme]);

  return (
    <StyledEngineThemeProvider theme={computedTheme}>
      <DefaultPropsProvider value={computedTheme.components}>
        <CSSVariables />
        {children}
      </DefaultPropsProvider>
    </StyledEngineThemeProvider>
  );
};

ThemeProvider.displayName = 'ThemeProvider';

export default ThemeProvider;
