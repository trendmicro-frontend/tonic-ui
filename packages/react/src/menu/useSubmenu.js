import { useContext } from 'react';
import { SubmenuContext } from './context';

/**
 * @typedef {Object} SubmenuContextValue
 * @property {() => void} focusOnFirstItem - Focus on the first submenu item.
 * @property {() => void} focusOnLastItem - Focus on the last submenu item.
 * @property {() => void} focusOnNextItem - Focus on the next submenu item.
 * @property {() => void} focusOnPreviousItem - Focus on the previous submenu item.
 * @property {() => void} focusOnSubmenuTrigger - Focus on the submenu trigger.
 * @property {React.MutableRefObject<boolean | undefined>} isHoveringSubmenuContentRef - Whether hovering submenu content.
 * @property {React.MutableRefObject<boolean | undefined>} isHoveringSubmenuTriggerRef - Whether hovering submenu trigger.
 * @property {boolean} isOpen - Whether the submenu is open.
 * @property {[number, number]} [offset] - The skidding and distance of the submenu.
 * @property {() => void} onClose - Callback to close the submenu.
 * @property {() => void} onOpen - Callback to open the submenu.
 * @property {string} placement - The placement of the submenu.
 * @property {string} submenuId - The id of the submenu.
 * @property {React.MutableRefObject<HTMLElement | null>} submenuContentRef - Ref to the submenu content element.
 * @property {string} submenuTriggerId - The id of the submenu trigger.
 * @property {React.MutableRefObject<HTMLElement | null>} submenuTriggerRef - Ref to the submenu trigger element.
 */

/**
 * A hook to access the submenu context.
 * @returns {SubmenuContextValue | undefined} The submenu context, or `undefined` if not within a `Submenu`.
 */
const useSubmenu = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(SubmenuContext);
  return context;
};

export default useSubmenu;
