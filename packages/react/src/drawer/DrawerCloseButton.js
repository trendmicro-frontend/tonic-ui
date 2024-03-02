import { callEventHandlers } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
import { ButtonBase } from '../button';
import { Icon } from '../icon';
import {
  useDrawerCloseButtonStyle,
} from './styles';
import useDrawer from './useDrawer';

const DrawerCloseButton = forwardRef((
  {
    children,
    onClick: onClickProp,
    ...rest
  },
  ref,
) => {
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
      {children ?? <Icon icon="close" />}
    </ButtonBase>
  );
});

DrawerCloseButton.displayName = 'DrawerCloseButton';

export default DrawerCloseButton;
