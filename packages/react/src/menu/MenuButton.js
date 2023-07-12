import React, { forwardRef } from 'react';
import { Box } from '../box';
import { Button } from '../button';
import MenuToggle from './MenuToggle';
import MenuToggleIcon from './MenuToggleIcon';
import { useMenuButtonCSS, useMenuButtonStyle } from './styles';

const MenuButton = forwardRef((
  {
    children,
    css,
    disabled,
    onClick,
    onKeyDown,
    variant,
    ...rest
  },
  ref,
) => {
  css = [
    useMenuButtonCSS({ variant }),
    css,
  ];
  const styleProps = useMenuButtonStyle();

  return (
    <MenuToggle
      disabled={disabled}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {({ getMenuToggleProps }) => {
        return (
          <Button
            ref={ref}
            css={css}
            variant={variant}
            {...getMenuToggleProps()}
            {...styleProps}
            {...rest}
          >
            <Box>
              {children}
            </Box>
            <MenuToggleIcon />
          </Button>
        );
      }}
    </MenuToggle>
  );
});

MenuButton.displayName = 'MenuButton';

export default MenuButton;
