import { CloseSIcon } from '@tonic-ui/react-icons';
import { callEventHandlers } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
import { ButtonBase } from '../button';
import { useDefaultProps } from '../default-props';
import {
  useToastCloseButtonStyle,
} from './styles';
import useToast from './useToast';

const ToastCloseButton = forwardRef((inProps, ref) => {
  const {
    children,
    onClick: onClickProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'ToastCloseButton' });
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
      {children ?? <CloseSIcon size="4x" />}
    </ButtonBase>
  );
});

ToastCloseButton.displayName = 'ToastCloseButton';

export default ToastCloseButton;
