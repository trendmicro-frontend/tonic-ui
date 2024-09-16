import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { usePopoverFooterStyle } from './styles';

const PopoverFooter = forwardRef((inProps, ref) => {
  const props = useDefaultProps({ props: inProps, name: 'PopoverFooter' });
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
