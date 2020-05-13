import React, { Children, cloneElement, useRef } from 'react';
import wrapEvent from '../utils/wrapEvent';
import { usePopover } from './context';
import PseudoBox from '../PseudoBox';

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
    delay,
  } = usePopover();
  const _children = <PseudoBox role="button" tabIndex="0" display="inline-block">{children}</PseudoBox>; // always wrap a div to make sure the element can be bound event.
  const child = Children.only(_children);
  let eventHandlers = {};

  if (trigger === 'click') {
    eventHandlers = {
      onClick: wrapEvent(child.props.onClick, onToggle),
      onKeyDown: wrapEvent(child.props.onKeyDown, event => {
        if (event.key === 'Enter') {
          setTimeout(onOpen, delay.show);
        }
      }),
    };
  }

  const openTimeout = useRef(null);

  if (trigger === 'hover') {
    eventHandlers = {
      onFocus: wrapEvent(child.props.onFocus, onOpen),
      onKeyDown: wrapEvent(child.props.onKeyDown, event => {
        if (event.key === 'Escape') {
          setTimeout(onClose, delay.hide);
        }
      }),
      onBlur: wrapEvent(child.props.onBlur, onClose),
      onMouseEnter: wrapEvent(child.props.onMouseEnter, () => {
        isHoveringRef.current = true;
        openTimeout.current = setTimeout(onOpen, delay.show);
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
        }, delay.hide || 100); // keep opening popover when cursor quick move from trigger element to popover.
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
