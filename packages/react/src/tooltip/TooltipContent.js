import { useHydrated, useMergeRefs } from '@tonic-ui/react-hooks';
import {
  ariaAttr,
  callAll,
  isBlankString,
  isEmptyArray,
  isHTMLElement,
} from '@tonic-ui/utils';
import { ensureArray, ensureFiniteNumber } from 'ensure-type';
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

  const popperModifiers = useMemo(() => [
    { // https://popper.js.org/docs/v2/modifiers/offset/
      name: 'offset',
      options: {
        offset: ({ placement, reference, popper }) => {
          let computedSkidding = ensureFiniteNumber(skidding);
          let computedDistance = ensureFiniteNumber(distance);

          if (isHTMLElement(tooltipTriggerElement) && (followCursor || nextToCursor)) {
            // @see https://sentry.io/answers/how-do-i-get-the-position-x-y-of-an-html-element/

            // Get the window coordinate
            const rect = tooltipTriggerElement.getBoundingClientRect();

            // Get the page coordinate
            const elementPageX = rect.x + globalThis.scrollX;
            const elementPageY = rect.y + globalThis.scrollY;

            // top, top-start, top-end, bottom, bottom-start, bottom-end
            if (placement.startsWith('top') || placement.startsWith('bottom')) {
              if (placement.endsWith('start')) {
                computedSkidding += ensureFiniteNumber(mousePageX - elementPageX - popper.width);
              } else if (placement.endsWith('end')) {
                computedSkidding += ensureFiniteNumber(mousePageX - elementPageX - reference.width + popper.width);
              } else {
                computedSkidding += ensureFiniteNumber(mousePageX - elementPageX - reference.width / 2);
              }

              if (placement.startsWith('top')) {
                computedDistance += ensureFiniteNumber(elementPageY - mousePageY);
              } else if (placement.startsWith('bottom')) {
                computedDistance += ensureFiniteNumber(mousePageY - elementPageY - reference.height);
              }
            }

            // left, left-start, left-end, right, right-start, right-end
            if (placement.startsWith('left') || placement.startsWith('right')) {
              if (placement.endsWith('start')) {
                computedSkidding += ensureFiniteNumber(mousePageY - elementPageY - popper.height);
              } else if (placement.endsWith('end')) {
                computedSkidding += ensureFiniteNumber(mousePageY - elementPageY - reference.height + popper.height);
              } else {
                computedSkidding += ensureFiniteNumber(mousePageY - elementPageY - reference.height / 2);
              }

              if (placement.startsWith('left')) {
                computedDistance += ensureFiniteNumber(elementPageX - mousePageX);
              } else if (placement.startsWith('right')) {
                computedDistance += ensureFiniteNumber(mousePageX - elementPageX - reference.width);
              }
            }
          }

          return [computedSkidding, computedDistance];
        },
      },
    },
  ], [skidding, distance, tooltipTriggerElement, followCursor, nextToCursor, mousePageX, mousePageY]);

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