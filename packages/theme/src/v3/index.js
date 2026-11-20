import { createBreakpoints, createContainerQueries } from '@tonic-ui/utils/internal';
import createV2Theme from '../v2';
import { createPrimitiveTokens } from './primitive';
import { createSemanticTokens } from './semantic';

/**
 * Create v3 theme combining v2, primitives and semantic tokens
 *
 * @param {'px'|'rem'} [unit='rem'] - Unit type for dimension tokens.
 */
const createTheme = (unit = 'rem') => {
  const deprecatedTheme = createV2Theme(unit);
  const primitiveTokens = createPrimitiveTokens(unit);
  const semanticTokens = createSemanticTokens(unit);
  const breakpoints = createBreakpoints({ values: primitiveTokens.breakpoints, unit: 'rem' });

  // Merge strategy: deprecated provides base, primitive overrides conflicts
  // This way primitive tokens naturally override deprecated tokens with same names
  const theme = {
    colors: {
      ...deprecatedTheme.colors,
      ...primitiveTokens.colors,
      ...semanticTokens.colors,
    },
    borders: {
      ...deprecatedTheme.borders,
      ...primitiveTokens.borders,
    },
    fonts: {
      ...deprecatedTheme.fonts,
      ...primitiveTokens.fonts,
    },
    fontSizes: {
      ...deprecatedTheme.fontSizes,
      ...primitiveTokens.fontSizes,
    },
    fontWeights: {
      ...deprecatedTheme.fontWeights,
      ...primitiveTokens.fontWeights,
    },
    radii: {
      ...deprecatedTheme.radii,
      ...primitiveTokens.radii,
    },
    breakpoints,
    containerQueries: createContainerQueries(breakpoints),
    lineHeights: {
      ...deprecatedTheme.lineHeights,
      ...primitiveTokens.lineHeights,
    },
    outlines: {
      ...deprecatedTheme.outlines,
      ...primitiveTokens.outlines,
    },
    space: {
      ...deprecatedTheme.space,
      ...primitiveTokens.space,
    },
    sizes: {
      ...deprecatedTheme.sizes,
      ...primitiveTokens.sizes,
    },
    zIndices: {
      ...deprecatedTheme.zIndices,
      ...primitiveTokens.zIndices,
    },
    shadows: {
      ...deprecatedTheme.shadows,
      ...semanticTokens.shadows,
    },
  };
  Object.defineProperty(theme, 'breakpoints', { writable: false, configurable: false });
  return /** @type {Omit<typeof theme, 'breakpoints'> & Readonly<Pick<typeof theme, 'breakpoints'>>} */ (theme);
};

export default createTheme;

// Re-export primitive and semantic for direct access
export { createPrimitiveTokens } from './primitive';
export { createSemanticTokens } from './semantic';
