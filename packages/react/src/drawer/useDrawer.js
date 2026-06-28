import { useContext } from 'react';
import { DrawerContext } from './context';

/**
 * @typedef {Object} DrawerContextValue
 * @property {boolean} autoFocus - Whether the drawer automatically sets focus on the first focusable element.
 * @property {boolean} backdrop - Whether a backdrop is rendered.
 * @property {boolean} closeOnEsc - Whether the drawer closes on Escape key.
 * @property {boolean} closeOnInteractOutside - Whether the drawer closes on outside interaction.
 * @property {boolean} ensureFocus - Whether focus is trapped within the drawer.
 * @property {React.RefObject<HTMLElement>} [finalFocusRef] - The ref of the element to focus on close.
 * @property {React.RefObject<HTMLElement>} [initialFocusRef] - The ref of the element to focus on open.
 * @property {boolean} isClosable - Whether the close button is shown.
 * @property {boolean} isOpen - Whether the drawer is open.
 * @property {() => void} [onClose] - Callback fired when the drawer closes.
 * @property {(event: Event) => void} [onInteractOutside] - Callback fired when interacting outside the drawer.
 * @property {'left' | 'right' | 'top' | 'bottom'} placement - The placement of the drawer.
 * @property {'auto' | 'sm' | 'md' | 'lg' | 'full'} size - The size of the drawer.
 * @property {React.RefObject<HTMLElement>} containerRef - Internal use only.
 * @property {React.RefObject<HTMLElement>} contentRef - Internal use only.
 * @property {'inside'} scrollBehavior - Internal use only.
 */

/**
 * A hook to access the drawer context.
 * @returns {DrawerContextValue | undefined} The drawer context, or `undefined` if not within a `Drawer`.
 */
const useDrawer = () => {
  const context = useContext(DrawerContext);
  return context;
};

export default useDrawer;
