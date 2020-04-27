import React, { Children, cloneElement, useRef } from 'react';
import wrapEvent from '../utils/wrapEvent';
import { usePopover } from './context';
import Box from '../Box';

const PopoverTrigger = ({ children }) => {
  const {
    referenceRef,
    popoverId,
    onToggle,
    trigger,
    onOpen,
    isOpen,
    onClose,
    isHoveringRef,
    showDelay,
    hideDelay,
  } = usePopover();
  const _children = <Box display="inline-block">{children}</Box>; // always wrap a div to make sure the element can be bound event.
  const child = Children.only(_children);
  let eventHandlers = {};

  if (trigger === 'click') {
    eventHandlers = {
      onClick: wrapEvent(child.props.onClick, onToggle),
    };
  }

  const openTimeout = useRef(null);

  if (trigger === 'hover') {
    eventHandlers = {
      onFocus: wrapEvent(child.props.onFocus, onOpen),
      onKeyDown: wrapEvent(child.props.onKeyDown, event => {
        if (event.key === 'Escape') {
          setTimeout(onClose, hideDelay);
        }
      }),
      onBlur: wrapEvent(child.props.onBlur, onClose),
      onMouseEnter: wrapEvent(child.props.onMouseEnter, () => {
        isHoveringRef.current = true;
        openTimeout.current = setTimeout(onOpen, showDelay);
      }),
      onMouseLeave: wrapEvent(child.props.onMouseLeave, () => {
        isHoveringRef.current = false;
        if (openTimeout.current) {
          clearTimeout(openTimeout.current);
          openTimeout.current = null;
        }
        setTimeout(() => {
          if (isHoveringRef.current === false) {
            onClose();
          }
        }, hideDelay);
      }),
    };
  }

  return cloneElement(child, {
    'aria-haspopup': 'dialog',
    'aria-expanded': isOpen,
    'aria-controls': popoverId,
    ref: referenceRef,
    ...eventHandlers,
  });
};

PopoverTrigger.displayName = 'PopoverTrigger';

export default PopoverTrigger;
