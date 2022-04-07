import { usePrevious } from '@tonic-ui/react-hooks';
import React, { useEffect, useRef, useState } from 'react';
import config from '../shared/config';
import runIfFn from '../utils/runIfFn';
import useAutoId from '../utils/useAutoId';
import { PopoverContextProvider } from './context';

const Popover = ({
  arrowAt,
  children,
  closeOnBlur = true,
  closeOnEsc = true,
  defaultIsOpen = false,
  distance = 4,
  enterDelay = 0,
  followCursor,
  hideArrow,
  id,
  initialFocusRef,
  isOpen: isOpenProp,
  leaveDelay = 0,
  nextToCursor,
  onClose: onCloseProp,
  onOpen: onOpenProp,
  placement = 'bottom',
  returnFocusOnClose = true,
  skidding = 0,
  trigger = 'click',
}) => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);
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

  const defaultId = useAutoId();
  const fallbackId = `${config.name}:Popover-${defaultId}`;
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
      {runIfFn(children, context)}
    </PopoverContextProvider>
  );
};

Popover.displayName = 'Popover';

export default Popover;
