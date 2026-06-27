import { ariaAttr, callEventHandlers } from '@tonic-ui/utils';
import { ensureFunction } from 'ensure-type';
import { forwardRef } from 'react';
import { ButtonBase } from '../button';
import { useDefaultProps } from '../default-props';
import useButtonEventHandlers from '../utils/useButtonEventHandlers';
import { useMenuItemStyle } from './styles';
import useMenu from './useMenu';

/**
 * @typedef {Object} MenuItemProps
 * @property {boolean} [disabled] - Whether the menu item is disabled.
 * @property {React.MouseEventHandler<HTMLButtonElement>} [onClick] - Callback when the menu item is clicked.
 * @property {React.KeyboardEventHandler<HTMLButtonElement>} [onKeyDown] - Callback when the user presses a key.
 */

/**
 * @type {ForwardRefComponent<'button', MenuItemProps>}
 */
const MenuItem = forwardRef((inProps, ref) => {
  const {
    disabled,
    onClick: onClickProp,
    onKeyDown: onKeyDownProp,
    role = 'menuitem',
    ...rest
  } = useDefaultProps({ props: inProps, name: 'MenuItem' });
  const menuContext = useMenu(); // context might be an undefined value
  const {
    closeOnSelect,
    onClose: closeMenu,
  } = { ...menuContext };
  const tabIndex = -1;
  const styleProps = useMenuItemStyle({ tabIndex });

  const { onClick, onKeyDown } = useButtonEventHandlers({
    disabled,
    onActivate: () => closeOnSelect && ensureFunction(closeMenu)(),
  });

  return (
    <ButtonBase
      ref={ref}
      role={role}
      tabIndex={tabIndex}
      disabled={disabled}
      aria-disabled={ariaAttr(disabled)}
      onClick={callEventHandlers(onClickProp, onClick)}
      onKeyDown={callEventHandlers(onKeyDownProp, onKeyDown)}
      {...styleProps}
      {...rest}
    />
  );
});

MenuItem.displayName = 'MenuItem';

export default MenuItem;
