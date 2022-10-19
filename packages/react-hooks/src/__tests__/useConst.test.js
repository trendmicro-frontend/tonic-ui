import { render } from '@testing-library/react';
import React from 'react';
import { useConst } from '..';

describe('useConst', () => {
  it('should be defined', () => {
    expect(useConst).toBeDefined();
  });

  it('should return a constant value with a primitive initializer', () => {
    const primitiveInitializer = Math.random();
    const TestComponent = () => {
      const value = useConst(primitiveInitializer);
      return <div>{value}</div>;
    };
    const { container, rerender } = render(<TestComponent />);
    const firstValue = container.firstChild.textContent;
    // Re-render the same component
    rerender(<TestComponent />);
    const secondValue = container.firstChild.textContent;
    expect(firstValue).toBe(secondValue);
  });

  it('should return a constant value with a function initializer', () => {
    const mockFunctionInitializer = jest.fn(() => Math.random());
    const TestComponent = () => {
      const value = useConst(mockFunctionInitializer);
      return <div>{value}</div>;
    };
    const { container, rerender } = render(<TestComponent />);
    const firstValue = container.firstChild.textContent;
    // Re-render the same component
    rerender(<TestComponent />);
    const secondValue = container.firstChild.textContent;
    expect(firstValue).toBe(secondValue);
    expect(mockFunctionInitializer).toHaveBeenCalledTimes(1);
  });

  it('works with a primitive initializer that returns undefined', () => {
    const primitiveInitializer = undefined;
    const TestComponent = () => {
      const value = useConst(primitiveInitializer);
      return <div>{value}</div>;
    };
    const { container, rerender } = render(<TestComponent />);
    const firstValue = container.firstChild.textContent;
    // Re-render the same component
    rerender(<TestComponent />);
    const secondValue = container.firstChild.textContent;
    expect(firstValue).toBe(secondValue);
  });

  it('works with a function initializer that returns undefined', () => {
    const mockFunctionInitializer = jest.fn(() => undefined);
    const TestComponent = () => {
      const value = useConst(mockFunctionInitializer);
      return <div>{value}</div>;
    };
    const { container, rerender } = render(<TestComponent />);
    const firstValue = container.firstChild.textContent;
    // Re-render the same component
    rerender(<TestComponent />);
    const secondValue = container.firstChild.textContent;
    expect(firstValue).toBe(secondValue);
    expect(mockFunctionInitializer).toHaveBeenCalledTimes(1);
  });
});
