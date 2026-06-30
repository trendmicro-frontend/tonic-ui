/**
 * Returns a CSS variable name formatted from the given name and options.
 *
 * Semantic separator strategy:
 * - Hyphens (-): Object hierarchy (colors.white → colors-white)
 * - Underscores (_): Within-token separators (colons, spaces, special chars)
 *
 * Examples:
 *   colors: { white: { primary: '#fff' } }           → colors-white-primary
 *   colors: { 'white:primary': '#fff' }              → colors-white_primary
 *   colors: { 'light gray': '#eee' }                 → colors-light_gray
 *   colors: { 'blue-50': '#abc' }                    → colors-blue-50 (preserved)
 *
 * @param {string} name - The name of the variable.
 * @param {object} [options] - The options object.
 * @param {string} [options.prefix=''] - The prefix to use for the variable name.
 * @param {string} [options.delimiter='-'] - The delimiter to use between the prefix and name.
 * @return {string} The CSS variable name.
 */
export const toCSSVariable = (name, options) => {
  const {
    prefix = '',
    delimiter = '-',
  } = { ...options };

  const variableName = ([prefix, name].filter(Boolean).join(delimiter))
    .replace(/\./g, delimiter) // dots → hyphen (hierarchy)
    .replace(/:/g, '_') // colons → underscore (variants)
    .replace(/\s+/g, '_') // spaces → underscore
    .replace(/[^a-zA-Z0-9-_]/g, '_'); // replace non-alphanumeric, non-hyphen, non-underscore characters

  return `--${variableName}`;
};
