import { renderHook } from '@testing-library/react';
import React from 'react';
import EnvironmentProvider from '../EnvironmentProvider';
import useEnvironment from '../useEnvironment';

describe('useEnvironment', () => {
  it('should return default context when used outside EnvironmentProvider', () => {
    const { result } = renderHook(() => useEnvironment());

    const environment = result.current;
    expect(environment).toBeDefined();
    expect(typeof environment.getRootNode).toBe('function');
    expect(typeof environment.getDocument).toBe('function');
    expect(typeof environment.getWindow).toBe('function');
    expect(environment.getRootNode()).toBe(document);
    expect(environment.getDocument()).toBe(document);
    expect(environment.getWindow()).toBe(window);
  });

  it('should return environment context when used inside EnvironmentProvider', () => {
    const mockElement = document.createElement('div');
    const WrapperComponent = ({ children }) => (
      <EnvironmentProvider value={mockElement}>
        {children}
      </EnvironmentProvider>
    );

    const { result } = renderHook(() => useEnvironment(), { wrapper: WrapperComponent });

    const environment = result.current;
    expect(environment).toBeDefined();
    expect(environment.getRootNode()).toBe(mockElement);
    expect(environment.getDocument()).toBe(document);
    expect(environment.getWindow()).toBe(window);
  });

  it('should return correct getRootNode function', () => {
    const mockElement = document.createElement('section');
    const WrapperComponent = ({ children }) => (
      <EnvironmentProvider value={mockElement}>
        {children}
      </EnvironmentProvider>
    );

    const { result } = renderHook(() => useEnvironment(), { wrapper: WrapperComponent });

    expect(result.current.getRootNode()).toBe(mockElement);
  });

  it('should return correct getDocument function', () => {
    const mockElement = document.createElement('div');
    const WrapperComponent = ({ children }) => (
      <EnvironmentProvider value={mockElement}>
        {children}
      </EnvironmentProvider>
    );

    const { result } = renderHook(() => useEnvironment(), { wrapper: WrapperComponent });

    expect(result.current.getDocument()).toBe(document);
    expect(result.current.getDocument()).toBe(mockElement.ownerDocument);
  });

  it('should return correct getWindow function', () => {
    const mockElement = document.createElement('div');
    const WrapperComponent = ({ children }) => (
      <EnvironmentProvider value={mockElement}>
        {children}
      </EnvironmentProvider>
    );

    const { result } = renderHook(() => useEnvironment(), { wrapper: WrapperComponent });

    expect(result.current.getWindow()).toBe(window);
    expect(result.current.getWindow()).toBe(document.defaultView);
  });

  it('should handle function value in EnvironmentProvider', () => {
    const mockElement = document.createElement('article');
    const getRootNodeFn = () => mockElement;

    const WrapperComponent = ({ children }) => (
      <EnvironmentProvider value={getRootNodeFn}>
        {children}
      </EnvironmentProvider>
    );

    const { result } = renderHook(() => useEnvironment(), { wrapper: WrapperComponent });

    expect(result.current.getRootNode()).toBe(mockElement);
    expect(result.current.getDocument()).toBe(document);
    expect(result.current.getWindow()).toBe(window);
  });

  it('should handle nested EnvironmentProviders', () => {
    const outerElement = document.createElement('div');
    const innerElement = document.createElement('span');

    const WrapperComponent = ({ children }) => (
      <EnvironmentProvider value={outerElement}>
        <EnvironmentProvider value={innerElement}>
          {children}
        </EnvironmentProvider>
      </EnvironmentProvider>
    );

    const { result } = renderHook(() => useEnvironment(), { wrapper: WrapperComponent });

    // Should use the innermost provider
    expect(result.current.getRootNode()).toBe(innerElement);
  });

  it('should return default context when EnvironmentProvider value is null', () => {
    const WrapperComponent = ({ children }) => (
      <EnvironmentProvider value={null}>
        {children}
      </EnvironmentProvider>
    );

    const { result } = renderHook(() => useEnvironment(), { wrapper: WrapperComponent });

    expect(result.current.getRootNode()).toBe(document);
    expect(result.current.getDocument()).toBe(document);
    expect(result.current.getWindow()).toBe(window);
  });

  it('should handle ShadowRoot correctly', () => {
    const hostElement = document.createElement('div');
    document.body.appendChild(hostElement);
    const shadowRoot = hostElement.attachShadow({ mode: 'open' });

    const WrapperComponent = ({ children }) => (
      <EnvironmentProvider value={shadowRoot}>
        {children}
      </EnvironmentProvider>
    );

    const { result } = renderHook(() => useEnvironment(), { wrapper: WrapperComponent });

    expect(result.current.getRootNode()).toBe(shadowRoot);
    expect(result.current.getDocument()).toBe(document);
    expect(result.current.getWindow()).toBe(window);

    document.body.removeChild(hostElement);
  });

  it('should handle Document node correctly', () => {
    const WrapperComponent = ({ children }) => (
      <EnvironmentProvider value={document}>
        {children}
      </EnvironmentProvider>
    );

    const { result } = renderHook(() => useEnvironment(), { wrapper: WrapperComponent });

    expect(result.current.getRootNode()).toBe(document);
    expect(result.current.getDocument()).toBe(document);
    expect(result.current.getWindow()).toBe(window);
  });
});
