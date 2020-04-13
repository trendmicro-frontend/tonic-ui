import React, { forwardRef } from 'react';
import Box from '../Box';
import ButtonBase from '../ButtonBase';
import Icon from '../Icon';
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
        {typeof icon === 'string' ? (
          <Icon
            color="inherit"
            name={icon}
            size={iconSize}
          />
        ) : (
          <Box
            as={icon}
            color="inherit"
          />
        )}
      </ButtonBase>
    );
  },
);

IconButton.displayName = 'IconButton';

export default IconButton;
