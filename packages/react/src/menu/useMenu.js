import { useContext } from 'react';
import { MenuContext } from './context';

/**
 * @typedef {Object} MenuContextValue
 * @property {boolean} autoSelect - Whether to auto-select the first item on open.
 * @property {boolean} closeOnBlur - Whether the menu closes on blur.
 * @property {boolean} closeOnSelect - Whether the menu closes on item selection.
 * @property {string} [direction] - The direction of the menu ('up' or 'down').
 * @property {() => void} focusOnFirstItem - Focus on the first menu item.
 * @property {() => void} focusOnLastItem - Focus on the last menu item.
 * @property {() => void} focusOnNextItem - Focus on the next menu item.
 * @property {() => void} focusOnPreviousItem - Focus on the previous menu item.
 * @property {boolean} isOpen - Whether the menu is open.
 * @property {[number, number]} [offset] - The skidding and distance of the menu.
 * @property {() => void} onClose - Callback to close the menu.
 * @property {() => void} onOpen - Callback to open the menu.
 * @property {() => void} onToggle - Callback to toggle the menu.
 * @property {string} placement - The placement of the menu.
 * @property {string} menuId - The id of the menu.
 * @property {React.MutableRefObject<HTMLElement | null>} menuContentRef - Ref to the menu content element.
 * @property {string} menuToggleId - The id of the menu toggle.
 * @property {React.MutableRefObject<HTMLElement | null>} menuToggleRef - Ref to the menu toggle element.
 * @property {React.MutableRefObject<Set<HTMLElement>>} submenuContentRefs - Refs to submenu content elements.
 */

/**
 * A hook to access the menu context.
 * @returns {MenuContextValue | undefined} The menu context, or `undefined` if not within a `Menu`.
 */
const useMenu = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(MenuContext);
  return context;
};

export default useMenu;
