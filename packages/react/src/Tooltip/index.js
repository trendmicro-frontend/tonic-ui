import React, { forwardRef, useEffect, useRef, useState } from 'react';
import Box from '../Box';
import Popper from '../Popper/Popper';
import PopperArrow from '../Popper/PopperArrow';
import useHydrated from '../hooks/useHydrated';
import useEffectOnce from '../hooks/useEffectOnce';
import useDisclosure from '../useDisclosure';
import { useId } from '../utils/autoId';
import useForkRef from '../utils/useForkRef';
import warnRemovedProps from '../utils/warnRemovedProps';
import { useTooltipStyle } from './styles';

const Tooltip = forwardRef((
  {
    defaultIsOpen, // removed
    shouldWrapChildren, // removed

    label,
    showDelay = 0,
    hideDelay = 0,
    placement = 'bottom',
    children,
    hideArrow,
    closeOnClick,
    isOpen: isControlledOpen,
    onOpen: onOpenProp,
    onClose: onCloseProp,
    arrowAt,
    ...rest
  },
  ref,
) => {
  useEffectOnce(() => {
    const prefix = `${Tooltip.displayName}:`;

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
    enterTimeoutRef.current = setTimeout(onOpen, showDelay);
  };

  const closeWithDelay = () => {
    clearTimeout(enterTimeoutRef.current);
    exitTimeoutRef.current = setTimeout(onClose, hideDelay);
  };

  const tooltipId = `tooltip-${useId()}`;

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
        <Popper
          aria-hidden={!isOpen}
          usePortal
          isOpen={_isOpen}
          data-popper-placement={placement}
          placement={placement}
          modifiers={{ offset: [0, 8] }}
          anchorEl={anchorEl}
          hideArrow={hideArrow}
          id={tooltipId}
          role="tooltip"
          pointerEvents="none"
          arrowSize={arrowSize}
          {...tooltipStyleProps}
          {...rest}
        >
          {label}
          {!hideArrow && <PopperArrow arrowAt={arrowAt} />}
        </Popper>
      )}
    </>
  );
});

Tooltip.displayName = 'Tooltip';

export default Tooltip;
