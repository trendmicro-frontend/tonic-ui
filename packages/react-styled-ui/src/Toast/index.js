import React, { forwardRef } from 'react';
import Box from '../Box';
import Closeable from '../Closeable';
import Flex from '../Flex';
import Icon from '../Icon';
import Space from '../Space';
import CloseableButtonBase from '../shared/CloseableButtonBase';
import {
  useToastRootStyle,
  useToastMessageStyle,
  useToastCloseButtonStyle,
} from './styles';

const ToastMessage = (props) => (
  <Box {...props} />
);

const ToastCloseButton = (props) => (
  <CloseableButtonBase {...props} />
);

const Toast = forwardRef((
  {
    isCloseable = true,
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
    <Closeable
      isCloseable={isCloseable}
      onClose={onClose}
    >
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
        {!!isCloseable && (
          <>
            <Space minWidth="4x" />
            <ToastCloseButton {...closeButtonStyleProps}>
              <Icon name="_core.close-s" />
            </ToastCloseButton>
          </>
        )}
      </Flex>
    </Closeable>
  );
});

Toast.displayName = 'Toast';

export default Toast;
