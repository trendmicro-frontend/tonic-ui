import React, { forwardRef } from 'react';
import Box from '../Box';
import Icon from '../Icon';
import Space from '../Space';
import AlertCloseButton from './AlertCloseButton';
import AlertIcon from './AlertIcon';
import AlertMessage from './AlertMessage';
import {
  defaultSeverity,
  defaultVariant,
} from './defaults';
import {
  useAlertStyle,
} from './styles';

const Alert = forwardRef((
  {
    isClosable: _isClosable = false,
    isCloseButtonVisible: LEGACY_isCloseButtonVisible = false, // eslint-disable-line camelcase
    onClose,
    severity = defaultSeverity,
    variant = defaultVariant,
    icon,
    children,
    ...rest
  },
  ref,
) => {
  const isClosable = _isClosable || LEGACY_isCloseButtonVisible; // eslint-disable-line camelcase
  const styleProps = useAlertStyle({ variant, severity });

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...rest}
    >
      {!!icon && (
        <>
          <AlertIcon
            icon={icon}
            variant={variant}
            severity={severity}
          />
          <Space minWidth="2x" />
        </>
      )}
      <AlertMessage>
        {children}
      </AlertMessage>
      {!!isClosable && (
        <>
          <Space minWidth="4x" />
          <AlertCloseButton
            variant={variant}
            onClick={onClose}
          >
            <Icon icon="close-s" />
          </AlertCloseButton>
        </>
      )}
    </Box>
  );
});

Alert.displayName = 'Alert';

export default Alert;
