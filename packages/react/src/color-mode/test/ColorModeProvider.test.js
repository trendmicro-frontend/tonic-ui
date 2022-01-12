import { render, screen } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import React, { useState } from 'react';
import ColorModeProvider from '../ColorModeProvider';
import useColorMode from '../useColorMode';
import * as colorModeUtils from '../utils';
import TestComponent from './TestComponent';
import './matchMedia.mock';

const getToggleColorModeButton = () => {
  return screen.getByRole('button');
};

describe('<ColorModeProvider />', () => {
  test('toggle color mode', () => {
    render(
      <ColorModeProvider
        defaultValue="light"
      >
        <TestComponent />
      </ColorModeProvider>,
    );

    expect(getToggleColorModeButton()).toHaveTextContent('light');

    userEvent.click(getToggleColorModeButton());

    expect(getToggleColorModeButton()).toHaveTextContent('dark');
  });

  test('prefer useSystemColorMode over defaultValue', () => {
    const getColorSchemeSpy = jest
      .spyOn(colorModeUtils, 'getColorScheme')
      .mockReturnValueOnce('dark');
    const onChange = jest.fn();

    render(
      <ColorModeProvider
        defaultValue="light"
        onChange={onChange}
        useSystemColorMode
      >
        <TestComponent />
      </ColorModeProvider>,
    );

    expect(getColorSchemeSpy).toHaveBeenCalledWith('light');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('dark');
    expect(getToggleColorModeButton()).toHaveTextContent('dark');
  });

  test('controlled color mode cannot be changed', () => {
    render(
      <ColorModeProvider
        value="dark"
      >
        <TestComponent />
      </ColorModeProvider>,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('dark');

    userEvent.click(button);

    expect(button).toHaveTextContent('dark');
  });

  test('change color mode using the onChange callback', () => {
    const wrapper = ({ children }) => {
      const [colorMode, setColorMode] = useState('light');
      return (
        <ColorModeProvider
          value={colorMode}
          onChange={setColorMode}
        >
          {children}
        </ColorModeProvider>
      );
    };
    const { result } = renderHook(() => useColorMode(), { wrapper });

    expect(result.current[0]).toEqual('light');

    act(() => {
      const setColorMode = result.current[1];
      setColorMode('dark');
    });

    expect(result.current[0]).toEqual('dark');
  });
});
