import isNullOrUndefined from './isNullOrUndefined';

describe('Check whether a value is null or undefined', () => {
  it('should return true', () => {
    expect(isNullOrUndefined()).toBe(true);
    expect(isNullOrUndefined(null)).toBe(true);
    expect(isNullOrUndefined(undefined)).toBe(true);
  });

  it('should return false', () => {
    expect(isNullOrUndefined('null')).toBe(false);
    expect(isNullOrUndefined('undefined')).toBe(false);
    expect(isNullOrUndefined([])).toBe(false);
    expect(isNullOrUndefined({})).toBe(false);
    expect(isNullOrUndefined(0)).toBe(false);
    expect(isNullOrUndefined(function(){})).toBe(false); // eslint-disable-line
    expect(isNullOrUndefined('')).toBe(false);
    expect(isNullOrUndefined('    ')).toBe(false);
    expect(isNullOrUndefined('\r\t\n ')).toBe(false);
  });
});
