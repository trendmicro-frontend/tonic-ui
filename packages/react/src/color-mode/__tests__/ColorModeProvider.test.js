import { act, render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ColorModeProvider, useColorMode } from '@tonic-ui/react/src';
import React, { useCallback, useState } from 'react';
import * as colorModeUtils from '../utils';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('ColorModeProvider', () => {
  it('toggles color mode using a toggle button', async () => {
    const user = userEvent.setup();

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
    await user.click(toggleColorModeButton);
    expect(toggleColorModeButton).toHaveTextContent('dark');
  });

  it('toggles color mode using the toggle function', () => {
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

  it('prefers useSystemColorMode over defaultValue', () => {
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

  it('will not change current color mode with a controlled value', () => {
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

  it('changes color mode using the onChange callback', () => {
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
