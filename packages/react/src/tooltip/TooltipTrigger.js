import { useEventListener, useMergeRefs } from '@tonic-ui/react-hooks';
import { callEventHandlers, getOwnerDocument } from '@tonic-ui/utils';
import React, { cloneElement, forwardRef, useState } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { mergeRefs } from '../utils/refs';
import { useTooltipTriggerStyle } from './styles';
import useTooltip from './useTooltip';

const TooltipTrigger = forwardRef((inProps, ref) => {
  const {
    children,
    shouldWrapChildren = false,
    onBlur: onBlurProp,
    onClick: onClickProp,
    onFocus: onFocusProp,
    onMouseEnter: onMouseEnterProp,
    onMouseLeave: onMouseLeaveProp,
    onMouseMove: onMouseMoveProp,
    onPointerDown: onPointerDownProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'TooltipTrigger' });
  const {
    closeOnClick,
    closeOnEsc,
    closeOnPointerDown,
    followCursor,
    isOpen,
    onClose,
    onOpen,
    openOnFocus,
    setMousePageX,
    setMousePageY,
    tooltipId,
    tooltipTriggerId,
    tooltipTriggerRef,
  } = useTooltip();
  const combinedRef = useMergeRefs(tooltipTriggerRef, ref);
  const styleProps = useTooltipTriggerStyle();
  const [enableMouseMove, setEnableMouseMove] = useState(true);
  const eventHandler = {};

  eventHandler.onBlur = function (event) {
    if (isOpen) {
      onClose();
    }
  };
  eventHandler.onClick = function (event) {
    if (isOpen && closeOnClick) {
      onClose();
    }
  };
  eventHandler.onFocus = function (event) {
    if (!isOpen && openOnFocus) {
      onOpen();
    }
  };
  eventHandler.onKeyDown = function (event) {
    if (isOpen && closeOnEsc && event.key === 'Escape') {
      onClose();
    }
  };
  eventHandler.onMouseEnter = function (event) {
    setEnableMouseMove(true); // track mouse movement
    onOpen(() => { // callback
      setEnableMouseMove(followCursor); // after the enter delay, track mouse movement only if "followCursor" is true
    });
  };
  eventHandler.onMouseLeave = function (event) {
    onClose(() => { // callback
      setEnableMouseMove(true);
    });
  };
  eventHandler.onMouseMove = function (event) {
    if (enableMouseMove || followCursor) {
      setMousePageX(event.pageX);
      setMousePageY(event.pageY);
    }
  };
  eventHandler.onPointerDown = function (event) {
    if (isOpen && closeOnPointerDown) {
      onClose();
    }
  };

  useEventListener(
    () => getOwnerDocument(tooltipTriggerRef.current), // owner document
    'keydown',
    closeOnEsc ? eventHandler.onKeyDown : undefined,
  );

  /**
   * This allows for catching the "mouseleave" event when the tooltip trigger is disabled.
   * There is currently a known issue in React regarding the onMouseLeave polyfill.
   * @see https://github.com/facebook/react/issues/11972
   */
  useEventListener(
    () => tooltipTriggerRef.current,
    'mouseleave',
    eventHandler.onMouseLeave,
  );

  const getTooltipTriggerProps = (ownProps = {}, ownRef = null) => {
    return {
      ...ownProps,
      'aria-describedby': isOpen ? tooltipId : undefined,
      id: tooltipTriggerId,
      ref: mergeRefs(combinedRef, ownRef),
      onBlur: callEventHandlers(ownProps?.onBlur, onBlurProp, eventHandler.onBlur),
      onClick: callEventHandlers(ownProps?.onClick, onClickProp, eventHandler.onClick),
      onFocus: callEventHandlers(ownProps?.onFocus, onFocusProp, eventHandler.onFocus),
      onMouseEnter: callEventHandlers(ownProps?.onMouseEnter, onMouseEnterProp, eventHandler.onMouseEnter),
      onMouseLeave: callEventHandlers(ownProps?.onMouseLeave, onMouseLeaveProp, eventHandler.onMouseLeave),
      onMouseMove: callEventHandlers(ownProps?.onMouseMove, onMouseMoveProp, eventHandler.onMouseMove),
      onPointerDown: callEventHandlers(ownProps?.onPointerDown, onPointerDownProp, eventHandler.onPointerDown),
      ...styleProps,
      ...rest,
    };
  };

  if (typeof children === 'function') {
    return children({ getTooltipTriggerProps });
  }

  if (shouldWrapChildren) {
    return (
      <Box {...getTooltipTriggerProps()}>
        {children}
      </Box>
    );
  }

  // Ensure tooltip has only one child node
  const child = React.Children.only(children);
  const tooltipTriggerProps = getTooltipTriggerProps(child?.props, child?.ref);

  return cloneElement(child, tooltipTriggerProps);
});

TooltipTrigger.displayName = 'TooltipTrigger';

export default TooltipTrigger;
