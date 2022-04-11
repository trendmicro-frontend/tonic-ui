import isWhitespace from './isWhitespace';

const isBlankString = (str) => {
  if (typeof str !== 'string') {
    return false;
  }

  if (str.length === 0) {
    return true;
  }

  return isWhitespace(str);
};

export default isBlankString;
