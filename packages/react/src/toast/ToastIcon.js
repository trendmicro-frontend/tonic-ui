import React, { forwardRef, useMemo } from 'react';
import { Box } from '../box';
import { Icon } from '../icon';
import {
  useToastIconStyle,
} from './styles';
import useToast from './useToast';

const getIconByAppearance = (appearance) => {
  const iconName = {
    success: 'success',
    info: 'info',
    warning: 'warning-triangle',
    error: 'error',
  }[appearance];

  if (!iconName) {
    return null;
  }

  return (
    <Icon icon={`${iconName}`} />
  );
};

const ToastIcon = forwardRef((props, ref) => {
  const toastContext = useToast(); // context might be an undefined value
  const {
    appearance,
    icon: iconProp,
  } = { ...toastContext };
  const styleProps = useToastIconStyle({ appearance });
  const icon = useMemo(() => {
    if (typeof iconProp === 'string') {
      return (<Icon icon={iconProp} />);
    }
    if (iconProp === undefined) {
      return getIconByAppearance(appearance);
    }
    return iconProp;
  }, [appearance, iconProp]);

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

ToastIcon.displayName = 'ToastIcon';

export default ToastIcon;
