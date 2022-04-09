import { useEventListener, useHydrated, useOnceWhen } from '@tonic-ui/react-hooks';
import chainedFunction from 'chained-function';
import React, { cloneElement, forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { Box } from '../box';
import { Popper, PopperArrow } from '../popper';
import config from '../shared/config';
import { Grow } from '../transitions';
import isBlankString from '../utils/isBlankString';
import ownerDocument from '../utils/dom/ownerDocument';
import { mergeRefs } from '../utils/refs';
import useAutoId from '../utils/useAutoId';
import useForkRef from '../utils/useForkRef';
import warnDeprecatedProps from '../utils/warnDeprecatedProps';
import wrapEvent from '../utils/wrapEvent';
import { useTooltipStyle } from './styles';

const defaultPlacement = 'bottom';

const mapPlacementToTransformOrigin = placement => ({
  'top': 'bottom center',
  'top-start': 'bottom left',
  'top-end': 'bottom right',
  'bottom': 'top center',
  'bottom-start': 'top left',
  'bottom-end': 'top right',
  'left': 'right center',
  'left-start': 'right top',
  'left-end': 'right bottom',
  'right': 'left center',
  'right-start': 'left top',
  'right-end': 'left bottom',
}[placement]);

const Tooltip = forwardRef((
  {
    showDelay, // deprecated
    hideDelay, // deprecated

    PopperComponent = Popper,
    PopperProps,
    PopperArrowComponent = PopperArrow,
    PopperArrowProps,
    TransitionComponent = Grow,
    TransitionProps,
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
    shouldWrapChildren = false,
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
  const nodeRef = useRef(null);
  const combinedRef = useForkRef(anchorRef, ref);
  const isHydrated = useHydrated();
  const canDisplayTooltip = (
    !disabled && // not disabled
    !!label && // truthy value check
    !isBlankString(label) // not blank string
  );
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
    if (!canDisplayTooltip) {
      return;
    }

    const isControlled = (isOpenProp !== undefined);
    if (!isControlled) {
      openWithDelay();
    }

    if (typeof onOpenProp === 'function') {
      onOpenProp();
    }
  }, [canDisplayTooltip, isOpenProp, onOpenProp, openWithDelay]);

  const handleClose = useCallback(() => {
    const isControlled = (isOpenProp !== undefined);
    if (!isControlled) {
      closeWithDelay();
    }

    if (typeof onCloseProp === 'function') {
      onCloseProp();
    }
  }, [isOpenProp, onCloseProp, closeWithDelay]);

  const handleBlur = handleClose;
  const handleClick = useCallback(() => {
    if (closeOnClick) {
      handleClose();
    }
  }, [closeOnClick, handleClose]);
  const handleFocus = handleOpen;
  const handleKeyDown = useCallback((event) => {
    if (isOpen && closeOnEsc && event.key === 'Escape') {
      handleClose();
    }
  }, [isOpen, closeOnEsc, handleClose]);
  const handleMouseDown = useCallback(() => {
    if (closeOnMouseDown) {
      handleClose();
    }
  }, [closeOnMouseDown, handleClose]);
  const handleMouseEnter = handleOpen;
  const handleMouseLeave = handleClose;

  useEventListener(
    () => ownerDocument(anchorRef.current),
    'keydown',
    closeOnEsc ? handleKeyDown : undefined,
  );

  /**
   * This allows for catching the "mouseleave" event when the tooltip trigger is disabled.
   * There is currently a known issue in React regarding the onMouseLeave polyfill.
   * @see https://github.com/facebook/react/issues/11972
   */
  useEventListener(
    () => anchorRef.current,
    'mouseleave',
    handleMouseLeave,
  );

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

  const arrowSize = '6px'; // FIXME: this should be a theme value
  const tooltipStyleProps = useTooltipStyle();
  const getTooltipTriggerProps = useCallback(
    (ownProps = {}, ownRef = null) => {
      const eventHandlerProps = {
        onBlur: wrapEvent(ownProps?.onBlur, handleBlur),
        onClick: wrapEvent(ownProps?.onClick, handleClick),
        onFocus: wrapEvent(ownProps?.onFocus, handleFocus),
        onMouseDown: wrapEvent(ownProps?.onMouseDown, handleMouseDown),
        onMouseEnter: wrapEvent(ownProps?.onMouseEnter, handleMouseEnter),
      };

      return {
        ...ownProps,
        'aria-describedby': isOpen ? tooltipId : undefined,
        ref: mergeRefs(combinedRef, ownRef),
        ...eventHandlerProps,
      };
    },
    [
      handleBlur,
      handleClick,
      handleFocus,
      handleMouseDown,
      handleMouseEnter,
      isOpen,
      tooltipId,
      combinedRef,
    ],
  );

  const trigger = (() => {
    if (shouldWrapChildren) {
      return (
        <Box
          display="inline-flex"
          tabIndex={0}
          {...getTooltipTriggerProps()}
        >
          {children}
        </Box>
      );
    }

    // Ensure tooltip has only one child node
    const child = React.Children.only(children);
    return cloneElement(child, getTooltipTriggerProps(child?.props, child?.ref));
  })();

  return (
    <>
      {(typeof children === 'function') ? children({ getTooltipTriggerProps }) : trigger}
      {(isHydrated && canDisplayTooltip) && (
        <PopperComponent
          aria-hidden={!isOpen}
          isOpen={isOpen}
          data-popper-placement={placement}
          placement={placement}
          modifiers={{
            offset: [0, 8],
          }}
          anchorEl={anchorRef.current}
          hideArrow={hideArrow}
          id={tooltipId}
          role="tooltip"
          pointerEvents="none"
          arrowSize={arrowSize}
          unmountOnExit={true}
          usePortal={false} // Pass `true` in `PopperProps` to render tooltip in a portal
          willUseTransition={true}
          zIndex="tooltip"
          {...PopperProps}
        >
          {({ placement, transition }) => {
            const { in: inProp, onEnter, onExited } = { ...transition };
            return (
              <TransitionComponent
                appear={true}
                {...TransitionProps}
                ref={nodeRef}
                in={inProp}
                onEnter={chainedFunction(onEnter, TransitionProps?.onEnter)}
                onExited={chainedFunction(onExited, TransitionProps?.onExited)}
              >
                {(state, { ref, style: transitionStyle }) => {
                  return (
                    <Box
                      ref={ref}
                      {...tooltipStyleProps}
                      {...transitionStyle}
                      transformOrigin={mapPlacementToTransformOrigin(placement)}
                      {...rest}
                    >
                      {label}
                      {!hideArrow && (
                        <PopperArrowComponent
                          arrowAt={arrowAt}
                          {...PopperArrowProps}
                        />
                      )}
                    </Box>
                  );
                }}
              </TransitionComponent>
            );
          }}
        </PopperComponent>
      )}
    </>
  );
});

Tooltip.displayName = 'Tooltip';

export default Tooltip;
