import React, { Children, cloneElement, useEffect, useRef, useState } from 'react';
import { useId } from '../utils/autoId';
import { PopoverContextProvider, usePopover } from './context';
import Box from '../Box';
import Popper, { PopperArrow } from '../Popper';
import Icon from '../Icon';
import PseudoBox from '../PseudoBox';
import {
  usePopoverContentStyle,
  usePopoverHeaderStyle,
  usePopoverBodyStyle,
  usePopoverCloseButtonStyle,
} from './styles';

const wrapEvent = (theirHandler, ourHandler) => event => {
  theirHandler && theirHandler(event);
  if (!event.defaultPrevented) {
    return ourHandler(event);
  }
  return '';
};

const usePrevious = (value) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

const PopoverTrigger = ({ children }) => {
  const {
    referenceRef,
    popoverId,
    onToggle,
    trigger,
    onOpen,
    isOpen,
    onClose,
    isHoveringRef,
  } = usePopover();

  const child = Children.only(children);
  let eventHandlers = {};

  if (trigger === 'click') {
    eventHandlers = {
      onClick: wrapEvent(child.props.onClick, onToggle),
    };
  }

  const openTimeout = useRef(null);

  if (trigger === 'hover') {
    eventHandlers = {
      onFocus: wrapEvent(child.props.onFocus, onOpen),
      onKeyDown: wrapEvent(child.props.onKeyDown, event => {
        if (event.key === 'Escape') {
          setTimeout(onClose, 300);
        }
      }),
      onBlur: wrapEvent(child.props.onBlur, onClose),
      onMouseEnter: wrapEvent(child.props.onMouseEnter, () => {
        isHoveringRef.current = true;
        openTimeout.current = setTimeout(onOpen, 300);
      }),
      onMouseLeave: wrapEvent(child.props.onMouseLeave, () => {
        isHoveringRef.current = false;
        if (openTimeout.current) {
          clearTimeout(openTimeout.current);
          openTimeout.current = null;
        }
        setTimeout(() => {
          if (isHoveringRef.current === false) {
            onClose();
          }
        }, 300);
      }),
    };
  }

  return cloneElement(child, {
    'aria-haspopup': 'dialog',
    'aria-expanded': isOpen,
    'aria-controls': popoverId,
    ref: referenceRef,
    ...eventHandlers,
  });
};

const PopoverCloseButton = ({ onClick, ...props }) => {
  const { onClose } = usePopover();
  const closeButtonStyleProps = usePopoverCloseButtonStyle();

  return (
    <Icon
      name="_core.close-s"
      onClick={wrapEvent(onClick, onClose)}
      aria-label="Close"
      {...closeButtonStyleProps}
      {...props}
    />
  );
};

