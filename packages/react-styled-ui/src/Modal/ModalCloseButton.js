import React from 'react';
import ButtonBase from '../ButtonBase';
import Icon from '../Icon';
import { useModalCloseButtonStyle } from './styles';
import { useModal } from './context';

const ModalCloseButton = ({ children, ...restProps }) => {
  const _closeButtonProps = useModalCloseButtonStyle();
  const { onClose } = useModal();
  return (
    <ButtonBase onClick={onClose} {..._closeButtonProps} {...restProps}>
      {children && typeof children === 'function' && children({ onClose })}
      {children && typeof children !== 'function' && children}
      {!children && <Icon name="_core.close" />}
    </ButtonBase>
  );
};

export default ModalCloseButton;
