import { render, renderHook } from '@testing-library/react';
import React from 'react';
import { Text } from '@tonic-ui/react/src';
import TonicProvider from '../TonicProvider';
import useEnvironment from '../../environment/useEnvironment';
import { useColorMode } from '../../color-mode';
import { useTheme } from '../../theme';

describe('TonicProvider', () => {
  it('should render children correctly', () => {
    const { getByTestId } = render(
      <TonicProvider>
        <Text data-testid="child">Test Content</Text>
      </TonicProvider>
    );

    expect(getByTestId('child')).toHaveTextContent('Test Content');
  });

  it('should provide environment context via environment prop', () => {
    const mockElement = document.createElement('div');

    const WrapperComponent = ({ children }) => (
      <TonicProvider environment={{ value: mockElement }}>
        {children}
      </TonicProvider>
    );

    const { result } = renderHook(() => useEnvironment(), { wrapper: WrapperComponent });

    expect(result.current.getRootNode()).toBe(mockElement);
    expect(result.current.getDocument()).toBe(document);
    expect(result.current.getWindow()).toBe(window);
  });

  it('should provide default environment when environment prop is not provided', () => {
    const WrapperComponent = ({ children }) => (
      <TonicProvider>
        {children}
      </TonicProvider>
    );

    const { result } = renderHook(() => useEnvironment(), { wrapper: WrapperComponent });

    expect(result.current.getRootNode()).toBe(document);
    expect(result.current.getDocument()).toBe(document);
    expect(result.current.getWindow()).toBe(window);
  });

  it('should accept environment prop with function value', () => {
    const mockElement = document.createElement('section');
    const getRootNodeFn = () => mockElement;

    const WrapperComponent = ({ children }) => (
      <TonicProvider environment={{ value: getRootNodeFn }}>
        {children}
      </TonicProvider>
    );

    const { result } = renderHook(() => useEnvironment(), { wrapper: WrapperComponent });

    expect(result.current.getRootNode()).toBe(mockElement);
  });

  it('should log error when colorMode prop is not an object', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <TonicProvider colorMode="invalid">
        Test
      </TonicProvider>
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('TonicProvider: "colorMode" prop must be an object if provided.')
    );

    consoleErrorSpy.mockRestore();
  });

  it('should log error when colorStyle prop is not an object', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <TonicProvider colorStyle="invalid">
        Test
      </TonicProvider>
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('TonicProvider: "colorStyle" prop must be an object if provided.')
    );

    consoleErrorSpy.mockRestore();
  });

  it('should log error when environment prop is not an object', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <TonicProvider environment="invalid">
        Test
      </TonicProvider>
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('TonicProvider: "environment" prop must be an object if provided.')
    );

    consoleErrorSpy.mockRestore();
  });

  it('should provide color mode context', () => {
    const WrapperComponent = ({ children }) => (
      <TonicProvider colorMode={{ value: 'dark' }}>
        {children}
      </TonicProvider>
    );

    const { result } = renderHook(() => useColorMode(), { wrapper: WrapperComponent });

    expect(result.current).toBeDefined();
  });

  it('should provide theme context', () => {
    const customTheme = {
      colors: { primary: 'blue' }
    };

    const WrapperComponent = ({ children }) => (
      <TonicProvider theme={customTheme}>
        {children}
      </TonicProvider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper: WrapperComponent });

    expect(result.current).toBeDefined();
  });

  it('should render without errors when useCSSBaseline is true', () => {
    const { getByText } = render(
      <TonicProvider useCSSBaseline={true}>
        Test
      </TonicProvider>
    );

    // Verify the component renders correctly with CSSBaseline
    expect(getByText('Test')).toBeInTheDocument();
  });

  it('should render without errors when useCSSBaseline is false', () => {
    const { getByText } = render(
      <TonicProvider useCSSBaseline={false}>
        Test
      </TonicProvider>
    );

    // Verify the component renders correctly without CSSBaseline
    expect(getByText('Test')).toBeInTheDocument();
  });

  it('should handle all props together', () => {
    const mockElement = document.createElement('div');
    const customTheme = {
      colors: { primary: 'blue' }
    };

    const WrapperComponent = ({ children }) => (
      <TonicProvider
        colorMode={{ value: 'dark' }}
        colorStyle={{ value: {} }}
        environment={{ value: mockElement }}
        theme={customTheme}
        useCSSBaseline={true}
      >
        {children}
      </TonicProvider>
    );

    const { result: envResult } = renderHook(() => useEnvironment(), { wrapper: WrapperComponent });
    const { result: themeResult } = renderHook(() => useTheme(), { wrapper: WrapperComponent });
    const { result: colorModeResult } = renderHook(() => useColorMode(), { wrapper: WrapperComponent });

    expect(envResult.current.getRootNode()).toBe(mockElement);
    expect(themeResult.current).toBeDefined();
    expect(colorModeResult.current).toBeDefined();
  });

  it('should work with ShadowRoot in environment prop', () => {
    const hostElement = document.createElement('div');
    document.body.appendChild(hostElement);
    const shadowRoot = hostElement.attachShadow({ mode: 'open' });

    const WrapperComponent = ({ children }) => (
      <TonicProvider environment={{ value: shadowRoot }}>
        {children}
      </TonicProvider>
    );

    const { result } = renderHook(() => useEnvironment(), { wrapper: WrapperComponent });

    expect(result.current.getRootNode()).toBe(shadowRoot);
    expect(result.current.getDocument()).toBe(document);

    document.body.removeChild(hostElement);
  });
});
