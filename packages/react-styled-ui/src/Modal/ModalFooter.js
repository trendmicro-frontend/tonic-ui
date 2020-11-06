import React, { forwardRef } from 'react';
import PseudoBox from '../PseudoBox';
import {
  useModalFooterStyle,
} from './styles';

const ModalFooter = forwardRef((props, ref) => {
  const styleProps = useModalFooterStyle();

  return (
    <PseudoBox
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

ModalFooter.displayName = 'ModalFooter';

export default ModalFooter;
