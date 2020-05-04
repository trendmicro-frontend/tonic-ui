import React from 'react';
import ButtonBase from '../ButtonBase';
import Icon from '../Icon';
import { useModalCloseButtonStyle } from './styles';
import { useModal } from './context';

const ModalCloseButton = (props) => {
  const _closeButtonProps = useModalCloseButtonStyle();
  const { onClose } = useModal();
  return (
    <ButtonBase onClick={onClose} {..._closeButtonProps} {...props}>
      <Icon name="_core.close" />
    </ButtonBase>
  );
};

export default ModalCloseButton;
