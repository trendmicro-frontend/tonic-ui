import React, { cloneElement, useRef, Children } from 'react';
import Box from '../Box';
import Popper from '../Popper/Popper';
import PopperArrow from '../Popper/PopperArrow';
import VisuallyHidden from '../VisuallyHidden';
import useDisclosure from '../useDisclosure';
import { useId } from '../utils/autoId';
import wrapEvent from '../utils/wrapEvent';
import useTooltipStyle from './styles';

const Tooltip = ({
  label,
  'aria-label': ariaLabel,
  showDelay = 0,
  hideDelay = 0,
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
  ...rest
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure(defaultIsOpen || false);
  const { current: isControlled } = useRef((isControlledOpen !== undefined) && (isControlledOpen !== null));
  const _isOpen = isControlled ? isControlledOpen : isOpen;

  const anchorRef = useRef();
  const enterTimeoutRef = useRef();
  const exitTimeoutRef = useRef();

  const openWithDelay = () => {
    enterTimeoutRef.current = setTimeout(onOpen, showDelay);
  };

  const closeWithDelay = () => {
    clearTimeout(enterTimeoutRef.current);
    exitTimeoutRef.current = setTimeout(onClose, hideDelay);
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
      <Popper
        usePortal
        isOpen={_isOpen}
        data-popper-placement={placement}
        placement={placement}
        modifiers={{ offset: [0, 8] }}
        anchorEl={anchorRef.current}
        hideArrow={hideArrow}
        id={hasAriaLabel ? undefined : tooltipId}
        role={hasAriaLabel ? undefined : 'tooltip'}
        pointerEvents="none"
        arrowSize={arrowSize}
        {...tooltipStyleProps}
        {...rest}
      >
        {label}
        {hasAriaLabel && (
          <VisuallyHidden role="tooltip" id={tooltipId}>
            {ariaLabel}
          </VisuallyHidden>
        )}
        {!hideArrow && <PopperArrow arrowAt={arrowAt} />}
      </Popper>
    </>
  );
};

Tooltip.displayName = 'Tooltip';

export default Tooltip;
