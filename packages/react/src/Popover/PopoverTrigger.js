import React, { forwardRef, useRef, useState } from 'react';
import Box from '../Box';
import useEffectOnce from '../hooks/useEffectOnce';
import useForkRef from '../utils/useForkRef';
import warnRemovedProps from '../utils/warnRemovedProps';
import { usePopover } from './context';

const PopoverTrigger = forwardRef((
  {
    shouldWrapChildren, // removed

    children,
    ...rest
  },
  ref,
) => {
  useEffectOnce(() => {
    const prefix = `${PopoverTrigger.displayName}:`;

    if (shouldWrapChildren !== undefined && !shouldWrapChildren) {
      warnRemovedProps('shouldWrapChildren', {
        prefix,
        message: 'Use Function as Child Component (FaCC) to render the popover trigger instead.',
      });
    }
  });

  const {
    anchorRef,
    popoverId,
    onToggle,
    trigger,
    onOpen,
    isOpen,
    onClose,
    isHoveringRef,
    delay,
    setMouseCoordinate,
    nextToCursor,
    followCursor
  } = usePopover();
  const combinedRef = useForkRef(ref, anchorRef);
  const openTimeout = useRef(null);
  const [enableMouseMove, setEnableMouseMove] = useState(true);
  const eventHandlerProps = {};

  if (trigger === 'click') {
    eventHandlerProps.onClick = onToggle;
    eventHandlerProps.onKeyDown = (event) => {
      if (event.key === 'Enter') {
        setTimeout(onOpen, delay.show);
      }
    };
  }

  if (trigger === 'hover') {
    eventHandlerProps.onFocus = onOpen;
    eventHandlerProps.onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setTimeout(onClose, delay.hide);
      }
    };
    eventHandlerProps.onBlur = onClose;
    eventHandlerProps.onMouseEnter = (event) => {
      isHoveringRef.current = true;
      openTimeout.current = setTimeout(() => {
        setEnableMouseMove(followCursor);
        onOpen();
      }, delay.show || ((nextToCursor || followCursor) && 500));
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
      }, delay.hide || 100); // keep opening popover when cursor quick move from trigger element to popover.
    };
    eventHandlerProps.onMouseMove = (event) => {
      (enableMouseMove || followCursor) && setMouseCoordinate(event);
    };
  }

  const getPopoverTriggerProps = () => {
    const popoverTriggerStyleProps = {
      display: 'inline-block',
      outline: '0',
    };

    return {
      'aria-haspopup': 'dialog',
      'aria-expanded': isOpen,
      'aria-controls': popoverId,
      ref: combinedRef,
      role: 'button',
      tabIndex: '0',
      ...popoverTriggerStyleProps,
      ...eventHandlerProps,
    };
  };

  if (typeof children === 'function') {
    return children({ getPopoverTriggerProps });
  }

  return (
    <Box
      {...getPopoverTriggerProps()}
      {...rest}
    >
      {children}
    </Box>
  );
});

PopoverTrigger.displayName = 'PopoverTrigger';

export default PopoverTrigger;
