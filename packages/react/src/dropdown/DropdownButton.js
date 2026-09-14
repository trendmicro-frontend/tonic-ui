import { composeSx } from '@tonic-ui/utils/internal';
import React, { forwardRef } from 'react';
import { useDefaultProps } from '../default-props';
import { MenuButton } from '../menu';
import { useDropdownButtonStyle } from './styles';

/**
 * @typedef {Object} DropdownButtonProps
 * @property {React.ReactNode} [children] - The content of the dropdown button.
 * @property {boolean} [disabled] - Whether the dropdown button is disabled.
 * @property {React.MouseEventHandler<HTMLButtonElement>} [onClick] - Callback when the dropdown button is clicked.
 * @property {React.KeyboardEventHandler<HTMLButtonElement>} [onKeyDown] - Callback when the user presses a key.
 * @property {'emphasis' | 'primary' | 'default' | 'secondary' | 'ghost'} [variant='secondary'] - The variant of the dropdown button.
 */

/**
 * @type {ForwardRefComponent<'button', DropdownButtonProps>}
 */
const DropdownButton = forwardRef((inProps, ref) => {
  const {
    __sx: __sxProp,
    variant = 'secondary',
    ...rest
  } = useDefaultProps({ props: inProps, name: 'DropdownButton' });
  const styleProps = useDropdownButtonStyle({ variant });

  return (
    <MenuButton
      ref={ref}
      variant={variant}
      {...styleProps}
      {...rest}
      __sx={composeSx(styleProps, __sxProp)}
    />
  );
});

DropdownButton.displayName = 'DropdownButton';

export default DropdownButton;
