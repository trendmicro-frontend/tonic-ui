import { useMenu } from '@tonic-ui/react';

function UseMenuExample() {
  const menu = useMenu();

  if (menu) {
    // Properties
    const isOpen = menu.isOpen;
    const autoSelect = menu.autoSelect;
    const closeOnInteractOutside = menu.closeOnInteractOutside;
    const closeOnSelect = menu.closeOnSelect;
    const direction = menu.direction;
    const placement = menu.placement;
    const menuId = menu.menuId;
    const menuToggleId = menu.menuToggleId;
    const offset = menu.offset;

    // Methods
    menu.onClose();
    menu.onOpen();
    menu.onToggle();
    menu.focusOnFirstItem();
    menu.focusOnLastItem();
    menu.focusOnNextItem();
    menu.focusOnPreviousItem();

    // Callbacks
    if (menu.onInteractOutside) {
      menu.onInteractOutside(new Event('click'));
    }
  }

  return null;
}
