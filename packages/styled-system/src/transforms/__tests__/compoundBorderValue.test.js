import { compoundBorderValue } from '../compoundBorderValue';

describe('compoundBorderValue', () => {
  const scale = {
    sm: '0.125rem',
    md: '0.25rem',
    lg: '0.5rem',
    xl: '1rem'
  };

  test('should apply same value to all corners', () => {
    expect(compoundBorderValue(scale, 'sm'))
      .toBe('0.125rem 0.125rem 0.125rem 0.125rem');
  });

  test('should apply first value to top-left/bottom-left and second value to top-right/bottom-right', () => {
    expect(compoundBorderValue(scale, 'sm md'))
      .toBe('0.125rem 0.25rem 0.25rem 0.125rem');
  });

  test('should apply values in order: top-left, top-right, bottom-right, and copy top-right for bottom-left', () => {
    expect(compoundBorderValue(scale, 'sm md lg'))
      .toBe('0.125rem 0.25rem 0.5rem 0.25rem');
  });

  test('should apply values in clockwise order: top-left, top-right, bottom-right, bottom-left', () => {
    expect(compoundBorderValue(scale, 'sm md lg xl'))
      .toBe('0.125rem 0.25rem 0.5rem 1rem');
  });

  test('should handle theme values with raw values', () => {
    expect(compoundBorderValue(scale, 'sm 0 4px md'))
      .toBe('0.125rem 0 4px 0.25rem');
  });

  test('should handle zero values', () => {
    expect(compoundBorderValue(scale, 'sm 0 0 sm'))
      .toBe('0.125rem 0 0 0.125rem');
  });

  describe('edge cases', () => {
    test('should handle null/undefined', () => {
      expect(compoundBorderValue(scale, null)).toBe(null);
      expect(compoundBorderValue(scale, undefined)).toBe(undefined);
    });

    test('should handle empty string', () => {
      expect(compoundBorderValue(scale, '')).toBe('');
    });

    test('should handle extra whitespace', () => {
      expect(compoundBorderValue(scale, '  sm    md  '))
        .toBe('0.125rem 0.25rem 0.25rem 0.125rem');
    });

    test('should handle invalid theme values', () => {
      expect(compoundBorderValue(scale, 'invalid md lg xl'))
        .toBe('invalid 0.25rem 0.5rem 1rem');
    });
  });
});
