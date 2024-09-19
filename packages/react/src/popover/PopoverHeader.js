import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { usePopoverHeaderStyle } from './styles';

const PopoverHeader = forwardRef((inProps, ref) => {
  const props = useDefaultProps({ props: inProps, name: 'PopoverHeader' });
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
