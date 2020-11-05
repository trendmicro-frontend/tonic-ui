import React, { forwardRef } from 'react';
import PseudoBox from '../PseudoBox';
import {
  useModalBodyStyle,
} from './styles';

const ModalBody = forwardRef((props, ref) => {
  const styleProps = useModalBodyStyle();

  return (
    <PseudoBox
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

ModalBody.displayName = 'ModalBody';

export default ModalBody;
