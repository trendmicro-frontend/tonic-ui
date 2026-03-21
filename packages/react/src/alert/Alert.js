import { runIfFn } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import useShallowMemo from '../utils/useShallowMemo';
import AlertCloseButton from './AlertCloseButton';
import AlertIcon from './AlertIcon';
import AlertMessage from './AlertMessage';
import { AlertContext } from './context';
import {
  defaultSeverity,
  defaultVariant,
} from './defaults';
import {
  useAlertStyle,
} from './styles';

const Alert = forwardRef((inProps, ref) => {
  const {
    isClosable = false,
    onClose,
    severity = defaultSeverity,
    variant = defaultVariant,
    icon,
    children,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Alert' });
  const shallowMemo = useShallowMemo();

  const context = shallowMemo({
    icon,
    isClosable,
    onClose,
    severity,
    variant,
  });
  const styleProps = useAlertStyle({ variant, severity });

  return (
    <AlertContext.Provider value={context}>
      <Box
        ref={ref}
        {...styleProps}
        {...rest}
      >
        <AlertIcon />
        <AlertMessage>
          {runIfFn(children, context)}
        </AlertMessage>
        {!!isClosable && (
          <AlertCloseButton />
        )}
      </Box>
    </AlertContext.Provider>
  );
});

Alert.displayName = 'Alert';

export default Alert;
