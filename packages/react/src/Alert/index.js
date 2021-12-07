import React, { forwardRef } from 'react';
import Box from '../Box';
import ButtonBase from '../ButtonBase';
import Flex from '../Flex';
import Icon from '../Icon';
import Space from '../Space';
import useEffectOnce from '../hooks/useEffectOnce';
import warnDeprecatedProps from '../utils/warnDeprecatedProps';
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
    isCloseButtonVisible, // deprecated
    isClosable = false,
    onClose,
    variant = defaultVariant,
    severity = defaultSeverity,
    icon,
    children,
    ...rest
  },
  ref,
) => {
  useEffectOnce(() => {
    const prefix = `${Alert.displayName}:`;

    if (isCloseButtonVisible !== undefined) {
      warnDeprecatedProps('isCloseButtonVisible', {
        prefix,
        alternative: 'isClosable',
        willRemove: true,
      });
    }
  });

  isClosable = isClosable || isCloseButtonVisible; // TODO: remove this line after deprecation
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
