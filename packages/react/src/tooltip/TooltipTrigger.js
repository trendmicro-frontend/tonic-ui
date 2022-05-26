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
    closeOnClick,
    closeOnEsc,
    closeOnMouseDown,
    isOpen,
    onClose,
    onOpen,
    tooltipId,
    tooltipTriggerRef,
  } = useTooltip();
  const combinedRef = useForkRef(tooltipTriggerRef, ref);
  const styleProps = useTooltipTriggerStyle();
  const handleBlur = useCallback(() => {
    onClose();
  }, [onClose]);
  const handleClick = useCallback(() => {
    if (closeOnClick) {
      onClose();
    }
  }, [closeOnClick, onClose]);
  const handleFocus = useCallback((event) => {
    onOpen();
  }, [onOpen]);
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
  const handleMouseEnter = useCallback(() => {
    onOpen();
  }, [onOpen]);
  const handleMouseLeave = useCallback(() => {
    onClose();
  }, [onClose]);

  useEventListener(
    () => ownerDocument(tooltipTriggerRef.current),
    'keydown',
    closeOnEsc ? handleKeyDown : undefined,
  );

  /**
   * This allows for catching the "mouseleave" event when the tooltip trigger is disabled.
   * There is currently a known issue in React regarding the onMouseLeave polyfill.
   * @see https://github.com/facebook/react/issues/11972
   */
  useEventListener(
    () => tooltipTriggerRef.current,
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
        onMouseLeave: wrapEvent(ownProps?.onMouseLeave, handleMouseLeave),
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
      handleMouseLeave,
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
