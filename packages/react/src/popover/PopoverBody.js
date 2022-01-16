import React, { forwardRef } from 'react';
import { Box } from '../box';
import { usePopover } from './context';
import { usePopoverBodyStyle } from './styles';

const PopoverBody = forwardRef((props, ref) => {
  const { bodyId } = usePopover();
  const styleProps = usePopoverBodyStyle({});

  return (
    <Box
      id={bodyId}
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

PopoverBody.displayName = 'PopoverBody';

export default PopoverBody;
