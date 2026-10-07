import React, { forwardRef } from 'react';
import { composeSx } from '@tonic-ui/utils/internal';
import { Box } from '../box';
import { Button } from '../button';
import { useDefaultProps } from '../default-props';
import MenuToggle from './MenuToggle';
import MenuToggleIcon from './MenuToggleIcon';
import { useMenuButtonStyle } from './styles';

/**
 * @typedef {Object} MenuButtonProps
 * @property {React.ReactNode} [children] - The content of the menu button.
 * @property {boolean} [disabled] - Whether the menu button is disabled.
 * @property {React.MouseEventHandler<HTMLButtonElement>} [onClick] - Callback when the menu button is clicked.
 * @property {React.KeyboardEventHandler<HTMLButtonElement>} [onKeyDown] - Callback when the user presses a key.
 */

/**
 * @type {ForwardRefComponent<'button', MenuButtonProps>}
 */
const MenuButton = forwardRef((inProps, ref) => {
  const {
    __sx: __sxProp,
    children,
    disabled,
    onClick,
    onKeyDown,
    variant,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'MenuButton' });
  const styleProps = useMenuButtonStyle({ variant });

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
            variant={variant}
            {...getMenuToggleProps()}
            {...rest}
            __sx={composeSx(styleProps, __sxProp)}
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
