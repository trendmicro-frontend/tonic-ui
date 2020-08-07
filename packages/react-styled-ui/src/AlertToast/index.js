import React, { forwardRef } from 'react';
import Box from '../Box';
import ButtonBase from '../ButtonBase';
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

const AlertToastIcon = (props) => (
  <Flex {...props} />
);

const AlertToastMessage = (props) => (
  <Box {...props} />
);

const AlertToastCloseButton = (props) => (
  <ButtonBase {...props} />
);

const AlertToast = forwardRef((
  {
    isCloseButtonVisible,
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
      {!!isCloseButtonVisible && (
        <>
          <Space minWidth="4x" />
          <AlertToastCloseButton {...closeButtonStyleProps} onClick={onClose}>
            <Icon icon="close-s" />
          </AlertToastCloseButton>
        </>
      )}
    </Flex>
  );
});

AlertToast.displayName = 'AlertToast';

export default AlertToast;
