import React, { forwardRef } from 'react';
import Box from '../Box';
import Flex from '../Flex';
import Icon from '../Icon';
import Toast from '../Toast';
import {
  useAlertToastRootStyle,
  useAlertToastIconStyle,
  useAlertToastMessageStyle,
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

const AlertToastIcon = (props) => (
  <Flex {...props} />
);

const AlertToastMessage = (props) => (
  <Box {...props} />
);

const AlertToast = forwardRef((
  {
    icon,
    severity = defaultSeverity,
    children,
    ...rest
  },
  ref,
) => {
  const rootStyleProps = useAlertToastRootStyle({ severity });
  const iconStyleProps = useAlertToastIconStyle({ severity });
  const messageStyleProps = useAlertToastMessageStyle();

  if (typeof icon === 'string') {
    icon = (<Icon name={icon} />);
  }
  if (typeof icon === 'undefined') {
    icon = getIconBySeverity(severity);
  }

  return (
    <Toast
      ref={ref}
      as={Flex}
      {...rootStyleProps}
      {...rest}
    >
      {!!icon && (
        <AlertToastIcon {...iconStyleProps}>
          {icon}
        </AlertToastIcon>
      )}
      <AlertToastMessage {...messageStyleProps}>
        {children}
      </AlertToastMessage>
    </Toast>
  );
});

AlertToast.displayName = 'AlertToast';

export default AlertToast;