const PopoverContent = ({
  onKeyDown,
  onBlur: onBlurProp,
  onMouseLeave,
  onMouseEnter,
  onFocus,
  children,
  'aria-label': ariaLabel,
  ...props
}) => {
  const {
    popoverRef,
    referenceRef,
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
    hasCloseButton,
    skidding,
    distance
  } = usePopover();
  const contentStyleProps = usePopoverContentStyle();
  const arrowSize = 12;
  const _distance = distance + 8; // Arrow height is 8px
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

  if (trigger === 'hover') {
    eventHandlers = {
      onMouseEnter: wrapEvent(onMouseEnter, () => {
        isHoveringRef.current = true;
      }),
      onMouseLeave: wrapEvent(onMouseLeave, () => {
        isHoveringRef.current = false;
        setTimeout(onClose, 300);
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
    <Popper
      as="section"
      usePortal={usePortal}
      isOpen={isOpen}
      placement={placement}
      aria-label={ariaLabel}
      anchorEl={referenceRef.current}
      ref={popoverRef}
      id={popoverId}
      aria-hidden={!isOpen}
      arrowSize={`${arrowSize}px`}
      modifiers={{ offset: [skidding, _distance] }}
      aria-labelledby={headerId}
      aria-describedby={bodyId}
      {...contentStyleProps}
      {...roleProps}
      {...eventHandlers}
      {...props}
    >
      {!hideArrow && <PopperArrow />}
      {hasCloseButton && <PopoverCloseButton />}
      {children}
    </Popper>
  );
};

const Popover = ({
  id,
  isOpen: isOpenProp,
  initialFocusRef,
  defaultIsOpen,
  usePortal = true,
  returnFocusOnClose = true,
  trigger = 'click',
  placement,
  children,
  hideArrow,
  skidding = 0,
  distance = 4,
  hasCloseButton = false,
  closeOnBlur = true,
  closeOnEsc = true,
  onOpen: onOpenProp,
  onClose: onCloseProp,
}) => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen || false);
  const { current: isControlled } = useRef(isOpenProp != null);

  const isHoveringRef = useRef();

  const referenceRef = useRef();
  const popoverRef = useRef();

  const _isOpen = isControlled ? isOpenProp : isOpen;

  const onToggle = () => {
    if (!isControlled) {
      setIsOpen(!_isOpen);
    }

    if (!_isOpen) {
      onOpenProp && onOpenProp();
    } else {
      onCloseProp && onCloseProp();
    }
  };

  const onOpen = () => {
    !isControlled && setIsOpen(true);
    onOpenProp && onOpenProp();
  };

  const onClose = () => {
    !isControlled && setIsOpen(false);
    onCloseProp && onCloseProp();
  };

  const handleBlur = event => {
    if (
      _isOpen &&
      closeOnBlur &&
      popoverRef.current &&
      referenceRef.current &&
      !popoverRef.current.contains(event.relatedTarget) &&
      !referenceRef.current.contains(event.relatedTarget)
    ) {
      onClose();
    }
  };

  const fallbackId = `popover-${useId()}`;
  const popoverId = id || fallbackId;

  const headerId = `${popoverId}-header`;
  const bodyId = `${popoverId}-body`;

  const prevIsOpen = usePrevious(_isOpen);

  useEffect(() => {
    if (_isOpen && trigger === 'click') {
      requestAnimationFrame(() => {
        if (initialFocusRef && initialFocusRef.current) {
          initialFocusRef.current.focus();
        } else if (popoverRef.current) {
          popoverRef.current.focus();
        }
      });
    }

    if (!_isOpen && prevIsOpen && trigger === 'click' && returnFocusOnClose) {
      if (referenceRef.current) {
        referenceRef.current.focus();
      }
    }
  }, [
    _isOpen,
    popoverRef,
    initialFocusRef,
    trigger,
    referenceRef,
    prevIsOpen,
    returnFocusOnClose,
  ]);

  const context = {
    popoverRef,
    placement,
    referenceRef,
    headerId,
    bodyId,
    popoverId,
    onOpen,
    onClose,
    onToggle,
    trigger,
    isOpen: _isOpen,
    onBlur: handleBlur,
    closeOnEsc,
    initialFocusRef,
    isHoveringRef,
    usePortal,
    hideArrow,
    hasCloseButton,
    skidding,
    distance
  };

  return (
    <PopoverContextProvider value={context}>
      {typeof children === 'function'
        ? children({ isOpen: _isOpen, onClose })
        : children}
    </PopoverContextProvider>
  );
};

const PopoverHeader = props => {
  const { headerId } = usePopover();
  const headerStyleProps = usePopoverHeaderStyle();

  return (
    <PseudoBox
      as="header"
      id={headerId}
      {...headerStyleProps}
      {...props}
    />
  );
};

const PopoverBody = props => {
  const { bodyId } = usePopover();
  const bodyStyleProps = usePopoverBodyStyle();
  return (
    <Box
      id={bodyId}
      {...bodyStyleProps}
      {...props}
    />
  );
};

const PopoverFooter = props => (
  <Box as="footer" pt="4x" {...props} />
);

export {
  PopoverHeader,
  PopoverFooter,
  PopoverBody,
  Popover,
  PopoverTrigger,
  PopoverContent,
};
