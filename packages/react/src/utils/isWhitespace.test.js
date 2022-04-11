import isWhitespace from './isWhitespace';

describe('Check whether a value passed is all whitespace', () => {
  it('should return true', () => {
    expect(isWhitespace('  ')).toBe(true);
    expect(isWhitespace('\t')).toBe(true);
    expect(isWhitespace('\r\n ')).toBe(true);
    expect(isWhitespace(' \t\r\n ')).toBe(true);
  });

  it('should return false', () => {
    expect(isWhitespace('')).toBe(false); // empty string
    expect(isWhitespace('foo')).toBe(false);
    expect(isWhitespace(' foo ')).toBe(false);
  });
});

describe('ES5-compliant whitespace', () => {
  it('should be true for all expected whitespace values', () => {
    expect(isWhitespace('\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF')).toBe(true);
  });

  it('should be false for the zero-width space', () => {
    expect(isWhitespace('\u200b')).toBe(false);
  });
});
