import { render, screen } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import React, { useState } from 'react';
import ColorModeProvider from '../ColorModeProvider';
import useColorMode from '../useColorMode';
import * as colorModeUtils from '../utils';
import './matchMedia.mock';

const getToggleColorModeButton = () => {
  return screen.getByRole('button');
};

const TestApp = () => {
  const [colorMode, setColorMode] = useColorMode();
  const toggleColorMode = () => {
    setColorMode(colorMode === 'light' ? 'dark' : 'light');
  };
  return (
    <button type="button" onClick={toggleColorMode}>
      {colorMode}
    </button>
  );
};

describe('<ColorModeProvider />', () => {
  test('toggle color mode', () => {
    render(
      <ColorModeProvider
        defaultValue="light"
      >
        <TestApp />
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
        <TestApp />
      </ColorModeProvider>,
    );

    expect(getColorSchemeSpy).toHaveBeenCalledWith('light');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('dark');
    expect(getToggleColorModeButton()).toHaveTextContent('dark');
  });

  test('controlled color mode cannot be changed', () => {
    const WrapperComponent = ({ children }) => {
      return (
        <ColorModeProvider
          value="light"
        >
          {children}
        </ColorModeProvider>
      );
    };
    const { result } = renderHook(() => useColorMode(), { wrapper: WrapperComponent });

    expect(result.current[0]).toEqual('light');

    act(() => {
      const setColorMode = result.current[1];
      setColorMode('dark');
    });

    expect(result.current[0]).toEqual('light');
  });

  test('change color mode using the onChange callback', () => {
    const WrapperComponent = ({ children }) => {
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
    const { result } = renderHook(() => useColorMode(), { wrapper: WrapperComponent });

    expect(result.current[0]).toEqual('light');

    act(() => {
      const setColorMode = result.current[1];
      setColorMode('dark');
    });

    expect(result.current[0]).toEqual('dark');
  });
});
