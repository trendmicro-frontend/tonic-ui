import { useEventCallback, useEventListener, useMergeRefs } from '@tonic-ui/react-hooks';
import { ariaAttr, callEventHandlers } from '@tonic-ui/utils';
import { ensureFunction, ensureString } from 'ensure-type';
import React, { cloneElement, forwardRef, useRef, useState } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { mergeRefs } from '../utils/refs';
import useButtonEventHandlers from '../utils/useButtonEventHandlers';
import { usePopoverTriggerStyle } from './styles';
import usePopover from './usePopover';

const REACT_MAJOR_VERSION = parseInt(ensureString(React.version).split('.')[0], 10);

/**
 * @typedef {Object} PopoverTriggerProps
 * @property {React.ReactNode | ((context: { getPopoverTriggerProps: (ownProps?: React.HTMLAttributes<HTMLElement>, ownRef?: React.Ref<HTMLElement> | null) => React.HTMLAttributes<HTMLElement> }) => React.ReactNode)} [children] - The content of the popover trigger or a function that returns content.
 * @property {boolean} [shouldWrapChildren=false] - Whether to wrap children in a Box component.
 */

/**
 * @type {ForwardRefComponent<'div', PopoverTriggerProps>}
 */
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
    onClose: closePopover,
    onOpen: openPopover,
    onToggle: togglePopover,
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

  const { onClick, onKeyDown } = useButtonEventHandlers({
    // Skip passing `disabled`; `PopoverContent` takes care of it internally
    onActivate: () => ensureFunction(togglePopover)(),
  });

  const eventHandler = {};

  const onBlur = useEventCallback((event) => {
    closePopover();
  }, [closePopover]);

  const onFocus = useEventCallback((event) => {
    openPopover();
  }, [openPopover]);

  const onMouseEnter = useEventCallback((event) => {
    isHoveringTriggerRef.current = true;
    if (mouseLeaveTimeoutRef.current) {
      clearTimeout(mouseLeaveTimeoutRef.current);
      mouseLeaveTimeoutRef.current = undefined;
    }

    setEnableMouseMove(true); // track mouse movement
    openPopover(() => { // callback
      setEnableMouseMove(followCursor); // after the enter delay, track mouse movement only if "followCursor" is true
    });
  }, [isHoveringTriggerRef, openPopover]);

  const onMouseLeave = useEventCallback((event) => {
    isHoveringTriggerRef.current = false;
    if (mouseLeaveTimeoutRef.current) {
      clearTimeout(mouseLeaveTimeoutRef.current);
      mouseLeaveTimeoutRef.current = undefined;
    }
    mouseLeaveTimeoutRef.current = setTimeout(() => {
      mouseLeaveTimeoutRef.current = undefined;
      if (!isHoveringContentRef.current && !isHoveringTriggerRef.current) {
        closePopover(() => { // callback
          setEnableMouseMove(true);
        });
      }
    }, 100); // XXX: keep opening popover when cursor quickly move between trigger and content
  }, [isHoveringTriggerRef, closePopover]);

  const onMouseMove = useEventCallback((event) => {
    if (enableMouseMove || followCursor) {
      setMousePageX(event.pageX);
      setMousePageY(event.pageY);
    }
  }, [followCursor, setMousePageX, setMousePageY]);

  if (trigger === 'click') {
    eventHandler.onClick = onClick;
    eventHandler.onKeyDown = onKeyDown;
  } else if (trigger === 'hover') {
    eventHandler.onBlur = onBlur;
    eventHandler.onFocus = onFocus;
    eventHandler.onMouseEnter = onMouseEnter;
    eventHandler.onMouseLeave = onMouseLeave;
    eventHandler.onMouseMove = onMouseMove;
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

  // Access the child's props for later use
  const childProps = child?.props;

  // Retrieve the child's ref for merging with the popover trigger ref.
  //
  // In React 17/18, `ref` is stored on `element.ref` and accessing `element.props.ref` triggers a warning: "ref is not a prop".
  // In React 19, `ref` is a regular prop on `element.props.ref`, and `element.ref` is deprecated.
  //
  // Use version detection to access the correct property without triggering warnings on either version.
  const childRef = (REACT_MAJOR_VERSION >= 19) ? child?.props?.ref : child?.ref;

  const popoverTriggerProps = getPopoverTriggerProps(childProps, childRef);

  return cloneElement(child, popoverTriggerProps);
});

PopoverTrigger.displayName = 'PopoverTrigger';

export default PopoverTrigger;
