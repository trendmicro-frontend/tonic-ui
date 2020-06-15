import React, { forwardRef } from 'react';
import { useMenu } from '../Menu/context';
import Button from '../Button';
import Icon from '../Icon';
import PseudoBox from '../PseudoBox';
import wrapEvent from '../utils/wrapEvent';
import useForkRef from '../utils/useForkRef';
import { useMenuButtonStyle, getIconWrapperProps } from './styles';

const PseudoButton = forwardRef((props, ref) => (
  <Button variant="secondary" ref={ref} as="button" {...props} />
));

PseudoButton.displayName = 'PseudoButton';

const MenuButton = forwardRef(
  ({ hideArrow, onClick, onKeyDown, as: Comp = PseudoButton, children, disabled, ...rest }, ref) => {
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
    } = useMenu();

    const menuButtonRef = useForkRef(buttonRef, ref);
    const styleProps = useMenuButtonStyle();
    const iconWrapperProps = getIconWrapperProps();

    return (
      <Comp
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        data-active={isOpen}
        aria-disabled={disabled}
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
        {...styleProps}
        {...rest}
      >
        {children}
        {!hideArrow && (
          <PseudoBox
            aria-disabled={disabled}
            {...iconWrapperProps}
          >
            <Icon width="4x" name="_core.angle-down" />
          </PseudoBox>
        )}
      </Comp>
    );
  },
);

MenuButton.displayName = 'MenuButton';

export default MenuButton;
