import { CloseIcon } from '@tonic-ui/react-icons';
import { callEventHandlers } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
import { ButtonBase } from '../button';
import { useDefaultProps } from '../default-props';
import {
  useDrawerCloseButtonStyle,
} from './styles';
import useDrawer from './useDrawer';

const DrawerCloseButton = forwardRef((inProps, ref) => {
  const {
    children,
    onClick: onClickProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'DrawerCloseButton' });
  const drawerContext = useDrawer(); // context might be an undefined value
  const {
    onClose,
  } = { ...drawerContext };
  const styleProps = useDrawerCloseButtonStyle();

  return (
    <ButtonBase
      aria-label="Close"
      ref={ref}
      onClick={callEventHandlers(onClickProp, onClose)}
      {...styleProps}
      {...rest}
    >
      {children ?? <CloseIcon size="4x" />}
    </ButtonBase>
  );
});

DrawerCloseButton.displayName = 'DrawerCloseButton';

export default DrawerCloseButton;
