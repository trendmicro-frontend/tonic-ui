import { callEventHandlers } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
import { ButtonBase } from '../button';
import { Icon } from '../icon';
import {
  useToastCloseButtonStyle,
} from './styles';
import useToast from './useToast';

const ToastCloseButton = forwardRef((
  {
    children,
    onClick: onClickProp,
    ...rest
  },
  ref,
) => {
  const alertContext = useToast(); // context might be an undefined value
  const {
    isClosable,
    onClose,
    variant,
  } = { ...alertContext };
  // The `isClosable` prop is used to control whether the close button should be positioned on the top-right corner of the alert.
  const styleProps = useToastCloseButtonStyle({ isClosable, variant });

  return (
    <ButtonBase
      ref={ref}
      onClick={callEventHandlers(onClickProp, onClose)}
      {...styleProps}
      {...rest}
    >
      {children ?? <Icon icon="close-s" />}
    </ButtonBase>
  );
});

ToastCloseButton.displayName = 'ToastCloseButton';

export default ToastCloseButton;
