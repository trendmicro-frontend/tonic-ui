import React, { forwardRef } from 'react';
import Divider from '../Divider';

const MenuDivider = forwardRef((props, ref) => (
  <Divider ref={ref} {...props} />
));

MenuDivider.displayName = 'MenuDivider';

export default MenuDivider;
