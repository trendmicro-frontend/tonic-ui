import createV3Theme from './v3';

/**
 * Create theme object with unified systems
 *
 * Usage:
 * - createTheme('rem')  -> Returns v3 theme (rem units)
 * - createTheme('px')   -> Returns v3 theme (px units)
 *
 * Strategy:
 * - v3 integrates v2 (deprecated) + primitives + semantic tokens
 */
const createTheme = (unit = 'rem') => createV3Theme(unit);

export default createTheme;
