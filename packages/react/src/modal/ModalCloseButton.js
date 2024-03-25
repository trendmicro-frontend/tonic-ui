import { CloseIcon } from '@tonic-ui/react-icons';
import { callEventHandlers } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
import { ButtonBase } from '../button';
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
      aria-label="Close"
      ref={ref}
      onClick={callEventHandlers(onClickProp, onClose)}
      {...styleProps}
      {...rest}
    >
      {children ?? <CloseIcon size="4x" />}
    </ButtonBase>
  );
});

ModalCloseButton.displayName = 'ModalCloseButton';

export default ModalCloseButton;
