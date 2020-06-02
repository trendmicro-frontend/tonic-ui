import React, { forwardRef } from 'react';
import Box from '../Box';
import ButtonBase from '../ButtonBase';
import Flex from '../Flex';
import Icon from '../Icon';
import Space from '../Space';
import {
  useToastRootStyle,
  useToastMessageStyle,
  useToastCloseButtonStyle,
} from './styles';

const ToastMessage = (props) => (
  <Box {...props} />
);

const ToastCloseButton = (props) => (
  <ButtonBase {...props} />
);

const Toast = forwardRef((
  {
    isCloseButtonVisible = true,
    onClose,
    children,
    ...rest
  },
  ref,
) => {
  const rootStyleProps = useToastRootStyle();
  const messageStyleProps = useToastMessageStyle();
  const closeButtonStyleProps = useToastCloseButtonStyle();

  return (
    <Flex
      ref={ref}
      align="flex-start"
      justify="space-between"
      {...rootStyleProps}
      {...rest}
    >
      <ToastMessage {...messageStyleProps}>
        {children}
      </ToastMessage>
      {!!isCloseButtonVisible && (
        <>
          <Space minWidth="4x" />
          <ToastCloseButton {...closeButtonStyleProps} onClick={onClose}>
            <Icon name="_core.close-s" />
          </ToastCloseButton>
        </>
      )}
    </Flex>
  );
});

Toast.displayName = 'Toast';

export default Toast;
