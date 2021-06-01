import React, { Children, cloneElement, useRef, useState } from 'react';
import Box from '../Box';
import wrapEvent from '../utils/wrapEvent';
import { usePopover } from './context';

const PopoverTrigger = ({
  children,
  shouldWrapChildren,
}) => {
  const {
    anchorRef,
    popoverId,
    onToggle,
    trigger,
    onOpen,
    isOpen,
    onClose,
    isHoveringRef,
    enterDelay,
    leaveDelay,
    setMouseCoordinate,
    nextToCursor,
    followCursor
  } = usePopover();
  const openTimeout = useRef(null);
  const [enableMouseMove, setEnableMouseMove] = useState(true);
  const eventHandlerProps = {};

  if (trigger === 'click') {
    eventHandlerProps.onClick = onToggle;
    eventHandlerProps.onKeyDown = (event) => {
      if (event.key === 'Enter') {
        setTimeout(onOpen, enterDelay);
      }
    };
  }

  if (trigger === 'hover') {
    eventHandlerProps.onFocus = onOpen;
    eventHandlerProps.onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setTimeout(onClose, leaveDelay);
      }
    };
    eventHandlerProps.onBlur = onClose;
    eventHandlerProps.onMouseEnter = (event) => {
      isHoveringRef.current = true;
      openTimeout.current = setTimeout(() => {
        setEnableMouseMove(followCursor);
        onOpen();
      }, enterDelay || ((nextToCursor || followCursor) && 500));
    };
    eventHandlerProps.onMouseLeave = (event) => {
      isHoveringRef.current = false;
      setEnableMouseMove(true);
      if (openTimeout.current) {
        clearTimeout(openTimeout.current);
        openTimeout.current = null;
      }
      setTimeout(() => {
        if (isHoveringRef.current === false) {
          onClose();
        }
      }, leaveDelay || 100); // keep opening popover when cursor quick move from trigger element to popover.
    };
    eventHandlerProps.onMouseMove = (event) => {
      (enableMouseMove || followCursor) && setMouseCoordinate(event);
    };
  }

  if (typeof children === 'string' || shouldWrapChildren) {
    return (
      <Box
        ref={anchorRef}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={popoverId}
        display="inline-block"
        role="button"
        tabIndex="0"
        outline="0"
        {...eventHandlerProps}
      >
        {children}
      </Box>
    );
  }

  const child = Children.only(children);

  for (const [eventName, eventHandler] of Object.entries(eventHandlerProps)) {
    const wrappedEventHandler = wrapEvent(child.props[eventName], eventHandler);
    eventHandlerProps[eventName] = wrappedEventHandler;
  }

  return cloneElement(child, {
    ref: (node) => {
      anchorRef.current = node;

      if (child.ref === undefined || child.ref === null) {
        return;
      }

      if (typeof child.ref === 'function') {
        child.ref(anchorRef.current);
        return;
      }

      if (Object.prototype.hasOwnProperty.call(child.ref, 'current')) {
        child.ref.current = anchorRef.current;
        return;
      }
    },
    'aria-haspopup': 'dialog',
    'aria-expanded': isOpen,
    'aria-controls': popoverId,
    role: 'button',
    tabIndex: '0',
    outline: '0',
    ...eventHandlerProps,
  });
};

PopoverTrigger.displayName = 'PopoverTrigger';

export default PopoverTrigger;
