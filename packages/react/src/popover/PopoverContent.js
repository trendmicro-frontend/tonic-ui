import { useHydrated, useMergeRefs, useOnceWhen } from '@tonic-ui/react-hooks';
import {
  ariaAttr,
  callAll,
  callEventHandlers,
  getLeftmostOffset,
  getTopmostOffset,
  isBlankString,
  isEmptyArray,
  isHTMLElement,
  warnDeprecatedProps,
} from '@tonic-ui/utils';
import { ensureArray, ensureFunction } from 'ensure-type';
import { forwardRef, useMemo, useRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { Popper } from '../popper';
import { Grow } from '../transitions';
import useSlot from '../utils/useSlot';
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
    PopperComponent, // deprecated
    PopperProps, // deprecated
    PopoverArrowComponent, // deprecated
    PopoverArrowProps, // deprecated
    TransitionComponent, // deprecated
    TransitionProps, // deprecated
    slots = {},
    slotProps = {},
    children,
    onBlur: onBlurProp,
    onKeyDown: onKeyDownProp,
    onMouseEnter: onMouseEnterProp,
    onMouseLeave: onMouseLeaveProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'PopoverContent' });

  { // deprecation warning
    const prefix = `${PopoverContent.displayName}:`;
    useOnceWhen(() => {
      warnDeprecatedProps('TransitionComponent', {
        prefix,
        alternative: 'slots.transition',
        willRemove: true,
      });
    }, TransitionComponent !== undefined);
    useOnceWhen(() => {
      warnDeprecatedProps('TransitionProps', {
        prefix,
        alternative: 'slotProps.transition',
        willRemove: true,
      });
    }, TransitionProps !== undefined);
    useOnceWhen(() => {
      warnDeprecatedProps('PopperComponent', {
        prefix,
        alternative: 'slots.popper',
        willRemove: true,
      });
    }, PopperComponent !== undefined);
    useOnceWhen(() => {
      warnDeprecatedProps('PopperProps', {
        prefix,
        alternative: 'slotProps.popper',
        willRemove: true,
      });
    }, PopperProps !== undefined);
    useOnceWhen(() => {
      warnDeprecatedProps('PopoverArrowComponent', {
        prefix,
        alternative: 'slots.arrow',
        willRemove: true,
      });
    }, PopoverArrowComponent !== undefined);
    useOnceWhen(() => {
      warnDeprecatedProps('PopoverArrowProps', {
        prefix,
        alternative: 'slotProps.arrow',
        willRemove: true,
      });
    }, PopoverArrowProps !== undefined);
  }
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
    portalled,
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

  const [PopperSlot, popperSlotProps] = useSlot({
    name: 'popper',
    ownerDisplayName: PopoverContent.displayName,
    props: {
      ref: popoverContentRef,
      'aria-hidden': ariaAttr(!isOpen),
      'aria-labelledby': popoverTriggerId,
      id: popoverId,
      isOpen,
      placement,
      referenceRef: popoverTriggerRef,
      role,
      unmountOnExit: true,
      portalled,
      willUseTransition: true,
      zIndex: 'popover',
    },
    slot: slots.popper ?? PopperComponent ?? Popper,
    slotProps: { ...PopperProps, ...slotProps.popper },
  });

  const [TransitionSlot, transitionSlotProps] = useSlot({
    name: 'transition',
    ownerDisplayName: PopoverContent.displayName,
    props: {
      ref: combinedRef,
      appear: true,
    },
    slot: slots.transition ?? TransitionComponent ?? Grow,
    slotProps: { ...TransitionProps, ...slotProps.transition },
  });

  const [ArrowSlot, arrowSlotProps] = useSlot({
    name: 'arrow',
    ownerDisplayName: PopoverContent.displayName,
    slot: slots.arrow ?? PopoverArrowComponent ?? PopoverArrow,
    slotProps: { ...PopoverArrowProps, ...slotProps.arrow },
  });

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
    <PopperSlot
      {...popperSlotProps}
      modifiers={[
        // Default modifiers
        ...popperModifiers,
        // User-defined modifiers
        ...ensureArray(popperSlotProps?.modifiers),
      ]}
    >
      {({ placement, transition }) => {
        const { in: inProp, onEnter, onExited } = { ...transition };
        return (
          <TransitionSlot
            {...transitionSlotProps}
            in={inProp}
            onEnter={callAll(
              onEnter,
              transitionSlotProps.onEnter,
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
              transitionSlotProps.onExited,
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
                    <ArrowSlot {...arrowSlotProps} />
                  )}
                  {children}
                </Box>
              );
            }}
          </TransitionSlot>
        );
      }}
    </PopperSlot>
  );
});

PopoverContent.displayName = 'PopoverContent';

export default PopoverContent;
