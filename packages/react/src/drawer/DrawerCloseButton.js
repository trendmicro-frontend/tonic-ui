import React, { forwardRef } from 'react';
import { ButtonBase } from '../button';
import { Icon } from '../icon';
import {
  useDrawerCloseButtonStyle,
} from './styles';

const DrawerCloseButton = forwardRef((props, ref) => {
  const styleProps = useDrawerCloseButtonStyle();

  return (
    <ButtonBase
      ref={ref}
      {...styleProps}
      {...props}
    >
      <Icon icon="close" />
    </ButtonBase>
  );
});

DrawerCloseButton.displayName = 'DrawerCloseButton';

export default DrawerCloseButton;
