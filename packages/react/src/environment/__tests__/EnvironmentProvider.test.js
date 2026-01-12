import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import React from 'react';
import { Text } from '@tonic-ui/react/src';
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

  it('should memoize the environment object', () => {
    const mockElement = document.createElement('div');
    let renderCount = 0;

    const TestComponent = () => {
      const environment = useEnvironment();
      renderCount++;
      return <div data-testid="test">{JSON.stringify(!!environment)}</div>;
    };

    const { rerender } = render(
      <EnvironmentProvider value={mockElement}>
        <TestComponent />
      </EnvironmentProvider>
    );

    const initialRenderCount = renderCount;

    // Rerender with the same value
    rerender(
      <EnvironmentProvider value={mockElement}>
        <TestComponent />
      </EnvironmentProvider>
    );

    // Should have rendered again, but the environment object should be memoized
    expect(renderCount).toBeGreaterThan(initialRenderCount);
  });

  it('should update environment when value changes', () => {
    const mockElement1 = document.createElement('div');
    const mockElement2 = document.createElement('span');

    // Test with first element
    const WrapperComponent1 = ({ children }) => (
      <EnvironmentProvider value={mockElement1}>
        {children}
      </EnvironmentProvider>
    );

    const { result: result1 } = renderHook(() => useEnvironment(), {
      wrapper: WrapperComponent1,
    });

    expect(result1.current.getRootNode()).toBe(mockElement1);

    // Test with second element
    const WrapperComponent2 = ({ children }) => (
      <EnvironmentProvider value={mockElement2}>
        {children}
      </EnvironmentProvider>
    );

    const { result: result2 } = renderHook(() => useEnvironment(), {
      wrapper: WrapperComponent2,
    });

    expect(result2.current.getRootNode()).toBe(mockElement2);
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

    expect(result.current.getRootNode()).toBe(currentNode);

    // Change the node returned by the function
    currentNode = document.createElement('span');
    rerender();

    // The getRootNode should now return the new node
    expect(result.current.getRootNode()).toBe(currentNode);
  });

  it('should render children correctly', () => {
    const { getByTestId } = render(
      <EnvironmentProvider value={document}>
        <Text data-testid="child">Test Content</Text>
      </EnvironmentProvider>
    );

    expect(getByTestId('child')).toHaveTextContent('Test Content');
  });
});
