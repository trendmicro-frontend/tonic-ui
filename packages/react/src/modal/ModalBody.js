import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import {
  useModalBodyStyle,
} from './styles';
import useModal from './useModal';

const ModalBody = forwardRef((inProps, ref) => {
  const props = useDefaultProps({ props: inProps, name: 'ModalBody' });
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
