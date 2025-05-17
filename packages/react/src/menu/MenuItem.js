import { ariaAttr, callEventHandlers } from '@tonic-ui/utils';
import { ensureFunction } from 'ensure-type';
import React, { forwardRef } from 'react';
import { ButtonBase } from '../button';
import { useDefaultProps } from '../default-props';
import useInteractiveActionHandlers from '../utils/useInteractiveActionHandlers';
import { useMenuItemStyle } from './styles';
import useMenu from './useMenu';

const MenuItem = forwardRef((inProps, ref) => {
  const {
    disabled,
    onClick: onClickProp,
    onKeyDown: onKeyDownProp,
    onKeyUp: onKeyUpProp,
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

  const { onClick, onKeyDown, onKeyUp } = useInteractiveActionHandlers({
    disabled,
    onAction: () => closeOnSelect && ensureFunction(closeMenu)(),
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
      onKeyUp={callEventHandlers(onKeyUpProp, onKeyUp)}
      {...styleProps}
      {...rest}
    />
  );
});

MenuItem.displayName = 'MenuItem';

export default MenuItem;
