/**
 * Returns a CSS variable name formatted from the given name and options.
 *
 * @param {string} name - The name of the variable.
 * @param {object} [options] - The options object.
 * @param {string} [options.prefix=''] - The prefix to use for the variable name.
 * @param {string} [options.delimiter='-'] - The delimiter to use between the prefix and name.
 *
 * @return {string} The CSS variable name.
*/
const toCSSVariable = (name, options) => {
  const {
    prefix = '',
    delimiter = '-',
  } = { ...options };
  const variableName = ([prefix, name].filter(Boolean).join(delimiter))
    .replace(/\s+/g, delimiter) // replace whitespace characters
    .replace(/[^a-zA-Z0-9-_]/g, delimiter) // replace non-alphanumeric, non-hyphen, non-underscore characters
    .replace(/^-+|-+$/g, ''); // trim hyphens from beginning and end of string
  return `--${variableName}`;
};

export default toCSSVariable;
