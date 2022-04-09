import isEmptyObject from './isEmptyObject';
import noop from './noop';

describe('Check whether the value is an empty object', () => {
  it('should return true', () => {
    expect(isEmptyObject({})).toBe(true);
    expect(isEmptyObject(new Object())).toBe(true);
  });

  it('should return false', () => {
    expect(isEmptyObject([])).toBe(false);
    expect(isEmptyObject(0)).toBe(false);
    expect(isEmptyObject(true)).toBe(false);
    expect(isEmptyObject(false)).toBe(false);
    expect(isEmptyObject(noop)).toBe(false);
    expect(isEmptyObject(null)).toBe(false);
    expect(isEmptyObject(undefined)).toBe(false);
    expect(isEmptyObject('')).toBe(false);
    expect(isEmptyObject(' ')).toBe(false);
    expect(isEmptyObject(new Array())).toBe(false);
    expect(isEmptyObject(new Boolean())).toBe(false);
    expect(isEmptyObject(new Date())).toBe(false);
    expect(isEmptyObject(new Function())).toBe(false);
    expect(isEmptyObject(new Number())).toBe(false);
    expect(isEmptyObject(new String())).toBe(false);
    expect(isEmptyObject(new RegExp())).toBe(false);
  });
});
