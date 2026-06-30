import { render, renderHook } from '@testing-library/react';
import { TonicProvider, createTheme, useEnvironment, useTheme } from '@tonic-ui/react/src';
import React from 'react';

describe('TonicProvider', () => {
  const theme = createTheme();
  let consoleErrorSpy;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('should render without warnings when valid props are passed', () => {
    const { getByText } = render(
      <TonicProvider
        theme={theme}
        colorMode={{ defaultValue: 'dark' }}
        colorStyle={{ defaultValue: {} }}
        useCSSBaseline
        useCSSVariables
      >
        <div>App content</div>
      </TonicProvider>
    );

    expect(getByText('App content')).toBeInTheDocument();
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('should warn when "useCssBaseline" is passed instead of "useCSSBaseline"', () => {
    render(
      <TonicProvider theme={theme} useCssBaseline>
        <div>App content</div>
      </TonicProvider>
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'TonicProvider: "useCssBaseline" is not a valid prop. Did you mean "useCSSBaseline"?'
    );
  });

  it('should warn when "useCssVariables" is passed instead of "useCSSVariables"', () => {
    render(
      <TonicProvider theme={theme} useCssVariables>
        <div>App content</div>
      </TonicProvider>
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'TonicProvider: "useCssVariables" is not a valid prop. Did you mean "useCSSVariables"?'
    );
  });

  it('should warn when "colorMode" is not a plain object', () => {
    render(
      <TonicProvider theme={theme} colorMode="dark">
        <div>App content</div>
      </TonicProvider>
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'TonicProvider: "colorMode" prop must be an object if provided.'
    );
  });

  it('should warn when "colorStyle" is not a plain object', () => {
    render(
      <TonicProvider theme={theme} colorStyle="custom">
        <div>App content</div>
      </TonicProvider>
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'TonicProvider: "colorStyle" prop must be an object if provided.'
    );
  });

  it('should warn when "environment" is not a plain object', () => {
    render(
      <TonicProvider theme={theme} environment="invalid">
        <div>App content</div>
      </TonicProvider>
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'TonicProvider: "environment" prop must be an object if provided.'
    );
  });

  it('should provide default environment when "environment" prop is not provided', () => {
    const wrapper = ({ children }) => (
      <TonicProvider theme={theme}>{children}</TonicProvider>
    );
    const { result } = renderHook(() => useEnvironment(), { wrapper });

    expect(result.current.getRootNode()).toBe(document);
    expect(result.current.getDocument()).toBe(document);
    expect(result.current.getWindow()).toBe(window);
  });

  it('should provide environment context via "environment" prop', () => {
    const mockElement = document.createElement('div');
    const wrapper = ({ children }) => (
      <TonicProvider theme={theme} environment={{ value: mockElement }}>{children}</TonicProvider>
    );
    const { result } = renderHook(() => useEnvironment(), { wrapper });

    expect(result.current.getRootNode()).toBe(mockElement);
    expect(result.current.getDocument()).toBe(document);
    expect(result.current.getWindow()).toBe(window);
  });

  it('should accept "environment" prop with a function value', () => {
    const mockElement = document.createElement('section');
    const getRootNodeFn = () => mockElement;
    const wrapper = ({ children }) => (
      <TonicProvider theme={theme} environment={{ value: getRootNodeFn }}>{children}</TonicProvider>
    );
    const { result } = renderHook(() => useEnvironment(), { wrapper });

    expect(result.current.getRootNode()).toBe(mockElement);
  });

  it('should provide environment context for a ShadowRoot via "environment" prop', () => {
    const hostElement = document.createElement('div');
    document.body.appendChild(hostElement);
    const shadowRoot = hostElement.attachShadow({ mode: 'open' });

    const wrapper = ({ children }) => (
      <TonicProvider theme={theme} environment={{ value: shadowRoot }}>{children}</TonicProvider>
    );
    const { result } = renderHook(() => useEnvironment(), { wrapper });

    expect(result.current.getRootNode()).toBe(shadowRoot);
    expect(result.current.getDocument()).toBe(document);

    document.body.removeChild(hostElement);
  });

  it('should warn only once for repeated renders with misspelled props', () => {
    const { rerender } = render(
      <TonicProvider theme={theme} useCssBaseline useCssVariables>
        <div>App content</div>
      </TonicProvider>
    );

    rerender(
      <TonicProvider theme={theme} useCssBaseline useCssVariables>
        <div>App content updated</div>
      </TonicProvider>
    );

    const baselineCalls = consoleErrorSpy.mock.calls.filter(
      ([msg]) => msg === 'TonicProvider: "useCssBaseline" is not a valid prop. Did you mean "useCSSBaseline"?'
    );
    const variablesCalls = consoleErrorSpy.mock.calls.filter(
      ([msg]) => msg === 'TonicProvider: "useCssVariables" is not a valid prop. Did you mean "useCSSVariables"?'
    );
    expect(baselineCalls).toHaveLength(1);
    expect(variablesCalls).toHaveLength(1);
  });

  it('should render with defaultTheme when no theme prop is provided', () => {
    const wrapper = ({ children }) => (
      <TonicProvider>{children}</TonicProvider>
    );
    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(consoleErrorSpy).not.toHaveBeenCalled();
    expect(result.current).toBeDefined();
    expect(typeof result.current.get).toBe('function');
  });

  it('should render without warnings when theme is created using createTheme()', () => {
    const wrapper = ({ children }) => (
      <TonicProvider theme={theme}>{children}</TonicProvider>
    );
    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(consoleErrorSpy).not.toHaveBeenCalled();
    expect(result.current).toBeDefined();
    expect(typeof result.current.get).toBe('function');
  });

  it('should warn and auto-normalize when theme is a plain object', () => {
    const plainTheme = { colors: { brand: 'red' } };
    const wrapper = ({ children }) => (
      <TonicProvider theme={plainTheme}>{children}</TonicProvider>
    );
    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'TonicProvider: "theme" prop should be created using createTheme() for optimal performance. Pass a stable reference to avoid re-running createTheme() on every render.'
    );
    expect(result.current).toBeDefined();
    expect(typeof result.current.get).toBe('function');
  });
});
