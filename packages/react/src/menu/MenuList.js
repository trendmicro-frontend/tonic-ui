import chainedFunction from 'chained-function';
import {
  ensureArray,
  ensureFunction,
} from 'ensure-type';
import React, { forwardRef, useRef } from 'react';
import { Popper } from '../popper';
import { Collapse } from '../transitions';
import useForkRef from '../utils/useForkRef';
import wrapEvent from '../utils/wrapEvent';
import { useMenuListStyle } from './styles';
import useMenu from './useMenu';

const MenuList = forwardRef((
  {
    TransitionComponent = Collapse,
    TransitionProps,
    children,
    offset,
    onBlur: onBlurProp,
    onKeyDown: onKeyDownProp,
    ...rest
  },
  ref,
) => {
  const nodeRef = useRef(null);
  const combinedRef = useForkRef(nodeRef, ref);
  const menuContext = useMenu(); // context might be an undefined value
  const {
    activeIndex: index,
    isOpen,
    focusAtIndex,
    focusOnFirstItem,
    focusOnLastItem,
    closeMenu,
    focusableItems,
    menuToggleRef,
    menuId,
    menuToggleId,
    menuRef,
    closeOnBlur,
    placement,
    onKeyDown,
    onBlur,
  } = { ...menuContext };

  const handleKeyDown = event => {
    const count = ensureArray(focusableItems?.current).length;
    let nextIndex;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      nextIndex = (index + 1) % count;
      ensureFunction(focusAtIndex)(nextIndex);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      nextIndex = (index - 1 + count) % count;
      ensureFunction(focusAtIndex)(nextIndex);
    } else if (event.key === 'Home') {
      ensureFunction(focusOnFirstItem)();
    } else if (event.key === 'End') {
      ensureFunction(focusOnLastItem)();
    } else if (event.key === 'Tab') {
      event.preventDefault();
    } else if (event.key === 'Escape') {
      ensureFunction(closeMenu)();
    }

    ensureFunction(onKeyDown)(event);
  };

  // Close the menu on blur
  const handleBlur = event => {
    const target = event.relatedTarget || document.activeElement;
    const isClickingOutside =
      target &&
      !(menuRef?.current?.contains(target)) &&
      !(menuToggleRef?.current?.contains(target));
    const shouldCloseMenu = isOpen && closeOnBlur && isClickingOutside;

    if (shouldCloseMenu) {
      ensureFunction(closeMenu)();
    }

    ensureFunction(onBlur)(event);
  };

  const styleProps = useMenuListStyle();

  return (
    <Popper
      anchorEl={menuToggleRef?.current}
      aria-labelledby={menuToggleId}
      id={menuId}
      isOpen={isOpen}
      modifiers={{ offset }}
      onBlur={wrapEvent(onBlurProp, handleBlur)}
      onKeyDown={wrapEvent(onKeyDownProp, handleKeyDown)}
      placement={placement}
      ref={menuRef}
      role="menu"
      tabIndex={-1}
      usePortal={false}
      willUseTransition={true}
      zIndex="dropdown"
      _focus={{
        outline: 0,
      }}
      {...styleProps}
      {...rest}
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
