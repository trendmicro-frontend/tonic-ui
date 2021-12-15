import React, { useEffect, useState } from 'react';
import useHydrated from '../hooks/useHydrated';
import wrapEvent from '../utils/wrapEvent';
import { usePopover } from './context';
import Popper from '../Popper/Popper';
import PopperArrow from '../Popper/PopperArrow';
import { usePopoverContentStyle } from './styles';

const PopoverContent = ({
  onKeyDown,
  onBlur: onBlurProp,
  onMouseLeave,
  onMouseEnter,
  onFocus,
  children,
  ...props
}) => {
  const isHydrated = useHydrated();
  const {
    popoverRef,
    anchorRef,
    placement,
    popoverId,
    isOpen,
    onBlur,
    closeOnEsc,
    onClose,
    isHoveringRef,
    trigger,
    headerId,
    bodyId,
    usePortal,
    hideArrow,
    skidding,
    distance,
    delay,
    nextToCursor,
    followCursor,
    mousePageX,
    mousePageY,
    arrowAt,
  } = usePopover();
  const contentStyleProps = usePopoverContentStyle();

  const arrowSize = 12;
  let _skidding = skidding;
  let _distance = distance + 8; // Arrow height is 8px
  let eventHandlers = {};
  let roleProps = {};

  if (trigger === 'click') {
    eventHandlers = {
      onBlur: wrapEvent(onBlurProp, onBlur),
    };

    roleProps = {
      role: 'dialog',
      'aria-modal': 'false',
    };
  }

  const getOffset = (element, relativeTop = false) => {
    if (!element) {
      return 0;
    }
    return getOffset(element.offsetParent, relativeTop) + (relativeTop ? element.offsetTop : element.offsetLeft);
  };

  if ((nextToCursor || followCursor) && anchorRef.current) {
    const { offsetHeight } = anchorRef.current;
    const offsetLeft = getOffset(anchorRef.current);
    const offsetTop = getOffset(anchorRef.current, true);
    _skidding = mousePageX - offsetLeft + 8; // 8px is a estimated value of cursor
    _distance = -8 + (mousePageY - offsetTop - offsetHeight) + 24; // 24px is a estimated value of cursor
  }

  if (trigger === 'hover') {
    eventHandlers = {
      onMouseEnter: wrapEvent(onMouseEnter, () => {
        isHoveringRef.current = true;
      }),
      onMouseLeave: wrapEvent(onMouseLeave, () => {
        isHoveringRef.current = false;
        setTimeout(onClose, delay.hide);
      }),
    };

    roleProps = {
      role: 'tooltip',
    };
  }

  eventHandlers = {
    ...eventHandlers,
    onKeyDown: wrapEvent(onKeyDown, event => {
      if (event.key === 'Escape' && closeOnEsc) {
        onClose && onClose();
      }
    }),
  };

  if (!isHydrated) {
    return null;
  }

  return (
    <Popper
      aria-hidden={!isOpen}
      aria-labelledby={headerId}
      aria-describedby={bodyId}
      usePortal={usePortal}
      isOpen={isOpen}
      placement={placement}
      anchorEl={anchorRef.current}
      ref={popoverRef}
      id={popoverId}
      arrowSize={`${arrowSize}px`}
      modifiers={{ offset: [_skidding, _distance] }}
      {...contentStyleProps}
      {...roleProps}
      {...eventHandlers}
      {...props}
    >
      {!hideArrow && <PopperArrow arrowAt={arrowAt} />}
      {children}
    </Popper>
  );
};

PopoverContent.displayName = 'PopoverContent';

export default PopoverContent;
