import React, { forwardRef } from 'react';
import { Box } from '../box';
import { Button } from '../button';
import MenuToggle from './MenuToggle';
import MenuToggleIndicator from './MenuToggleIndicator';
import { useMenuButtonStyle } from './styles';

const MenuButton = forwardRef((
  {
    onClick,
    onKeyDown,
    children,
    disabled,
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
            {...getMenuToggleProps()}
            {...styleProps}
            {...rest}
          >
            {children && (
              <Box>
                {children}
              </Box>
            )}
            <MenuToggleIndicator />
          </Button>
        );
      }}
    </MenuToggle>
  );
});

MenuButton.displayName = 'MenuButton';

export default MenuButton;
