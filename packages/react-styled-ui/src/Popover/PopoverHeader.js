import React from 'react';
import { usePopover } from './context';
import PseudoBox from '../PseudoBox';
import { usePopoverHeaderStyle } from './styles';

const PopoverHeader = props => {
  const { headerId } = usePopover();
  const headerStyleProps = usePopoverHeaderStyle();

  return (
    <PseudoBox
      as="header"
      id={headerId}
      {...headerStyleProps}
      {...props}
    />
  );
};

PopoverHeader.displayName = 'PopoverHeader';

export default PopoverHeader;
