import React, { useEffect, useRef, useState } from 'react';
import { useId } from '../utils/autoId';
import { PopoverContextProvider } from './context';

const usePrevious = (value) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
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
  delay = 0,
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

  if (typeof delay === 'number') {
    delay = {
      show: delay,
      hide: delay
    };
  }

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

  /**
   * popoverRef: use the ref in the popover itself in PopoverContent
   * referenceRef: use the ref in the popover trigger element
   * placement: the directions of popover in PopoverContent
   * initialFocusRef: the ref of the element that should receive focus when the popover opens
   * isHoveringRef: use the ref to control the status of the trigger element or popover when the trigger event is 'hover'
   * usePortal: rendering popover inside a Portal rather beside the trigger element
   * skidding: displaces the popover (in pixels) along the reference element
   * distance: displaces the popover (in pixels) away from, or toward, the reference
   */

  const context = {
    popoverRef,
    referenceRef,
    headerId,
    bodyId,
    popoverId,
    placement,
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
    skidding,
    distance,
    delay,
  };

  return (
    <PopoverContextProvider value={context}>
      {typeof children === 'function'
        ? children({ isOpen: _isOpen, onClose })
        : children}
    </PopoverContextProvider>
  );
};

Popover.displayName = 'Popover';

export default Popover;
