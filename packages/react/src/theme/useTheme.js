import { useTheme as useEmotionTheme } from '@emotion/react';
import { ensurePlainObject } from 'ensure-type';
import { useContext } from 'react';
import { ColorModeContext } from '../color-mode/context';

/**
 * @typedef {Object} useThemeOptions
 * @property {'light' | 'dark'} [colorMode] - The color mode to use for resolving theme tokens.
 *   If not specified, uses the current color mode from ColorModeContext.
 */

/**
 * Returns the theme object with color mode tokens (_dark/_light) resolved based on the
 * current or specified color mode.
 *
 * When the base theme comes from `createTheme()` (which attaches `toColorMode`), the hook
 * resolves the theme for the active color mode so consumers get a pre-resolved, flattened
 * theme with a `get()` helper. If the base theme has no `toColorMode` (e.g. a plain theme
 * not from `createTheme()`), the theme is returned as-is so nothing breaks.
 *
 * @param {useThemeOptions} [options] - Optional configuration for the hook.
 * @returns {object} The resolved theme object.
 */
const useTheme = (options) => {
  const theme = useEmotionTheme();
  const { colorMode: specifiedColorMode } = ensurePlainObject(options);
  const { colorMode: currentColorMode } = ensurePlainObject(useContext(ColorModeContext));
  const colorMode = specifiedColorMode ?? currentColorMode;

  if (typeof theme?.toColorMode === 'function') {
    return theme.toColorMode(colorMode);
  }

  return theme;
};

export default useTheme;
