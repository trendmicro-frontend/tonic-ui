import { runIfFn } from '@tonic-ui/utils';
import { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { useSlot } from '../slot';
import useShallowMemo from '../utils/useShallowMemo';
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

const Toast = forwardRef((inProps, ref) => {
  const {
    appearance = defaultAppearance,
    icon,
    isClosable = false,
    onClose,
    slots = {},
    slotProps = {},
    children,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Toast' });
  const shallowMemo = useShallowMemo();

  const context = shallowMemo({
    appearance,
    icon,
    isClosable,
    onClose,
  });
  const styleProps = useToastStyle({ appearance });

  const [CloseButtonSlot, closeButtonSlotProps] = useSlot({
    name: 'closeButton',
    ownerDisplayName: Toast.displayName,
    props: {},
    slot: slots.closeButton ?? ToastCloseButton,
    slotProps: slotProps.closeButton,
  });

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
          <CloseButtonSlot {...closeButtonSlotProps} />
        )}
      </Box>
    </ToastContext.Provider>
  );
});

Toast.displayName = 'Toast';

export default Toast;
