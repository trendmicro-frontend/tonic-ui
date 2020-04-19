import React, { forwardRef } from 'react';
import Box from '../Box';
import Closeable from '../Closeable';
import CloseButton from '../CloseButton';
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
  <CloseButton {...props} />
);

const Toast = forwardRef((
  {
    closeable = true,
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
      closeable={closeable}
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
        {!!closeable && (
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
