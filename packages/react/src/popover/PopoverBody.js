import React, { forwardRef } from 'react';
import { Box } from '../box';
import { usePopoverBodyStyle } from './styles';

const PopoverBody = forwardRef((props, ref) => {
  const styleProps = usePopoverBodyStyle({});

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

PopoverBody.displayName = 'PopoverBody';

export default PopoverBody;
