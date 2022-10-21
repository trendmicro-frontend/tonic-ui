import { renderHook, act } from '@testing-library/react';
import React, { useState } from 'react';
import { ColorStyleProvider, colorStyle as defaultColorStyle, useColorStyle } from '../..';

describe('<ColorStyleProvider />', () => {
  test('color style for dark mode', () => {
    const colorMode = 'dark';
    const WrapperComponent = ({ children }) => (
      <ColorStyleProvider defaultColorStyle={defaultColorStyle}>
        {children}
      </ColorStyleProvider>
    );
    const { result } = renderHook(() => useColorStyle({ colorMode }), { wrapper: WrapperComponent });

    const [colorStyle] = result.current;
    expect(colorStyle).toEqual(defaultColorStyle[colorMode]);
  });

  test('color style for light mode', () => {
    const colorMode = 'light';
    const WrapperComponent = ({ children }) => (
      <ColorStyleProvider defaultColorStyle={defaultColorStyle}>
        {children}
      </ColorStyleProvider>
    );
    const { result } = renderHook(() => useColorStyle({ colorMode }), { wrapper: WrapperComponent });

    const [colorStyle] = result.current;
    expect(colorStyle).toEqual(defaultColorStyle[colorMode]);
  });

  test('controlled color style cannot be changed', () => {
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

  test('change color style using the onChange callback', () => {
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
