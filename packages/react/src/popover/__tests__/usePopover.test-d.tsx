import { usePopover } from '@tonic-ui/react';

function UsePopoverExample() {
  const popover = usePopover();

  if (popover) {
    // Properties
    const isOpen = popover.isOpen;
    const placement = popover.placement;
    const closeOnBlur = popover.closeOnBlur;
    const closeOnEsc = popover.closeOnEsc;
    const disabled = popover.disabled;
    const followCursor = popover.followCursor;
    const arrow = popover.arrow;
    const nextToCursor = popover.nextToCursor;
    const offset = popover.offset;
    const trigger = popover.trigger;
    const popoverId = popover.popoverId;
    const popoverTriggerId = popover.popoverTriggerId;
    const mousePageX = popover.mousePageX;
    const mousePageY = popover.mousePageY;

    // Methods
    popover.onClose();
    popover.onClose(() => { /* noop */ });
    popover.onOpen();
    popover.onOpen(() => { /* noop */ });
    popover.onToggle();
    popover.setMousePageX(100);
    popover.setMousePageY(200);
  }

  return null;
}
