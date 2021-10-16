import React, { forwardRef } from 'react';
import Collapse from '../Collapse';
import { useAccordionItem } from './context';

const AccordionPanel = forwardRef((props, ref) => {
  const {
    isExpanded,
    panelId,
    headerId,
  } = useAccordionItem();

  return (
    <Collapse
      ref={ref}
      data-accordion-panel=""
      role="region"
      id={panelId}
      aria-labelledby={headerId}
      aria-hidden={!isExpanded}
      isOpen={isExpanded}
      {...props}
    />
  );
});

AccordionPanel.displayName = 'AccordionPanel';

export default AccordionPanel;
