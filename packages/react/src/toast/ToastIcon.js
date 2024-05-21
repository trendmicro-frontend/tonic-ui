import {
  SuccessIcon,
  InfoIcon,
  WarningMinorIcon,
  ErrorIcon,
} from '@tonic-ui/react-icons';
import React, { forwardRef, useMemo } from 'react';
import { Box } from '../box';
import { Icon } from '../icon';
import {
  useToastIconStyle,
} from './styles';
import useToast from './useToast';

const ToastIcon = forwardRef((props, ref) => {
  const toastContext = useToast(); // context might be an undefined value
  const {
    appearance,
    icon: iconProp,
  } = { ...toastContext };
  const styleProps = useToastIconStyle({ appearance });
  const icon = useMemo(() => {
    if (typeof iconProp === 'string') {
      return (
        <Icon icon={iconProp} />
      );
    }
    if (iconProp === undefined) {
      const IconComponent = {
        success: SuccessIcon,
        info: InfoIcon,
        warning: WarningMinorIcon,
        error: ErrorIcon,
      }[appearance];
      return IconComponent ? <IconComponent size="4x" /> : null;
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
