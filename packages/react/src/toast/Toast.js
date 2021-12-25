import { useEffectOnce } from '@tonic-ui/react-hooks';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { Icon } from '../icon';
import { Space } from '../space';
import warnDeprecatedProps from '../utils/warnDeprecatedProps';
import ToastCloseButton from './ToastCloseButton';
import ToastIcon from './ToastIcon';
import ToastMessage from './ToastMessage';
import {
  defaultAppearance,
} from './defaults';
import {
  useToastStyle,
} from './styles';

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
  useEffectOnce(() => {
    const prefix = `${Toast.displayName}:`;

    if (isCloseButtonVisible !== undefined) {
      warnDeprecatedProps('isCloseButtonVisible', {
        prefix,
        alternative: 'isClosable',
        willRemove: true,
      });
    }
  });

  isClosable = isClosable || isCloseButtonVisible; // TODO: remove this line after deprecation
  const styleProps = useToastStyle({ appearance });

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
            icon={icon}
          />
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
