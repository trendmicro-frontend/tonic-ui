import { runIfFn } from '@tonic-ui/utils';
import { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { useSlot } from '../slot';
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
    slots = {},
    slotProps = {},
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

  const [CloseButtonSlot, closeButtonSlotProps] = useSlot({
    name: 'closeButton',
    ownerName: Alert.displayName,
    props: {},
    slot: slots.closeButton ?? AlertCloseButton,
    slotProps: slotProps.closeButton,
  });

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
          <CloseButtonSlot {...closeButtonSlotProps} />
        )}
      </Box>
    </AlertContext.Provider>
  );
});

Alert.displayName = 'Alert';

export default Alert;
