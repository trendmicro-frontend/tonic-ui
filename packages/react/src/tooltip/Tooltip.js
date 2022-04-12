import { useOnceWhen } from '@tonic-ui/react-hooks';
import memoize from 'micro-memoize';
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { Popper, PopperArrow } from '../popper';
import config from '../shared/config';
import { Grow } from '../transitions';
import useAutoId from '../utils/useAutoId';
import warnDeprecatedProps from '../utils/warnDeprecatedProps';
import TooltipContent from './TooltipContent';
import TooltipTrigger from './TooltipTrigger';
import { TooltipProvider } from './context';

const getMemoizedState = memoize(state => ({ ...state }));

const defaultPlacement = 'bottom';

const Tooltip = forwardRef((
  {
    // TooltipContent props
    PopperComponent = Popper,
    PopperProps,
    PopperArrowComponent = PopperArrow,
    PopperArrowProps,
    TransitionComponent = Grow,
    TransitionProps,

    // TooltipTrigger props
    shouldWrapChildren = false,

    // Tooltip props
    showDelay, // deprecated
    hideDelay, // deprecated
    arrowAt,
    children,
    closeOnClick = false,
    closeOnEsc = false,
    closeOnMouseDown = false,
    defaultIsOpen = false,
    disabled,
    enterDelay = 100,
    hideArrow,
    isOpen: isOpenProp,
    label,
    leaveDelay = 0,
    onClose: onCloseProp,
    onOpen: onOpenProp,
    placement = defaultPlacement,
    ...rest
  },
  ref,
) => {
  { // deprecation warning
    const prefix = `${Tooltip.displayName}:`;

    useOnceWhen(() => {
      warnDeprecatedProps('showDelay', {
        prefix,
        alternative: 'enterDelay',
        willRemove: true,
      });
    }, (showDelay !== undefined));

    useOnceWhen(() => {
      warnDeprecatedProps('hideDelay', {
        prefix,
        alternative: 'leaveDelay',
        willRemove: true,
      });
    }, (hideDelay !== undefined));
  }

  const tooltipTriggerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(isOpenProp ?? defaultIsOpen);

  useEffect(() => {
    const isControlled = (isOpenProp !== undefined);
    if (isControlled) {
      setIsOpen(isOpenProp);
    }
  }, [isOpenProp]);

  const enterTimeoutRef = useRef();
  const leaveTimeoutRef = useRef();

  const openWithDelay = useCallback((delay) => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = undefined;
    }
    if (delay > 0) {
      enterTimeoutRef.current = setTimeout(() => {
        setIsOpen(true);
        enterTimeoutRef.current = undefined;
      }, enterDelay);
    } else {
      setIsOpen(true);
    }
  }, [enterDelay]);

  const closeWithDelay = useCallback((delay) => {
    if (enterTimeoutRef.current) {
      clearTimeout(enterTimeoutRef.current);
      enterTimeoutRef.current = undefined;
    }
    if (delay > 0) {
      leaveTimeoutRef.current = setTimeout(() => {
        setIsOpen(false);
        leaveTimeoutRef.current = undefined;
      }, leaveDelay);
    } else {
      setIsOpen(false);
    }
  }, [leaveDelay]);

  const defaultId = useAutoId();
  const tooltipId = `${config.name}:Tooltip-${defaultId}`;

  const onOpen = useCallback(() => {
    const isControlled = (isOpenProp !== undefined);
    if (!isControlled) {
      const delay = enterDelay;
      openWithDelay(delay);
    }

    if (typeof onOpenProp === 'function') {
      onOpenProp();
    }
  }, [isOpenProp, onOpenProp, openWithDelay, enterDelay]);

  const onClose = useCallback(() => {
    const isControlled = (isOpenProp !== undefined);
    if (!isControlled) {
      const delay = leaveDelay;
      closeWithDelay(delay);
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

  const context = getMemoizedState({
    arrowAt,
    closeOnClick,
    closeOnEsc,
    closeOnMouseDown,
    disabled,
    hideArrow,
    isOpen,
    onClose,
    onOpen,
    placement,
    tooltipId,
    tooltipTriggerRef,
  });

  return (
    <TooltipProvider value={context}>
      <TooltipTrigger
        shouldWrapChildren={shouldWrapChildren}
      >
        {children}
      </TooltipTrigger>
      <TooltipContent
        PopperComponent={PopperComponent}
        PopperProps={PopperProps}
        PopperArrowComponent={PopperArrowComponent}
        PopperArrowProps={PopperArrowProps}
        TransitionComponent={TransitionComponent}
        TransitionProps={TransitionProps}
      >
        {label}
      </TooltipContent>
    </TooltipProvider>
  );
});

Tooltip.displayName = 'Tooltip';

export default Tooltip;
