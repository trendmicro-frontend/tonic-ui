import { useId, useOnceWhen, usePrevious } from '@tonic-ui/react-hooks';
import { runIfFn } from '@tonic-ui/utils';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDefaultProps } from '../default-props';
import useShallowMemo from '../utils/useShallowMemo';
import config from '../shared/config';
import { PopoverContext } from './context';

const defaultPlacement = 'bottom';

const Popover = (inProps) => {
  const {
    arrow = true,
    children,
    closeOnBlur = true,
    closeOnEsc = true,
    defaultIsOpen = false,
    disabled,
    enterDelay = 100,
    followCursor,
    initialFocusRef,
    isOpen: isOpenProp,
    leaveDelay = 0,
    nextToCursor,
    offset,
    onClose: onCloseProp,
    onOpen: onOpenProp,
    placement = defaultPlacement,
    returnFocusOnClose = true,
    trigger = 'click',
  } = useDefaultProps({ props: inProps, name: 'Popover' });
  const shallowMemo = useShallowMemo();

  { // validation warnings
    const prefix = `${Popover.displayName}:`;

    useOnceWhen(() => {
      console.error(`[${prefix}] Invalid trigger "${trigger}". Use either "click" or "hover".`);
    }, (trigger !== 'click' && trigger !== 'hover'));
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

  const onToggle = useCallback(() => {
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  }, [isOpen, onClose, onOpen]);

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

  const defaultId = useId();
  const popoverId = `${config.name}:Popover-${defaultId}`;
  const popoverTriggerId = `${config.name}:PopoverTrigger-${defaultId}`;

  const context = shallowMemo({
    closeOnBlur,
    closeOnEsc,
    disabled,
    followCursor,
    arrow: (followCursor || nextToCursor) ? false : arrow,
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
    onToggle,
    placement: (followCursor || nextToCursor) ? 'bottom-start' : placement,
    popoverId,
    popoverContentRef,
    popoverTriggerId,
    popoverTriggerRef,
    setMousePageX,
    setMousePageY,
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
