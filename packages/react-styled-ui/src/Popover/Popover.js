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
  placement = 'bottom',
  children,
  hideArrow,
  skidding = 0,
  distance = 4,
  enterDelay = 0,
  leaveDelay = 0,
  closeOnBlur = true,
  closeOnEsc = true,
  onOpen: onOpenProp,
  onClose: onCloseProp,
  nextToCursor,
  followCursor,
  arrowAt,
}) => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen || false);
  const [mousePageX, setMousePageX] = useState(0);
  const [mousePageY, setMousePageY] = useState(0);
  const { current: isControlled } = useRef(isOpenProp != null);

  const isHoveringRef = useRef();

  const anchorRef = useRef();
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
      anchorRef.current &&
      !popoverRef.current.contains(event.relatedTarget) &&
      !anchorRef.current.contains(event.relatedTarget)
    ) {
      onClose();
    }
  };

  const setMouseCoordinate = event => {
    setMousePageX(event.pageX);
    setMousePageY(event.pageY);
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
      if (anchorRef.current) {
        anchorRef.current.focus();
      }
    }
  }, [
    _isOpen,
    popoverRef,
    initialFocusRef,
    trigger,
    anchorRef,
    prevIsOpen,
    returnFocusOnClose,
  ]);

  /**
   * popoverRef: use the ref in the popover itself in PopoverContent
   * anchorRef: use the ref in the popover trigger element
   * placement: the directions of popover in PopoverContent
   * initialFocusRef: the ref of the element that should receive focus when the popover opens
   * isHoveringRef: use the ref to control the status of the trigger element or popover when the trigger event is 'hover'
   * usePortal: rendering popover inside a Portal rather beside the trigger element
   * skidding: displaces the popover (in pixels) along the reference element
   * distance: displaces the popover (in pixels) away from, or toward, the reference
   */
  const context = {
    popoverRef,
    anchorRef,
    headerId,
    bodyId,
    popoverId,
    placement: (nextToCursor || followCursor) ? 'bottom-start' : placement,
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
    hideArrow: (nextToCursor || followCursor) ? true : hideArrow,
    skidding,
    distance,
    enterDelay,
    leaveDelay,
    setMouseCoordinate,
    nextToCursor,
    followCursor,
    mousePageX,
    mousePageY,
    arrowAt,
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
