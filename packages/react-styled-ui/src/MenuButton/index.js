import React, { forwardRef } from 'react';
import { useMenu } from '../Menu/context';
import Button from '../Button';
import Icon from '../Icon';
import PseudoBox from '../PseudoBox';
import wrapEvent from '../utils/wrapEvent';
import useForkRef from '../utils/useForkRef';
import { useMenuButtonStyle, getIconWrapperProps } from './styles';

const MenuButtonIcon = (props) => (
  <PseudoBox {...props} />
);

const MenuButton = forwardRef(
  (
    {
      onClick,
      onKeyDown,
      children,
      disabled,
      variant = 'secondary',
      ...rest
    },
    ref
  ) => {
    const {
      isOpen,
      focusOnLastItem,
      focusOnFirstItem,
      closeMenu,
      menuId,
      buttonId,
      autoSelect,
      openMenu,
      buttonRef,
      placement,
    } = useMenu();

    const getIconByDirection = (placement) => {
      const direction = placement.split('-')[0];
      const iconName = {
        top: 'angle-up',
        bottom: 'angle-down',
        right: 'angle-right',
        left: 'angle-left',
      }[direction];

      if (!iconName) {
        return null;
      }

      return (
        <Icon width="4x" icon={`_core.${iconName}`} />
      );
    };

    const menuButtonRef = useForkRef(buttonRef, ref);
    const styleProps = useMenuButtonStyle();
    const iconWrapperProps = getIconWrapperProps();
    let icon;

    if (typeof placement === 'string') {
      icon = getIconByDirection(placement);
    }
    if (typeof placement === 'undefined') {
      icon = <Icon width="4x" icon="_core.angle-down" />;
    }

    return (
      <Button
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        data-active={isOpen}
        aria-disabled={disabled}
        disabled={disabled}
        id={buttonId}
        role="button"
        ref={menuButtonRef}
        onClick={wrapEvent(onClick, (event) => {
          if (isOpen) {
            closeMenu();
          } else if (autoSelect) {
            focusOnFirstItem();
          } else {
            event.preventDefault();
            !disabled && openMenu();
          }
        })}
        onKeyDown={wrapEvent(onKeyDown, event => {
          if (event.key === 'ArrowDown') {
            event.preventDefault();
            focusOnFirstItem();
          }

          if (event.key === 'ArrowUp') {
            event.preventDefault();
            focusOnLastItem();
          }
        })}
        variant={variant}
        {...styleProps}
        {...rest}
      >
        {children}
        <MenuButtonIcon
          aria-disabled={disabled}
          {...iconWrapperProps}
        >
          {icon}
        </MenuButtonIcon>
      </Button>
    );
  },
);

MenuButton.displayName = 'MenuButton';

export default MenuButton;
