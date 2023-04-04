import React, { forwardRef } from 'react';
import { Box } from '../box';
import { usePopoverArrowStyle } from './styles';
import usePopover from './usePopover';

const PopoverArrow = forwardRef((
  {
    arrowHeight = 8,
    arrowWidth = 12,
    ...rest
  },
  ref,
) => {
  const {
    placement,
  } = usePopover();
  const styleProps = usePopoverArrowStyle({ arrowHeight, arrowWidth, placement });

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

PopoverArrow.displayName = 'PopoverArrow';

export default PopoverArrow;
