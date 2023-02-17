import { useOnceWhen } from '@tonic-ui/react-hooks';
import { runIfFn, warnDeprecatedProps } from '@tonic-ui/utils';
import memoize from 'micro-memoize';
import React, { forwardRef } from 'react';
import { Box } from '../box';
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

const getMemoizedState = memoize(state => ({ ...state }));

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
  { // deprecation warning
    const prefix = `${Alert.displayName}:`;

    useOnceWhen(() => {
      warnDeprecatedProps('isCloseButtonVisible', {
        prefix,
        alternative: 'isClosable',
        willRemove: true,
      });
    }, (isCloseButtonVisible !== undefined));

    isClosable = isClosable || isCloseButtonVisible; // TODO: remove this line after deprecation
  }

  const context = getMemoizedState({
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
