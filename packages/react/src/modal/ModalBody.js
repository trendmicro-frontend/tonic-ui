import React, { forwardRef } from 'react';
import { Box } from '../box';
import {
  useModalBodyStyle,
} from './styles';
import useModal from './useModal';

const ModalBody = forwardRef((props, ref) => {
  const modalContext = useModal(); // context might be an undefined value
  const {
    scrollBehavior,
  } = { ...modalContext };
  const styleProps = useModalBodyStyle({ scrollBehavior });

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
