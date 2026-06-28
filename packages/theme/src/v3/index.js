import createV2Theme from '../v2';
import createPrimitive from './primitive';
import createSemantic from './semantic';

/**
 * Create v3 theme combining v2, primitives and semantic tokens
 *
 * @param {string} unit - Unit type ('px' or 'rem')
 * @returns {Object} Combined v3 theme object
 */
const createTheme = (unit = 'rem') => {
  const deprecatedTheme = createV2Theme(unit);
  const primitiveTheme = createPrimitive(unit);
  const semanticTheme = createSemantic(unit);

  // Merge strategy: deprecated provides base, primitive overrides conflicts
  // This way primitive tokens naturally override deprecated tokens with same names
  return {
    colors: {
      ...deprecatedTheme.colors,
      ...primitiveTheme.colors,
      ...semanticTheme.colors,
    },
    borders: {
      ...deprecatedTheme.borders,
      ...primitiveTheme.borders,
    },
    fonts: {
      ...deprecatedTheme.fonts,
      ...primitiveTheme.fonts,
    },
    fontSizes: {
      ...deprecatedTheme.fontSizes,
      ...primitiveTheme.fontSizes,
    },
    fontWeights: {
      ...deprecatedTheme.fontWeights,
      ...primitiveTheme.fontWeights,
    },
    radii: {
      ...deprecatedTheme.radii,
      ...primitiveTheme.radii,
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
      if (primitiveTheme.breakpoints) {
        Object.keys(primitiveTheme.breakpoints).forEach(key => {
          merged[key] = primitiveTheme.breakpoints[key];
        });
      }
      return merged;
    })(),
    lineHeights: {
      ...deprecatedTheme.lineHeights,
      ...primitiveTheme.lineHeights,
    },
    outlines: {
      ...deprecatedTheme.outlines,
      ...primitiveTheme.outlines,
    },
    space: {
      ...deprecatedTheme.space,
      ...primitiveTheme.space,
    },
    sizes: {
      ...deprecatedTheme.sizes,
      ...primitiveTheme.sizes,
    },
    zIndices: {
      ...deprecatedTheme.zIndices,
      ...primitiveTheme.zIndices,
    },
    shadows: {
      ...deprecatedTheme.shadows,
      ...semanticTheme.shadows,
    },
  };
};

export default createTheme;

// Re-export primitive and semantic for direct access
export { default as createPrimitive } from './primitive';
export { default as createSemantic } from './semantic';
