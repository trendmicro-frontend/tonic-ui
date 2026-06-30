import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import useDrawer from './useDrawer';
import {
  useDrawerFooterStyle,
} from './styles';

/**
 * @typedef {Object} DrawerFooterProps
 * @property {React.ReactNode} [children] - The content of the drawer footer.
 */

/**
 * @type {ForwardRefComponent<'div', DrawerFooterProps>}
 */
const DrawerFooter = forwardRef((inProps, ref) => {
  const props = useDefaultProps({ props: inProps, name: 'DrawerFooter' });
  const context = useDrawer(); // context might be an undefined value
  const {
    placement,
  } = { ...context };
  const styleProps = useDrawerFooterStyle({ placement });

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

DrawerFooter.displayName = 'DrawerFooter';

export default DrawerFooter;
