import { useEventCallback, useEventListener, useMergeRefs } from '@tonic-ui/react-hooks';
import { ariaAttr, callEventHandlers } from '@tonic-ui/utils';
import { ensureFunction } from 'ensure-type';
import { Children, cloneElement, forwardRef, useRef, useState } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { mergeRefs } from '../utils/refs';
import useButtonEventHandlers from '../utils/useButtonEventHandlers';
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
  const child = Children.only(children);

  // Access the child's props for later use
  const childProps = child?.props;

  // In React 19, `ref` on function components is passed as a normal prop.
  // This fallback maintains compatibility with both React 18 and 19.
  //
  // React 19 will not throw an error if `ref` is `null` or `undefined`:
  // ```
  // Accessing `element.ref` was removed in React 19. `ref` is now a regular prop.
  // It will be removed from the JSX Element type in a future release.
  // ```
  const childRef = child?.props?.ref ?? child?.ref;

  const popoverTriggerProps = getPopoverTriggerProps(childProps, childRef);

  return cloneElement(child, popoverTriggerProps);
});

PopoverTrigger.displayName = 'PopoverTrigger';

export default PopoverTrigger;
