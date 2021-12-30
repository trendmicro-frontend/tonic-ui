import React, { forwardRef } from 'react';
import { Box } from '../box';
import { Icon } from '../icon';
import {
  defaultSeverity,
  defaultVariant,
} from './defaults';
import {
  useAlertIconStyle,
} from './styles';

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

const AlertIcon = forwardRef((
  {
    icon,
    severity = defaultSeverity,
    variant = defaultVariant,
    ...rest
  },
  ref,
) => {
  const styleProps = useAlertIconStyle({ variant, severity });

  if (typeof icon === 'string') {
    icon = (<Icon icon={icon} />);
  }
  if (typeof icon === 'undefined') {
    icon = getIconBySeverity(severity);
  }

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...rest}
    >
      {icon}
    </Box>
  );
});

AlertIcon.displayName = 'AlertIcon';

export default AlertIcon;
