import { useTheme as useEmotionTheme } from '@emotion/react';
import { renderHook } from '@testing-library/react';
import { ThemeProvider, createTheme, useTheme } from '@tonic-ui/react/src';
import React from 'react';

describe('ThemeProvider', () => {
  it('should use defaultTheme when no theme prop is provided', () => {
    const wrapper = ({ children }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );
    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current).toBeDefined();
    expect(typeof result.current.get).toBe('function');
  });

  it('should pass through a theme created with createTheme()', () => {
    const theme = createTheme();
    const wrapper = ({ children }) => (
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    );
    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current).toBeDefined();
    expect(typeof result.current.get).toBe('function');
  });

  it('should normalize a plain object theme via createTheme()', () => {
    const plainTheme = { colors: { brand: 'red' } };
    const wrapper = ({ children }) => (
      <ThemeProvider theme={plainTheme}>{children}</ThemeProvider>
    );
    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current).toBeDefined();
    expect(typeof result.current.get).toBe('function');
  });

  it('should inject useCSSVariables into the theme object', () => {
    const theme = createTheme();
    const wrapper = ({ children }) => (
      <ThemeProvider theme={theme} useCSSVariables>{children}</ThemeProvider>
    );
    const { result } = renderHook(() => useEmotionTheme(), { wrapper });

    expect(result.current.useCSSVariables).toBe(true);
  });

  it('should default useCSSVariables to false', () => {
    const theme = createTheme();
    const wrapper = ({ children }) => (
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    );
    const { result } = renderHook(() => useEmotionTheme(), { wrapper });

    expect(result.current.useCSSVariables).toBe(false);
  });

  it('should return a stable theme reference when props do not change', () => {
    const theme = createTheme();
    const wrapper = ({ children }) => (
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    );
    const { result, rerender } = renderHook(() => useEmotionTheme(), { wrapper });

    const first = result.current;
    rerender();
    expect(result.current).toBe(first);
  });
});
