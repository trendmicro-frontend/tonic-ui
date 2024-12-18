import positiveOrNegative from '../positiveOrNegative';

describe('positiveOrNegative', () => {
  const theme = {
    sizes: {
      '1x': '.25rem',
      '2x': '.5rem',
      '3x': '.75rem',
      '4x': '1rem',
    },
  };

  it('should handle positive values', () => {
    expect(positiveOrNegative(theme.sizes, '1x')).toBe('.25rem');
    expect(positiveOrNegative(theme.sizes, '2x')).toBe('.5rem');
    expect(positiveOrNegative(theme.sizes, '3x')).toBe('.75rem');
    expect(positiveOrNegative(theme.sizes, '4x')).toBe('1rem');
  });

  it('should handle negative values', () => {
    expect(positiveOrNegative(theme.sizes, '-1x')).toBe('-.25rem');
    expect(positiveOrNegative(theme.sizes, '-2x')).toBe('-.5rem');
    expect(positiveOrNegative(theme.sizes, '-3x')).toBe('-.75rem');
    expect(positiveOrNegative(theme.sizes, '-4x')).toBe('-1rem');
  });

  it('should return original value when theme.sizes value is not found', () => {
    expect(positiveOrNegative(theme.sizes, '5x')).toBe('5x');
    expect(positiveOrNegative(theme.sizes, '-5x')).toBe('-5x');
  });

  it('should handle undefined theme.sizes', () => {
    expect(positiveOrNegative(undefined, '2x')).toBe('2x');
    expect(positiveOrNegative(undefined, '-2x')).toBe('-2x');
  });

  it('should handle non-numeric strings', () => {
    expect(positiveOrNegative(theme.sizes, 'auto')).toBe('auto');
    expect(positiveOrNegative(theme.sizes, '4px')).toBe('4px');
    expect(positiveOrNegative(theme.sizes, '-4px')).toBe('-4px');
  });
});
