import React, { forwardRef } from 'react';
import { Box } from '../box';
import { usePopoverFooterStyle } from './styles';

const PopoverFooter = forwardRef((props, ref) => {
  const styleProps = usePopoverFooterStyle({});

  return (
    <Box
      as="footer"
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

PopoverFooter.displayName = 'PopoverFooter';

export default PopoverFooter;
