import { useEffectOnce } from '@tonic-ui/react-hooks';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { Icon } from '../icon';
import { Space } from '../space';
import warnDeprecatedProps from '../utils/warnDeprecatedProps';
import AlertCloseButton from './AlertCloseButton';
import AlertIcon from './AlertIcon';
import AlertMessage from './AlertMessage';
import {
  defaultSeverity,
  defaultVariant,
} from './defaults';
import {
  useAlertStyle,
} from './styles';

const Alert = forwardRef((
  {
    isCloseButtonVisible, // deprecated
    isClosable = false,
    onClose,
    severity = defaultSeverity,
    variant = defaultVariant,
    icon,
    children,
    ...rest
  },
  ref,
) => {
  useEffectOnce(() => {
    const prefix = `${Alert.displayName}:`;

    if (isCloseButtonVisible !== undefined) {
      warnDeprecatedProps('isCloseButtonVisible', {
        prefix,
        alternative: 'isClosable',
        willRemove: true,
      });
    }
  });

  isClosable = isClosable || isCloseButtonVisible; // TODO: remove this line after deprecation
  const styleProps = useAlertStyle({ variant, severity });

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...rest}
    >
      {!!icon && (
        <>
          <AlertIcon
            icon={icon}
            variant={variant}
            severity={severity}
          />
          <Space minWidth="2x" />
        </>
      )}
      <AlertMessage>
        {children}
      </AlertMessage>
      {!!isClosable && (
        <>
          <Space minWidth="4x" />
          <AlertCloseButton
            variant={variant}
            onClick={onClose}
          >
            <Icon icon="close-s" />
          </AlertCloseButton>
        </>
      )}
    </Box>
  );
});

Alert.displayName = 'Alert';

export default Alert;
