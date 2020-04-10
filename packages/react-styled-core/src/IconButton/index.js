import React, { forwardRef } from 'react';
import Icon from '../Icon';
import ButtonBase from '../ButtonBase';
import { useIconButtonStyle } from './styles';

const IconButton = forwardRef(
  (
    {
      color,
      icon,
      iconSize,
      ...rest
    },
    ref
  ) => {
    const buttonStyleProps = useIconButtonStyle({
      color,
    });

    return (
      <ButtonBase
        {...buttonStyleProps}
        {...rest}
      >
        <Icon
          color="inherit"
          name={icon}
          size={iconSize}
        />
      </ButtonBase>
    );
  },
);

IconButton.displayName = 'IconButton';

export default IconButton;
