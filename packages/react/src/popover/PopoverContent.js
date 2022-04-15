import { useHydrated } from '@tonic-ui/react-hooks';
import chainedFunction from 'chained-function';
import { ensureArray } from 'ensure-type';
import React, { useMemo, useRef } from 'react';
import { Box } from '../box';
import { Popper, PopperArrow } from '../popper';
import { Grow } from '../transitions';
import wrapEvent from '../utils/wrapEvent';
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
  onFocus,
  onKeyDown,
  onMouseEnter,
  onMouseLeave,
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
    onBlur,
    closeOnEsc,
    onClose,
    isHoveringRef,
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
  const styleProps = usePopoverContentStyle();
  let eventHandlers = {};
  let roleProps = {};

  if (trigger === 'click') {
    eventHandlers = {
      onBlur: wrapEvent(onBlurProp, onBlur),
    };

    roleProps = {
      role: 'dialog',
      'aria-modal': 'false',
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

  if (trigger === 'hover') {
    eventHandlers = {
      onMouseEnter: wrapEvent(onMouseEnter, () => {
        isHoveringRef.current = true;
      }),
      onMouseLeave: wrapEvent(onMouseLeave, () => {
        isHoveringRef.current = false;
        onClose();
      }),
    };

    roleProps = {
      role: 'tooltip',
    };
  }

  eventHandlers = {
    ...eventHandlers,
    onKeyDown: wrapEvent(onKeyDown, event => {
      if (event.key === 'Escape' && closeOnEsc) {
        onClose && onClose();
      }
    }),
  };

  if (!isHydrated) {
    return null;
  }

  return (
    <PopperComponent
      aria-describedby={popoverBodyId}
      aria-hidden={!isOpen}
      aria-labelledby={popoverHeaderId}
      anchorEl={popoverTriggerRef.current}
      arrowSize={arrowSize}
      id={popoverId}
      isOpen={isOpen}
      modifiers={popperModifiers}
      placement={placement}
      ref={popoverContentRef}
      unmountOnExit={true}
      usePortal={false} // Pass `true` in `PopperProps` to render popover in a portal
      willUseTransition={true}
      zIndex="popover"
      {...roleProps}
      {...eventHandlers}
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
            onEnter={chainedFunction(
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
            onExited={chainedFunction(
              onExited,
              TransitionProps?.onExited,
            )}
          >
            {(state, { ref, style: transitionStyle }) => {
              return (
                <Box
                  ref={ref}
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
