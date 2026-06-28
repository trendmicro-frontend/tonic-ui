import getter from '../getter';

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
    expect(getter(theme.colors, 'nonexistent')).toBe('nonexistent');
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

  describe('v3 theme structure (deprecated flat tokens)', () => {
    const v3Theme = {
      colors: {
        // v3 flat tokens with colon notation
        'red:100': '#6e0002',
        'red:90': '#9d0003',
        'red:50': '#f24c4f',
        'blue:100': '#002a7e',
        'blue:50': '#578aef',
        'gray:100': '#000000',
        'gray:50': '#727272',
        'gray:10': '#f7f7f7',
        'white:primary': 'rgba(255, 255, 255, .92)',
        'white:secondary': 'rgba(255, 255, 255, .60)',
        'black:primary': 'rgba(0, 0, 0, .92)',
        'black:secondary': 'rgba(0, 0, 0, .65)',
      },
    };

    it('should resolve v3 flat color tokens with colon notation', () => {
      expect(getter(v3Theme.colors, 'red:100')).toBe('#6e0002');
      expect(getter(v3Theme.colors, 'red:50')).toBe('#f24c4f');
      expect(getter(v3Theme.colors, 'blue:100')).toBe('#002a7e');
      expect(getter(v3Theme.colors, 'gray:50')).toBe('#727272');
    });

    it('should resolve v3 semantic tokens with colon notation', () => {
      expect(getter(v3Theme.colors, 'white:primary')).toBe('rgba(255, 255, 255, .92)');
      expect(getter(v3Theme.colors, 'white:secondary')).toBe('rgba(255, 255, 255, .60)');
      expect(getter(v3Theme.colors, 'black:primary')).toBe('rgba(0, 0, 0, .92)');
      expect(getter(v3Theme.colors, 'black:secondary')).toBe('rgba(0, 0, 0, .65)');
    });
  });

  describe('v4 theme structure (primitives)', () => {
    const v4PrimitivesTheme = {
      colors: {
        // v4 nested primitive tokens
        red: {
          100: { value: '#6e0002' },
          200: { value: '#9d0003' },
          300: { value: '#b80003' },
          400: { value: '#d71920' },
          500: { value: '#e52630' },
          600: { value: '#f24c4f' },
          700: { value: '#f46f71' },
          800: { value: '#fd999a' },
          900: { value: '#fcc3c4' },
        },
        blue: {
          100: { value: '#002a7e' },
          500: { value: '#1e5ede' },
          600: { value: '#578aef' },
        },
        gray: {
          100: { value: '#000000' },
          500: { value: '#727272' },
          900: { value: '#f7f7f7' },
        },
        // v4 primitive with lightness variants
        'blue.600-L-80': '#d5e3fb',
        'red.600-L-60': '#f9aeb0',
      },
    };

    it('should resolve v4 nested primitive tokens with dot notation', () => {
      expect(getter(v4PrimitivesTheme.colors, 'red.100')).toBe('#6e0002');
      expect(getter(v4PrimitivesTheme.colors, 'red.600')).toBe('#f24c4f');
      expect(getter(v4PrimitivesTheme.colors, 'blue.100')).toBe('#002a7e');
      expect(getter(v4PrimitivesTheme.colors, 'blue.600')).toBe('#578aef');
      expect(getter(v4PrimitivesTheme.colors, 'gray.500')).toBe('#727272');
    });

    it('should resolve v4 lightness variant tokens', () => {
      expect(getter(v4PrimitivesTheme.colors, 'blue.600-L-80')).toBe('#d5e3fb');
      expect(getter(v4PrimitivesTheme.colors, 'red.600-L-60')).toBe('#f9aeb0');
    });
  });

  describe('v4 theme structure (semantic tokens with color mode)', () => {
    const v4SemanticTheme = {
      colors: {
        // v4 semantic tokens with _dark/_light structure
        text: {
          primary: {
            _dark: 'rgba(255, 255, 255, 0.92)',
            _light: 'rgba(0, 0, 0, 0.92)',
          },
          secondary: {
            _dark: 'rgba(255, 255, 255, 0.60)',
            _light: 'rgba(0, 0, 0, 0.60)',
          },
          disabled: {
            _dark: 'rgba(255, 255, 255, 0.28)',
            _light: 'rgba(0, 0, 0, 0.28)',
          },
          accent: {
            _dark: '#578aef',
            _light: '#1e5ede',
          },
        },
        background: {
          primary: {
            _dark: '#151515',
            _light: '#ffffff',
          },
          secondary: {
            _dark: '#212121',
            _light: '#f7f7f7',
          },
          tertiary: {
            _dark: '#2d2d2d',
            _light: '#eeeeee',
          },
        },
        border: {
          primary: {
            _dark: 'rgba(255, 255, 255, 0.12)',
            _light: 'rgba(0, 0, 0, 0.12)',
          },
          secondary: {
            _dark: 'rgba(255, 255, 255, 0.08)',
            _light: 'rgba(0, 0, 0, 0.08)',
          },
        },
        // Special semantic tokens with underscore prefix
        _component: {
          keyboardFocused: {
            outerFocusRing: {
              _dark: '#ffffff',
              _light: '#000000',
            },
          },
        },
      },
    };

    describe('with dark mode', () => {
      const options = {
        props: {
          __colorMode: 'dark',
        },
      };

      it('should resolve dark mode text tokens', () => {
        expect(getter(v4SemanticTheme.colors, 'text.primary', options)).toBe('rgba(255, 255, 255, 0.92)');
        expect(getter(v4SemanticTheme.colors, 'text.secondary', options)).toBe('rgba(255, 255, 255, 0.60)');
        expect(getter(v4SemanticTheme.colors, 'text.disabled', options)).toBe('rgba(255, 255, 255, 0.28)');
        expect(getter(v4SemanticTheme.colors, 'text.accent', options)).toBe('#578aef');
      });

      it('should resolve dark mode background tokens', () => {
        expect(getter(v4SemanticTheme.colors, 'background.primary', options)).toBe('#151515');
        expect(getter(v4SemanticTheme.colors, 'background.secondary', options)).toBe('#212121');
        expect(getter(v4SemanticTheme.colors, 'background.tertiary', options)).toBe('#2d2d2d');
      });

      it('should resolve dark mode border tokens', () => {
        expect(getter(v4SemanticTheme.colors, 'border.primary', options)).toBe('rgba(255, 255, 255, 0.12)');
        expect(getter(v4SemanticTheme.colors, 'border.secondary', options)).toBe('rgba(255, 255, 255, 0.08)');
      });

      it('should resolve special semantic tokens with underscore prefix', () => {
        expect(getter(v4SemanticTheme.colors, '_component.keyboardFocused.outerFocusRing', options)).toBe('#ffffff');
      });
    });

    describe('with light mode', () => {
      const options = {
        props: {
          __colorMode: 'light',
        },
      };

      it('should resolve light mode text tokens', () => {
        expect(getter(v4SemanticTheme.colors, 'text.primary', options)).toBe('rgba(0, 0, 0, 0.92)');
        expect(getter(v4SemanticTheme.colors, 'text.secondary', options)).toBe('rgba(0, 0, 0, 0.60)');
        expect(getter(v4SemanticTheme.colors, 'text.disabled', options)).toBe('rgba(0, 0, 0, 0.28)');
        expect(getter(v4SemanticTheme.colors, 'text.accent', options)).toBe('#1e5ede');
      });

      it('should resolve light mode background tokens', () => {
        expect(getter(v4SemanticTheme.colors, 'background.primary', options)).toBe('#ffffff');
        expect(getter(v4SemanticTheme.colors, 'background.secondary', options)).toBe('#f7f7f7');
        expect(getter(v4SemanticTheme.colors, 'background.tertiary', options)).toBe('#eeeeee');
      });

      it('should resolve light mode border tokens', () => {
        expect(getter(v4SemanticTheme.colors, 'border.primary', options)).toBe('rgba(0, 0, 0, 0.12)');
        expect(getter(v4SemanticTheme.colors, 'border.secondary', options)).toBe('rgba(0, 0, 0, 0.08)');
      });

      it('should resolve special semantic tokens with underscore prefix', () => {
        expect(getter(v4SemanticTheme.colors, '_component.keyboardFocused.outerFocusRing', options)).toBe('#000000');
      });
    });

    describe('without colorMode (should fallback to _light)', () => {
      it('should default to light mode when colorMode is not provided', () => {
        expect(getter(v4SemanticTheme.colors, 'text.primary')).toBe('rgba(0, 0, 0, 0.92)');
        expect(getter(v4SemanticTheme.colors, 'background.primary')).toBe('#ffffff');
        expect(getter(v4SemanticTheme.colors, 'border.primary')).toBe('rgba(0, 0, 0, 0.12)');
      });
    });
  });

  describe('v4 theme structure (merged - all three layers)', () => {
    const v4MergedTheme = {
      colors: {
        // Layer 1: v3 deprecated tokens (flat)
        'red:50': '#f24c4f',
        'blue:50': '#578aef',
        'white:primary': 'rgba(255, 255, 255, .92)',

        // Layer 2: v4 primitive tokens (nested)
        red: {
          600: { value: '#f24c4f' },
          700: { value: '#f46f71' },
        },
        blue: {
          600: { value: '#578aef' },
        },

        // Layer 3: v4 semantic tokens (contextual with color mode)
        text: {
          primary: {
            _dark: 'rgba(255, 255, 255, 0.92)',
            _light: 'rgba(0, 0, 0, 0.92)',
          },
          secondary: {
            _dark: 'rgba(255, 255, 255, 0.60)',
            _light: 'rgba(0, 0, 0, 0.60)',
          },
        },
        background: {
          primary: {
            _dark: '#151515',
            _light: '#ffffff',
          },
        },
      },
    };

    it('should resolve tokens from all three layers (v3, primitives, semantic)', () => {
      const darkOptions = {
        props: {
          __colorMode: 'dark',
        },
      };

      // v3 layer (deprecated)
      expect(getter(v4MergedTheme.colors, 'red:50')).toBe('#f24c4f');
      expect(getter(v4MergedTheme.colors, 'white:primary')).toBe('rgba(255, 255, 255, .92)');

      // v4 primitives layer
      expect(getter(v4MergedTheme.colors, 'red.600')).toBe('#f24c4f');
      expect(getter(v4MergedTheme.colors, 'blue.600')).toBe('#578aef');

      // v4 semantic layer (with color mode)
      expect(getter(v4MergedTheme.colors, 'text.primary', darkOptions)).toBe('rgba(255, 255, 255, 0.92)');
      expect(getter(v4MergedTheme.colors, 'background.primary', darkOptions)).toBe('#151515');
    });

    it('should handle color mode switching for semantic tokens', () => {
      const darkOptions = {
        props: {
          __colorMode: 'dark',
        },
      };

      const lightOptions = {
        props: {
          __colorMode: 'light',
        },
      };

      // Same token path, different values based on color mode
      expect(getter(v4MergedTheme.colors, 'text.primary', darkOptions)).toBe('rgba(255, 255, 255, 0.92)');
      expect(getter(v4MergedTheme.colors, 'text.primary', lightOptions)).toBe('rgba(0, 0, 0, 0.92)');

      expect(getter(v4MergedTheme.colors, 'background.primary', darkOptions)).toBe('#151515');
      expect(getter(v4MergedTheme.colors, 'background.primary', lightOptions)).toBe('#ffffff');
    });
  });

  describe('edge cases for v3/v4 compatibility', () => {
    it('should return original path when token does not exist in any layer', () => {
      const mixedTheme = {
        colors: {
          'red:50': '#f24c4f',
          blue: {
            600: { value: '#578aef' },
          },
        },
      };

      expect(getter(mixedTheme.colors, 'nonexistent:token')).toBe('nonexistent:token');
      expect(getter(mixedTheme.colors, 'nonexistent.path')).toBe('nonexistent.path');
    });

    it('should handle mixed notation in the same theme', () => {
      const mixedTheme = {
        colors: {
          // v3 colon notation
          'red:50': '#f24c4f',
          // v4 dot notation
          blue: {
            600: { value: '#578aef' },
          },
        },
      };

      expect(getter(mixedTheme.colors, 'red:50')).toBe('#f24c4f');
      expect(getter(mixedTheme.colors, 'blue.600')).toBe('#578aef');
    });

    it('should handle tokens with both value property and _dark/_light', () => {
      const semanticTheme = {
        colors: {
          text: {
            primary: {
              value: 'rgba(255, 255, 255, 0.92)', // Has value but also has _dark/_light
              _dark: 'rgba(255, 255, 255, 0.92)',
              _light: 'rgba(0, 0, 0, 0.92)',
            },
          },
        },
      };

      const darkOptions = {
        props: {
          __colorMode: 'dark',
        },
      };

      const lightOptions = {
        props: {
          __colorMode: 'light',
        },
      };

      // Should use _dark/_light instead of value when colorMode is present
      expect(getter(semanticTheme.colors, 'text.primary', darkOptions)).toBe('rgba(255, 255, 255, 0.92)');
      expect(getter(semanticTheme.colors, 'text.primary', lightOptions)).toBe('rgba(0, 0, 0, 0.92)');
    });
  });
});
