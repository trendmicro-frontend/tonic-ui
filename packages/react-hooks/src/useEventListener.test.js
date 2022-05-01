import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useRef } from 'react';
import useEventListener from './useEventListener';

describe('useEventListener', () => {
  it('should be defined', () => {
    expect(useEventListener).toBeDefined();
  });

  it('should trigger the callback when an event is fired', () => {
    const callback = jest.fn();
    const TestComponent = () => {
      const ref = useRef(null);
      useEventListener(() => ref.current, 'click', callback);
      return (
        <button type="button" ref={ref}>
          Click Me
        </button>
      );
    };
    render(<TestComponent />);
    userEvent.click(screen.getByText('Click Me'));
    expect(callback).toHaveBeenCalled();
  });

  it('should not trigger the callback if `eventHandler` is not provided', () => {
    const callback = jest.fn();
    const TestComponent = () => {
      const ref = useRef(null);
      useEventListener(() => ref.current, 'click');
      return (
        <button type="button" ref={ref}>
          Click Me
        </button>
      );
    };
    render(<TestComponent />);
    userEvent.click(screen.getByText('Click Me'));
    expect(callback).not.toHaveBeenCalled();
  });

  it('should not trigger the callback if `addEventListener()` and `removeEventListener()` are not present', () => {
    const callback = jest.fn();
    const TestComponent = () => {
      const ref = useRef(null);
      useEventListener(() => {
        ref.current.addEventListener = undefined;
        ref.current.removeEventListener = undefined;
        return ref.current;
      }, 'click', callback);
      return (
        <button type="button" ref={ref}>
          Click Me
        </button>
      );
    };
    render(<TestComponent />);
    userEvent.click(screen.getByText('Click Me'));
    expect(callback).not.toHaveBeenCalled();
  });
});
