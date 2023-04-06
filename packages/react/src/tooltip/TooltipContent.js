import { useHydrated, useMergeRefs, useOnceWhen } from '@tonic-ui/react-hooks';
import {
  ariaAttr,
  callAll,
  getLeftmostOffset,
  getTopmostOffset,
  isBlankString,
  isEmptyArray,
  isHTMLElement,
  warnDeprecatedProps,
  warnRemovedProps,
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
    PopperArrowComponent, // removed
    PopperArrowProps, // deprecated

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
  { // deprecation warning
    const prefix = `${TooltipContent.displayName}:`;

    useOnceWhen(() => {
      warnRemovedProps('PopperArrowComponent', {
        prefix,
        alternative: 'TooltipArrowComponent',
      });
    }, (PopperArrowComponent !== undefined));

    useOnceWhen(() => {
      warnDeprecatedProps('PopperArrowProps', {
        prefix,
        alternative: 'TooltipArrowProps',
        willRemove: true,
      });
    }, (PopperArrowProps !== undefined));

    TooltipArrowProps = {
      ...PopperArrowProps,
      ...TooltipArrowProps,
    };
  }

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
      const { offsetHeight } = tooltipTriggerElement;
      const leftmostOffset = getLeftmostOffset(tooltipTriggerElement);
      const topmostOffset = getTopmostOffset(tooltipTriggerElement);
      _skidding = mousePageX - leftmostOffset + 10;
      _distance = mousePageY - topmostOffset - offsetHeight + 15;
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
      anchorEl={tooltipTriggerRef.current}
      id={tooltipId}
      isOpen={isOpen}
      modifiers={popperModifiers}
      placement={placement}
      pointerEvents="none"
      ref={tooltipContentRef}
      role="tooltip"
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
