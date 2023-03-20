import { useHydrated } from '@tonic-ui/react-hooks';
import { ariaAttr, callAll, callEventHandlers } from '@tonic-ui/utils';
import { ensureArray } from 'ensure-type';
import React, { useMemo, useRef } from 'react';
import { Box } from '../box';
import { Popper, PopperArrow } from '../popper';
import { Grow } from '../transitions';
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

const getOffset = (element, relativeTop = false) => {
  if (!element) {
    return 0;
  }
  return getOffset(element.offsetParent, relativeTop) + (relativeTop ? element.offsetTop : element.offsetLeft);
};

const PopoverContent = ({
  PopperComponent = Popper,
  PopperProps,
  PopperArrowComponent = PopperArrow,
  PopperArrowProps,
  TransitionComponent = Grow,
  TransitionProps,
  children,
  onBlur: onBlurProp,
  onKeyDown: onKeyDownProp,
  onMouseEnter: onMouseEnterProp,
  onMouseLeave: onMouseLeaveProp,
  ...rest
}) => {
  const isHydrated = useHydrated();
  const nodeRef = useRef(null);
  const {
    popoverContentRef,
    popoverTriggerRef,
    placement,
    popoverId,
    isOpen,
    closeOnBlur,
    closeOnEsc,
    onClose,
    isHoveringContentRef,
    isHoveringTriggerRef,
    trigger,
    popoverBodyId,
    popoverHeaderId,
    hideArrow,
    offset,
    nextToCursor,
    followCursor,
    mousePageX,
    mousePageY,
    arrowAt,
  } = usePopover();
  const tabIndex = -1;
  const styleProps = usePopoverContentStyle({ tabIndex });
  const mouseLeaveTimeoutRef = useRef();
  const eventHandler = {};
  const role = {
    'click': 'dialog',
    'hover': 'tooltip',
  }[trigger];

  eventHandler.onKeyDown = function (event) {
    if (event.key === 'Escape' && closeOnEsc) {
      onClose && onClose();
    }
  };

  if (trigger === 'click') {
    eventHandler.onBlur = function (event) {
      const relatedTarget = event.relatedTarget;
      const triggerEl = popoverTriggerRef.current;
      const contentEl = popoverContentRef.current;
      const isOutsideTrigger = !(triggerEl?.contains?.(relatedTarget));
      const isOutsideContent = !(contentEl?.contains?.(relatedTarget));

      if (isOpen && closeOnBlur && isOutsideTrigger && isOutsideContent) {
        onClose();
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
          onClose();
        }
      }, 100); // XXX: keep opening popover when cursor quickly move between trigger and content
    };
  }

  const popoverTriggerEl = popoverTriggerRef.current;
  /**
   * Arrow width = Math.sqrt(12^2 + 12^2) = 16.97
   * Arrow height = Math.sqrt(12^2 + 12^2) / 2 = 8.49
   */
  const arrowSize = '12px'; // FIXME: Must be a theme token
  const [
    skidding = 0,
    distance = 12,
  ] = ensureArray(offset);
  const [computedSkidding, computedDistance] = useMemo(() => {
    let _skidding = skidding;
    let _distance = distance;

    if (popoverTriggerEl && (nextToCursor || followCursor)) {
      const { offsetHeight } = popoverTriggerEl;
      const offsetLeft = getOffset(popoverTriggerEl);
      const offsetTop = getOffset(popoverTriggerEl, true);
      _skidding = mousePageX - offsetLeft + 8; // 8px is a estimated value of cursor
      _distance = -8 + (mousePageY - offsetTop - offsetHeight) + 24; // 24px is a estimated value of cursor
    }

    return [_skidding, _distance];
  }, [skidding, distance, popoverTriggerEl, nextToCursor, followCursor, mousePageX, mousePageY]);
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

  return (
    <PopperComponent
      aria-describedby={popoverBodyId}
      aria-hidden={ariaAttr(!isOpen)}
      aria-labelledby={popoverHeaderId}
      anchorEl={popoverTriggerRef.current}
      arrowSize={arrowSize}
      id={popoverId}
      isOpen={isOpen}
      modifiers={popperModifiers}
      placement={placement}
      ref={popoverContentRef}
      role={role}
      unmountOnExit={true}
      usePortal={false} // Pass `true` in `PopperProps` to render popover in a portal
      willUseTransition={true}
      zIndex="popover"
      {...PopperProps}
    >
      {({ placement, transition }) => {
        const { in: inProp, onEnter, onExited } = { ...transition };
        return (
          <TransitionComponent
            appear={true}
            {...TransitionProps}
            ref={nodeRef}
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
                  {!hideArrow && (
                    <PopperArrowComponent
                      arrowAt={arrowAt}
                      {...PopperArrowProps}
                    />
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
};

PopoverContent.displayName = 'PopoverContent';

export default PopoverContent;
