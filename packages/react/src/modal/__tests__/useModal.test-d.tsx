import { useModal } from '@tonic-ui/react';

function UseModalExample() {
  const modal = useModal();

  if (modal) {
    // Properties
    const autoFocus = modal.autoFocus;
    const closeOnEsc = modal.closeOnEsc;
    const closeOnInteractOutside = modal.closeOnInteractOutside;
    const ensureFocus = modal.ensureFocus;
    const isClosable = modal.isClosable;
    const isOpen = modal.isOpen;
    const scrollBehavior = modal.scrollBehavior;
    const size = modal.size;
    const placement = modal.placement;

    // Optional refs
    const finalFocusRef = modal.finalFocusRef;
    const initialFocusRef = modal.initialFocusRef;

    // Methods
    if (modal.onClose) {
      modal.onClose();
    }
    if (modal.onInteractOutside) {
      modal.onInteractOutside(new Event('click'));
    }
  }

  return null;
}
