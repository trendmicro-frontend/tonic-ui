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
  } = useTooltip();
  const styleProps = useTooltipArrowStyle({ arrowHeight, arrowWidth, placement });

  return (
    <Box
      ref={ref}
      role="presentation"
      data-popper-arrow // This data attribute is used by the Popper.js library to identify the element to use as the arrow (refer to "popper/Popper.js")
      {...styleProps}
      {...rest}
    />
  );
});

TooltipArrow.displayName = 'TooltipArrow';

export default TooltipArrow;
