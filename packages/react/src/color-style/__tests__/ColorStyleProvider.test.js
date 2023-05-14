import { renderHook, act } from '@testing-library/react';
import {
  ColorModeProvider,
  ColorStyleProvider,
  colorStyle as defaultColorStyle,
  useColorStyle,
} from '@tonic-ui/react/src';
import React, { useState } from 'react';

describe('ColorStyleProvider', () => {
  it('should return the correct color style based on the specified dark mode', () => {
    const colorMode = 'dark';
    const WrapperComponent = ({ children }) => (
      <ColorStyleProvider
        value={defaultColorStyle}
      >
        {children}
      </ColorStyleProvider>
    );
    const { result } = renderHook(() => useColorStyle({ colorMode }), { wrapper: WrapperComponent });

    const [colorStyle] = result.current;
    expect(colorStyle).toEqual(defaultColorStyle[colorMode]);
  });

  it('should return the correct color style based on the specified light mode', () => {
    const colorMode = 'light';
    const WrapperComponent = ({ children }) => (
      <ColorStyleProvider
        value={defaultColorStyle}
      >
        {children}
      </ColorStyleProvider>
    );
    const { result } = renderHook(() => useColorStyle({ colorMode }), { wrapper: WrapperComponent });

    const [colorStyle] = result.current;
    expect(colorStyle).toEqual(defaultColorStyle[colorMode]);
  });

  it('should return the correct color style based on the current color mode - dark', () => {
    const colorMode = 'dark';
    const WrapperComponent = ({ children }) => (
      <ColorModeProvider
        value={colorMode}
      >
        <ColorStyleProvider
          value={defaultColorStyle}
        >
          {children}
        </ColorStyleProvider>
      </ColorModeProvider>
    );
    const { result } = renderHook(() => useColorStyle(), { wrapper: WrapperComponent });

    const [colorStyle] = result.current;
    expect(colorStyle).toEqual(defaultColorStyle[colorMode]);
  });

  it('should return the correct color style based on the current color mode - light', () => {
    const colorMode = 'light';
    const WrapperComponent = ({ children }) => (
      <ColorModeProvider
        value={colorMode}
      >
        <ColorStyleProvider
          value={defaultColorStyle}
        >
          {children}
        </ColorStyleProvider>
      </ColorModeProvider>
    );
    const { result } = renderHook(() => useColorStyle(), { wrapper: WrapperComponent });

    const [colorStyle] = result.current;
    expect(colorStyle).toEqual(defaultColorStyle[colorMode]);
  });

  it('should not change the current color style when a controlled value is provided', () => {
    const colorMode = 'dark';
    const WrapperComponent = ({ children }) => (
      <ColorStyleProvider
        value={defaultColorStyle}
      >
        {children}
      </ColorStyleProvider>
    );
    const { result } = renderHook(() => useColorStyle({ colorMode }), { wrapper: WrapperComponent });

    expect(result.current[0]).toEqual(defaultColorStyle[colorMode]);

    const nextColorStyle = {
      ...result.current[0],
      borderColor: {
        primary: 'dodgerblue',
      },
    };

    act(() => {
      const setColorStyle = result.current[1];
      setColorStyle(nextColorStyle);
    });

    expect(result.current[0]).toEqual(defaultColorStyle[colorMode]);
  });

  it('changes color style using the onChange callback', () => {
    const colorMode = 'dark';
    const WrapperComponent = ({ children }) => {
      const [colorStyle, setColorStyle] = useState(defaultColorStyle);
      return (
        <ColorStyleProvider
          value={colorStyle}
          onChange={setColorStyle}
        >
          {children}
        </ColorStyleProvider>
      );
    };
    const { result } = renderHook(() => useColorStyle({ colorMode }), { wrapper: WrapperComponent });

    expect(result.current[0]).toEqual(defaultColorStyle[colorMode]);

    const nextColorStyle = {
      ...result.current[0],
      borderColor: {
        primary: 'dodgerblue',
      },
    };

    act(() => {
      const setColorStyle = result.current[1];
      setColorStyle(nextColorStyle);
    });

    expect(result.current[0]).toEqual(nextColorStyle);
  });
});
