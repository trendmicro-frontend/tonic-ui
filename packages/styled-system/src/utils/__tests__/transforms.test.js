import { getter } from '../transforms';

describe('getter', () => {
  const theme = {
    colors: {
      // flat theme tokens
      'white:primary': 'rgba(255, 255, 255, .92)',
      'white:secondary': 'rgba(255, 255, 255, .60)',
      'black:primary': 'rgba(0, 0, 0, .92)',
      'black:secondary': 'rgba(0, 0, 0, .65)',

      // nested theme tokens
      white: {
        primary: {
          value: 'rgba(255, 255, 255, .92)',
        },
        secondary: {
          value: 'rgba(255, 255, 255, .60)',
        },
      },
      black: {
        primary: {
          value: 'rgba(0, 0, 0, .92)',
        },
        secondary: {
          value: 'rgba(0, 0, 0, .65)',
        },
      },
    },
  };

  it('should resolve flat color tokens', () => {
    expect(getter(theme.colors, 'white:primary')).toBe('rgba(255, 255, 255, .92)');
    expect(getter(theme.colors, 'white:secondary')).toBe('rgba(255, 255, 255, .60)');
    expect(getter(theme.colors, 'black:primary')).toBe('rgba(0, 0, 0, .92)');
    expect(getter(theme.colors, 'black:secondary')).toBe('rgba(0, 0, 0, .65)');
  });

  it('should resolve nested color tokens with dot notation', () => {
    expect(getter(theme.colors, 'white.primary')).toBe('rgba(255, 255, 255, .92)');
    expect(getter(theme.colors, 'white.secondary')).toBe('rgba(255, 255, 255, .60)');
    expect(getter(theme.colors, 'black.primary')).toBe('rgba(0, 0, 0, .92)');
    expect(getter(theme.colors, 'black.secondary')).toBe('rgba(0, 0, 0, .65)');
  });

  it('should fallback to original value when token path does not exist', () => {
    expect(getter(theme.colors, 'white')).toBe('white');
  });

  it('should handle undefined theme values', () => {
    expect(getter(undefined, 'white.undefined')).toBe('white.undefined');
  });

  it('should handle nested objects without value property', () => {
    const customTheme = {
      colors: {
        custom: {
          primary: 'rgb(100, 100, 100)',
        },
      },
    };
    const result = getter(customTheme.colors, 'custom.primary');
    expect(result).toBe('rgb(100, 100, 100)');
  });
});
