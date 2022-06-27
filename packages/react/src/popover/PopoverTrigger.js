import { useEventListener } from '@tonic-ui/react-hooks';
import {
  callAllEventHandlers,
} from '@tonic-ui/utils';
import React, { cloneElement, forwardRef, useCallback, useRef, useState } from 'react';
import { Box } from '../box';
import { mergeRefs } from '../utils/refs';
import useForkRef from '../utils/useForkRef';
import { usePopoverTriggerStyle } from './styles';
import usePopover from './usePopover';

const PopoverTrigger = forwardRef((
  {
    children,
    shouldWrapChildren = false,
    ...rest
  },
  ref,
) => {
  const {
    followCursor,
    isHoveringContentRef,
    isHoveringTriggerRef,
    isOpen,
    onClose,
    onOpen,
    popoverId,
    popoverTriggerRef,
    setMouseCoordinate,
    trigger,
  } = usePopover();
  const combinedRef = useForkRef(popoverTriggerRef, ref);
  const styleProps = usePopoverTriggerStyle();
  const [enableMouseMove, setEnableMouseMove] = useState(true);
  const mouseLeaveTimeoutRef = useRef();

  const clickTriggerHandler = {
    onClick: useCallback((event) => {
      if (isOpen) {
        onClose();
      } else {
        onOpen();
      }
    }, [isOpen, onClose, onOpen]),
    onKeyDown: useCallback((event) => {
      if (event.key === 'Enter') {
        onOpen();
      }
    }, [onOpen]),
  };

  const hoverTriggerHandler = {
    onBlur: useCallback((event) => {
      onClose();
    }, [onClose]),
    onFocus: useCallback((event) => {
      onOpen();
    }, [onOpen]),
    onKeyDown: useCallback((event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    }, [onClose]),
    onMouseEnter: useCallback((event) => {
      isHoveringTriggerRef.current = true;
      if (mouseLeaveTimeoutRef.current) {
        clearTimeout(mouseLeaveTimeoutRef.current);
        mouseLeaveTimeoutRef.current = undefined;
      }

      setEnableMouseMove(true); // track mouse movement
      onOpen(() => { // callback
        setEnableMouseMove(followCursor); // after the enter delay, track mouse movement only if "followCursor" is true
      });
    }, [followCursor, isHoveringTriggerRef, onOpen]),
    onMouseLeave: useCallback((event) => {
      isHoveringTriggerRef.current = false;
      if (mouseLeaveTimeoutRef.current) {
        clearTimeout(mouseLeaveTimeoutRef.current);
        mouseLeaveTimeoutRef.current = undefined;
      }
      mouseLeaveTimeoutRef.current = setTimeout(() => {
        mouseLeaveTimeoutRef.current = undefined;
        if (!isHoveringContentRef.current && !isHoveringTriggerRef.current) {
          onClose();
        }
      }, 100); // XXX: keep opening popover when cursor quickly move between trigger and content

      setEnableMouseMove(true);
    }, [isHoveringContentRef, isHoveringTriggerRef, onClose]),
    onMouseMove: useCallback((event) => {
      if (enableMouseMove || followCursor) {
        setMouseCoordinate(event);
      }
    }, [enableMouseMove, followCursor, setMouseCoordinate]),
  };

  /**
   * This allows for catching the "mouseleave" event when the popover trigger is disabled.
   * There is currently a known issue in React regarding the onMouseLeave polyfill.
   * @see https://github.com/facebook/react/issues/11972
   */
  useEventListener(
    () => popoverTriggerRef.current,
    'mouseleave',
    trigger === 'hover' ? hoverTriggerHandler.onMouseLeave : undefined,
  );

  const getPopoverTriggerProps = useCallback(
    (ownProps = {}, ownRef = null) => {
      const eventHandlerProps = {
        'click': {
          onClick: callAllEventHandlers(ownProps?.onClick, clickTriggerHandler.onClick),
          onKeyDown: callAllEventHandlers(ownProps?.onKeyDown, clickTriggerHandler.onKeyDown),
        },
        'hover': {
          onBlur: callAllEventHandlers(ownProps?.onBlur, hoverTriggerHandler.onBlur),
          onFocus: callAllEventHandlers(ownProps?.onFocus, hoverTriggerHandler.onFocus),
          onKeyDown: callAllEventHandlers(ownProps?.onKeyDown, hoverTriggerHandler.onKeyDown),
          onMouseEnter: callAllEventHandlers(ownProps?.onMouseEnter, hoverTriggerHandler.onMouseEnter),
          onMouseMove: callAllEventHandlers(ownProps?.onMouseMove, hoverTriggerHandler.onMouseMove),
          onMouseLeave: callAllEventHandlers(ownProps?.onMouseLeave, hoverTriggerHandler.onMouseLeave),
        },
      }[trigger];

      return {
        ...ownProps,
        'aria-haspopup': 'dialog',
        'aria-controls': popoverId,
        'aria-expanded': isOpen,
        ref: mergeRefs(combinedRef, ownRef),
        ...eventHandlerProps,
      };
    },
    [
      clickTriggerHandler.onClick,
      clickTriggerHandler.onKeyDown,
      hoverTriggerHandler.onBlur,
      hoverTriggerHandler.onFocus,
      hoverTriggerHandler.onKeyDown,
      hoverTriggerHandler.onMouseEnter,
      hoverTriggerHandler.onMouseMove,
      hoverTriggerHandler.onMouseLeave,
      combinedRef,
      isOpen,
      popoverId,
      trigger,
    ],
  );

  if (typeof children === 'function') {
    return children({ getPopoverTriggerProps });
  }

  if (shouldWrapChildren) {
    const popoverTriggerProps = getPopoverTriggerProps();

    return (
      <Box
        {...popoverTriggerProps}
        {...styleProps}
        {...rest}
      >
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
