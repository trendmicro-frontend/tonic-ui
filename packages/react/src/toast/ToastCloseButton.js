import { callEventHandlers } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
import { ButtonBase } from '../button';
import Icon from '../deprecated/Icon';
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
    // The `isClosable` prop determines whether the close button should be displayed and allows for control over its positioning
    isClosable,
    onClose,
    variant,
  } = { ...alertContext };
  const styleProps = useToastCloseButtonStyle({ isClosable, variant });

  return (
    <ButtonBase
      aria-label="Close"
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
