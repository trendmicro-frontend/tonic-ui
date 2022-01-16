import React, { forwardRef } from 'react';
import { usePopover } from './context';
import { Box } from '../box';
import { usePopoverHeaderStyle } from './styles';

const PopoverHeader = forwardRef((props, ref) => {
  const { headerId } = usePopover();
  const styleProps = usePopoverHeaderStyle({});

  return (
    <Box
      as="header"
      id={headerId}
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

PopoverHeader.displayName = 'PopoverHeader';

export default PopoverHeader;
