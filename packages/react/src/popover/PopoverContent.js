import { useHydrated } from '@tonic-ui/react-hooks';
import chainedFunction from 'chained-function';
import React, { useRef } from 'react';
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
    skidding,
    distance,
    nextToCursor,
    followCursor,
    mousePageX,
    mousePageY,
    arrowAt,
  } = usePopover();
  const styleProps = usePopoverContentStyle();
  const arrowSize = 12;
  let _skidding = skidding;
  let _distance = distance + 8; // Arrow height is 8px
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

  const getOffset = (element, relativeTop = false) => {
    if (!element) {
      return 0;
    }
    return getOffset(element.offsetParent, relativeTop) + (relativeTop ? element.offsetTop : element.offsetLeft);
  };

  if ((nextToCursor || followCursor) && popoverTriggerRef.current) {
    const { offsetHeight } = popoverTriggerRef.current;
    const offsetLeft = getOffset(popoverTriggerRef.current);
    const offsetTop = getOffset(popoverTriggerRef.current, true);
    _skidding = mousePageX - offsetLeft + 8; // 8px is a estimated value of cursor
    _distance = -8 + (mousePageY - offsetTop - offsetHeight) + 24; // 24px is a estimated value of cursor
  }

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
      isOpen={isOpen}
      placement={placement}
      anchorEl={popoverTriggerRef.current}
      ref={popoverContentRef}
      id={popoverId}
      arrowSize={`${arrowSize}px`}
      modifiers={{
        offset: [_skidding, _distance],
      }}
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
