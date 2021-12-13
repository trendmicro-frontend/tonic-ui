import React, { forwardRef } from 'react';
import Box from '../Box';
import Icon from '../Icon';
import Space from '../Space';
import ToastCloseButton from './ToastCloseButton';
import ToastIcon from './ToastIcon';
import ToastMessage from './ToastMessage';
import {
  defaultAppearance,
} from './defaults';
import {
  useToastStyle,
} from './styles';

const Toast = forwardRef((
  {
    isClosable: _isClosable = false,
    isCloseButtonVisible: LEGACY_isCloseButtonVisible = false, // eslint-disable-line camelcase
    onClose,
    appearance = defaultAppearance,
    icon,
    children,
    ...rest
  },
  ref,
) => {
  const isClosable = _isClosable || LEGACY_isCloseButtonVisible; // eslint-disable-line camelcase
  const styleProps = useToastStyle({ appearance });

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...rest}
    >
      {!!icon && (
        <>
          <ToastIcon
            appearance={appearance}
            icon={icon}
          />
          <Space minWidth="2x" />
        </>
      )}
      <ToastMessage>
        {children}
      </ToastMessage>
      {!!isClosable && (
        <>
          <Space minWidth="4x" />
          <ToastCloseButton
            onClick={onClose}
          >
            <Icon icon="close-s" />
          </ToastCloseButton>
        </>
      )}
    </Box>
  );
});

Toast.displayName = 'Toast';

export default Toast;
