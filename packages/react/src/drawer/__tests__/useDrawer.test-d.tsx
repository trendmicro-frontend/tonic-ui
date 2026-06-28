import { useDrawer } from '@tonic-ui/react';

function UseDrawerExample() {
  const drawer = useDrawer();

  if (drawer) {
    // Properties
    const autoFocus = drawer.autoFocus;
    const backdrop = drawer.backdrop;
    const closeOnEsc = drawer.closeOnEsc;
    const closeOnInteractOutside = drawer.closeOnInteractOutside;
    const ensureFocus = drawer.ensureFocus;
    const isClosable = drawer.isClosable;
    const isOpen = drawer.isOpen;
    const placement = drawer.placement;
    const size = drawer.size;
    const scrollBehavior = drawer.scrollBehavior;

    // Optional refs
    const finalFocusRef = drawer.finalFocusRef;
    const initialFocusRef = drawer.initialFocusRef;

    // Methods
    if (drawer.onClose) {
      drawer.onClose();
    }
    if (drawer.onInteractOutside) {
      drawer.onInteractOutside(new Event('click'));
    }
  }

  return null;
}
