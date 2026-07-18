import { isPlainObject } from '../../assertion';
import { resolveTheme } from '../resolveTheme';

const mockTheme = {
  colors: {
    red: {
      100: '#ffe4e1',
      500: '#fe4648',
      600: { main: '#dd1128', lighten: { 80: '#e02439', 160: '#e2374a' }, darken: { 80: '#cf1025', 160: '#c20f22' } },
      700: '#a9071b',
    },
    blue: {
      500: '#3182ce',
      600: '#1362fc',
    },
    gray: {
      100: '#f3f4f6',
      400: '#9ca3af',
      600: '#4b5563',
      900: '#111827',
    },
    white: '#ffffff',
    text: {
      primary: {
        _dark: '{gray.100}',
        _light: '{gray.900}',
      },
    },
    border: {
      enabled: {
        _dark: '{gray.600}',
        _light: '{gray.400}',
      },
    },
    highlight: {
      _dark: '{yellow.100}',
      _light: '{yellow.200}',
    },
  },
  yellow: {
    100: '#fef9c3',
    200: '#fed976',
  },
  opacity: {
    '8%': '8%',
    '24%': '24%',
  },
};

describe('resolveTheme', () => {
  describe('simple references', () => {
    it('should resolve references within the same domain', () => {
      const result = resolveTheme(mockTheme);
      expect(result.colors.border.enabled._dark).toBe('#4b5563');
      expect(result.colors.border.enabled._light).toBe('#9ca3af');
    });

    it('should resolve references to nested values', () => {
      const result = resolveTheme(mockTheme);
      expect(result.colors.text.primary._dark).toBe('#f3f4f6');
      expect(result.colors.text.primary._light).toBe('#111827');
    });
  });

  describe('cross-domain references', () => {
    it('should resolve cross-domain references via global scope', () => {
      const theme = {
        colors: {
          gray: { 800: '#393939', 100: '#ffffff' },
        },
        opacity: {
          '8%': '8%',
        },
        text: {
          primary: 'color-mix(in srgb, {colors.gray.800} {opacity.8%}, transparent)',
          simple: '{colors.gray.800}',
        },
      };
      const result = resolveTheme(theme);
      expect(result.text.primary).toBe('color-mix(in srgb, #393939 8%, transparent)');
      expect(result.text.simple).toBe('#393939');
    });
  });

  describe('main property extraction', () => {
    it('should extract main from a primitive color object', () => {
      const theme = {
        colors: {
          red: {
            600: { main: '#dd1128', lighten: { 80: '#e02439' }, darken: { 80: '#cf1025', 160: '#c20f22' } },
          },
          complex: {
            primary: '{red.600}',
            lighten: '{red.600.lighten.80}',
            darken: '{red.600.darken.160}',
          },
        },
      };
      const result = resolveTheme(theme);
      expect(result.colors.complex.primary).toBe('#dd1128');
      expect(result.colors.complex.lighten).toBe('#e02439');
      expect(result.colors.complex.darken).toBe('#c20f22');
    });
  });

  describe('_dark/_light pairs', () => {
    it('should preserve _dark/_light structure and resolve inner references', () => {
      const theme = {
        colors: {
          gray: { 100: '#f3f4f6', 800: '#393939' },
        },
        opacity: {
          '8%': '8%',
        },
        text: {
          adaptive: {
            _dark: 'color-mix(in srgb, {colors.gray.100} {opacity.8%}, transparent)',
            _light: 'color-mix(in srgb, {colors.gray.800} {opacity.8%}, transparent)',
          },
        },
      };
      const result = resolveTheme(theme);
      expect(result.text.adaptive).toEqual({
        _dark: 'color-mix(in srgb, #f3f4f6 8%, transparent)',
        _light: 'color-mix(in srgb, #393939 8%, transparent)',
      });
    });
  });

  describe('invalid and edge cases', () => {
    it('should return unresolvable references as-is', () => {
      const theme = {
        colors: {
          invalid: {
            notFound: '{nonexistent.color}',
            invalidPath: '{red.999}',
            malformed: '{red.500',
            empty: '{}',
          },
        },
      };
      const result = resolveTheme(theme);
      expect(result.colors.invalid.notFound).toBe('{nonexistent.color}');
      expect(result.colors.invalid.invalidPath).toBe('{red.999}');
      expect(result.colors.invalid.malformed).toBe('{red.500');
      expect(result.colors.invalid.empty).toBe('{}');
    });

    it('should handle empty and null values', () => {
      const theme = {
        colors: {
          edge: {
            nullValue: null,
            undefinedValue: undefined,
            emptyString: '',
            zeroValue: 0,
            falseValue: false,
          },
        },
      };
      const result = resolveTheme(theme);
      expect(result.colors.edge.nullValue).toBe(null);
      expect(result.colors.edge.undefinedValue).toBe(undefined);
      expect(result.colors.edge.emptyString).toBe('');
      expect(result.colors.edge.zeroValue).toBe(0);
      expect(result.colors.edge.falseValue).toBe(false);
    });
  });

  describe('polynomial regex / ReDoS resilience', () => {
    // Regression coverage for the token-matching regex used for inline references
    // (e.g. `color-mix(in srgb, {colors.red.600} 24%, transparent)`). The character
    // class previously included `{`, letting the regex backtrack over overlapping
    // ranges on malformed input with many unclosed braces (flagged by CodeQL as a
    // polynomial/quadratic-time regex on strings starting with '{{').
    it('should not hang on a long run of unclosed braces', () => {
      const malicious = '{'.repeat(50000);
      const theme = { text: { value: malicious } };

      const start = Date.now();
      const result = resolveTheme(theme);
      const elapsed = Date.now() - start;

      expect(result.text.value).toBe(malicious);
      expect(elapsed).toBeLessThan(1000);
    });

    it('should not hang on many repeated "{{" pairs with no closing brace', () => {
      const malicious = '{{'.repeat(30000);
      const theme = { text: { value: malicious } };

      const start = Date.now();
      const result = resolveTheme(theme);
      const elapsed = Date.now() - start;

      expect(result.text.value).toBe(malicious);
      expect(elapsed).toBeLessThan(1000);
    });

    it('should leave malformed nested braces unresolved when the inner path does not exist', () => {
      const theme = { text: { nested: '{{unknown}}' } };
      const result = resolveTheme(theme);
      expect(result.text.nested).toBe('{{unknown}}');
    });

    it('should still resolve an inner reference found inside malformed outer braces', () => {
      // The whole string starts with '{' and ends with '}', so it is treated as a
      // single (unresolvable) token path — this is pre-existing, unchanged behavior,
      // not something the regex fix touches. Documented here to distinguish it from
      // the inline multi-reference path used for e.g. color-mix() strings.
      const theme = { foo: 'red', text: { nested: '{{foo}}' } };
      const result = resolveTheme(theme);
      expect(result.text.nested).toBe('{{foo}}');
    });

    it('should still resolve legitimate multi-token inline references (color-mix syntax)', () => {
      const theme = {
        colors: { red: '#ff0000', blue: '#0000ff' },
        text: { combo: 'linear-gradient({colors.red}, {colors.blue})' },
      };
      const result = resolveTheme(theme);
      expect(result.text.combo).toBe('linear-gradient(#ff0000, #0000ff)');
    });
  });
});

