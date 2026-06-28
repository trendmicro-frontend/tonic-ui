import { render } from '@tonic-ui/react/test-utils/render';
import { ResizeHandle } from '@tonic-ui/react/src';
import React, { act } from 'react';

describe('ResizeHandle', () => {
  it('should render correctly', () => {
    const renderOptions = {};
    const { container } = render((
      <ResizeHandle />
    ), renderOptions);

    expect(container).toMatchSnapshot();
  });

  it('should handle mouse resize events', () => {
    const onResizeStart = jest.fn();
    const onResize = jest.fn();
    const onResizeEnd = jest.fn();

    const { container } = render(
      <ResizeHandle
        onResizeStart={onResizeStart}
        onResize={onResize}
        onResizeEnd={onResizeEnd}
      />
    );

    const resizeHandle = container.firstChild;

    // Simulate mousedown
    const mouseDownEvent = new MouseEvent('mousedown', {
      bubbles: true,
      clientX: 100,
      clientY: 100,
    });
    act(() => { resizeHandle.dispatchEvent(mouseDownEvent); });

    expect(onResizeStart).toHaveBeenCalledWith({ clientX: 100, clientY: 100 });

    // Simulate mousemove
    const mouseMoveEvent = new MouseEvent('mousemove', {
      bubbles: true,
      clientX: 150,
      clientY: 150,
    });
    document.dispatchEvent(mouseMoveEvent);

    expect(onResize).toHaveBeenCalledWith({ clientX: 150, clientY: 150 });

    // Simulate mouseup
    const mouseUpEvent = new MouseEvent('mouseup', {
      bubbles: true,
      clientX: 200,
      clientY: 200,
    });
    act(() => { document.dispatchEvent(mouseUpEvent); });

    expect(onResizeEnd).toHaveBeenCalledWith({ clientX: 200, clientY: 200 });
  });

  it('should handle touch resize events', () => {
    const onResizeStart = jest.fn();
    const onResize = jest.fn();
    const onResizeEnd = jest.fn();

    const { container } = render(
      <ResizeHandle
        onResizeStart={onResizeStart}
        onResize={onResize}
        onResizeEnd={onResizeEnd}
      />
    );

    const resizeHandle = container.firstChild;

    // Simulate touchstart
    const touchStartEvent = new TouchEvent('touchstart', {
      bubbles: true,
      touches: [{ clientX: 100, clientY: 100 }],
    });
    act(() => { resizeHandle.dispatchEvent(touchStartEvent); });

    expect(onResizeStart).toHaveBeenCalledWith({ clientX: 100, clientY: 100 });

    // Simulate touchmove
    const touchMoveEvent = new TouchEvent('touchmove', {
      bubbles: true,
      cancelable: true,
      touches: [{ clientX: 150, clientY: 150 }],
    });
    document.dispatchEvent(touchMoveEvent);

    expect(onResize).toHaveBeenCalledWith({ clientX: 150, clientY: 150 });

    // Simulate touchend
    const touchEndEvent = new TouchEvent('touchend', {
      bubbles: true,
      cancelable: true,
      touches: [{ clientX: 200, clientY: 200 }],
    });
    act(() => { document.dispatchEvent(touchEndEvent); });

    expect(onResizeEnd).toHaveBeenCalledWith({ clientX: 200, clientY: 200 });
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
