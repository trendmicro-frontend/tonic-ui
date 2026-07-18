import { runIfFn } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { useSlot } from '../slot';
import useShallowMemo from '../utils/useShallowMemo';
import ToastCloseButton from './ToastCloseButton';
import ToastIcon from './ToastIcon';
import ToastMessage from './ToastMessage';
import { ToastContext } from './context';
import { LightMode } from '../color-mode';
import {
  defaultAppearance,
} from './defaults';
import {
  useToastStyle,
} from './styles';

/**
 * @typedef {Object} ToastProps
 * @property {React.ReactNode} [children] -
 * @property {boolean} [isClosable] - A close button will appear on the right side.
 * @property {() => void} [onClose] - A callback called when the close button is clicked.
 * @property {'none' | 'success' | 'info' | 'warning' | 'error'} [appearance='none'] -
 * @property {React.ReactNode | boolean | string} [icon] - Override the icon displayed before the children. Unless provided, the icon is mapped to the value of the `appearance` prop.
 */

/**
 * @type {ForwardRefComponent<'div', ToastProps>}
 */
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
    ownerName: Toast.displayName,
    props: {},
    slot: slots.closeButton ?? ToastCloseButton,
    slotProps: slotProps.closeButton,
  });

  return (
    <ToastContext.Provider value={context}>
      <LightMode>
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
      </LightMode>
    </ToastContext.Provider>
  );
});

Toast.displayName = 'Toast';

export default Toast;
