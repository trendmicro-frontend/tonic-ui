import React, { forwardRef } from 'react';
import Box from '../Box';
import ButtonBase from '../ButtonBase';
import Flex from '../Flex';
import Icon from '../Icon';
import Space from '../Space';
import {
  useToastRootStyle,
  useToastIconStyle,
  useToastMessageStyle,
  useToastCloseButtonStyle,
} from './styles';

const defaultAppearance = 'none';

const getIconByAppearance = (appearance) => {
  const iconName = {
    success: 'severity-success',
    info: 'severity-info',
    warning: 'severity-warning',
    error: 'severity-error',
  }[appearance];

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

const ToastCloseButton = (props) => (
  <ButtonBase {...props} />
);

const Toast = forwardRef((
  {
    isCloseButtonVisible,
    onClose,
    appearance = defaultAppearance,
    icon,
    children,
    ...rest
  },
  ref,
) => {
  const rootStyleProps = useToastRootStyle({ appearance });
  const iconStyleProps = useToastIconStyle({ appearance });
  const messageStyleProps = useToastMessageStyle();
  const closeButtonStyleProps = useToastCloseButtonStyle();

  if (typeof icon === 'string') {
    icon = (<Icon name={icon} />);
  }
  if (typeof icon === 'undefined') {
    icon = getIconByAppearance(appearance);
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
          <ToastIcon {...iconStyleProps}>
            {icon}
          </ToastIcon>
          <Space minWidth="2x" />
        </>
      )}
      <ToastMessage {...messageStyleProps}>
        {children}
      </ToastMessage>
      {!!isCloseButtonVisible && (
        <>
          <Space minWidth="4x" />
          <ToastCloseButton {...closeButtonStyleProps} onClick={onClose}>
            <Icon name="_core.close-s" />
          </ToastCloseButton>
        </>
      )}
    </Flex>
  );
});

Toast.displayName = 'Toast';

export default Toast;
