import { Children, cloneElement, useRef, useState } from 'react';
import wrapEvent from '../utils/wrapEvent';
import { usePopover } from './context';

const PopoverTrigger = ({ children }) => {
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
  const [enableMouseMove, setEnableMouseMove] = useState(true);
  const child = Children.only(children);
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
      onMouseMove: wrapEvent(child.props.onMouseMove, (event) => {
        (enableMouseMove || followCursor) && setMouseCoordinate(event);
      }),
      onMouseEnter: wrapEvent(child.props.onMouseEnter, () => {
        isHoveringRef.current = true;
        openTimeout.current = setTimeout(() => {
          setEnableMouseMove(followCursor);
          onOpen();
        }, delay.show || ((nextToCursor || followCursor) && 500));
      }),
      onMouseLeave: wrapEvent(child.props.onMouseLeave, () => {
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
      }),
    };
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
    ...eventHandlers,
  });
};

PopoverTrigger.displayName = 'PopoverTrigger';

export default PopoverTrigger;
