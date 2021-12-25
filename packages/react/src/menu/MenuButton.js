import React, { forwardRef } from 'react';
import { Button } from '../button';
import MenuToggle from './MenuToggle';

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
            {...rest}
          >
            {children}
          </Button>
        );
      }}
    </MenuToggle>
  );
});

MenuButton.displayName = 'MenuButton';

export default MenuButton;
