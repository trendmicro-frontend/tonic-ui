import React, { forwardRef } from 'react';
import Box from '../Box';
import ButtonBase from '../ButtonBase';
import Flex from '../Flex';
import Icon from '../Icon';
import Space from '../Space';
import {
  useAlertStyle,
  useAlertIconStyle,
  useAlertMessageStyle,
  useAlertCloseButtonStyle,
} from './styles';

const defaultVariant = 'solid';
const defaultSeverity = 'success';

const getIconBySeverity = (severity) => {
  const iconName = {
    success: 'success',
    info: 'info',
    warning: 'warning-triangle',
    error: 'error',
  }[severity];

  if (!iconName) {
    return null;
  }

  return (
    <Icon icon={`${iconName}`} />
  );
};

const AlertIcon = (props) => (
  <Flex {...props} />
);

const AlertMessage = (props) => (
  <Box {...props} />
);

const AlertCloseButton = (props) => (
  <ButtonBase {...props} />
);

const Alert = forwardRef((
  {
    isClosable: _isClosable = false,
    isCloseButtonVisible: LEGACY_isCloseButtonVisible = false, // eslint-disable-line camelcase
    onClose,
    variant = defaultVariant,
    severity = defaultSeverity,
    icon,
    children,
    ...rest
  },
  ref,
) => {
  const isClosable = _isClosable || LEGACY_isCloseButtonVisible; // eslint-disable-line camelcase
  const styleProps = useAlertStyle({ variant, severity });
  const iconStyleProps = useAlertIconStyle({ variant, severity });
  const messageStyleProps = useAlertMessageStyle();
  const closeButtonStyleProps = useAlertCloseButtonStyle({ variant });

  if (typeof icon === 'string') {
    icon = (<Icon icon={icon} />);
  }
  if (typeof icon === 'undefined') {
    icon = getIconBySeverity(severity);
  }

  return (
    <Flex
      ref={ref}
      align="flex-start"
      justify="space-between"
      {...styleProps}
      {...rest}
    >
      {!!icon && (
        <>
          <AlertIcon {...iconStyleProps}>
            {icon}
          </AlertIcon>
          <Space minWidth="2x" />
        </>
      )}
      <AlertMessage {...messageStyleProps}>
        {children}
      </AlertMessage>
      {!!isClosable && (
        <>
          <Space minWidth="4x" />
          <AlertCloseButton {...closeButtonStyleProps} onClick={onClose}>
            <Icon icon="close-s" />
          </AlertCloseButton>
        </>
      )}
    </Flex>
  );
});

Alert.displayName = 'Alert';

export default Alert;
