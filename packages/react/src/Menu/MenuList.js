import chainedFunction from 'chained-function';
import React, { forwardRef, useRef } from 'react';
import Popper from '../Popper/Popper';
import Collapse from '../Transitions/Collapse';
import useForkRef from '../utils/useForkRef';
import { useMenuListStyle } from './styles';
import useMenu from './useMenu';

const MenuList = forwardRef((
  {
    skidding = 0,
    distance = 0,
    TransitionComponent = Collapse,
    TransitionProps,
    children,
    ...props
  },
  ref,
) => {
  const nodeRef = useRef(null);
  const combinedRef = useForkRef(nodeRef, ref);
  const {
    activeIndex: index,
    isOpen,
    focusAtIndex,
    focusOnFirstItem,
    focusOnLastItem,
    closeMenu,
    focusableItems,
    menuTriggerRef,
    menuId,
    menuTriggerId,
    menuRef,
    closeOnBlur,
    placement,
    onKeyDown,
    onBlur,
  } = useMenu();

  const handleKeyDown = event => {
    const count = focusableItems.current.length;
    let nextIndex;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      nextIndex = (index + 1) % count;
      focusAtIndex(nextIndex);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      nextIndex = (index - 1 + count) % count;
      focusAtIndex(nextIndex);
    } else if (event.key === 'Home') {
      focusOnFirstItem();
    } else if (event.key === 'End') {
      focusOnLastItem();
    } else if (event.key === 'Tab') {
      event.preventDefault();
    } else if (event.key === 'Escape') {
      closeMenu();
    }

    if (typeof onKeyDown === 'function') {
      onKeyDown(event);
    }
  };

  // Close the menu on blur
  const handleBlur = event => {
    const target = event.relatedTarget || document.activeElement;
    const isClickingOutside =
      target &&
      !(menuRef?.current?.contains(target)) &&
      !(menuTriggerRef?.current?.contains(target));
    const shouldCloseMenu = isOpen && closeOnBlur && isClickingOutside;

    if (shouldCloseMenu) {
      closeMenu();
    }

    if (typeof onBlur === 'function') {
      onBlur(event);
    }
  };

  const styleProps = useMenuListStyle();

  return (
    <Popper
      usePortal={false}
      isOpen={isOpen}
      anchorEl={menuTriggerRef.current}
      placement={placement}
      modifiers={{ offset: [skidding, distance] }}
      role="menu"
      ref={menuRef}
      id={menuId}
      aria-labelledby={menuTriggerId}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      willUseTransition={true}
      zIndex="dropdown"
      tabIndex={-1}
      _focus={{ outline: 0 }}
      {...styleProps}
      {...props}
    >
      {({ placement, transition }) => {
        const { in: inProp, onEnter, onExited } = { ...transition };
        return (
          <TransitionComponent
            easing="linear"
            timeout={{
              enter: 133,
              exit: Math.floor(133 * 0.7),
            }}
            {...TransitionProps}
            ref={combinedRef}
            in={inProp}
            onEnter={chainedFunction(
              onEnter,
              TransitionProps?.onEnter,
            )}
            onExited={chainedFunction(
              onExited,
              TransitionProps?.onExited,
            )}
          >
            {children}
          </TransitionComponent>
        );
      }}
    </Popper>
  );
});

MenuList.displayName = 'MenuList';

export default MenuList;
