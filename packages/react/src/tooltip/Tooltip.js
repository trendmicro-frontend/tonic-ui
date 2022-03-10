import { useHydrated, useOnceWhen } from '@tonic-ui/react-hooks';
import chainedFunction from 'chained-function';
import React, { forwardRef, useRef, useState } from 'react';
import { Box } from '../box';
import { Popper, PopperArrow } from '../popper';
import config from '../shared/config';
import { Grow } from '../transitions';
import useAutoId from '../utils/useAutoId';
import useForkRef from '../utils/useForkRef';
import warnDeprecatedProps from '../utils/warnDeprecatedProps';
import warnRemovedProps from '../utils/warnRemovedProps';
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
    shouldWrapChildren, // removed

    PopperComponent = Popper,
    PopperProps,
    PopperArrowComponent = PopperArrow,
    PopperArrowProps,
    TransitionComponent = Grow,
    TransitionProps,
    arrowAt,
    children,
    closeOnClick,
    defaultIsOpen = false,
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

    useOnceWhen(() => {
      warnRemovedProps('shouldWrapChildren', {
        prefix,
        message: 'Use Function as Child Component (FaCC) to render the tooltip trigger instead.',
      });
    }, (shouldWrapChildren !== undefined && !shouldWrapChildren));
  }

  const anchorRef = useRef(null);
  const nodeRef = useRef(null);
  const combinedRef = useForkRef(anchorRef, ref);
  const isHydrated = useHydrated();

  const [isOpen, setIsOpen] = useState(defaultIsOpen);
  const { current: isControlled } = useRef((isOpenProp !== undefined) && (isOpenProp !== null));
  const _isOpen = isControlled ? isOpenProp : isOpen;

  const enterTimeoutRef = useRef();
  const exitTimeoutRef = useRef();

  const openWithDelay = () => {
    enterTimeoutRef.current = setTimeout(() => {
      setIsOpen(true);
    }, enterDelay);
  };

  const closeWithDelay = () => {
    clearTimeout(enterTimeoutRef.current);
    exitTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, leaveDelay);
  };

  const defaultId = useAutoId();
  const tooltipId = `${config.name}:Tooltip-${defaultId}`;

  const handleOpen = () => {
    if (!isControlled) {
      openWithDelay();
    }

    if (onOpenProp) {
      onOpenProp();
    }
  };

  const handleClose = () => {
    if (!isControlled) {
      closeWithDelay();
    }

    if (onCloseProp) {
      onCloseProp();
    }
  };

  const handleClick = () => {
    if (closeOnClick) {
      closeWithDelay();
    }
  };

  const arrowSize = '6px';
  const tooltipStyleProps = useTooltipStyle();
  const getTooltipTriggerProps = () => {
    const tooltipTriggerStyleProps = {
      display: 'inline-flex',
    };
    const eventHandlerProps = {
      onMouseEnter: handleOpen,
      onMouseLeave: handleClose,
      onClick: handleClick,
      onFocus: handleOpen,
      onBlur: handleClose,
    };

    return {
      'aria-describedby': _isOpen ? tooltipId : undefined,
      ref: combinedRef,
      role: 'presentation',
      ...tooltipTriggerStyleProps,
      ...eventHandlerProps,
    };
  };

  return (
    <>
      {
        (typeof children === 'function')
          ? children({ getTooltipTriggerProps })
          : (<Box {...getTooltipTriggerProps()}>{children}</Box>)
      }
      {isHydrated && (
        <PopperComponent
          aria-hidden={!isOpen}
          isOpen={_isOpen}
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
