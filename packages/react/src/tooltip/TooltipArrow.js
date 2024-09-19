import { getComputedStyle, isHTMLElement } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { useTooltipArrowStyle } from './styles';
import useTooltip from './useTooltip';

const TooltipArrow = forwardRef((inProps, ref) => {
  const {
    arrowHeight = 4,
    arrowWidth = 8,
    sx,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'TooltipArrow' });
  const {
    placement,
    tooltipContentRef,
  } = useTooltip();
  const tooltipContentEl = tooltipContentRef?.current;
  const styleProps = useTooltipArrowStyle({ arrowHeight, arrowWidth });

  if (isHTMLElement(tooltipContentEl)) {
    // Compute the background color of the first direct child of the tooltip content and apply it to the tooltip arrow
    const computedStyle = getComputedStyle(tooltipContentEl.firstChild);
    styleProps.color = computedStyle?.backgroundColor;
  }

  return (
    <Box
      ref={ref}
      role="presentation"
      // The `data-popper-arrow` attribute is utilized by `popper/Popper.js` to designate the element used as the arrow
      data-popper-arrow
      // The `data-popper-placement` attribute is automatically updated by `popper/Popper.js` to reflect the popper's actual placement
      data-popper-placement={placement}
      sx={[
        styleProps,
        ...Array.isArray(sx) ? sx : [sx],
      ]}
      {...rest}
    />
  );
});

TooltipArrow.displayName = 'TooltipArrow';

export default TooltipArrow;
