import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { useMenuGroupStyle } from './styles';

/**
 * @typedef {Object} MenuGroupProps
 * @property {React.ReactNode} [children] - The menu items to be grouped.
 * @property {string} [title] - The title of the menu group.
 */

/**
 * @type {ForwardRefComponent<'div', MenuGroupProps>}
 */
const MenuGroup = forwardRef((inProps, ref) => {
  const {
    children,
    title,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'MenuGroup' });
  const styleProps = useMenuGroupStyle();

  return (
    <>
      <Box
        ref={ref}
        role="group"
        {...styleProps}
        {...rest}
      >
        {title}
      </Box>
      {children}
    </>
  );
});

MenuGroup.displayName = 'MenuGroup';

export default MenuGroup;
