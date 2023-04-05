import { useOnceWhen, usePrevious } from '@tonic-ui/react-hooks';
import { runIfFn, warnDeprecatedProps, warnRemovedProps } from '@tonic-ui/utils';
import memoize from 'micro-memoize';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import config from '../shared/config';
import useAutoId from '../utils/useAutoId';
import { PopoverContext } from './context';

const getMemoizedState = memoize(state => ({ ...state }));

const Popover = ({
  arrowAt, // removed
  distance, // deprecated
  skidding, // deprecated
  children,
  closeOnBlur = true,
  closeOnEsc = true,
  defaultIsOpen = false,
  disabled,
  enterDelay = 100,
  followCursor,
  hideArrow,
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
      warnRemovedProps('arrowAt', {
        prefix,
        message: 'Use the \'PopoverArrowProps\' prop on the \'PopoverContent\' component instead.',
      });
    }, (arrowAt !== undefined));

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

  const popoverContentRef = useRef();
  const popoverTriggerRef = useRef();
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
  const popoverId = `${config.name}:Popover-${defaultId}`;
  const popoverTriggerId = `${config.name}:PopoverTrigger-${defaultId}`;
  const context = getMemoizedState({
    closeOnBlur,
    closeOnEsc,
    disabled,
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
    onClose,
    onOpen,
    placement: (nextToCursor || followCursor) ? 'bottom-start' : placement,
    popoverId,
    popoverContentRef,
    popoverTriggerId,
    popoverTriggerRef,
    setMouseCoordinate,
    skidding,
    trigger,
  });

  return (
    <PopoverContext.Provider value={context}>
      {runIfFn(children, context)}
    </PopoverContext.Provider>
  );
};

Popover.displayName = 'Popover';

export default Popover;
