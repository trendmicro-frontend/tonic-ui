import React, { forwardRef } from 'react';
import { Box } from '../box';
import {
  useModalBodyStyle,
} from './styles';

const ModalBody = forwardRef((props, ref) => {
  const styleProps = useModalBodyStyle();

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

ModalBody.displayName = 'ModalBody';

export default ModalBody;
