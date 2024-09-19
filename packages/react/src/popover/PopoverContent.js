import { useHydrated, useMergeRefs } from '@tonic-ui/react-hooks';
import {
  ariaAttr,
  callAll,
  callEventHandlers,
  getLeftmostOffset,
  getTopmostOffset,
  isBlankString,
  isEmptyArray,
  isHTMLElement,
} from '@tonic-ui/utils';
import { ensureArray, ensureFunction } from 'ensure-type';
import React, { forwardRef, useMemo, useRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { Popper } from '../popper';
import { Grow } from '../transitions';
import PopoverArrow from './PopoverArrow';
import { usePopoverContentStyle } from './styles';
import usePopover from './usePopover';

const mapPlacementToTransformOrigin = placement => ({
  'top': 'bottom center',
  'top-start': 'bottom left',
  'top-end': 'bottom right',
  'bottom': 'top center',
  'bottom-start': 'top left',
  'bottom-end': 'top right',
  'left': 'right center',
  'left-start': 'right top',
  'left-end': 'right bottom',
  'right': 'left center',
  'right-start': 'left top',
  'right-end': 'left bottom',
}[placement]);

const PopoverContent = forwardRef((inProps, ref) => {
  const {
    PopperComponent = Popper,
    PopperProps,
    PopoverArrowComponent = PopoverArrow,
    PopoverArrowProps,
    TransitionComponent = Grow,
    TransitionProps,
    children,
    onBlur: onBlurProp,
    onKeyDown: onKeyDownProp,
    onMouseEnter: onMouseEnterProp,
    onMouseLeave: onMouseLeaveProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'PopoverContent' });
  const isHydrated = useHydrated();
  const nodeRef = useRef(null);
  const combinedRef = useMergeRefs(nodeRef, ref);
  const {
    arrow,
    closeOnBlur,
    closeOnEsc,
    disabled,
    followCursor,
    isHoveringContentRef,
    isHoveringTriggerRef,
    isOpen,
    mousePageX,
    mousePageY,
    nextToCursor,
    offset,
    onClose: closePopover,
    placement,
    popoverId,
    popoverContentRef,
    popoverTriggerId,
    popoverTriggerRef,
    trigger,
  } = usePopover();
  const role = {
    'click': 'dialog',
    'hover': 'tooltip',
  }[trigger];
  const tabIndex = -1;
  const styleProps = usePopoverContentStyle({ tabIndex });
  const mouseLeaveTimeoutRef = useRef();
  const eventHandler = {};

  eventHandler.onKeyDown = function (event) {
    if (event.key === 'Escape' && closeOnEsc) {
      ensureFunction(closePopover)();
    }
  };

  if (trigger === 'click') {
    eventHandler.onBlur = function (event) {
      // https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent/relatedTarget
      // The relatedTarget property represents the `EventTarget` receiving focus or losing focus during a `blur` or `focus` event, respectively.
      const focusTarget = event.relatedTarget || document.activeElement; // `relatedTarget` is the `EventTarget` receiving focus (if any)
      const isOutsidePopoverTrigger = !(popoverTriggerRef.current?.contains?.(focusTarget));
      const isOutsidePopoverContent = !(popoverContentRef.current?.contains?.(focusTarget));
      const shouldClose = isOpen && closeOnBlur && !!focusTarget && isOutsidePopoverTrigger && isOutsidePopoverContent;

      if (shouldClose) {
        ensureFunction(closePopover)();
      }
    };
  }

  if (trigger === 'hover') {
    eventHandler.onMouseEnter = function (event) {
      isHoveringContentRef.current = true;

      if (mouseLeaveTimeoutRef.current) {
        clearTimeout(mouseLeaveTimeoutRef.current);
        mouseLeaveTimeoutRef.current = undefined;
      }
    };
    eventHandler.onMouseLeave = function (event) {
      isHoveringContentRef.current = false;

      if (mouseLeaveTimeoutRef.current) {
        clearTimeout(mouseLeaveTimeoutRef.current);
        mouseLeaveTimeoutRef.current = undefined;
      }
      mouseLeaveTimeoutRef.current = setTimeout(() => {
        mouseLeaveTimeoutRef.current = undefined;
        if (!isHoveringContentRef.current && !isHoveringTriggerRef.current) {
          ensureFunction(closePopover)();
        }
      }, 100); // XXX: keep opening popover when cursor quickly move between trigger and content
    };
  }

  const popoverTriggerElement = popoverTriggerRef.current;
  const [
    skidding = 0,
    distance = 12,
  ] = ensureArray(offset);
  const [computedSkidding, computedDistance] = useMemo(() => {
    let _skidding = skidding;
    let _distance = distance;

    if (isHTMLElement(popoverTriggerElement) && (followCursor || nextToCursor)) {
      const { offsetHeight } = popoverTriggerElement;
      const leftmostOffset = getLeftmostOffset(popoverTriggerElement);
      const topmostOffset = getTopmostOffset(popoverTriggerElement);
      _skidding = mousePageX - leftmostOffset + 10;
      _distance = mousePageY - topmostOffset - offsetHeight + 15;
    }

    return [_skidding, _distance];
  }, [skidding, distance, popoverTriggerElement, followCursor, nextToCursor, mousePageX, mousePageY]);
  const popperModifiers = useMemo(() => {
    const modifiers = [
      { // https://popper.js.org/docs/v2/modifiers/offset/
        name: 'offset',
        options: {
          offset: [computedSkidding, computedDistance],
        },
      },
    ];
    return modifiers;
  }, [computedSkidding, computedDistance]);

  if (!isHydrated) {
    return null;
  }

  if (disabled) {
    return null;
  }

  if (!children || isBlankString(children) || isEmptyArray(children)) {
    // TOOD: Objects are not valid as a React child
    return null;
  }

  return (
    <PopperComponent
      aria-hidden={ariaAttr(!isOpen)}
      aria-labelledby={popoverTriggerId}
      anchorEl={popoverTriggerRef.current} // TODO: rename to `referenceRef` in a future release
      id={popoverId}
      isOpen={isOpen}
      placement={placement}
      ref={popoverContentRef}
      role={role}
      unmountOnExit={true}
      usePortal={false} // Pass `true` in `PopperProps` to render popover in a portal
      willUseTransition={true}
      zIndex="popover"
      {...PopperProps}
      modifiers={[
        // Default modifiers
        ...popperModifiers,
        // User-defined modifiers
        ...ensureArray(PopperProps?.modifiers),
      ]}
    >
      {({ placement, transition }) => {
        const { in: inProp, onEnter, onExited } = { ...transition };
        return (
          <TransitionComponent
            appear={true}
            {...TransitionProps}
            ref={combinedRef}
            in={inProp}
            onEnter={callAll(
              onEnter,
              TransitionProps?.onEnter,
              (event) => {
                // set focus on the popover content
                if (inProp && trigger === 'click') {
                  requestAnimationFrame(() => {
                    nodeRef.current && nodeRef.current.focus();
                  });
                }
              }
            )}
            onExited={callAll(
              onExited,
              TransitionProps?.onExited,
            )}
          >
            {(state, { ref, style: transitionStyle }) => {
              return (
                <Box
                  onBlur={callEventHandlers(onBlurProp, eventHandler.onBlur)}
                  onKeyDown={callEventHandlers(onKeyDownProp, eventHandler.onKeyDown)}
                  onMouseEnter={callEventHandlers(onMouseEnterProp, eventHandler.onMouseEnter)}
                  onMouseLeave={callEventHandlers(onMouseLeaveProp, eventHandler.onMouseLeave)}
                  ref={ref}
                  tabIndex={tabIndex}
                  {...styleProps}
                  {...transitionStyle}
                  transformOrigin={mapPlacementToTransformOrigin(placement)}
                  {...rest}
                >
                  {!!arrow && (
                    <PopoverArrowComponent {...PopoverArrowProps} />
                  )}
                  {children}
                </Box>
              );
            }}
          </TransitionComponent>
        );
      }}
    </PopperComponent>
  );
});

PopoverContent.displayName = 'PopoverContent';

export default PopoverContent;
