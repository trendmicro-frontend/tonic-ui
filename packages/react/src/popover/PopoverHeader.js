import React, { forwardRef } from 'react';
import { Box } from '../box';
import { usePopoverHeaderStyle } from './styles';

const PopoverHeader = forwardRef((props, ref) => {
  const styleProps = usePopoverHeaderStyle({});

  return (
    <Box
      as="header"
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

PopoverHeader.displayName = 'PopoverHeader';

export default PopoverHeader;
