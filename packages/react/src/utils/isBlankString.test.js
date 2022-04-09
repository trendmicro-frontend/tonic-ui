import isBlankString from './isBlankString';
import noop from './noop';

describe('Check whether the value is a blank string', () => {
  it('should return true', () => {
    expect(isBlankString('')).toBe(true);
    expect(isBlankString('  ')).toBe(true);
    expect(isBlankString('\t')).toBe(true);
    expect(isBlankString('\r\n ')).toBe(true);
    expect(isBlankString(' \t\r\n ')).toBe(true);
  });

  it('should return false', () => {
    expect(isBlankString([])).toBe(false);
    expect(isBlankString({})).toBe(false);
    expect(isBlankString(0)).toBe(false);
    expect(isBlankString(noop)).toBe(false);
    expect(isBlankString(null)).toBe(false);
    expect(isBlankString(undefined)).toBe(false);
    expect(isBlankString('string')).toBe(false);
  });
});
