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
    offset,
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

  const anchorRef = useRef(null);
  const [isOpen, setIsOpen] = useState(isOpenProp ?? defaultIsOpen);

  useEffect(() => {
    const isControlled = (isOpenProp !== undefined);
    if (isControlled) {
      setIsOpen(isOpenProp);
    }
  }, [isOpenProp]);

  const enterTimeoutRef = useRef();
  const exitTimeoutRef = useRef();

  const openWithDelay = useCallback(() => {
    enterTimeoutRef.current = setTimeout(() => {
      setIsOpen(true);
      enterTimeoutRef.current = null;
    }, enterDelay);
  }, [enterDelay]);

  const closeWithDelay = useCallback(() => {
    if (enterTimeoutRef.current) {
      clearTimeout(enterTimeoutRef.current);
      enterTimeoutRef.current = null;
    }
    exitTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      exitTimeoutRef.current = null;
    }, leaveDelay);
  }, [leaveDelay]);

  const defaultId = useAutoId();
  const tooltipId = `${config.name}:Tooltip-${defaultId}`;

  const handleOpen = useCallback(() => {
    const isControlled = (isOpenProp !== undefined);
    if (!isControlled) {
      openWithDelay();
    }

    if (typeof onOpenProp === 'function') {
      onOpenProp();
    }
  }, [isOpenProp, onOpenProp, openWithDelay]);

  const handleClose = useCallback(() => {
    const isControlled = (isOpenProp !== undefined);
    if (!isControlled) {
      closeWithDelay();
    }

    if (typeof onCloseProp === 'function') {
      onCloseProp();
    }
  }, [isOpenProp, onCloseProp, closeWithDelay]);

  useEffect(() => {
    return () => {
      if (enterTimeoutRef.current) {
        clearTimeout(enterTimeoutRef.current);
        enterTimeoutRef.current = null;
      }
      if (exitTimeoutRef.current) {
        clearTimeout(exitTimeoutRef.current);
        exitTimeoutRef.current = null;
      }
    };
  }, []);

  const context = getMemoizedState({
    anchorRef,
    arrowAt,
    closeOnClick,
    closeOnEsc,
    closeOnMouseDown,
    disabled,
    enterDelay,
    hideArrow,
    isOpen,
    leaveDelay,
    offset,
    onClose: handleClose,
    onOpen: handleOpen,
    placement,
    tooltipId,
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
