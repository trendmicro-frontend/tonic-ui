import chainedFunction from 'chained-function';
import React, { forwardRef, useRef } from 'react';
import Box from '../Box';
import Popper from '../Popper/Popper';
import PopperArrow from '../Popper/PopperArrow';
import Grow from '../Transitions/Grow';
import useEffectOnce from '../hooks/useEffectOnce';
import useHydrated from '../hooks/useHydrated';
import config from '../shared/config';
import useDisclosure from '../useDisclosure';
import { useId } from '../utils/autoId';
import useForkRef from '../utils/useForkRef';
import warnDeprecatedProps from '../utils/warnDeprecatedProps';
import warnRemovedProps from '../utils/warnRemovedProps';
import { useTooltipStyle } from './styles';

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
    defaultIsOpen, // removed
    shouldWrapChildren, // removed

    label,
    enterDelay = 100,
    leaveDelay = 0,
    placement = 'bottom',
    children,
    hideArrow,
    closeOnClick,
    isOpen: isControlledOpen,
    onOpen: onOpenProp,
    onClose: onCloseProp,
    arrowAt,
    PopperComponent = Popper,
    PopperProps,
    PopperArrowComponent = PopperArrow,
    PopperArrowProps,
    TransitionComponent = Grow,
    TransitionProps,
    ...rest
  },
  ref,
) => {
  useEffectOnce(() => {
    const prefix = `${Tooltip.displayName}:`;

    if (showDelay !== undefined) {
      warnDeprecatedProps('showDelay', {
        prefix,
        alternative: 'enterDelay',
        willRemove: true,
      });
    }

    if (hideDelay !== undefined) {
      warnDeprecatedProps('hideDelay', {
        prefix,
        alternative: 'leaveDelay',
        willRemove: true,
      });
    }

    if (defaultIsOpen !== undefined) {
      warnRemovedProps('defaultIsOpen', {
        prefix,
      });
    }

    if (shouldWrapChildren !== undefined && !shouldWrapChildren) {
      warnRemovedProps('shouldWrapChildren', {
        prefix,
        message: 'Use Function as Child Component (FaCC) to render the tooltip trigger instead.',
      });
    }
  });

  const isHydrated = useHydrated();
  const { isOpen, onClose, onOpen } = useDisclosure(false);
  const { current: isControlled } = useRef((isControlledOpen !== undefined) && (isControlledOpen !== null));
  const _isOpen = isControlled ? isControlledOpen : isOpen;

  const nodeRef = useRef(null);
  const combinedRef = useForkRef(nodeRef, ref);

  const enterTimeoutRef = useRef();
  const exitTimeoutRef = useRef();

  const openWithDelay = () => {
    enterTimeoutRef.current = setTimeout(onOpen, enterDelay);
  };

  const closeWithDelay = () => {
    clearTimeout(enterTimeoutRef.current);
    exitTimeoutRef.current = setTimeout(onClose, leaveDelay);
  };

  const tooltipId = `${config.name}:tooltip-${useId()}`;

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

  const anchorEl = nodeRef.current;
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
          usePortal
          isOpen={_isOpen}
          data-popper-placement={placement}
          placement={placement}
          modifiers={{
            offset: [0, 8],
          }}
          anchorEl={anchorEl}
          hideArrow={hideArrow}
          id={tooltipId}
          role="tooltip"
          pointerEvents="none"
          arrowSize={arrowSize}
          willUseTransition={true}
          {...PopperProps}
        >
          {({ placement, transition }) => {
            const { in: inProp, onEnter, onExited } = { ...transition };
            return (
              <TransitionComponent
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
