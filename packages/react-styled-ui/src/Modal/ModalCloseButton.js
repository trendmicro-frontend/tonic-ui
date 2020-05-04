import React from 'react';
import ButtonBase from '../ButtonBase';
import Icon from '../Icon';
import { useModalCloseButtonStyle } from './styles';

const ModalCloseButton = (props) => {
  const _closeButtonProps = useModalCloseButtonStyle();
  console.log(_closeButtonProps);
  return (
    <ButtonBase {..._closeButtonProps} {...props}>
      <Icon name="_core.close" />
    </ButtonBase>
  );
};

export default ModalCloseButton;
