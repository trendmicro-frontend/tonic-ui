import { useEventListener, useMergeRefs } from '@tonic-ui/react-hooks';
import { ariaAttr, callEventHandlers } from '@tonic-ui/utils';
import React, { cloneElement, forwardRef, useRef, useState } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { mergeRefs } from '../utils/refs';
import { usePopoverTriggerStyle } from './styles';
import usePopover from './usePopover';

const PopoverTrigger = forwardRef((inProps, ref) => {
  const {
    children,
    shouldWrapChildren = false,
    onBlur: onBlurProp,
    onClick: onClickProp,
    onFocus: onFocusProp,
    onKeyDown: onKeyDownProp,
    onMouseEnter: onMouseEnterProp,
    onMouseLeave: onMouseLeaveProp,
    onMouseMove: onMouseMoveProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'PopoverTrigger' });
  const {
    followCursor,
    isHoveringContentRef,
    isHoveringTriggerRef,
    isOpen,
    onClose,
    onOpen,
    popoverId,
    popoverTriggerId,
    popoverTriggerRef,
    setMousePageX,
    setMousePageY,
    trigger,
  } = usePopover();
  const combinedRef = useMergeRefs(popoverTriggerRef, ref);
  const styleProps = usePopoverTriggerStyle();
  const [enableMouseMove, setEnableMouseMove] = useState(true);
  const mouseLeaveTimeoutRef = useRef();
  const eventHandler = {};

  if (trigger === 'click') {
    eventHandler.onClick = function (event) {
      if (isOpen) {
        onClose();
      } else {
        onOpen();
      }
    };
    eventHandler.onKeyDown = function (event) {
      if (event.key === 'Enter') {
        onOpen();
      }
    };
  }

  if (trigger === 'hover') {
    eventHandler.onBlur = function (event) {
      onClose();
    };
    eventHandler.onFocus = function (event) {
      onOpen();
    };
    eventHandler.onKeyDown = function (event) {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    eventHandler.onMouseEnter = function (event) {
      isHoveringTriggerRef.current = true;
      if (mouseLeaveTimeoutRef.current) {
        clearTimeout(mouseLeaveTimeoutRef.current);
        mouseLeaveTimeoutRef.current = undefined;
      }

      setEnableMouseMove(true); // track mouse movement
      onOpen(() => { // callback
        setEnableMouseMove(followCursor); // after the enter delay, track mouse movement only if "followCursor" is true
      });
    };
    eventHandler.onMouseLeave = function (event) {
      isHoveringTriggerRef.current = false;
      if (mouseLeaveTimeoutRef.current) {
        clearTimeout(mouseLeaveTimeoutRef.current);
        mouseLeaveTimeoutRef.current = undefined;
      }
      mouseLeaveTimeoutRef.current = setTimeout(() => {
        mouseLeaveTimeoutRef.current = undefined;
        if (!isHoveringContentRef.current && !isHoveringTriggerRef.current) {
          onClose(() => { // callback
            setEnableMouseMove(true);
          });
        }
      }, 100); // XXX: keep opening popover when cursor quickly move between trigger and content
    };
    eventHandler.onMouseMove = function (event) {
      if (enableMouseMove || followCursor) {
        setMousePageX(event.pageX);
        setMousePageY(event.pageY);
      }
    };
  }

  /**
   * This allows for catching the "mouseleave" event when the popover trigger is disabled.
   * There is currently a known issue in React regarding the onMouseLeave polyfill.
   * @see https://github.com/facebook/react/issues/11972
   */
  useEventListener(
    () => popoverTriggerRef.current,
    'mouseleave',
    eventHandler.onMouseLeave,
  );

  const getPopoverTriggerProps = (ownProps = {}, ownRef = null) => {
    return {
      ...ownProps,
      'aria-haspopup': 'dialog',
      'aria-controls': popoverId,
      'aria-describedby': isOpen ? popoverId : undefined,
      'aria-expanded': ariaAttr(isOpen),
      id: popoverTriggerId,
      onBlur: callEventHandlers(ownProps?.onBlur, onBlurProp, eventHandler.onBlur),
      onClick: callEventHandlers(ownProps?.onClick, onClickProp, eventHandler.onClick),
      onFocus: callEventHandlers(ownProps?.onFocus, onFocusProp, eventHandler.onFocus),
      onKeyDown: callEventHandlers(ownProps?.onKeyDown, onKeyDownProp, eventHandler.onKeyDown),
      onMouseEnter: callEventHandlers(ownProps?.onMouseEnter, onMouseEnterProp, eventHandler.onMouseEnter),
      onMouseLeave: callEventHandlers(ownProps?.onMouseLeave, onMouseLeaveProp, eventHandler.onMouseLeave),
      onMouseMove: callEventHandlers(ownProps?.onMouseMove, onMouseMoveProp, eventHandler.onMouseMove),
      ref: mergeRefs(combinedRef, ownRef),
      ...styleProps,
      ...rest,
    };
  };

  if (typeof children === 'function') {
    return children({ getPopoverTriggerProps });
  }

  if (shouldWrapChildren) {
    return (
      <Box {...getPopoverTriggerProps()}>
        {children}
      </Box>
    );
  }

  // Ensure popover has only one child node
  const child = React.Children.only(children);
  const popoverTriggerProps = getPopoverTriggerProps(child?.props, child?.ref);

  return cloneElement(child, popoverTriggerProps);
});

PopoverTrigger.displayName = 'PopoverTrigger';

export default PopoverTrigger;
