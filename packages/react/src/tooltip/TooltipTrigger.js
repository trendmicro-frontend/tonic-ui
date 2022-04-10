import { useEventListener } from '@tonic-ui/react-hooks';
import React, { cloneElement, forwardRef, useCallback } from 'react';
import { Box } from '../box';
import ownerDocument from '../utils/dom/ownerDocument';
import { mergeRefs } from '../utils/refs';
import useForkRef from '../utils/useForkRef';
import wrapEvent from '../utils/wrapEvent';
import { useTooltipTriggerStyle } from './styles';
import useTooltip from './useTooltip';

const TooltipTrigger = forwardRef((
  {
    children,
    shouldWrapChildren = false,
    ...rest
  },
  ref,
) => {
  const {
    anchorRef,
    closeOnClick,
    closeOnEsc,
    closeOnMouseDown,
    isOpen,
    onClose,
    onOpen,
    tooltipId,
  } = useTooltip();
  const combinedRef = useForkRef(anchorRef, ref);
  const styleProps = useTooltipTriggerStyle();
  const handleBlur = onClose;
  const handleClick = useCallback(() => {
    if (closeOnClick) {
      onClose();
    }
  }, [closeOnClick, onClose]);
  const handleFocus = onOpen;
  const handleKeyDown = useCallback((event) => {
    if (isOpen && closeOnEsc && event.key === 'Escape') {
      onClose();
    }
  }, [isOpen, closeOnEsc, onClose]);
  const handleMouseDown = useCallback(() => {
    if (closeOnMouseDown) {
      onClose();
    }
  }, [closeOnMouseDown, onClose]);
  const handleMouseEnter = onOpen;
  const handleMouseLeave = onClose;

  useEventListener(
    () => ownerDocument(anchorRef.current),
    'keydown',
    closeOnEsc ? handleKeyDown : undefined,
  );

  /**
   * This allows for catching the "mouseleave" event when the tooltip trigger is disabled.
   * There is currently a known issue in React regarding the onMouseLeave polyfill.
   * @see https://github.com/facebook/react/issues/11972
   */
  useEventListener(
    () => anchorRef.current,
    'mouseleave',
    handleMouseLeave,
  );

  const getTooltipTriggerProps = useCallback(
    (ownProps = {}, ownRef = null) => {
      const eventHandlerProps = {
        onBlur: wrapEvent(ownProps?.onBlur, handleBlur),
        onClick: wrapEvent(ownProps?.onClick, handleClick),
        onFocus: wrapEvent(ownProps?.onFocus, handleFocus),
        onMouseDown: wrapEvent(ownProps?.onMouseDown, handleMouseDown),
        onMouseEnter: wrapEvent(ownProps?.onMouseEnter, handleMouseEnter),
      };

      return {
        ...ownProps,
        'aria-describedby': isOpen ? tooltipId : undefined,
        ref: mergeRefs(combinedRef, ownRef),
        ...eventHandlerProps,
      };
    },
    [
      handleBlur,
      handleClick,
      handleFocus,
      handleMouseDown,
      handleMouseEnter,
      isOpen,
      tooltipId,
      combinedRef,
    ],
  );

  if (typeof children === 'function') {
    return children({ getTooltipTriggerProps });
  }

  if (shouldWrapChildren) {
    const tooltipTriggerProps = getTooltipTriggerProps();

    return (
      <Box
        {...tooltipTriggerProps}
        {...styleProps}
        {...rest}
      >
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
