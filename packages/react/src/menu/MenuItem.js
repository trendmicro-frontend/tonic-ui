import { ariaAttr, callEventHandlers } from '@tonic-ui/utils';
import { ensureFunction } from 'ensure-type';
import React, { forwardRef } from 'react';
import { ButtonBase } from '../button';
import { useDefaultProps } from '../default-props';
import { useMenuItemStyle } from './styles';
import useMenu from './useMenu';

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

  return (
    <ButtonBase
      ref={ref}
      role={role}
      tabIndex={tabIndex}
      disabled={disabled}
      aria-disabled={ariaAttr(disabled)}
      onClick={callEventHandlers(onClickProp, event => {
        if (disabled) {
          event.preventDefault();
          return;
        }
        if (closeOnSelect) {
          ensureFunction(closeMenu)();
        }
      })}
      onKeyDown={callEventHandlers(onKeyDownProp, event => {
        if (disabled) {
          event.preventDefault();
          return;
        }
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault(); // Prevent default scrolling for Space

          if (closeOnSelect) {
            ensureFunction(closeMenu)();
          }
        }
      })}
      {...styleProps}
      {...rest}
    />
  );
});

MenuItem.displayName = 'MenuItem';

export default MenuItem;
