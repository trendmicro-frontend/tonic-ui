import { useOnceWhen } from '@tonic-ui/react-hooks';
import { warnDeprecatedProps } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { Icon } from '../icon';
import { Space } from '../space';
import ToastCloseButton from './ToastCloseButton';
import ToastIcon from './ToastIcon';
import ToastMessage from './ToastMessage';
import {
  defaultAppearance,
} from './defaults';
import {
  useToastStyle,
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

const Toast = forwardRef((
  {
    isCloseButtonVisible, // deprecated

    isClosable = false,
    onClose,
    appearance = defaultAppearance,
    icon,
    children,
    ...rest
  },
  ref,
) => {
  { // deprecation warning
    const prefix = `${Toast.displayName}:`;

    useOnceWhen(() => {
      warnDeprecatedProps('isCloseButtonVisible', {
        prefix,
        alternative: 'isClosable',
        willRemove: true,
      });
    }, (isCloseButtonVisible !== undefined));

    isClosable = isClosable || isCloseButtonVisible; // TODO: remove this line after deprecation
  }

  const styleProps = useToastStyle({ appearance });

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
      {!!icon && (
        <>
          <ToastIcon
            appearance={appearance}
          >
            {icon}
          </ToastIcon>
          <Space minWidth="2x" />
        </>
      )}
      <ToastMessage>
        {children}
      </ToastMessage>
      {!!isClosable && (
        <>
          <Space minWidth="4x" />
          <ToastCloseButton
            onClick={onClose}
          >
            <Icon icon="close-s" />
          </ToastCloseButton>
        </>
      )}
    </Box>
  );
});

Toast.displayName = 'Toast';

export default Toast;
