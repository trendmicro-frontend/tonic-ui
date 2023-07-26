import React, { forwardRef, useMemo } from 'react';
import { Box } from '../box';
import { Icon } from '../icon';
import {
  useAlertIconStyle,
} from './styles';
import useAlert from './useAlert';

const getIconBySeverity = (severity) => {
  const iconName = {
    success: 'success',
    info: 'info',
    warning: 'warning-minor',
    error: 'error',
  }[severity];

  if (!iconName) {
    return null;
  }

  return (
    <Icon icon={iconName} />
  );
};

const AlertIcon = forwardRef((props, ref) => {
  const alertContext = useAlert(); // context might be an undefined value
  const {
    icon: iconProp,
    severity,
    variant,
  } = { ...alertContext };
  const styleProps = useAlertIconStyle({ variant, severity });

  const icon = useMemo(() => {
    if (typeof iconProp === 'string') {
      return (<Icon icon={iconProp} />);
    }
    if (iconProp === undefined) {
      return getIconBySeverity(severity);
    }
    return iconProp;
  }, [iconProp, severity]);

  if (!icon) {
    return null;
  }

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...props}
    >
      {icon}
    </Box>
  );
});

AlertIcon.displayName = 'AlertIcon';

export default AlertIcon;
