import { renderHook } from '@testing-library/react';
import {
  TonicProvider,
  createTheme,
  useTheme,
} from '@tonic-ui/react/src';
import React from 'react';

const createWrapper = (colorMode, themeOverrides) => {
  const theme = createTheme(themeOverrides);
  return ({ children }) => (
    <TonicProvider theme={theme} colorMode={{ value: colorMode }}>
      {children}
    </TonicProvider>
  );
};

describe('useTheme', () => {
  it('should resolve _dark tokens when color mode is dark', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: createWrapper('dark'),
    });

    const theme = result.current;
    expect(theme.get('colors.background.high')).toBe('#161616');
    expect(theme.get('colors.background.medium')).toBe('#121212');
    expect(theme.get('colors.text.primary')).toBe('color-mix(in srgb, #ffffff 80%, transparent)');
    expect(theme.get('colors.text.secondary')).toBe('color-mix(in srgb, #ffffff 64%, transparent)');
  });

  it('should resolve _light tokens when color mode is light', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: createWrapper('light'),
    });

    const theme = result.current;
    expect(theme.get('colors.background.high')).toBe('#f8f8f8');
    expect(theme.get('colors.background.medium')).toBe('#f5f5f5');
    expect(theme.get('colors.text.primary')).toBe('color-mix(in srgb, #000000 80%, transparent)');
    expect(theme.get('colors.text.secondary')).toBe('color-mix(in srgb, #000000 64%, transparent)');
  });

  it('should not modify tokens without _dark/_light properties', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: createWrapper('dark'),
    });

    const theme = result.current;
    expect(theme.get('colors.transparent')).toBe('transparent');
    expect(theme.get('sizes.1x')).toBe('.25rem');

    // Primitive color objects with `main` should be preserved as-is on direct access
    expect(theme.colors.red[600]).toMatchObject({
      main: '#dd1128',
      lighten: { 80: '#e02439' },
      darken: { 80: '#cf1025' },
    });
  });

  it('should respect specified colorMode option over current color mode', () => {
    // Current color mode is 'dark', but we specify 'light'
    const { result } = renderHook(
      () => useTheme({ colorMode: 'light' }),
      { wrapper: createWrapper('dark') }
    );

    const theme = result.current;
    expect(theme.get('colors.background.high')).toBe('#f8f8f8');
    expect(theme.get('colors.text.primary')).toBe('color-mix(in srgb, #000000 80%, transparent)');
  });

  it('should memoize the resolved theme when dependencies do not change', () => {
    const { result, rerender } = renderHook(() => useTheme(), {
      wrapper: createWrapper('dark'),
    });

    const firstResult = result.current;
    rerender();
    const secondResult = result.current;

    expect(firstResult).toBe(secondResult);
  });

  it('should return a new reference when colorMode changes', () => {
    const { result, rerender } = renderHook(
      ({ colorMode }) => useTheme({ colorMode }),
      {
        initialProps: { colorMode: 'dark' },
        wrapper: createWrapper('dark'),
      }
    );

    const firstResult = result.current;
    expect(firstResult.get('colors.background.high')).toBe('#161616');

    rerender({ colorMode: 'light' });
    const secondResult = result.current;

    expect(secondResult.get('colors.background.high')).toBe('#f8f8f8');
    expect(firstResult).not.toBe(secondResult);
  });

  it('should handle nested color mode tokens', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: createWrapper('dark', {
        colors: {
          nested: {
            level1: {
              level2: {
                _dark: 'dark-value',
                _light: 'light-value',
              },
            },
          },
        },
      }),
    });

    const theme = result.current;
    expect(theme.get('colors.nested.level1.level2')).toBe('dark-value');
  });

  describe('theme.get()', () => {
    it('should resolve simple scalar values by path', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: createWrapper('dark'),
      });

      const theme = result.current;
      expect(theme.get('colors.transparent')).toBe('transparent');
      expect(theme.get('sizes.1x')).toBe('.25rem');
    });

    it('should extract main from nested primitive color objects', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: createWrapper('dark'),
      });

      const theme = result.current;
      expect(theme.get('colors.red.600')).toBe('#dd1128');
      expect(theme.get('colors.red.600.main')).toBe('#dd1128');
      expect(theme.get('colors.blue.600')).toBe('#1362fc');
      expect(theme.get('colors.blue.600.main')).toBe('#1362fc');
    });

    it('should resolve lighten/darken variant paths directly', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: createWrapper('dark'),
      });

      const theme = result.current;
      expect(theme.get('colors.red.600.lighten.80')).toBe('#e02439');
      expect(theme.get('colors.red.600.darken.160')).toBe('#c20f22');
      expect(theme.get('colors.blue.600.darken.80')).toBe('#115ced');
    });

    it('should resolve _dark/_light tokens based on current color mode', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: createWrapper('light'),
      });

      const theme = result.current;
      expect(theme.get('colors.text.primary')).toBe('color-mix(in srgb, #000000 80%, transparent)');
    });

    it('should return defaultValue when path is not found', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: createWrapper('dark'),
      });

      const theme = result.current;
      expect(theme.get('colors.nonexistent')).toBeUndefined();
      expect(theme.get('colors.nonexistent', '#fallback')).toBe('#fallback');
    });

    it('should not be enumerable', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: createWrapper('dark'),
      });

      const theme = result.current;
      expect(Object.keys(theme)).not.toContain('get');
      expect(theme.get).toBeInstanceOf(Function);
    });
  });

  describe('cssVariables', () => {
    it('should expose cssVariables on the resolved theme', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: createWrapper('light'),
      });

      const theme = result.current;
      expect(theme.cssVariables).toBeDefined();
      expect(Object.keys(theme.cssVariables).length).toBeGreaterThan(0);
    });

    it('should expose cssVariablePrefix and rootSelector on the resolved theme', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: createWrapper('light'),
      });

      const theme = result.current;
      expect(theme.cssVariablePrefix).toBe('tonic');
      expect(theme.rootSelector).toBe(':root');
    });

    it('should expose the same cssVariables in both color modes', () => {
      const wrapper = createWrapper('dark');
      const { result } = renderHook(
        () => ({
          light: useTheme({ colorMode: 'light' }),
          dark: useTheme({ colorMode: 'dark' }),
        }),
        { wrapper }
      );

      expect(result.current.light.cssVariables).toBe(result.current.dark.cssVariables);
    });

    it('should not break theme.get() while exposing cssVariables', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: createWrapper('light'),
      });

      const theme = result.current;
      expect(theme.cssVariables).toBeDefined();
      expect(theme.get('colors.background.high')).toBe('#f8f8f8');
    });
  });

  it('should handle fallback when only one color mode variant is provided', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: createWrapper('dark', {
        colors: {
          onlyDark: { _dark: 'dark-only-value' },
          onlyLight: { _light: 'light-only-value' },
        },
      }),
    });

    const theme = result.current;
    expect(theme.get('colors.onlyDark')).toBe('dark-only-value');
    expect(theme.get('colors.onlyLight')).toBe('light-only-value');
  });
});
