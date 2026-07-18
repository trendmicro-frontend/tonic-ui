import { callEventHandlers } from '@tonic-ui/utils';
import React, { forwardRef, useCallback, useState } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { useEnvironment } from '../environment';
import { useResizeHandleStyle } from './styles';
import { getIsPassiveListenerSupported } from './utils';

/**
 * @typedef {Object} ResizeHandleProps
 * @property {React.ReactNode} [children] - The content of the `ResizeHandle`.
 * @property {(event: { clientX: number; clientY: number }) => void} [onResize] - A callback function that is called when the resize handle is dragged. It receives an object with properties `clientX` and `clientY`.
 * @property {(event: { clientX: number; clientY: number }) => void} [onResizeEnd] - A callback function that is called when the resize handle is released. It receives an object with properties `clientX` and `clientY`.
 * @property {(event: { clientX: number; clientY: number }) => void} [onResizeStart] - A callback function that is called when the resize handle is pressed down. It receives an object with properties `clientX` and `clientY`.
 */

/**
 * @type {ForwardRefComponent<'div', ResizeHandleProps>}
 */
const ResizeHandle = forwardRef((inProps, ref) => {
  const {
    onMouseDown: onMouseDownProp,
    onResize: onResizeProp,
    onResizeEnd: onResizeEndProp,
    onResizeStart: onResizeStartProp,
    onTouchStart: onTouchStartProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'ResizeHandle' });
  const { getDocument, getWindow } = useEnvironment();
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
        ownerDocument.removeEventListener('mousemove', eventHandler[moveEvent]);
        ownerDocument.removeEventListener('mouseup', eventHandler[endEvent]);
        setIsResizing(false);
        const clientX = event.clientX;
        const clientY = event.clientY;
        onResizeEndProp?.({ clientX, clientY });
      },
    };

    const ownerDocument = getDocument();
    const addEventListenerOptions = getIsPassiveListenerSupported(getWindow())
      ? { passive: false }
      : false;
    ownerDocument.addEventListener('mousemove', eventHandler[moveEvent], addEventListenerOptions);
    ownerDocument.addEventListener('mouseup', eventHandler[endEvent], addEventListenerOptions);
  }, [getDocument, getWindow, onResizeProp, onResizeEndProp, onResizeStartProp]);

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
        ownerDocument.removeEventListener('touchmove', eventHandler[moveEvent]);
        ownerDocument.removeEventListener('touchend', eventHandler[endEvent]);
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

    const ownerDocument = getDocument();
    const addEventListenerOptions = getIsPassiveListenerSupported(getWindow())
      ? { passive: false }
      : false;
    ownerDocument.addEventListener('touchmove', eventHandler[moveEvent], addEventListenerOptions);
    ownerDocument.addEventListener('touchend', eventHandler[endEvent], addEventListenerOptions);
  }, [getDocument, getWindow, onResizeProp, onResizeEndProp, onResizeStartProp]);

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
