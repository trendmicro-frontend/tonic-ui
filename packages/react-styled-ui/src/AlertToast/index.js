import React, { forwardRef } from 'react';
import Box from '../Box';
import Closeable from '../Closeable';
import CloseButton from '../CloseButton';
import Flex from '../Flex';
import Icon from '../Icon';
import Space from '../Space';
import {
  useAlertToastRootStyle,
  useAlertToastIconStyle,
  useAlertToastMessageStyle,
  useAlertToastCloseButtonStyle,
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

const AlertToastCloseButton = (props) => (
  <CloseButton {...props} />
);

const AlertToast = forwardRef((
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
  const rootStyleProps = useAlertToastRootStyle({ severity });
  const iconStyleProps = useAlertToastIconStyle({ severity });
  const messageStyleProps = useAlertToastMessageStyle();
  const closeButtonStyleProps = useAlertToastCloseButtonStyle();

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
            <AlertToastIcon {...iconStyleProps}>
              {icon}
            </AlertToastIcon>
            <Space minWidth="2x" />
          </>
        )}
        <AlertToastMessage {...messageStyleProps}>
          {children}
        </AlertToastMessage>
        {!!closeable && (
          <>
            <Space minWidth="4x" />
            <AlertToastCloseButton {...closeButtonStyleProps}>
              <Icon name="_core.close-s" />
            </AlertToastCloseButton>
          </>
        )}
      </Flex>
    </Closeable>
  );
});

AlertToast.displayName = 'AlertToast';

export default AlertToast;
