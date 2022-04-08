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
      useEventListener('click', callback, ref.current);
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
});
