/* eslint-disable */
import isEmptyArray from './isEmptyArray';
import noop from './noop';

describe('Check whether the value is an empty array', () => {
  it('should return true', () => {
    expect(isEmptyArray([])).toBe(true);
    expect(isEmptyArray(new Array())).toBe(true);
  });

  it('should return false', () => {
    expect(isEmptyArray({})).toBe(false);
    expect(isEmptyArray(0)).toBe(false);
    expect(isEmptyArray(true)).toBe(false);
    expect(isEmptyArray(false)).toBe(false);
    expect(isEmptyArray(noop)).toBe(false);
    expect(isEmptyArray(null)).toBe(false);
    expect(isEmptyArray(undefined)).toBe(false);
    expect(isEmptyArray('')).toBe(false);
    expect(isEmptyArray(' ')).toBe(false);
    expect(isEmptyArray(new Boolean())).toBe(false);
    expect(isEmptyArray(new Date())).toBe(false);
    expect(isEmptyArray(new Function())).toBe(false);
    expect(isEmptyArray(new Number())).toBe(false);
    expect(isEmptyArray(new Object())).toBe(false);
    expect(isEmptyArray(new String())).toBe(false);
    expect(isEmptyArray(new RegExp())).toBe(false);
  });
});
