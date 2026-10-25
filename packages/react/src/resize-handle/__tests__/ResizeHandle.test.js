import { render } from '@tonic-ui/react/test-utils/render';
import { ResizeHandle } from '@tonic-ui/react/src';
import React from 'react';

describe('ResizeHandle', () => {
  it('should render correctly', () => {
    const renderOptions = {};
    const { container } = render((
      <ResizeHandle />
    ), renderOptions);

    expect(container).toMatchSnapshot();
  });

  it('should ignore multi-touch events', () => {
    const onResizeStart = jest.fn();

    const { container } = render(
      <ResizeHandle
        onResizeStart={onResizeStart}
      />
    );

    const resizeHandle = container.firstChild;

    // Simulate touchstart with multiple touches
    const touchStartEvent = new TouchEvent('touchstart', {
      bubbles: true,
      touches: [
        { clientX: 100, clientY: 100 },
        { clientX: 200, clientY: 200 },
      ],
    });
    resizeHandle.dispatchEvent(touchStartEvent);

    expect(onResizeStart).not.toHaveBeenCalled();
  });

  it('should apply cursor style', () => {
    const { container } = render(
      <ResizeHandle />
    );

    const resizeHandle = container.firstChild;

    // Should have col-resize cursor
    expect(resizeHandle).toHaveStyle({
      cursor: 'col-resize',
    });
  });
});
