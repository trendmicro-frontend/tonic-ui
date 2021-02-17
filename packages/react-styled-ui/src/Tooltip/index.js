import React, { cloneElement, useRef, Children } from 'react';
import Box from '../Box';
import useDisclosure from '../useDisclosure';
import { useId } from '../utils/autoId';
import Popper, { PopperArrow } from '../Popper';
import VisuallyHidden from '../VisuallyHidden';
import useTooltipStyle from './styles';

const wrapEvent = (child, theirHandler, ourHandler) => event => {
  if (typeof child !== 'string' && child.props[theirHandler]) {
    child.props[theirHandler](event);
  }

  if (!event.defaultPrevented) {
    return ourHandler(event);
  }
  return '';
};

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

  const tooltipStyleProps = useTooltipStyle();
  const arrowSize = '6px';

  const handleClick = wrapEvent(children, 'onClick', () => {
    if (closeOnClick) {
      closeWithDelay();
    }
  });

  const referenceProps = {
    onMouseEnter: wrapEvent(children, 'onMouseEnter', handleOpen),
    onMouseLeave: wrapEvent(children, 'onMouseLeave', handleClose),
    onClick: handleClick,
    onFocus: wrapEvent(children, 'onFocus', handleOpen),
    onBlur: wrapEvent(children, 'onBlur', handleClose),
    ...(_isOpen && { 'aria-describedby': tooltipId }),
  };

  let decoratedChild = null;

  if (typeof children === 'string' || shouldWrapChildren) {
    decoratedChild = (
      <Box
        ref={anchorRef}
        display="inline-block"
        tabIndex="0"
        {...referenceProps}
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
      ...referenceProps,
    });
  }

  const hasAriaLabel = ariaLabel != null;

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
