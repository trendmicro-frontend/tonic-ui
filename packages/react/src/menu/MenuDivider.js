import React, { forwardRef } from 'react';
import { useDefaultProps } from '../default-props';
import { Divider } from '../divider';
import { useMenuItemDividerStyle } from './styles';

/**
 * @typedef {Object} MenuDividerProps
 * @property {React.ReactNode} [children] - The content of the menu divider.
 */

/**
 * @type {ForwardRefComponent<'hr', MenuDividerProps>}
 */
const MenuDivider = forwardRef((inProps, ref) => {
  const props = useDefaultProps({ props: inProps, name: 'MenuDivider' });
  const styleProps = useMenuItemDividerStyle();

  return (
    <Divider
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

MenuDivider.displayName = 'MenuDivider';

export default MenuDivider;
