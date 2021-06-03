import chainedFunction from 'chained-function';
import React, { cloneElement, useRef, Children } from 'react';
import Box from '../Box';
import { Popper, PopperArrow } from '../Popper';
import PseudoBox from '../PseudoBox';
import Grow from '../Transitions/Grow';
import VisuallyHidden from '../VisuallyHidden';
import useDisclosure from '../useDisclosure';
import { useId } from '../utils/autoId';
import wrapEvent from '../utils/wrapEvent';
import useTooltipStyle from './styles';

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

const Tooltip = ({
  label,
  'aria-label': ariaLabel,
  enterDelay = 100,
  leaveDelay = 0,
  placement = 'bottom',
  children,
  hideArrow,
  closeOnClick,
  defaultIsOpen,
  shouldWrapChildren,
  isOpen: isControlledOpen,
  onOpen: onOpenProp,
  onClose: onCloseProp,
  arrowAt,
  PopperComponent = Popper,
  PopperProps,
  PopperArrowComponent = PopperArrow,
  PopperArrowProps,
  TransitionComponent = Grow,
  TransitionProps,
  ...rest
}) => {
  const nodeRef = useRef(null);
  const { isOpen, onClose, onOpen } = useDisclosure(defaultIsOpen || false);
  const { current: isControlled } = useRef((isControlledOpen !== undefined) && (isControlledOpen !== null));
  const _isOpen = isControlled ? isControlledOpen : isOpen;

  const anchorRef = useRef();
  const enterTimeoutRef = useRef();
  const exitTimeoutRef = useRef();

  const openWithDelay = () => {
    enterTimeoutRef.current = setTimeout(onOpen, enterDelay);
  };

  const closeWithDelay = () => {
    clearTimeout(enterTimeoutRef.current);
    exitTimeoutRef.current = setTimeout(onClose, leaveDelay);
  };

  const tooltipId = `tooltip-${useId()}`;

  const handleOpen = () => {
    if (!isControlled) {
      openWithDelay();
    }

    if (onOpenProp) {
      onOpenProp();
    }
  };

  const handleClose = () => {
    if (!isControlled) {
      closeWithDelay();
    }

    if (onCloseProp) {
      onCloseProp();
    }
  };

  const handleClick = () => {
    if (closeOnClick) {
      closeWithDelay();
    }
  };

  const arrowSize = '6px';
  const hasAriaLabel = ariaLabel != null;
  const tooltipStyleProps = useTooltipStyle();

  let decoratedChild = null;

  if (typeof children === 'string' || shouldWrapChildren) {
    decoratedChild = (
      <Box
        ref={anchorRef}
        aria-describedby={_isOpen ? tooltipId : undefined}
        display="inline-block"
        tabIndex="0"
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        onClick={handleClick}
        onFocus={handleOpen}
        onBlur={handleClose}
      >
        {children}
      </Box>
    );
  } else {
    const child = Children.only(children);
    decoratedChild = cloneElement(child, {
      ref: (node) => {
        anchorRef.current = node;

        if (child.ref === undefined || child.ref === null) {
          return;
        }

        if (typeof child.ref === 'function') {
          child.ref(anchorRef.current);
          return;
        }

        if (Object.prototype.hasOwnProperty.call(child.ref, 'current')) {
          child.ref.current = anchorRef.current;
          return;
        }
      },
      'aria-describedby': _isOpen ? tooltipId : undefined,
      onMouseEnter: wrapEvent(child.props.onMouseEnter, handleOpen),
      onMouseLeave: wrapEvent(child.props.onMouseLeave, handleClose),
      onClick: wrapEvent(child.props.onClick, handleClick),
      onFocus: wrapEvent(child.props.onFocus, handleOpen),
      onBlur: wrapEvent(child.props.onBlur, handleClose),
    });
  }

  return (
    <>
      {decoratedChild}
      <PopperComponent
        usePortal
        isOpen={_isOpen}
        data-popper-placement={placement}
        placement={placement}
        modifiers={{
          offset: [0, 8],
        }}
        anchorEl={anchorRef.current}
        hideArrow={hideArrow}
        id={hasAriaLabel ? undefined : tooltipId}
        role={hasAriaLabel ? undefined : 'tooltip'}
        pointerEvents="none"
        arrowSize={arrowSize}
        willUseTransition={true}
        {...PopperProps}
      >
        {({ placement, transition }) => {
          const { in: inProp, onEnter, onExited } = { ...transition };
          return (
            <TransitionComponent
              {...TransitionProps}
              ref={nodeRef}
              in={inProp}
              onEnter={chainedFunction(onEnter, TransitionProps?.onEnter)}
              onExited={chainedFunction(onExited, TransitionProps?.onExited)}
            >
              {(state, { ref, style: transitionStyle }) => {
                return (
                  <PseudoBox
                    ref={ref}
                    {...tooltipStyleProps}
                    {...transitionStyle}
                    transformOrigin={mapPlacementToTransformOrigin(placement)}
                    {...rest}
                  >
                    {label}
                    {hasAriaLabel && (
                      <VisuallyHidden role="tooltip" id={tooltipId}>
                        {ariaLabel}
                      </VisuallyHidden>
                    )}
                    {!hideArrow && (
                      <PopperArrowComponent
                        arrowAt={arrowAt}
                        {...PopperArrowProps}
                      />
                    )}
                  </PseudoBox>
                );
              }}
            </TransitionComponent>
          );
        }}
      </PopperComponent>
    </>
  );
};

Tooltip.displayName = 'Tooltip';

export default Tooltip;
