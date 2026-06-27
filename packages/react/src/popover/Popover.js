import { useId, useOnceWhen, usePrevious } from '@tonic-ui/react-hooks';
import { runIfFn } from '@tonic-ui/utils';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDefaultProps } from '../default-props';
import useShallowMemo from '../utils/useShallowMemo';
import config from '../shared/config';
import { PopoverContext } from './context';

const defaultPlacement = 'bottom';

/**
 * @typedef {Object} PopoverProps
 * @property {boolean} [arrow=true] - Adds an arrow to the popover.
 * @property {React.ReactNode | ((context: { isOpen: boolean; onClose: (callback?: () => void) => void; onOpen: (callback?: () => void) => void; onToggle: () => void; placement: string }) => React.ReactNode)} [children] -
 * @property {boolean} [closeOnBlur=true] - The popover will close when the user clicks outside of the popover.
 * @property {boolean} [closeOnEsc=true] - The popover will close when you press the `Esc` key.
 * @property {boolean} [defaultIsOpen=false] - Whether the popover will be open by default.
 * @property {boolean} [disabled] - The popover will not display.
 * @property {number} [enterDelay=100] - The number of milliseconds to wait before showing the popover if `trigger` is hover.
 * @property {boolean} [followCursor] - The popover will follow the cursor.
 * @property {React.RefObject<HTMLElement>} [initialFocusRef] - The `ref` of the element that will be focused when the popover opens.
 * @property {boolean} [isOpen] - The popover will be open.
 * @property {number} [leaveDelay=0] - The number of milliseconds to wait before hiding the popover if `trigger` is hover.
 * @property {boolean} [nextToCursor] - The popover will be positioned next to the cursor.
 * @property {[number, number]} [offset=[0, 12]] - The skidding and distance of the popover.
 * @property {() => void} [onClose] - Callback when the popover is closed.
 * @property {() => void} [onOpen] - Callback when the popover is opened.
 * @property {'top' | 'bottom' | 'right' | 'left' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'right-start' | 'right-end' | 'left-start' | 'left-end'} [placement='bottom'] - The placement of the popover.
 * @property {boolean} [portalled=false] - If `true`, renders the popover in a portal.
 * @property {boolean} [returnFocusOnClose=true] - The popover will return the focus to the trigger element when closing. Otherwise, it will leave focus unchanged.
 * @property {'click' | 'hover'} [trigger='click'] - The type of trigger.
 */

/**
 * @type {StyledFC<PopoverProps>}
 */
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
    portalled,
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
    portalled,
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
