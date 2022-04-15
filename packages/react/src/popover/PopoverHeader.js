import React, { forwardRef } from 'react';
import { Box } from '../box';
import { usePopoverHeaderStyle } from './styles';
import usePopover from './usePopover';

const PopoverHeader = forwardRef((props, ref) => {
  const {
    popoverHeaderId,
  } = usePopover();
  const styleProps = usePopoverHeaderStyle({});

  return (
    <Box
      as="header"
      id={popoverHeaderId}
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

PopoverHeader.displayName = 'PopoverHeader';

export default PopoverHeader;
