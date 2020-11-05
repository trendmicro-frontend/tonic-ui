import React, { forwardRef } from 'react';
import PseudoBox from '../PseudoBox';
import {
  useModalHeaderStyle,
} from './styles';

const ModalHeader = forwardRef((props, ref) => {
  const styleProps = useModalHeaderStyle();

  return (
    <PseudoBox
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

ModalHeader.displayName = 'ModalHeader';

export default ModalHeader;
