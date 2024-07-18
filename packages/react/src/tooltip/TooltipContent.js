import { useHydrated, useMergeRefs } from '@tonic-ui/react-hooks';
import {
  ariaAttr,
  callAll,
  isBlankString,
  isEmptyArray,
  isHTMLElement,
} from '@tonic-ui/utils';
import { ensureArray } from 'ensure-type';
import React, { forwardRef, useMemo, useRef } from 'react';
import { Box } from '../box';
import { Popper } from '../popper';
import { Grow } from '../transitions';
import TooltipArrow from './TooltipArrow';
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
    TooltipArrowComponent = TooltipArrow,
    TooltipArrowProps,
    TransitionComponent = Grow,
    TransitionProps,
    children,
    ...rest
  },
  ref,
) => {
  const isHydrated = useHydrated();
  const nodeRef = useRef(null);
  const combinedRef = useMergeRefs(nodeRef, ref);
  const {
    arrow,
    disabled,
    followCursor,
    isOpen,
    mousePageX,
    mousePageY,
    nextToCursor,
    offset,
    placement,
    tooltipId,
    tooltipContentRef,
    tooltipTriggerId,
    tooltipTriggerRef,
  } = useTooltip();
  const styleProps = useTooltipContentStyle();

  const tooltipTriggerElement = tooltipTriggerRef.current;
  const [
    skidding = 0,
    distance = 8,
  ] = ensureArray(offset);
  const [computedSkidding, computedDistance] = useMemo(() => {
    let _skidding = skidding;
    let _distance = distance;

    if (isHTMLElement(tooltipTriggerElement) && (followCursor || nextToCursor)) {
      const rect = tooltipTriggerElement.getBoundingClientRect();
      const elementX = rect.x + globalThis.scrollX;
      const elementY = rect.y + globalThis.scrollY;
      _skidding = mousePageX - elementX;
      _distance = mousePageY - elementY;
    }

    return [_skidding, _distance];
  }, [skidding, distance, tooltipTriggerElement, followCursor, nextToCursor, mousePageX, mousePageY]);
  const popperModifiers = useMemo(() => {
    const modifiers = [
      { // https://popper.js.org/docs/v2/modifiers/offset/
        name: 'offset',
        options: {
          offset: [computedSkidding, computedDistance],
        },
      },
    ];
    return modifiers;
  }, [computedSkidding, computedDistance]);

  if (!isHydrated) {
    return null;
  }

  if (disabled) {
    return null;
  }

  if (!children || isBlankString(children) || isEmptyArray(children)) {
    // TOOD: Objects are not valid as a React child
    return null;
  }

  return (
    <PopperComponent
      aria-hidden={ariaAttr(!isOpen)}
      aria-labelledby={tooltipTriggerId}
      data-popper-placement={placement}
      anchorEl={tooltipTriggerRef.current} // TODO: rename to `referenceRef` in a future release
      id={tooltipId}
      isOpen={isOpen}
      placement={placement}
      pointerEvents="none"
      ref={tooltipContentRef}
      role="tooltip"
      unmountOnExit={true}
      usePortal={false} // Pass `true` in `PopperProps` to render tooltip in a portal
      willUseTransition={true}
      zIndex="tooltip"
      {...PopperProps}
      modifiers={[
        // Default modifiers
        ...popperModifiers,
        // User-defined modifiers
        ...ensureArray(PopperProps?.modifiers),
      ]}
    >
      {({ placement, transition }) => {
        const { in: inProp, onEnter, onExited } = { ...transition };
        return (
          <TransitionComponent
            appear={true}
            {...TransitionProps}
            ref={combinedRef}
            in={inProp}
            onEnter={callAll(onEnter, TransitionProps?.onEnter)}
            onExited={callAll(onExited, TransitionProps?.onExited)}
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
                  {children}
                  {!!arrow && (
                    <TooltipArrowComponent {...TooltipArrowProps} />
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
