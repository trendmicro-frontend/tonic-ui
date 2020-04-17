import React, { forwardRef } from 'react';
import Box from '../Box';
import Flex from '../Flex';
import Icon from '../Icon';
import {
  useToastRootStyle,
  useToastIconStyle,
  useToastMessageStyle,
} from './styles';

const defaultSeverity = 'none';

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

const ToastIcon = (props) => (
  <Flex {...props} />
);

const ToastMessage = (props) => (
  <Box {...props} />
);

const Toast = forwardRef((
  {
    icon,
    severity = defaultSeverity,
    children,
    ...rest
  },
  ref,
) => {
  const rootStyleProps = useToastRootStyle({ severity });
  const iconStyleProps = useToastIconStyle({ severity });
  const messageStyleProps = useToastMessageStyle();

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
        <ToastIcon {...iconStyleProps}>
          {icon}
        </ToastIcon>
      )}
      <ToastMessage {...messageStyleProps}>
        {children}
      </ToastMessage>
    </Flex>
  );
});

Toast.displayName = 'Toast';

export default Toast;
