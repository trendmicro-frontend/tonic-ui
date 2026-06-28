import { useTheme as useEmotionTheme } from '@emotion/react';
import { ColorModeContext } from '@tonic-ui/react-base/internal';
import { ensurePlainObject } from 'ensure-type';
import { useContext } from 'react';

/**
 * @typedef {Object} useThemeOptions
 * @property {'light' | 'dark'} [colorMode] - The color mode to use for resolving theme tokens. If not specified, uses the current color mode from ColorModeContext.
 */

/**
 * Returns the theme object with color mode tokens (_dark/_light) resolved based on the current or specified color mode.
 *
 * This hook wraps Emotion's useTheme and automatically resolves color mode-specific tokens.
 * Components using this hook will receive a theme where all _dark and _light properties are
 * resolved to their appropriate values based on the active color mode.
 *
 * @param {useThemeOptions} [options] - Optional configuration for the hook.
 * @returns {ThemeScales & { get: (path: string, defaultValue?: string) => string }} The resolved theme object with color mode tokens resolved.
 *
 * @example
 * // Using current color mode from context
 * const theme = useTheme();
 * console.log(theme.get('colors.text.primary')); // Resolved color token for current mode
 *
 * @example
 * // Specifying a color mode
 * const theme = useTheme({ colorMode: 'dark' });
 * console.log(theme.get('colors.text.primary')); // Always uses _dark value
 */
const useTheme = (options) => {
  const theme = useEmotionTheme();
  const { colorMode: specifiedColorMode } = ensurePlainObject(options);
  const { colorMode: currentColorMode } = ensurePlainObject(useContext(ColorModeContext));
  const colorMode = specifiedColorMode ?? currentColorMode;

  return theme.toColorMode(colorMode);
};

export default useTheme;
