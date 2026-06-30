import { useEventListener } from '@tonic-ui/react-hooks';
import React, { forwardRef, useCallback, useRef, useState } from 'react';
import { Truncate } from '../truncate';
import { useTruncateStyle } from '../truncate/styles';
import Tooltip from './Tooltip';

/**
 * @typedef {Object} OverflowTooltipProps
 * @property {React.ElementType} [PopperComponent] - The component used for the popover.
 * @property {import('../popper/Popper').PopperProps} [PopperProps] - Props applied to the Popper component.
 * @property {React.ElementType} [TooltipArrowComponent] - The component used for the tooltip arrow.
 * @property {{ style?: React.CSSProperties }} [TooltipArrowProps] - Props applied to the `TooltipArrow` component.
 * @property {React.ElementType} [TransitionComponent] - The component used for the transition.
 * @property {{ appear?: boolean; timeout?: number | { appear?: number; enter?: number; exit?: number } }} [TransitionProps] - Props applied to the Transition element.
 * @property {boolean} [arrow=true] - Adds an arrow to the tooltip. Note: The arrow is not visible when `followCursor` or `nextToCursor` is enabled.
 * @property {React.ReactNode | ((context: { ref: React.RefCallback<HTMLElement>; style: React.CSSProperties }) => React.ReactNode)} [children] -
 * @property {boolean} [closeOnClick=true] - Close the tooltip on click.
 * @property {boolean} [closeOnEsc=true] - Close the tooltip when pressing the escape key.
 * @property {boolean} [closeOnMouseDown=false] - Close the tooltip while the mouse is down.
 * @property {boolean} [defaultIsOpen=false] - Whether the tooltip will be open by default.
 * @property {boolean} [disabled=false] - The tooltip will not display.
 * @property {number} [enterDelay=100] - The delay in milliseconds before the tooltip appears.
 * @property {boolean} [followCursor] - The tooltip will follow the cursor.
 * @property {boolean} [isOpen] - Show the tooltip.
 * @property {string | React.ReactNode} [label] - If the tooltip label is a blank or empty string, the tooltip will not display.
 * @property {number} [leaveDelay=0] - The delay in milliseconds before the tooltip disappears.
 * @property {boolean} [nextToCursor=true] - The tooltip will be positioned next to the cursor.
 * @property {[number, number]} [offset=[8, 12]] - The skidding and distance of the tooltip.
 * @property {() => void} [onClose] - Callback fired when the tooltip is closed.
 * @property {() => void} [onOpen] - Callback fired when the tooltip is opened.
 * @property {'top' | 'bottom' | 'right' | 'left' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'right-start' | 'right-end' | 'left-start' | 'left-end'} [placement='bottom-end'] - Position the tooltip relative to the trigger element as well as surrounding elements.
 */

/**
 * @type {ForwardRefComponent<'div', OverflowTooltipProps>}
 */
const OverflowTooltip = forwardRef((
  {
    children,
    disabled: disabledProp = false,
    nextToCursor: nextToCursorProp = true,
    offset: offsetProp = [8, 12],
    placement: placementProp = 'bottom-end',
    ...rest
  },
  ref,
) => {
  const contentRef = useRef();
  const [isOverflow, setIsOverflow] = useState();
  const truncateStyle = useTruncateStyle();

  const detectOverflow = useCallback((el, sizeProperty) => {
    if (sizeProperty !== 'width' && sizeProperty !== 'height') {
      console.error(`Invalid size property: ${sizeProperty}. Use 'width' or 'height'.`);
      return false;
    }

    const originalSize = el.style[sizeProperty];
    const s1 = el.getClientRects()?.[0]?.[sizeProperty];
    el.style[sizeProperty] = 'max-content';
    const s2 = el.getClientRects()?.[0]?.[sizeProperty];
    el.style[sizeProperty] = originalSize; // Revert to original size

    if (sizeProperty === 'width') {
      return s1 < s2 || el.scrollWidth > el.clientWidth;
    }

    if (sizeProperty === 'height') {
      return s1 < s2 || el.scrollHeight > el.clientHeight;
    }

    return false;
  }, []);

  const eventTargetFn = useCallback(() => {
    return contentRef.current;
  }, []);

  const onMouseEnter = useCallback((event) => {
    const el = event.currentTarget;
    const isWidthOverflow = detectOverflow(el, 'width');
    const isHeightOverflow = detectOverflow(el, 'height');
    const isOverflowDetected = isWidthOverflow || isHeightOverflow;
    setIsOverflow(isOverflowDetected);
  }, [detectOverflow]);

  const onMouseLeave = useCallback((event) => {
    setIsOverflow(false);
  }, []);

  useEventListener(eventTargetFn, 'mouseenter', onMouseEnter);
  useEventListener(eventTargetFn, 'mouseleave', onMouseLeave);

  const tooltipProps = {
    // The `disabled` prop is set to `true` if there is no overflow
    disabled: isOverflow ? disabledProp : true,
    nextToCursor: nextToCursorProp,
    offset: offsetProp,
    placement: placementProp,
  };

  return (
    <Tooltip
      ref={ref}
      {...tooltipProps}
      {...rest}
    >
      {(typeof children === 'function') ? (
        children({ ref: contentRef, style: truncateStyle })
      ) : (
        <Truncate ref={contentRef}>{children}</Truncate>
      )}
    </Tooltip>
  );
});

OverflowTooltip.displayName = 'OverflowTooltip';

export default OverflowTooltip;
