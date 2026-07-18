import { useContext } from 'react';
import { ModalContext } from './context';

/**
 * @typedef {Object} ModalContextValue
 * @property {boolean} autoFocus - Whether the modal automatically sets focus on the first focusable element.
 * @property {boolean} closeOnEsc - Whether the modal closes on Escape key.
 * @property {boolean} closeOnInteractOutside - Whether the modal closes on outside interaction.
 * @property {boolean} ensureFocus - Whether focus is trapped within the modal.
 * @property {React.RefObject<HTMLElement>} [finalFocusRef] - The ref of the element to focus on close.
 * @property {React.RefObject<HTMLElement>} [initialFocusRef] - The ref of the element to focus on open.
 * @property {boolean} isClosable - Whether the close button is shown.
 * @property {boolean} isOpen - Whether the modal is open.
 * @property {() => void} [onClose] - Callback fired when the modal closes.
 * @property {(event: Event) => void} [onInteractOutside] - Callback fired when interacting outside the modal.
 * @property {'inside' | 'outside'} scrollBehavior - The scroll behavior of the modal.
 * @property {'auto' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'} size - The size of the modal.
 * @property {React.RefObject<HTMLElement>} containerRef - Internal use only.
 * @property {React.RefObject<HTMLElement>} contentRef - Internal use only.
 * @property {'center'} placement - Internal use only.
 */

/**
 * A hook to access the modal context.
 * @returns {ModalContextValue | undefined} The modal context, or `undefined` if not within a `Modal`.
 */
const useModal = () => {
  const context = useContext(ModalContext);
  return context;
};

export default useModal;
