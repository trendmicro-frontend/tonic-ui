import { useOnceWhen, usePrevious } from '@tonic-ui/react-hooks';
import {
  warnDeprecatedProps,
} from '@tonic-ui/utils';
import memoize from 'micro-memoize';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import config from '../shared/config';
import runIfFn from '../utils/runIfFn';
import useAutoId from '../utils/useAutoId';
import { PopoverProvider } from './context';

const getMemoizedState = memoize(state => ({ ...state }));

const Popover = ({
  distance, // deprecated
  skidding, // deprecated
  arrowAt,
  children,
  closeOnBlur = true,
  closeOnEsc = true,
  defaultIsOpen = false,
  enterDelay = 100,
  followCursor,
  hideArrow,
  id,
  initialFocusRef,
  isOpen: isOpenProp,
  leaveDelay = 0,
  nextToCursor,
  offset,
  onClose: onCloseProp,
  onOpen: onOpenProp,
  placement = 'bottom',
  returnFocusOnClose = true,
  trigger = 'click',
}) => {
  { // deprecation warning
    const prefix = `${Popover.displayName}:`;

    useOnceWhen(() => {
      warnDeprecatedProps('skidding', {
        prefix,
        alternative: 'offset={[skidding, distance]}',
        willRemove: true,
      });
    }, (skidding !== undefined));

    useOnceWhen(() => {
      warnDeprecatedProps('distance', {
        prefix,
        alternative: 'offset={[skidding, distance]}',
        willRemove: true,
      });
    }, (distance !== undefined));

    offset = offset ?? [skidding, distance];
  }

  const popoverTriggerRef = useRef();
  const popoverContentRef = useRef();
  const isHoveringContentRef = useRef();
  const isHoveringTriggerRef = useRef();
  const [mousePageX, setMousePageX] = useState(0);
  const [mousePageY, setMousePageY] = useState(0);
  const [isOpen, setIsOpen] = useState(isOpenProp ?? defaultIsOpen);
  const prevIsOpen = usePrevious(isOpen);

  useEffect(() => {
    const isControlled = (isOpenProp !== undefined);
    if (isControlled) {
      setIsOpen(isOpenProp);
    }
  }, [isOpenProp]);

  const enterTimeoutRef = useRef();
  const leaveTimeoutRef = useRef();

  const openWithDelay = useCallback((callback, delay) => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = undefined;
    }
    if (delay > 0) {
      enterTimeoutRef.current = setTimeout(() => {
        enterTimeoutRef.current = undefined;
        setIsOpen(true);
        (typeof callback === 'function') && callback();
      }, delay);
    } else {
      setIsOpen(true);
      (typeof callback === 'function') && callback();
    }
  }, []);

  const closeWithDelay = useCallback((callback, delay) => {
    if (enterTimeoutRef.current) {
      clearTimeout(enterTimeoutRef.current);
      enterTimeoutRef.current = undefined;
    }
    if (delay > 0) {
      leaveTimeoutRef.current = setTimeout(() => {
        leaveTimeoutRef.current = undefined;
        setIsOpen(false);
        (typeof callback === 'function') && callback();
      }, delay);
    } else {
      setIsOpen(false);
      (typeof callback === 'function') && callback();
    }
  }, []);

  const onOpen = useCallback((callback) => {
    const isControlled = (isOpenProp !== undefined);
    if (!isControlled) {
      const delay = (trigger === 'hover') ? enterDelay : 0;
      openWithDelay(callback, delay);
    }

    if (typeof onOpenProp === 'function') {
      onOpenProp();
    }
  }, [isOpenProp, onOpenProp, trigger, enterDelay, openWithDelay]);

  const onClose = useCallback((callback) => {
    const isControlled = (isOpenProp !== undefined);
    if (!isControlled) {
      const delay = (trigger === 'hover') ? leaveDelay : 0;
      closeWithDelay(callback, delay);
    }

    if (typeof onCloseProp === 'function') {
      onCloseProp();
    }
  }, [isOpenProp, onCloseProp, trigger, leaveDelay, closeWithDelay]);

  const onBlur = useCallback((event) => {
    const relatedTarget = event.relatedTarget;
    const triggerEl = popoverTriggerRef.current;
    const contentEl = popoverContentRef.current;
    const isOutsideTrigger = !(triggerEl?.contains?.(relatedTarget));
    const isOutsideContent = !(contentEl?.contains?.(relatedTarget));

    if (isOpen && closeOnBlur && isOutsideTrigger && isOutsideContent) {
      onClose();
    }
  }, [isOpen, closeOnBlur, onClose, popoverTriggerRef, popoverContentRef]);

  const setMouseCoordinate = useCallback((event) => {
    setMousePageX(event.pageX);
    setMousePageY(event.pageY);
  }, []);

  useEffect(() => {
    if (isOpen && trigger === 'click') {
      requestAnimationFrame(() => {
        if (initialFocusRef && initialFocusRef.current) {
          initialFocusRef.current.focus();
        } else if (popoverContentRef.current) {
          popoverContentRef.current.focus();
        }
      });
    }

    if (!isOpen && prevIsOpen && trigger === 'click' && returnFocusOnClose) {
      if (popoverTriggerRef.current) {
        popoverTriggerRef.current.focus();
      }
    }
  }, [
    isOpen,
    popoverContentRef,
    initialFocusRef,
    trigger,
    popoverTriggerRef,
    prevIsOpen,
    returnFocusOnClose,
  ]);

  useEffect(() => {
    return () => {
      if (enterTimeoutRef.current) {
        clearTimeout(enterTimeoutRef.current);
        enterTimeoutRef.current = undefined;
      }
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
        leaveTimeoutRef.current = undefined;
      }
    };
  }, []);

  const defaultId = useAutoId();
  const fallbackId = `${config.name}:Popover-${defaultId}`;
  const popoverId = id || fallbackId;
  const popoverHeaderId = `${popoverId}-header`;
  const popoverBodyId = `${popoverId}-body`;
  const context = getMemoizedState({
    arrowAt,
    closeOnEsc,
    followCursor,
    hideArrow: (nextToCursor || followCursor) ? true : hideArrow,
    initialFocusRef,
    isHoveringContentRef,
    isHoveringTriggerRef,
    isOpen,
    mousePageX,
    mousePageY,
    nextToCursor,
    offset,
    onBlur,
    onClose,
    onOpen,
    placement: (nextToCursor || followCursor) ? 'bottom-start' : placement,
    popoverId,
    popoverBodyId,
    popoverContentRef,
    popoverHeaderId,
    popoverTriggerRef,
    setMouseCoordinate,
    skidding,
    trigger,
  });

  return (
    <PopoverProvider value={context}>
      {runIfFn(children, context)}
    </PopoverProvider>
  );
};

Popover.displayName = 'Popover';

export default Popover;
