import memoize from 'micro-memoize';
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { useDefaultProps } from '../default-props';
import { Popper } from '../popper';
import config from '../shared/config';
import { Grow } from '../transitions';
import useAutoId from '../utils/useAutoId';
import TooltipArrow from './TooltipArrow';
import TooltipContent from './TooltipContent';
import TooltipTrigger from './TooltipTrigger';
import { TooltipContext } from './context';

const getMemoizedState = memoize(state => ({ ...state }));

const defaultPlacement = 'bottom';

const Tooltip = forwardRef((inProps, ref) => {
  const {
    // TooltipContent props
    PopperComponent = Popper,
    PopperProps,
    TooltipArrowComponent = TooltipArrow,
    TooltipArrowProps,
    TransitionComponent = Grow,
    TransitionProps,

    // TooltipTrigger props
    shouldWrapChildren = false,

    // Tooltip props
    arrow = true,
    children,
    closeOnClick = true,
    closeOnEsc = true,
    closeOnPointerDown = true,
    defaultIsOpen = false,
    disabled,
    enterDelay = 100,
    followCursor,
    isOpen: isOpenProp,
    label,
    leaveDelay = 0,
    nextToCursor,
    offset,
    onClose: onCloseProp,
    onOpen: onOpenProp,
    openOnFocus = true,
    placement = defaultPlacement,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Tooltip' });
  const tooltipContentRef = useRef(null);
  const tooltipTriggerRef = useRef(null);
  const [mousePageX, setMousePageX] = useState(0);
  const [mousePageY, setMousePageY] = useState(0);
  const [isOpen, setIsOpen] = useState(isOpenProp ?? defaultIsOpen);

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
      const delay = enterDelay;
      openWithDelay(callback, delay);
    }

    if (typeof onOpenProp === 'function') {
      onOpenProp();
    }
  }, [isOpenProp, onOpenProp, openWithDelay, enterDelay]);

  const onClose = useCallback((callback) => {
    const isControlled = (isOpenProp !== undefined);
    if (!isControlled) {
      const delay = leaveDelay;
      closeWithDelay(callback, delay);
    }

    if (typeof onCloseProp === 'function') {
      onCloseProp();
    }
  }, [isOpenProp, onCloseProp, closeWithDelay, leaveDelay]);

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
  const tooltipId = `${config.name}:Tooltip-${defaultId}`;
  const tooltipTriggerId = `${config.name}:TooltipTrigger-${defaultId}`;
  const context = getMemoizedState({
    arrow: (followCursor || nextToCursor) ? false : arrow,
    closeOnClick,
    closeOnEsc,
    closeOnPointerDown,
    disabled,
    followCursor,
    isOpen,
    mousePageX,
    mousePageY,
    nextToCursor,
    offset,
    onClose,
    onOpen,
    openOnFocus,
    placement,
    setMousePageX,
    setMousePageY,
    tooltipId,
    tooltipContentRef,
    tooltipTriggerId,
    tooltipTriggerRef,
  });

  if (typeof children === 'function') {
    return (
      <TooltipContext.Provider value={context}>
        {children(context)}
      </TooltipContext.Provider>
    );
  }

  return (
    <TooltipContext.Provider value={context}>
      <TooltipTrigger
        shouldWrapChildren={shouldWrapChildren}
      >
        {children}
      </TooltipTrigger>
      <TooltipContent
        PopperComponent={PopperComponent}
        PopperProps={PopperProps}
        TooltipArrowComponent={TooltipArrowComponent}
        TooltipArrowProps={TooltipArrowProps}
        TransitionComponent={TransitionComponent}
        TransitionProps={TransitionProps}
        {...rest}
      >
        {label}
      </TooltipContent>
    </TooltipContext.Provider>
  );
});

Tooltip.displayName = 'Tooltip';

export default Tooltip;
