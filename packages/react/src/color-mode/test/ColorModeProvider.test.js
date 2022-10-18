import { act, render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useCallback, useState } from 'react';
import ColorModeProvider from '../ColorModeProvider';
import useColorMode from '../useColorMode';
import * as colorModeUtils from '../utils';
import './matchMedia.mock';

describe('<ColorModeProvider />', () => {
  test('toggle color mode using a toggle button', async () => {
    const ToggleColorModeApp = () => {
      const [colorMode, setColorMode] = useColorMode();
      const toggleColorMode = useCallback(() => {
        setColorMode(colorMode === 'light' ? 'dark' : 'light');
      }, [colorMode, setColorMode]);
      return (
        <button type="button" onClick={toggleColorMode}>
          {colorMode}
        </button>
      );
    };

    render(
      <ColorModeProvider
        defaultValue="light"
      >
        <ToggleColorModeApp />
      </ColorModeProvider>,
    );

    const toggleColorModeButton = screen.getByRole('button');
    expect(toggleColorModeButton).toHaveTextContent('light');
    await userEvent.click(toggleColorModeButton);
    expect(toggleColorModeButton).toHaveTextContent('dark');
  });

  test('toggle color mode using the toggle function', () => {
    const WrapperComponent = ({ children }) => {
      return (
        <ColorModeProvider
          defaultValue="light"
        >
          {children}
        </ColorModeProvider>
      );
    };
    const { result } = renderHook(() => useColorMode(), { wrapper: WrapperComponent });

    expect(result.current[0]).toEqual('light');

    act(() => {
      const toggleColorMode = result.current[1];
      toggleColorMode();
    });

    expect(result.current[0]).toEqual('dark');
  });

  test('prefer useSystemColorMode over defaultValue', () => {
    const getColorSchemeSpy = jest
      .spyOn(colorModeUtils, 'getColorScheme')
      .mockReturnValueOnce('dark');
    const onChange = jest.fn();
    const WrapperComponent = ({ children }) => {
      return (
        <ColorModeProvider
          defaultValue="light"
          onChange={onChange}
          useSystemColorMode
        >
          {children}
        </ColorModeProvider>
      );
    };
    const { result } = renderHook(() => useColorMode(), { wrapper: WrapperComponent });

    expect(getColorSchemeSpy).toHaveBeenCalledWith('light');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('dark');
    expect(result.current[0]).toEqual('dark');
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
