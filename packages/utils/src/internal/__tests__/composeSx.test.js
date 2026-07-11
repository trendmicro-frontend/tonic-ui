import { composeSx } from '../composeSx';

describe('composeSx', () => {
  it('should return an array when both arguments are plain objects', () => {
    const a = { color: 'red' };
    const b = { color: 'blue' };
    expect(composeSx(a, b)).toEqual([{ color: 'red' }, { color: 'blue' }]);
  });

  it('should spread b when b is an array', () => {
    const a = { color: 'red' };
    const b = [{ fontSize: 12 }, { fontWeight: 'bold' }];
    expect(composeSx(a, b)).toEqual([{ color: 'red' }, { fontSize: 12 }, { fontWeight: 'bold' }]);
  });

  it('should return only the first element when b is undefined', () => {
    const a = { color: 'red' };
    expect(composeSx(a, undefined)).toEqual([{ color: 'red' }]);
  });

  it('should return an empty array when both arguments are undefined', () => {
    expect(composeSx(undefined, undefined)).toEqual([]);
  });

  it('should preserve order so that a comes before b', () => {
    const a = { order: 'first' };
    const b = { order: 'second' };
    const result = composeSx(a, b);
    expect(result[0]).toBe(a);
    expect(result[1]).toBe(b);
  });

  it('should accept more than two arguments, in order', () => {
    const a = { color: 'red' };
    const b = { fontSize: 12 };
    const c = { fontWeight: 'bold' };
    expect(composeSx(a, b, c)).toEqual([a, b, c]);
  });

  it('should skip undefined arguments anywhere in the list', () => {
    const a = { color: 'red' };
    const c = { fontWeight: 'bold' };
    expect(composeSx(a, undefined, c)).toEqual([a, c]);
  });

  it('should flatten array arguments at any position', () => {
    const a = { color: 'red' };
    const b = [{ fontSize: 12 }, { fontWeight: 'bold' }];
    const c = { lineHeight: 1.5 };
    expect(composeSx(a, b, c)).toEqual([{ color: 'red' }, { fontSize: 12 }, { fontWeight: 'bold' }, { lineHeight: 1.5 }]);
  });

  it('should return an empty array when called with no arguments', () => {
    expect(composeSx()).toEqual([]);
  });
});
