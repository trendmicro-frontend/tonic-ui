import React from 'react';
import { usePopover } from './context';
import Box from '../Box';
import { usePopoverHeaderStyle } from './styles';

const PopoverHeader = props => {
  const { headerId } = usePopover();
  const headerStyleProps = usePopoverHeaderStyle();

  return (
    <Box
      as="header"
      id={headerId}
      {...headerStyleProps}
      {...props}
    />
  );
};

PopoverHeader.displayName = 'PopoverHeader';

export default PopoverHeader;
