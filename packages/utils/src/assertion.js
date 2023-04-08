export const isBlankString = (str) => {
  if (typeof str !== 'string') {
    return false;
  }

  if (str.length === 0) {
    return true;
  }

  return isWhitespace(str);
};

export const isEmptyArray = (value) => {
  return Array.isArray(value) && value.length === 0;
};

export const isEmptyObject = (value) => {
  return !isNullOrUndefined(value) && Object.keys(value).length === 0 && value.constructor === Object;
};

export const isFunction = (value) => typeof value === 'function';

export const isNullish = (value) => {
  return value === null || value === undefined;
};

export const isNullOrUndefined = isNullish; // alias of "isNullish"

export const isObject = (value) => {
  return !isNullish(value) && (typeof value === 'object' || typeof value === 'function') && !Array.isArray(value);
};

export const isWhitespace = (value) => {
  // @see https://github.com/jonschlinkert/whitespace-regex
  // eslint-disable-next-line no-control-regex
  const whitespaceRegex = /^[\s\f\n\r\t\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000\ufeff\x09\x0a\x0b\x0c\x0d\x20\xa0]+$/;

  return (typeof value === 'string') && whitespaceRegex.test(value);
};
