import { useHydrated, useMergeRefs, useOnceWhen } from '@tonic-ui/react-hooks';
import {
  ariaAttr,
  callAll,
  isBlankString,
  isEmptyArray,
  isHTMLElement,
  warnDeprecatedProps,
} from '@tonic-ui/utils';
import { ensureArray, ensureFiniteNumber } from 'ensure-type';
import { forwardRef, useMemo, useRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { Popper } from '../popper';
import { Grow } from '../transitions';
import { useSlot } from '../slot';
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

const TooltipContent = forwardRef((inProps, ref) => {
  const {
    PopperComponent, // deprecated
    PopperProps, // deprecated
    TooltipArrowComponent, // deprecated
    TooltipArrowProps, // deprecated
    TransitionComponent, // deprecated
    TransitionProps, // deprecated
    slots = {},
    slotProps = {},
    children,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'TooltipContent' });

  { // deprecation warning
    const prefix = `${TooltipContent.displayName}:`;
    useOnceWhen(() => {
      warnDeprecatedProps('TransitionComponent', {
        prefix,
        alternative: 'slots.transition',
        willRemove: true,
      });
    }, TransitionComponent !== undefined);
    useOnceWhen(() => {
      warnDeprecatedProps('TransitionProps', {
        prefix,
        alternative: 'slotProps.transition',
        willRemove: true,
      });
    }, TransitionProps !== undefined);
    useOnceWhen(() => {
      warnDeprecatedProps('PopperComponent', {
        prefix,
        alternative: 'slots.popper',
        willRemove: true,
      });
    }, PopperComponent !== undefined);
    useOnceWhen(() => {
      warnDeprecatedProps('PopperProps', {
        prefix,
        alternative: 'slotProps.popper',
        willRemove: true,
      });
    }, PopperProps !== undefined);
    useOnceWhen(() => {
      warnDeprecatedProps('TooltipArrowComponent', {
        prefix,
        alternative: 'slots.arrow',
        willRemove: true,
      });
    }, TooltipArrowComponent !== undefined);
    useOnceWhen(() => {
      warnDeprecatedProps('TooltipArrowProps', {
        prefix,
        alternative: 'slotProps.arrow',
        willRemove: true,
      });
    }, TooltipArrowProps !== undefined);
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
    portalled,
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

  const [PopperSlot, popperSlotProps] = useSlot({
    name: 'popper',
    ownerDisplayName: TooltipContent.displayName,
    props: {
      'aria-hidden': ariaAttr(!isOpen),
      'aria-labelledby': tooltipTriggerId,
      'data-popper-placement': placement,
      id: tooltipId,
      isOpen: isOpen,
      placement: placement,
      pointerEvents: 'none',
      ref: tooltipContentRef,
      referenceRef: tooltipTriggerRef,
      role: 'tooltip',
      unmountOnExit: true,
      portalled,
      willUseTransition: true,
      zIndex: 'tooltip',
    },
    slot: slots.popper ?? PopperComponent ?? Popper,
    slotProps: { ...PopperProps, ...slotProps.popper },
  });

  const [TransitionSlot, transitionSlotProps] = useSlot({
    name: 'transition',
    ownerDisplayName: TooltipContent.displayName,
    props: {
      ref: combinedRef,
      appear: true,
    },
    slot: slots.transition ?? TransitionComponent ?? Grow,
    slotProps: { ...TransitionProps, ...slotProps.transition },
  });

  const [ArrowSlot, arrowSlotProps] = useSlot({
    name: 'arrow',
    ownerDisplayName: TooltipContent.displayName,
    slot: slots.arrow ?? TooltipArrowComponent ?? TooltipArrow,
    slotProps: { ...TooltipArrowProps, ...slotProps.arrow },
  });

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
    <PopperSlot
      {...popperSlotProps}
      modifiers={[
        // Default modifiers
        ...popperModifiers,
        // User-defined modifiers
        ...ensureArray(popperSlotProps?.modifiers),
      ]}
    >
      {({ placement, transition }) => {
        const { in: inProp, onEnter, onExited } = { ...transition };
        return (
          <TransitionSlot
            {...transitionSlotProps}
            in={inProp}
            onEnter={callAll(onEnter, transitionSlotProps.onEnter)}
            onExited={callAll(onExited, transitionSlotProps.onExited)}
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
                    <ArrowSlot {...arrowSlotProps} />
                  )}
                </Box>
              );
            }}
          </TransitionSlot>
        );
      }}
    </PopperSlot>
  );
});

TooltipContent.displayName = 'TooltipContent';

export default TooltipContent;
