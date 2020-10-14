/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */
const isPlainObject = (obj) => {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  let proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
};

const ensureArray = (...args) => {
  if (args.length === 0) { // no args, return []
    return [];
  }
  if (args.length === 1) { // single argument
    if (args[0] === undefined || args[0] === null) { // undefined or null, return []
      return [];
    }
    return [].concat(args[0]);
  }
  // return array with copy of all arguments
  return [].concat(args);
};

const ensureBoolean = (value, defaultValue = false) => {
  if (value === undefined || value === null) {
    return Boolean(defaultValue);
  }

  return (typeof value === 'boolean') ? value : Boolean(value);
};

const ensureNumber = (value, defaultValue = 0) => {
  if (value === undefined || value === null) {
    return Number(defaultValue);
  }

  return (typeof value === 'number') ? value : Number(value);
};

const ensureFiniteNumber = (value, defaultValue = 0) => {
  value = ensureNumber(value);

  return Number.isFinite(value) ? value : defaultValue;
};

const ensurePositiveNumber = (value, minimumValue = 0) => {
  // In comparison to the global isFinite() function, the Number.isFinite() method doesn't forcibly convert the parameter to a number.
  if (!Number.isFinite(minimumValue) || (minimumValue < 0)) {
    minimumValue = 0;
  }
  return Math.max(Number(value) || 0, minimumValue);
};

const ensurePlainObject = (value, defaultValue = {}) => {
  if (value === undefined || value === null) {
    return ensurePlainObject(defaultValue);
  }

  return isPlainObject(value) ? value : ensurePlainObject(defaultValue);
};

const ensureString = (value, defaultValue = '') => {
  if (value === undefined || value === null) {
    return String(defaultValue);
  }

  return (typeof value === 'string') ? value : String(value);
};

export {
  ensureArray,
  ensureBoolean,
  ensureNumber,
  ensureFiniteNumber,
  ensurePositiveNumber,
  ensurePlainObject,
  ensureString,
};
