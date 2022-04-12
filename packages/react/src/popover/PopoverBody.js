import React, { forwardRef } from 'react';
import { Box } from '../box';
import { usePopoverBodyStyle } from './styles';
import usePopover from './usePopover';

const PopoverBody = forwardRef((props, ref) => {
  const {
    popoverBodyId,
  } = usePopover();
  const styleProps = usePopoverBodyStyle({});

  return (
    <Box
      id={popoverBodyId}
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

PopoverBody.displayName = 'PopoverBody';

export default PopoverBody;
