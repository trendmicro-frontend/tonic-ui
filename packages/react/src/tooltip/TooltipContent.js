import { useHydrated, useMergeRefs, useOnceWhen } from '@tonic-ui/react-hooks';
import {
  ariaAttr,
  callAll,
  getComputedStyle,
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
    disabled,
    hideArrow,
    isOpen,
    offset,
    placement,
    tooltipId,
    tooltipTriggerRef,
  } = useTooltip();
  const [
    skidding = 0,
    distance = 8,
  ] = ensureArray(offset);
  const popperModifiers = useMemo(() => {
    const modifiers = [
      { // https://popper.js.org/docs/v2/modifiers/offset/
        name: 'offset',
        options: {
          offset: [skidding, distance],
        },
      },
    ];
    return modifiers;
  }, [skidding, distance]);
  const styleProps = useTooltipContentStyle();

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
      data-popper-placement={placement}
      anchorEl={tooltipTriggerRef.current}
      hideArrow={hideArrow}
      id={tooltipId}
      isOpen={isOpen}
      modifiers={popperModifiers}
      placement={placement}
      pointerEvents="none"
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
              // Compute the background color of the tooltip content and apply it to the tooltip arrow
              const tooltipArrowStyleProps = {};
              if (isHTMLElement(nodeRef.current)) {
                const computedStyle = getComputedStyle(nodeRef.current);
                tooltipArrowStyleProps.color = computedStyle?.backgroundColor;
              }

              return (
                <Box
                  ref={ref}
                  {...styleProps}
                  {...transitionStyle}
                  transformOrigin={mapPlacementToTransformOrigin(placement)}
                  {...rest}
                >
                  {children}
                  {!hideArrow && (
                    <TooltipArrowComponent
                      {...tooltipArrowStyleProps}
                      {...TooltipArrowProps}
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
