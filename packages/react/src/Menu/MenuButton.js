import React, { forwardRef } from 'react';
import Box from '../Box';
import Button from '../Button';
import MenuToggle from './MenuToggle';
import MenuToggleIcon from './MenuToggleIcon';
import { useMenuButtonStyle } from './styles';

const MenuButton = forwardRef((
  {
    onClick,
    onKeyDown,
    children,
    disabled,
    variant = 'secondary',
    ...rest
  },
  ref,
) => {
  const styleProps = useMenuButtonStyle({});

  return (
    <MenuToggle
      disabled={disabled}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {({ getMenuToggleProps }) => {
        return (
          <Button
            variant={variant}
            {...getMenuToggleProps()}
            {...styleProps}
            {...rest}
          >
            {children && (
              <Box>
                {children}
              </Box>
            )}
            <MenuToggleIcon />
          </Button>
        );
      }}
    </MenuToggle>
  );
});

MenuButton.displayName = 'MenuButton';

export default MenuButton;