describe('resolveTheme — toColorMode and get', () => {
  describe('immutability', () => {
    it('should not modify the original theme object', () => {
      const original = JSON.parse(JSON.stringify(mockTheme));
      resolveTheme(mockTheme);
      expect(mockTheme).toEqual(original);
    });
  });

  describe('primitive values', () => {
    it('should preserve non-reference values unchanged', () => {
      const result = resolveTheme(mockTheme);
      expect(result.colors.red[500]).toBe('#fe4648');
      expect(result.colors.blue[500]).toBe('#3182ce');
      expect(result.colors.white).toBe('#ffffff');
      expect(result.opacity['8%']).toBe('8%');
    });
  });

  describe('opacity token resolution', () => {
    it('should resolve opacity token references in color-mix syntax', () => {
      const theme = {
        colors: {
          gray: { 800: '#393939', 100: '#ffffff' },
        },
        opacity: { '8%': '8%', '12%': '12%' },
        text: {
          primary: 'color-mix(in srgb, {colors.gray.800} {opacity.8%}, transparent)',
          secondary: 'color-mix(in srgb, {colors.gray.100} {opacity.12%}, transparent)',
          simple: '{colors.gray.800}',
        },
      };
      const result = resolveTheme(theme);
      expect(result.text.primary).toBe('color-mix(in srgb, #393939 8%, transparent)');
      expect(result.text.secondary).toBe('color-mix(in srgb, #ffffff 12%, transparent)');
      expect(result.text.simple).toBe('#393939');
    });

    it('should handle unresolvable opacity token references gracefully', () => {
      const theme = {
        colors: { gray: { 800: '#393939' } },
        text: {
          invalid: 'color-mix(in srgb, {colors.nonexistent} {opacity.missing%}, transparent)',
          partial: 'color-mix(in srgb, {colors.gray.800} {opacity.missing%}, transparent)',
        },
      };
      const result = resolveTheme(theme);
      expect(result.text.invalid).toBe('color-mix(in srgb, {colors.nonexistent} {opacity.missing%}, transparent)');
      expect(result.text.partial).toBe('color-mix(in srgb, #393939 {opacity.missing%}, transparent)');
    });
  });

  describe('toColorMode()', () => {
    it('should resolve _dark tokens in dark mode', () => {
      const theme = resolveTheme(mockTheme);
      const dark = theme.toColorMode('dark');
      expect(dark.colors.text.primary).toBe('#f3f4f6');
      expect(dark.colors.border.enabled).toBe('#4b5563');
    });

    it('should resolve _light tokens in light mode', () => {
      const theme = resolveTheme(mockTheme);
      const light = theme.toColorMode('light');
      expect(light.colors.text.primary).toBe('#111827');
      expect(light.colors.border.enabled).toBe('#9ca3af');
    });

    it('should default to light mode', () => {
      const theme = resolveTheme(mockTheme);
      expect(theme.toColorMode()).toBe(theme.toColorMode('light'));
    });

    it('should not recurse into non-plain objects with circular references', () => {
      // A theme may carry non-plain objects such as a React ref pointing at a DOM
      // node (e.g. `containerRef` in a component's defaultProps). DOM nodes are not
      // plain objects and hold circular references; descending into them would
      // overflow the stack.
      class FakeNode {
        constructor() {
          this.tagName = 'DIV';
          this.parentNode = this; // circular reference, like a real DOM node
        }
      }
      const node = new FakeNode();
      const ref = { current: node };
      const themeWithRef = {
        ...mockTheme,
        components: { Modal: { defaultProps: { portalProps: { containerRef: ref } } } },
      };

      const theme = resolveTheme(themeWithRef);
      const light = theme.toColorMode('light');
      // The DOM node is not recursed into; it is preserved by identity.
      expect(light.components.Modal.defaultProps.portalProps.containerRef.current).toBe(node);
    });

    it('should return the same cached object on repeated calls', () => {
      const theme = resolveTheme(mockTheme);
      expect(theme.toColorMode('dark')).toBe(theme.toColorMode('dark'));
      expect(theme.toColorMode('light')).toBe(theme.toColorMode('light'));
    });

    it('should be enumerable so it survives theme spreading', () => {
      const theme = resolveTheme(mockTheme);
      expect(Object.keys(theme)).toContain('toColorMode');
    });

    it('should expose properties attached to the base theme after resolveTheme returns', () => {
      // createTheme() attaches cssVariables/cssVariablePrefix/rootSelector to the resolved theme
      // *after* resolveTheme builds the color mode variants. The variants must still surface them.
      const theme = resolveTheme(mockTheme);
      const cssVariables = { '--tonic-colors-red-500': '#fe4648' };
      Object.defineProperty(theme, 'cssVariables', { value: cssVariables, enumerable: true });

      expect(theme.toColorMode('light').cssVariables).toBe(cssVariables);
      expect(theme.toColorMode('dark').cssVariables).toBe(cssVariables);
    });

    it('should let own resolved tokens shadow the base theme', () => {
      const theme = resolveTheme(mockTheme);
      // colors is an own property of the variant; delegation must not override it.
      expect(theme.toColorMode('light').colors.text.primary).toBe('#111827');
    });

    it('should keep the variant a plain object so isPlainObject-gated code still works', () => {
      // A prototype link would fail this; the Proxy delegation must not.
      const variant = resolveTheme(mockTheme).toColorMode('light');
      expect(isPlainObject(variant)).toBe(true);
      expect(variant.get('colors.red.500')).toBe('#fe4648');
    });
  });

  describe('get()', () => {
    it('should retrieve a value by dot-separated path', () => {
      const theme = resolveTheme(mockTheme).toColorMode('light');
      expect(theme.get('colors.red.500')).toBe('#fe4648');
      expect(theme.get('colors.white')).toBe('#ffffff');
    });

    it('should extract main from a primitive color object', () => {
      const theme = resolveTheme(mockTheme).toColorMode('light');
      expect(theme.get('colors.red.600')).toBe('#dd1128');
    });

    it('should return defaultValue when path is not found', () => {
      const theme = resolveTheme(mockTheme).toColorMode('light');
      expect(theme.get('colors.nonexistent', 'fallback')).toBe('fallback');
    });

    it('should not be enumerable', () => {
      const theme = resolveTheme(mockTheme).toColorMode('light');
      expect(Object.keys(theme)).not.toContain('get');
    });
  });
});
