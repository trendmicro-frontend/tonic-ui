import { callEventHandlers } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
import { ButtonBase } from '../button';
import { Icon } from '../icon';
import {
  useModalCloseButtonStyle,
} from './styles';
import useModal from './useModal';

const ModalCloseButton = forwardRef((
  {
    children,
    onClick: onClickProp,
    ...rest
  },
  ref,
) => {
  const modalContext = useModal(); // context might be an undefined value
  const {
    onClose,
  } = { ...modalContext };
  const styleProps = useModalCloseButtonStyle();

  return (
    <ButtonBase
      ref={ref}
      onClick={callEventHandlers(onClickProp, onClose)}
      {...styleProps}
      {...rest}
    >
      {children ?? <Icon icon="close" />}
    </ButtonBase>
  );
});

ModalCloseButton.displayName = 'ModalCloseButton';

export default ModalCloseButton;
