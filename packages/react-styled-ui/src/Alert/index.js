import React, { forwardRef } from 'react';
import Box from '../Box';
import Flex from '../Flex';
import Icon from '../Icon';
import {
  useAlertRootStyle,
  useAlertIconStyle,
  useAlertMessageStyle,
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

const Alert = forwardRef((
  {
    icon,
    severity = defaultSeverity,
    children,
    ...rest
  },
  ref,
) => {
  const rootStyleProps = useAlertRootStyle({ severity });
  const iconStyleProps = useAlertIconStyle();
  const messageStyleProps = useAlertMessageStyle();

  if (typeof icon === 'string') {
    icon = (<Icon name={icon} />);
  }
  if (typeof icon === 'undefined') {
    icon = getIconBySeverity(severity);
  }

  return (
    <Flex
      ref={ref}
      {...rootStyleProps}
      {...rest}
    >
      {!!icon && (
        <AlertIcon {...iconStyleProps}>
          {icon}
        </AlertIcon>
      )}
      <AlertMessage {...messageStyleProps}>
        {children}
      </AlertMessage>
    </Flex>
  );
});

Alert.displayName = 'Alert';

export default Alert;
