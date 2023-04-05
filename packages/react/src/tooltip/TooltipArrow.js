import { getComputedStyle, isHTMLElement } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useTooltipArrowStyle } from './styles';
import useTooltip from './useTooltip';

const TooltipArrow = forwardRef((
  {
    arrowHeight = 4,
    arrowWidth = 8,
    ...rest
  },
  ref,
) => {
  const {
    placement,
    tooltipContentRef,
  } = useTooltip();
  const styleProps = useTooltipArrowStyle({ arrowHeight, arrowWidth, placement });
  const colorStyleProps = (() => {
    const tooltipContentEl = tooltipContentRef?.current;
    if (isHTMLElement(tooltipContentEl)) {
      // Compute the background color of the first direct child of the tooltip content and apply it to the tooltip arrow
      const computedStyle = getComputedStyle(tooltipContentEl.firstChild);
      return {
        color: computedStyle?.backgroundColor,
      };
    }
    return {};
  })();

  return (
    <Box
      ref={ref}
      role="presentation"
      data-popper-arrow // This data attribute is used by the Popper.js library to identify the element to use as the arrow (refer to "popper/Popper.js")
      {...styleProps}
      {...colorStyleProps}
      {...rest}
    />
  );
});

TooltipArrow.displayName = 'TooltipArrow';

export default TooltipArrow;
