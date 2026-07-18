import createV2Theme from '../v2';
import { createPrimitiveTokens } from './primitive';
import { createSemanticTokens } from './semantic';

/**
 * Create v3 theme combining v2, primitives and semantic tokens
 *
 * @param {string} unit - Unit type ('px' or 'rem')
 * @returns {Object} Combined v3 theme object
 */
const createTheme = (unit = 'rem') => {
  const deprecatedTheme = createV2Theme(unit);
  const primitiveTokens = createPrimitiveTokens(unit);
  const semanticTokens = createSemanticTokens(unit);

  // Merge strategy: deprecated provides base, primitive overrides conflicts
  // This way primitive tokens naturally override deprecated tokens with same names
  return {
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
    // breakpoints must be an array, cannot use object spread
    // Start with deprecated array, then override with primitive values
    breakpoints: (() => {
      const merged = [];
      // Copy all properties from deprecated (numeric indices and named properties)
      Object.keys(deprecatedTheme.breakpoints).forEach(key => {
        merged[key] = deprecatedTheme.breakpoints[key];
      });
      // Override with primitive values (both array indices and named properties)
      if (primitiveTokens.breakpoints) {
        Object.keys(primitiveTokens.breakpoints).forEach(key => {
          merged[key] = primitiveTokens.breakpoints[key];
        });
      }
      return merged;
    })(),
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
};

export default createTheme;

// Re-export primitive and semantic for direct access
export { createPrimitiveTokens } from './primitive';
export { createSemanticTokens } from './semantic';
