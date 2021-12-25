import React, { forwardRef } from 'react';
import { Box } from '../box';
import { Icon } from '../icon';
import {
  defaultAppearance,
} from './defaults';
import {
  useToastIconStyle,
} from './styles';

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

const ToastIcon = forwardRef((
  {
    icon,
    appearance = defaultAppearance,
    ...rest
  },
  ref,
) => {
  const styleProps = useToastIconStyle({ appearance });

  if (typeof icon === 'string') {
    icon = (<Icon icon={icon} />);
  }
  if (typeof icon === 'undefined') {
    icon = getIconByAppearance(appearance);
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

ToastIcon.displayName = 'ToastIcon';

export default ToastIcon;
