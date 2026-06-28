import { useContext } from 'react';
import { PopoverContext } from './context';

/**
 * @typedef {Object} PopoverContextValue
 * @property {boolean} closeOnBlur - Whether the popover closes on blur.
 * @property {boolean} closeOnEsc - Whether the popover closes on Escape key.
 * @property {boolean} [disabled] - Whether the popover is disabled.
 * @property {boolean} [followCursor] - Whether the popover follows the cursor.
 * @property {boolean} arrow - Whether an arrow is shown.
 * @property {React.RefObject<HTMLElement>} [initialFocusRef] - The ref of the element to focus on open.
 * @property {React.MutableRefObject<boolean | undefined>} isHoveringContentRef - Whether hovering content.
 * @property {React.MutableRefObject<boolean | undefined>} isHoveringTriggerRef - Whether hovering trigger.
 * @property {boolean} isOpen - Whether the popover is open.
 * @property {number} mousePageX - The mouse page X position.
 * @property {number} mousePageY - The mouse page Y position.
 * @property {boolean} [nextToCursor] - Whether the popover is positioned next to cursor.
 * @property {[number, number]} [offset] - The skidding and distance of the popover.
 * @property {(callback?: () => void) => void} onClose - Callback to close the popover.
 * @property {(callback?: () => void) => void} onOpen - Callback to open the popover.
 * @property {() => void} onToggle - Callback to toggle the popover.
 * @property {string} placement - The placement of the popover.
 * @property {string} popoverId - The id of the popover.
 * @property {React.MutableRefObject<HTMLElement | undefined>} popoverContentRef - Ref to the popover content element.
 * @property {string} popoverTriggerId - The id of the popover trigger.
 * @property {React.MutableRefObject<HTMLElement | undefined>} popoverTriggerRef - Ref to the popover trigger element.
 * @property {React.Dispatch<React.SetStateAction<number>>} setMousePageX - Setter for mouse page X.
 * @property {React.Dispatch<React.SetStateAction<number>>} setMousePageY - Setter for mouse page Y.
 * @property {'click' | 'hover'} trigger - The trigger type.
 */

/**
 * A hook to access the popover context.
 * @returns {PopoverContextValue | undefined} The popover context, or `undefined` if not within a `Popover`.
 */
const usePopover = () => {
  const context = useContext(PopoverContext);
  return context;
};

export default usePopover;
