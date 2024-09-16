import { callEventHandlers } from '@tonic-ui/utils';
import React, { forwardRef, useCallback, useState } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { useResizeHandleStyle } from './styles';
import { getIsPassiveListenerSupported } from './utils';

const ResizeHandle = forwardRef((inProps, ref) => {
  const {
    onMouseDown: onMouseDownProp,
    onResize: onResizeProp,
    onResizeEnd: onResizeEndProp,
    onResizeStart: onResizeStartProp,
    onTouchStart: onTouchStartProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'ResizeHandle' });
  const [isResizing, setIsResizing] = useState(false);
  const styleProps = useResizeHandleStyle({ isResizing });

  const onMouseDown = useCallback((event) => {
    const clientX = event.clientX;
    const clientY = event.clientY;
    onResizeStartProp?.({ clientX, clientY });

    setIsResizing(true);

    const moveEvent = 'mousemove';
    const endEvent = 'mouseup';

    const eventHandler = {
      [moveEvent]: (event) => {
        const clientX = event.clientX;
        const clientY = event.clientY;
        onResizeProp?.({ clientX, clientY });
      },
      [endEvent]: (event) => {
        document.removeEventListener('mousemove', eventHandler[moveEvent]);
        document.removeEventListener('mouseup', eventHandler[endEvent]);
        setIsResizing(false);
        const clientX = event.clientX;
        const clientY = event.clientY;
        onResizeEndProp?.({ clientX, clientY });
      },
    };

    const addEventListenerOptions = getIsPassiveListenerSupported()
      ? { passive: false }
      : false;
    document.addEventListener('mousemove', eventHandler[moveEvent], addEventListenerOptions);
    document.addEventListener('mouseup', eventHandler[endEvent], addEventListenerOptions);
  }, [onResizeProp, onResizeEndProp, onResizeStartProp]);

  const onTouchStart = useCallback((event) => {
    const isTouchStartEvent = event.type === 'touchstart';

    if (isTouchStartEvent) {
      // Do not respond to multi-touch events (e.g. 2 or more fingers)
      if (Array.isArray(event.touches) && event.touches.length > 1) {
        return;
      }
    }

    const clientX = Array.isArray(event.touches) ? event.touches[0]?.clientX : undefined;
    const clientY = Array.isArray(event.touches) ? event.touches[0]?.clientY : undefined;
    onResizeStartProp?.({ clientX, clientY });

    setIsResizing(true);

    const moveEvent = 'touchmove';
    const endEvent = 'touchend';

    const eventHandler = {
      [moveEvent]: (event) => {
        if (event.cancelable) {
          event.preventDefault();
          event.stopPropagation();
        }
        const clientX = Array.isArray(event.touches) ? event.touches[0]?.clientX : undefined;
        const clientY = Array.isArray(event.touches) ? event.touches[0]?.clientY : undefined;
        onResizeProp?.({ clientX, clientY });
        return false;
      },
      [endEvent]: (event) => {
        document.removeEventListener('touchmove', eventHandler[moveEvent]);
        document.removeEventListener('touchend', eventHandler[endEvent]);
        if (event.cancelable) {
          event.preventDefault();
          event.stopPropagation();
        }
        setIsResizing(false);
        const clientX = Array.isArray(event.touches) ? event.touches[0]?.clientX : undefined;
        const clientY = Array.isArray(event.touches) ? event.touches[0]?.clientY : undefined;
        onResizeEndProp?.({ clientX, clientY });
      },
    };

    const addEventListenerOptions = getIsPassiveListenerSupported()
      ? { passive: false }
      : false;
    document.addEventListener('touchmove', eventHandler[moveEvent], addEventListenerOptions);
    document.addEventListener('touchend', eventHandler[endEvent], addEventListenerOptions);
  }, [onResizeProp, onResizeEndProp, onResizeStartProp]);

  return (
    <Box
      ref={ref}
      onMouseDown={callEventHandlers(onMouseDownProp, onMouseDown)}
      onTouchStart={callEventHandlers(onTouchStartProp, onTouchStart)}
      {...styleProps}
      {...rest}
    />
  );
});

ResizeHandle.displayName = 'ResizeHandle';

export default ResizeHandle;
