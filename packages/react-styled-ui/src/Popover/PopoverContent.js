import chainedFunction from 'chained-function';
import React, { useRef } from 'react';
import wrapEvent from '../utils/wrapEvent';
import { Popper, PopperArrow } from '../Popper';
import PseudoBox from '../PseudoBox';
import Grow from '../Transitions/Grow';
import { usePopover } from './context';
import { usePopoverContentStyle } from './styles';

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
  onKeyDown,
  onBlur: onBlurProp,
  onMouseLeave,
  onMouseEnter,
  onFocus,
  children,
  'aria-label': ariaLabel,
  PopperComponent = Popper,
  PopperProps,
  PopperArrowComponent = PopperArrow,
  PopperArrowProps,
  TransitionComponent = Grow,
  TransitionProps,
  ...rest
}) => {
  const nodeRef = useRef(null);
  const {
    popoverRef,
    anchorRef,
    placement,
    popoverId,
    isOpen,
    onBlur,
    closeOnEsc,
    onClose,
    isHoveringRef,
    trigger,
    headerId,
    bodyId,
    usePortal,
    hideArrow,
    skidding,
    distance,
    leaveDelay,
    nextToCursor,
    followCursor,
    mousePageX,
    mousePageY,
    arrowAt,
  } = usePopover();
  const contentStyleProps = usePopoverContentStyle();
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

  if ((nextToCursor || followCursor) && anchorRef.current) {
    const { offsetHeight } = anchorRef.current;
    const offsetLeft = getOffset(anchorRef.current);
    const offsetTop = getOffset(anchorRef.current, true);
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
        setTimeout(onClose, leaveDelay);
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

  return (
    <PopperComponent
      as="section"
      usePortal={usePortal}
      isOpen={isOpen}
      placement={placement}
      aria-label={ariaLabel}
      anchorEl={anchorRef.current}
      ref={popoverRef}
      id={popoverId}
      aria-hidden={!isOpen}
      arrowSize={`${arrowSize}px`}
      modifiers={{
        offset: [_skidding, _distance],
      }}
      willUseTransition={true}
      aria-labelledby={headerId}
      aria-describedby={bodyId}
      {...roleProps}
      {...eventHandlers}
      {...PopperProps}
    >
      {({ placement, transition }) => {
        const { in: inProp, onEnter, onExited } = { ...transition };
        return (
          <TransitionComponent
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
                <PseudoBox
                  ref={ref}
                  {...contentStyleProps}
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
                </PseudoBox>
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
