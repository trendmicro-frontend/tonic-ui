import { useHydrated } from '@tonic-ui/react-hooks';
import chainedFunction from 'chained-function';
import React, { forwardRef, useRef } from 'react';
import { Box } from '../box';
import { Popper, PopperArrow } from '../popper';
import { Grow } from '../transitions';
import isBlankString from '../utils/isBlankString';
import { useTooltipContentStyle } from './styles';
import useTooltip from './useTooltip';

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

const TooltipContent = forwardRef((
  {
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
  const isHydrated = useHydrated();
  const nodeRef = useRef(null);
  const {
    anchorRef,
    arrowAt,
    disabled,
    hideArrow,
    isOpen,
    label,
    placement,
    tooltipId,
  } = useTooltip();
  const arrowSize = '6px'; // FIXME: this should be a theme value
  const styleProps = useTooltipContentStyle();

  if (!isHydrated) {
    return null;
  }

  const canDisplayTooltip = (
    !disabled && // not disabled
    !!label && // truthy value check
    !isBlankString(label) // not blank string
  );
  if (!canDisplayTooltip) {
    return null;
  }

  return (
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
                  {...styleProps}
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
  );
});

TooltipContent.displayName = 'TooltipContent';

export default TooltipContent;
