import React, { forwardRef } from 'react';
import { useDefaultProps } from '../default-props';
import { MenuToggle } from '../menu';

/**
 * @typedef {Object} DropdownToggleProps
 * @property {React.ReactNode} [children] - The content of the dropdown toggle.
 * @property {boolean} [disabled] - Whether the dropdown toggle is disabled.
 * @property {React.MouseEventHandler<HTMLButtonElement>} [onClick] - Callback when the dropdown toggle is clicked.
 * @property {React.KeyboardEventHandler<HTMLButtonElement>} [onKeyDown] - Callback when the user presses a key.
 */

/**
 * @type {ForwardRefComponent<'button', DropdownToggleProps>}
 */
const DropdownToggle = forwardRef((inProps, ref) => {
  const props = useDefaultProps({ props: inProps, name: 'DropdownToggle' });

  return (
    <MenuToggle
      ref={ref}
      {...props}
    />
  );
});

DropdownToggle.displayName = 'DropdownToggle';

export default DropdownToggle;
