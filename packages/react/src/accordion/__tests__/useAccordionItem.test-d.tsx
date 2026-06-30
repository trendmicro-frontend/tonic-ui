import { useAccordionItem } from '@tonic-ui/react';

function UseAccordionItemExample() {
  const accordionItem = useAccordionItem();

  if (accordionItem) {
    // Properties
    const accordionToggleId = accordionItem.accordionToggleId;
    const accordionContentId = accordionItem.accordionContentId;
    const disabled = accordionItem.disabled;
    const isExpanded = accordionItem.isExpanded;
    const variant = accordionItem.variant;

    // Methods
    accordionItem.onToggle();
  }

  return null;
}
