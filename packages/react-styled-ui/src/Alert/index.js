import React, { forwardRef } from 'react';
import Box from '../Box';
import Closeable from '../Closeable';
import CloseButton from '../CloseButton';
import Flex from '../Flex';
import Icon from '../Icon';
import Space from '../Space';
import {
  useAlertRootStyle,
  useAlertIconStyle,
  useAlertMessageStyle,
  useAlertCloseButtonStyle,
} from './styles';

const defaultSeverity = 'success';

const getIconBySeverity = (severity) => {
  const iconName = {
    success: 'severity-success',
    info: 'severity-info',
    warning: 'severity-warning',
    error: 'severity-error',
  }[severity];

  if (!iconName) {
    return null;
  }

  return (
    <Icon name={`_core.${iconName}`} />
  );
};

const AlertIcon = (props) => (
  <Flex {...props} />
);

const AlertMessage = (props) => (
  <Box {...props} />
);

const AlertCloseButton = (props) => (
  <CloseButton {...props} />
);

const Alert = forwardRef((
  {
    closeable = true,
    onClose,
    severity = defaultSeverity,
    icon,
    children,
    ...rest
  },
  ref,
) => {
  const rootStyleProps = useAlertRootStyle({ severity });
  const iconStyleProps = useAlertIconStyle({ severity });
  const messageStyleProps = useAlertMessageStyle();
  const closeButtonStyleProps = useAlertCloseButtonStyle();

  if (typeof icon === 'string') {
    icon = (<Icon name={icon} />);
  }
  if (typeof icon === 'undefined') {
    icon = getIconBySeverity(severity);
  }

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
        {!!closeable && (
          <>
            <Space minWidth="4x" />
            <AlertCloseButton {...closeButtonStyleProps}>
              <Icon name="_core.close-s" />
            </AlertCloseButton>
          </>
        )}
      </Flex>
    </Closeable>
  );
});

Alert.displayName = 'Alert';

export default Alert;
