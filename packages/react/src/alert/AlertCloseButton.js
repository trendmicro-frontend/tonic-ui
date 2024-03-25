import { CloseSIcon } from '@tonic-ui/react-icons';
import { callEventHandlers } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
import { ButtonBase } from '../button';
import {
  useAlertCloseButtonStyle,
} from './styles';
import useAlert from './useAlert';

const AlertCloseButton = forwardRef((
  {
    children,
    onClick: onClickProp,
    ...rest
  },
  ref,
) => {
  const alertContext = useAlert(); // context might be an undefined value
  const {
    // The `isClosable` prop determines whether the close button should be displayed and allows for control over its positioning
    isClosable,
    onClose,
    variant,
  } = { ...alertContext };
  const styleProps = useAlertCloseButtonStyle({ isClosable, variant });

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

AlertCloseButton.displayName = 'AlertCloseButton';

export default AlertCloseButton;
