import { useSubmenu } from '@tonic-ui/react';

function UseSubmenuExample() {
  const submenu = useSubmenu();

  if (submenu) {
    // Properties
    const isOpen = submenu.isOpen;
    const placement = submenu.placement;
    const offset = submenu.offset;
    const submenuId = submenu.submenuId;
    const submenuTriggerId = submenu.submenuTriggerId;

    // Methods
    submenu.onClose();
    submenu.onOpen();
    submenu.focusOnFirstItem();
    submenu.focusOnLastItem();
    submenu.focusOnNextItem();
    submenu.focusOnPreviousItem();
    submenu.focusOnSubmenuTrigger();
  }

  return null;
}
