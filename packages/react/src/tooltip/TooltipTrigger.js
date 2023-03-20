import { useEventListener, useMergeRefs } from '@tonic-ui/react-hooks';
import { callEventHandlers, getOwnerDocument } from '@tonic-ui/utils';
import React, { cloneElement, forwardRef } from 'react';
import { Box } from '../box';
import { mergeRefs } from '../utils/refs';
import { useTooltipTriggerStyle } from './styles';
import useTooltip from './useTooltip';

const TooltipTrigger = forwardRef((
  {
    children,
    shouldWrapChildren = false,
    onBlur: onBlurProp,
    onClick: onClickProp,
    onFocus: onFocusProp,
    onMouseDown: onMouseDownProp,
    onMouseEnter: onMouseEnterProp,
    onMouseLeave: onMouseLeaveProp,
    ...rest
  },
  ref,
) => {
  const {
    closeOnClick,
    closeOnEsc,
    closeOnMouseDown,
    isOpen,
    onClose,
    onOpen,
    tooltipId,
    tooltipTriggerRef,
  } = useTooltip();
  const combinedRef = useMergeRefs(tooltipTriggerRef, ref);
  const styleProps = useTooltipTriggerStyle();
  const eventHandler = {};

  eventHandler.onBlur = function (event) {
    onClose();
  };
  eventHandler.onClick = function (event) {
    if (closeOnClick) {
      onClose();
    }
  };
  eventHandler.onFocus = function (event) {
    onOpen();
  };
  eventHandler.onKeyDown = function (event) {
    if (isOpen && closeOnEsc && event.key === 'Escape') {
      onClose();
    }
  };
  eventHandler.onMouseDown = function (event) {
    if (closeOnMouseDown) {
      onClose();
    }
  };
  eventHandler.onMouseEnter = function (event) {
    onOpen();
  };
  eventHandler.onMouseLeave = function (event) {
    onClose();
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
      ref: mergeRefs(combinedRef, ownRef),
      onBlur: callEventHandlers(ownProps?.onBlur, onBlurProp, eventHandler.onBlur),
      onClick: callEventHandlers(ownProps?.onClick, onClickProp, eventHandler.onClick),
      onFocus: callEventHandlers(ownProps?.onFocus, onFocusProp, eventHandler.onFocus),
      onMouseDown: callEventHandlers(ownProps?.onMouseDown, onMouseDownProp, eventHandler.onMouseDown),
      onMouseEnter: callEventHandlers(ownProps?.onMouseEnter, onMouseEnterProp, eventHandler.onMouseEnter),
      onMouseLeave: callEventHandlers(ownProps?.onMouseLeave, onMouseLeaveProp, eventHandler.onMouseLeave),
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
