import {
  SuccessIcon,
  InfoIcon,
  WarningMinorIcon,
  ErrorIcon,
} from '@tonic-ui/react-icons';
import React, { forwardRef, useMemo } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { Icon } from '../icon';
import {
  useAlertIconStyle,
} from './styles';
import useAlert from './useAlert';

const AlertIcon = forwardRef((inProps, ref) => {
  const props = useDefaultProps({ props: inProps, name: 'AlertIcon' });
  const alertContext = useAlert(); // context might be an undefined value
  const {
    icon: iconProp,
    severity,
    variant,
  } = { ...alertContext };
  const styleProps = useAlertIconStyle({ variant, severity });

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
      }[severity];
      return IconComponent ? <IconComponent size="4x" /> : null;
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
