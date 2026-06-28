// semantic/index.js
import { colors } from './colors';
import { shadows } from './shadows';

// Export aggregated tokens
export { colors, shadows };

// Semantic tokens provide contextual meaning to primitive tokens
// They support light/dark mode switching and are organized by usage context

/**
 * Create semantic theme object
 * Organize all semantic tokens by styled-system property categories
 *
 * @param {string} unit - Unit type (px, rem, em, etc.)
 * @returns {Object} Semantic theme object organized by styled-system properties
 */
const createSemantic = (unit) => {
  // Organize into styled-system property structure
  return {
    colors,
    shadows,
  };
};

export default createSemantic;
