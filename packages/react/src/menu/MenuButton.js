import React, { forwardRef } from 'react';
import { Box } from '../box';
import { Button } from '../button';
import { useDefaultProps } from '../default-props';
import MenuToggle from './MenuToggle';
import MenuToggleIcon from './MenuToggleIcon';
import { useMenuButtonCSS, useMenuButtonStyle } from './styles';

const MenuButton = forwardRef((inProps, ref) => {
  const {
    children,
    css: cssProp,
    disabled,
    onClick,
    onKeyDown,
    variant,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'MenuButton' });
  const css = [
    useMenuButtonCSS({ variant }),
    cssProp,
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
