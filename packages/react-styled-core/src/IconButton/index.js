import React, { forwardRef, isValidElement } from 'react';
import ButtonBase from '../ButtonBase';
import Icon from '../Icon';
import { useIconButtonStyle } from './styles';

const IconButton = forwardRef(
  (
    {
      color,
      icon,
      ...rest
    },
    ref
  ) => {
    const buttonStyleProps = useIconButtonStyle({
      color,
    });

    let _icon = null;
    if (typeof icon === 'string') {
      _icon = <Icon name={icon} color="inherit" />;
    } else if (isValidElement(icon)) {
      _icon = icon;
    }

    return (
      <ButtonBase
        ref={ref}
        {...buttonStyleProps}
        {...rest}
      >
        { _icon }
      </ButtonBase>
    );
  },
);

IconButton.displayName = 'IconButton';

export default IconButton;
