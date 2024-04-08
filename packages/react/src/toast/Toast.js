import { runIfFn } from '@tonic-ui/utils';
import memoize from 'micro-memoize';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import ToastCloseButton from './ToastCloseButton';
import ToastIcon from './ToastIcon';
import ToastMessage from './ToastMessage';
import { ToastContext } from './context';
import {
  defaultAppearance,
} from './defaults';
import {
  useToastStyle,
} from './styles';

const getMemoizedState = memoize(state => ({ ...state }));

const Toast = forwardRef((
  {
    appearance = defaultAppearance,
    icon,
    isClosable = false,
    onClose,
    children,
    ...rest
  },
  ref,
) => {
  const context = getMemoizedState({
    appearance,
    icon,
    isClosable,
    onClose,
  });
  const styleProps = useToastStyle({ appearance });

  return (
    <ToastContext.Provider value={context}>
      <Box
        ref={ref}
        {...styleProps}
        {...rest}
      >
        <ToastIcon />
        <ToastMessage>
          {runIfFn(children, context)}
        </ToastMessage>
        {!!isClosable && (
          <ToastCloseButton />
        )}
      </Box>
    </ToastContext.Provider>
  );
});

Toast.displayName = 'Toast';

export default Toast;
