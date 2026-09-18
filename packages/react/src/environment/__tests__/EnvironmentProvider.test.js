/* eslint-disable react/jsx-no-bind */
import { render, renderHook } from '@testing-library/react';
import React from 'react';
import EnvironmentProvider from '../EnvironmentProvider';
import useEnvironment from '../useEnvironment';

describe('EnvironmentProvider', () => {
  it('should have the correct displayName', () => {
    expect(EnvironmentProvider.displayName).toBe('EnvironmentProvider');
  });

  it('should provide default environment when value is undefined', () => {
    const WrapperComponent = ({ children }) => (
      <EnvironmentProvider value={undefined}>
        {children}
      </EnvironmentProvider>
    );
    const { result } = renderHook(() => useEnvironment(), { wrapper: WrapperComponent });

    const environment = result.current;
    expect(environment.getRootNode()).toBe(document);
    expect(environment.getDocument()).toBe(document);
    expect(environment.getWindow()).toBe(window);
  });

  it('should provide environment based on a Document node', () => {
    const mockDocument = document;
    const WrapperComponent = ({ children }) => (
      <EnvironmentProvider value={mockDocument}>
        {children}
      </EnvironmentProvider>
    );
    const { result } = renderHook(() => useEnvironment(), { wrapper: WrapperComponent });

    const environment = result.current;
    expect(environment.getRootNode()).toBe(mockDocument);
    expect(environment.getDocument()).toBe(mockDocument);
    expect(environment.getWindow()).toBe(window);
  });

  it('should provide environment based on a function returning a node', () => {
    const mockElement = document.createElement('div');
    const getRootNodeFn = () => mockElement;

    const WrapperComponent = ({ children }) => (
      <EnvironmentProvider value={getRootNodeFn}>
        {children}
      </EnvironmentProvider>
    );
    const { result } = renderHook(() => useEnvironment(), { wrapper: WrapperComponent });

    const environment = result.current;
    expect(environment.getRootNode()).toBe(mockElement);
    expect(environment.getDocument()).toBe(document);
    expect(environment.getWindow()).toBe(window);
  });

  it('should handle Element nodes and return their ownerDocument', () => {
    const mockElement = document.createElement('div');
    document.body.appendChild(mockElement);

    const WrapperComponent = ({ children }) => (
      <EnvironmentProvider value={mockElement}>
        {children}
      </EnvironmentProvider>
    );
    const { result } = renderHook(() => useEnvironment(), { wrapper: WrapperComponent });

    const environment = result.current;
    expect(environment.getRootNode()).toBe(mockElement);
    expect(environment.getDocument()).toBe(document);
    expect(environment.getWindow()).toBe(window);

    document.body.removeChild(mockElement);
  });

  it('should handle ShadowRoot nodes and return their ownerDocument', () => {
    const hostElement = document.createElement('div');
    document.body.appendChild(hostElement);

    // Create a shadow root
    const shadowRoot = hostElement.attachShadow({ mode: 'open' });

    const WrapperComponent = ({ children }) => (
      <EnvironmentProvider value={shadowRoot}>
        {children}
      </EnvironmentProvider>
    );
    const { result } = renderHook(() => useEnvironment(), { wrapper: WrapperComponent });

    const environment = result.current;
    expect(environment.getRootNode()).toBe(shadowRoot);
    expect(environment.getDocument()).toBe(document);
    expect(environment.getWindow()).toBe(window);

    document.body.removeChild(hostElement);
  });

  it.each([
    ['default', undefined],
    ['Document', document],
    ['getter', () => document],
  ])('should preserve the environment and getter references for the same %s value', (name, value) => {
    const WrapperComponent = ({ children }) => (
      <EnvironmentProvider value={value}>
        {children}
      </EnvironmentProvider>
    );
    const { result, rerender } = renderHook(() => useEnvironment(), { wrapper: WrapperComponent });
    const environment = result.current;

    rerender();

    expect(result.current).toBe(environment);
    expect(result.current.getRootNode).toBe(environment.getRootNode);
    expect(result.current.getDocument).toBe(environment.getDocument);
    expect(result.current.getWindow).toBe(environment.getWindow);
  });

  it('should update environment when value changes', () => {
    const mockElement1 = document.createElement('div');
    const mockElement2 = document.createElement('span');

    let currentNode = mockElement1;
    const WrapperComponent = ({ children }) => (
      <EnvironmentProvider value={currentNode}>
        {children}
      </EnvironmentProvider>
    );

    const { result, rerender } = renderHook(() => useEnvironment(), { wrapper: WrapperComponent });
    const environment = result.current;
    expect(environment.getRootNode()).toBe(mockElement1);

    currentNode = mockElement2;
    rerender();

    expect(result.current).not.toBe(environment);
    expect(result.current.getRootNode).not.toBe(environment.getRootNode);
    expect(result.current.getDocument).not.toBe(environment.getDocument);
    expect(result.current.getWindow).not.toBe(environment.getWindow);
    expect(result.current.getRootNode()).toBe(mockElement2);
    expect(result.current.getDocument()).toBe(document);
    expect(result.current.getWindow()).toBe(window);
  });

  it('should handle function value that returns different nodes', () => {
    let currentNode = document.createElement('div');
    const getRootNodeFn = () => currentNode;

    const WrapperComponent = ({ children }) => (
      <EnvironmentProvider value={getRootNodeFn}>
        {children}
      </EnvironmentProvider>
    );
    const { result, rerender } = renderHook(() => useEnvironment(), { wrapper: WrapperComponent });
    const environment = result.current;

    expect(result.current.getRootNode()).toBe(currentNode);

    // Change the node returned by the function
    currentNode = document.createElement('span');
    rerender();

    // The getRootNode should now return the new node
    expect(result.current).toBe(environment);
    expect(result.current.getRootNode()).toBe(currentNode);
    expect(result.current.getDocument()).toBe(document);
    expect(result.current.getWindow()).toBe(window);
  });

  it('should render children correctly', () => {
    const { getByTestId } = render(
      <EnvironmentProvider value={document}>
        <div data-testid="child">Test Content</div>
      </EnvironmentProvider>
    );

    expect(getByTestId('child')).toHaveTextContent('Test Content');
  });
});
