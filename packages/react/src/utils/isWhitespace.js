// @see https://github.com/jonschlinkert/whitespace-regex
// eslint-disable-next-line no-control-regex
const whitespaceRegex = /^[\s\f\n\r\t\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000\ufeff\x09\x0a\x0b\x0c\x0d\x20\xa0]+$/;

const isWhitespace = (value) => {
  return (typeof value === 'string') && whitespaceRegex.test(value);
};

export default isWhitespace;
