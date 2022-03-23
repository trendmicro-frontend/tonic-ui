import React, { forwardRef } from 'react';
import { ButtonBase } from '../button';
import { Icon } from '../icon';
import {
  useModalCloseButtonStyle,
} from './styles';

const ModalCloseButton = forwardRef((props, ref) => {
  const styleProps = useModalCloseButtonStyle();

  return (
    <ButtonBase
      ref={ref}
      {...styleProps}
      {...props}
    >
      <Icon icon="close" />
    </ButtonBase>
  );
});

ModalCloseButton.displayName = 'ModalCloseButton';

export default ModalCloseButton;
