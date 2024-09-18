import pixelize from '../pixelize';

describe('pixelize', () => {
  it('returns the string value as-is if the input is a string', () => {
    const value = '20px';
    expect(pixelize(value)).toBe(value);
  });

  it('converts a finite number to a pixel string', () => {
    const value = 20;
    expect(pixelize(value)).toBe('20px');
  });

  it('should handle non-finite numbers correctly', () => {
    const value = Infinity;
    expect(pixelize(value)).toBe('0px');
  });

  it('should handle non-numbers correctly', () => {
    const value = NaN;
    expect(pixelize(value)).toBe('0px');
  });
});