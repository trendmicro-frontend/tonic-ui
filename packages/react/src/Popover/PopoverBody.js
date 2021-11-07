import React from 'react';
import Box from '../Box';
import { usePopover } from './context';
import { usePopoverBodyStyle } from './styles';

const PopoverBody = props => {
  const { bodyId } = usePopover();
  const bodyStyleProps = usePopoverBodyStyle();
  return (
    <Box
      id={bodyId}
      {...bodyStyleProps}
      {...props}
    />
  );
};

PopoverBody.displayName = 'PopoverBody';

export default PopoverBody;
