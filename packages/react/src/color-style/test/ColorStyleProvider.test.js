import { renderHook, act } from '@testing-library/react-hooks';
import React, { useState } from 'react';
import defaultColorStyle from '../../shared/color-style';
import ColorStyleProvider from '../ColorStyleProvider';
import useColorStyle from '../useColorStyle';

describe('<ColorStyleProvider />', () => {
  test('color style for dark mode', () => {
    const colorMode = 'dark';
    const wrapper = ({ children }) => (
      <ColorStyleProvider defaultColorStyle={defaultColorStyle}>
        {children}
      </ColorStyleProvider>
    );
    const { result } = renderHook(() => useColorStyle({ colorMode }), { wrapper });

    const [colorStyle, setColorStyle] = result.current;
    expect(colorStyle).toEqual(defaultColorStyle[colorMode]);
  });

  test('color style for light mode', () => {
    const colorMode = 'light';
    const wrapper = ({ children }) => (
      <ColorStyleProvider defaultColorStyle={defaultColorStyle}>
        {children}
      </ColorStyleProvider>
    );
    const { result } = renderHook(() => useColorStyle({ colorMode }), { wrapper });

    const [colorStyle, setColorStyle] = result.current;
    expect(colorStyle).toEqual(defaultColorStyle[colorMode]);
  });

  test('controlled color style cannot be changed', () => {
    const colorMode = 'dark';
    const wrapper = ({ children }) => (
      <ColorStyleProvider
        value={defaultColorStyle}
      >
        {children}
      </ColorStyleProvider>
    );
    const { result } = renderHook(() => useColorStyle({ colorMode }), { wrapper });

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
    const wrapper = ({ children }) => {
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
    const { result } = renderHook(() => useColorStyle({ colorMode }), { wrapper });

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
