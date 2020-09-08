import React, { cloneElement, useRef, Children, Fragment } from 'react';
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
  isOpen: controlledIsOpen,
  onOpen: onOpenProp,
  onClose: onCloseProp,
  arrowAt,
  ...rest
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure(defaultIsOpen || false);
  const { current: isControlled } = useRef(controlledIsOpen != null);
  const _isOpen = isControlled ? controlledIsOpen : isOpen;

  const referenceRef = useRef();
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
    ref: referenceRef,
    onMouseEnter: wrapEvent(children, 'onMouseEnter', handleOpen),
    onMouseLeave: wrapEvent(children, 'onMouseLeave', handleClose),
    onClick: handleClick,
    onFocus: wrapEvent(children, 'onFocus', handleOpen),
    onBlur: wrapEvent(children, 'onBlur', handleClose),
    ...(_isOpen && { 'aria-describedby': tooltipId }),
  };

  let clone;

  if (typeof children === 'string' || shouldWrapChildren) {
    clone = (
      <Box as="span" tabIndex="0" {...referenceProps}>
        {children}
      </Box>
    );
  } else {
    clone = cloneElement(Children.only(children), referenceProps);
  }

  const hasAriaLabel = ariaLabel != null;

  return (
    <Fragment>
      {clone}

      <Popper
        usePortal
        isOpen={_isOpen}
        data-popper-placement={placement}
        placement={placement}
        modifiers={{ offset: [0, 8] }}
        anchorEl={referenceRef.current}
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
    </Fragment>
  );
};

export default Tooltip;
